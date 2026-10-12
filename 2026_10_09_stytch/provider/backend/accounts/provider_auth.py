"""'Log in with Consumer': this app is an OIDC client of Consumer (authorization code + PKCE)."""
import base64
import hashlib
import secrets
import uuid
from functools import lru_cache
from typing import Optional
from urllib.parse import urlencode

import jwt
import requests
from django.conf import settings
from django.contrib.auth import get_user_model, login, logout
from django.db import transaction
from django.http import HttpResponseBadRequest, HttpResponseRedirect
from ninja import Router

from .models import ExternalIdentity

router = Router()

SESSION_KEY = "provider_oidc"


@lru_cache(maxsize=1)
def discovery():
    res = requests.get(f"{settings.PROVIDER_ISSUER}/.well-known/openid-configuration", timeout=10)
    res.raise_for_status()
    return res.json()


def exchange_code(code, code_verifier):
    res = requests.post(
        discovery()["token_endpoint"],
        data={
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": settings.PROVIDER_REDIRECT_URI,
            "client_id": settings.PROVIDER_CLIENT_ID,
            "client_secret": settings.PROVIDER_CLIENT_SECRET,
            "code_verifier": code_verifier,
        },
        timeout=10,
    )
    res.raise_for_status()
    return res.json()


def verify_id_token(id_token):
    """Check the ID token's signature, issuer and audience; return its claims."""
    key = jwt.PyJWKClient(discovery()["jwks_uri"]).get_signing_key_from_jwt(id_token)
    return jwt.decode(
        id_token,
        key.key,
        algorithms=["RS256"],
        audience=settings.PROVIDER_CLIENT_ID,
        issuer=discovery()["issuer"],
    )


def fetch_userinfo(access_token):
    res = requests.get(
        discovery()["userinfo_endpoint"],
        headers={"Authorization": f"Bearer {access_token}"},
        timeout=10,
    )
    res.raise_for_status()
    return res.json()


def get_or_create_user(issuer, subject):
    """Get or create the local user linked to this Provider account."""
    identity = ExternalIdentity.objects.select_related("user").filter(issuer=issuer, subject=subject).first()
    if identity:
        return identity.user
    with transaction.atomic():
        # The identity is the key; the username only has to be unique.
        user = get_user_model().objects.create(username=uuid.uuid4().hex)
        ExternalIdentity.objects.create(user=user, issuer=issuer, subject=subject)
    return user


@router.get("/login/")
def provider_login(request):
    code_verifier = secrets.token_urlsafe(64)
    code_challenge = (
        base64.urlsafe_b64encode(hashlib.sha256(code_verifier.encode()).digest()).rstrip(b"=").decode()
    )
    state = secrets.token_urlsafe(32)
    request.session[SESSION_KEY] = {"state": state, "code_verifier": code_verifier}
    params = urlencode(
        {
            "response_type": "code",
            "client_id": settings.PROVIDER_CLIENT_ID,
            "redirect_uri": settings.PROVIDER_REDIRECT_URI,
            "scope": "openid email profile",
            "state": state,
            "code_challenge": code_challenge,
            "code_challenge_method": "S256",
        }
    )
    return HttpResponseRedirect(f"{discovery()['authorization_endpoint'].strip()}?{params}")


@router.get("/callback/")
def provider_callback(
    request, code: Optional[str] = None, state: Optional[str] = None, error: Optional[str] = None
):
    saved = request.session.pop(SESSION_KEY, None)
    if error:
        return HttpResponseBadRequest(f"Provider returned an error: {error}")
    if not saved or not code or not state or not secrets.compare_digest(state, saved["state"]):
        return HttpResponseBadRequest("Invalid or expired login attempt. Start again.")

    tokens = exchange_code(code, saved["code_verifier"])
    claims = verify_id_token(tokens["id_token"])
    if "email" not in claims:
        claims = {**claims, **fetch_userinfo(tokens["access_token"])}

    user = get_or_create_user(claims["iss"], claims["sub"])
    email = claims.get("email", "")
    if user.email != email:
        user.email = email
        user.save(update_fields=["email"])
    login(request, user, backend="django.contrib.auth.backends.ModelBackend")
    return HttpResponseRedirect("/")


@router.post("/logout/")
def provider_logout(request):
    logout(request)
    return {"ok": True}

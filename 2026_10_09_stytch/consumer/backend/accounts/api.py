from typing import Annotated

from ninja import Router, Schema
from pydantic import StringConstraints
from stytch.core.response_base import StytchError

from middleware import client

router = Router()

# Apps that offer "Log in with Consumer", listed on the Connected services dashboard.
SERVICES = [{"name": "Color Colors", "url": "http://localhost:5274"}]

Name = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=150)]


class MeOut(Schema):
    authenticated: bool = True
    id: int
    username: str
    email: str
    first_name: str
    last_name: str


class MeIn(Schema):
    first_name: Name
    last_name: Name


class AnonymousOut(Schema):
    authenticated: bool = False


class ServiceOut(Schema):
    name: str
    url: str
    connected: bool


@router.get("/me/", response={200: MeOut, 401: AnonymousOut})
def me(request):
    if not request.user.is_authenticated:
        return 401, {}
    return 200, request.user


@router.patch("/me/", response={200: MeOut, 401: AnonymousOut})
def update_me(request, payload: MeIn):
    if not request.user.is_authenticated:
        return 401, {}
    request.user.first_name = payload.first_name
    request.user.last_name = payload.last_name
    request.user.save(update_fields=["first_name", "last_name"])
    return 200, request.user


def connected_redirect_urls(user):
    """Redirect URLs of every Stytch Connected App the user has authorized."""
    try:
        apps = client.users.connected_apps(user_id=user.username).connected_apps
        return [
            url
            for app in apps
            for url in client.connected_app.clients.get(client_id=app.connected_app_id).connected_app.redirect_urls
        ]
    except StytchError:
        return []


@router.get("/services/", response={200: list[ServiceOut], 401: AnonymousOut})
def services(request):
    if not request.user.is_authenticated:
        return 401, {}
    urls = connected_redirect_urls(request.user)
    return 200, [
        {**service, "connected": any(url.startswith(f"{service['url']}/") for url in urls)} for service in SERVICES
    ]

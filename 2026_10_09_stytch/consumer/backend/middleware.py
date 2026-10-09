import stytch
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from stytch.core.response_base import StytchError

client = stytch.Client(
    project_id=settings.STYTCH_PROJECT_ID,
    secret=settings.STYTCH_SECRET,
)


def get_django_user(stytch_user):
    """Get or create the local user for a Stytch user, keyed on the Stytch user id.

    Email follows Stytch. Names are owned by this app (set via PATCH /api/me/),
    so they are never synced from Stytch.
    """
    user, _ = get_user_model().objects.get_or_create(username=stytch_user.user_id)
    email = stytch_user.emails[0].email if stytch_user.emails else ""
    if user.email != email:
        user.email = email
        user.save(update_fields=["email"])
    return user


class StytchSessionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        header = request.headers.get("Authorization", "")
        if header.startswith("Bearer "):
            token = header[len("Bearer "):]
            try:
                session = client.sessions.authenticate(session_jwt=token)
                request.user = get_django_user(session.user)
            except StytchError:
                request.user = AnonymousUser()
        # No header: leave request.user as Django's AuthenticationMiddleware set it,
        # so the admin's own session login keeps working.
        return self.get_response(request)

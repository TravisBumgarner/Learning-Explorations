from typing import Annotated

from django.contrib.auth import get_user_model
from ninja import Router, Schema
from pydantic import StringConstraints
from stytch.core.response_base import StytchError

from middleware import client

from .models import FavoriteColor

router = Router()

Name = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=150)]
Hex = Annotated[str, StringConstraints(strip_whitespace=True, to_lower=True, pattern=r"^#[0-9a-fA-F]{6}$")]


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


class ColorIn(Schema):
    hex: Hex


class ColorOut(Schema):
    id: int
    hex: str


class PersonColorsOut(Schema):
    id: int
    first_name: str
    last_name: str
    authed_from: list[str]
    colors: list[ColorOut]

    @staticmethod
    def resolve_colors(obj):
        return obj.favorite_colors.all()


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


@router.get("/colors/", response={200: list[ColorOut], 401: AnonymousOut})
def list_colors(request):
    if not request.user.is_authenticated:
        return 401, {}
    return 200, request.user.favorite_colors.all()


@router.post("/colors/", response={200: ColorOut, 401: AnonymousOut})
def add_color(request, payload: ColorIn):
    if not request.user.is_authenticated:
        return 401, {}
    color, _ = FavoriteColor.objects.get_or_create(user=request.user, hex=payload.hex)
    return 200, color


def authed_from(user):
    """Apps the user has logged in from: this one, plus any Connected Apps they authorized."""
    try:
        apps = client.users.connected_apps(user_id=user.username).connected_apps
    except StytchError:
        apps = []
    return ["Color Colors", *(app.name for app in apps)]


@router.get("/colors/everyone/", response={200: list[PersonColorsOut], 401: AnonymousOut})
def list_everyone_colors(request):
    if not request.user.is_authenticated:
        return 401, {}
    people = list(
        get_user_model().objects.order_by("first_name", "last_name", "id").prefetch_related("favorite_colors")
    )
    for person in people:
        person.authed_from = authed_from(person)
    return 200, people

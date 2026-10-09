from typing import Annotated

from ninja import Router, Schema
from pydantic import StringConstraints

router = Router()

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

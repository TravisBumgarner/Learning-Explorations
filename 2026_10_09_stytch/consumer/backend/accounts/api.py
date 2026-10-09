from ninja import Router, Schema

router = Router()


class MeOut(Schema):
    authenticated: bool = True
    id: int
    username: str
    email: str
    name: str


class AnonymousOut(Schema):
    authenticated: bool = False


@router.get("/me/", response={200: MeOut, 401: AnonymousOut})
def me(request):
    if not request.user.is_authenticated:
        return 401, {}
    print(request.user)
    return 200, {
        "id": request.user.id,
        "username": request.user.get_username(),
        "email": request.user.email,
        "name": request.user.first_name,
    }

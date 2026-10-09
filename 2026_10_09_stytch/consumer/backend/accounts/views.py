from django.http import JsonResponse


def me(request):
    if not request.user.is_authenticated:
        return JsonResponse({"authenticated": False}, status=401)
    return JsonResponse(
        {
            "authenticated": True,
            "id": request.user.id,
            "username": request.user.get_username(),
            "email": request.user.email,
            "name": request.user.first_name,
        }
    )

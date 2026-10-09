from django.http import HttpResponse
from django.utils.html import escape


def index(request):
    if request.user.is_authenticated:
        body = f"<p>Signed in as <b>{escape(request.user.email or request.user.get_username())}</b></p>"
    else:
        body = "<p>Not signed in.</p>"
    return HttpResponse("<h1>Provider</h1>" + body)

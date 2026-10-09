from django.contrib import admin
from django.urls import path

from accounts import views

urlpatterns = [
    path("api/me/", views.me, name="me"),
    path("admin/", admin.site.urls),
]

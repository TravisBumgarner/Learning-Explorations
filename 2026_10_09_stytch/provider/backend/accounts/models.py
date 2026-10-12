from django.conf import settings
from django.db import models


class FavoriteColor(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="favorite_colors")
    hex = models.CharField(max_length=7)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at", "id"]
        constraints = [models.UniqueConstraint(fields=["user", "hex"], name="unique_favorite_color_per_user")]

    def __str__(self):
        return self.hex

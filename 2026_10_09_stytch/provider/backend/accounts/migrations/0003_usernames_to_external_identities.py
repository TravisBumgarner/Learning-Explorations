import uuid

from django.conf import settings
from django.db import migrations

# Provider users used to be keyed on a "provider|<sub>" username.
PREFIX = "provider|"


def forwards(apps, schema_editor):
    User = apps.get_model(settings.AUTH_USER_MODEL)
    ExternalIdentity = apps.get_model("accounts", "ExternalIdentity")
    users = User.objects.filter(username__startswith=PREFIX)
    if users.exists() and not settings.PROVIDER_ISSUER:
        raise RuntimeError("Set PROVIDER_ISSUER before migrating: existing Provider users need an issuer.")
    for user in users:
        ExternalIdentity.objects.create(
            user=user, issuer=settings.PROVIDER_ISSUER, subject=user.username[len(PREFIX):]
        )
        user.username = uuid.uuid4().hex
        user.save(update_fields=["username"])


def backwards(apps, schema_editor):
    ExternalIdentity = apps.get_model("accounts", "ExternalIdentity")
    for identity in ExternalIdentity.objects.select_related("user"):
        identity.user.username = f"{PREFIX}{identity.subject}"
        identity.user.save(update_fields=["username"])
    ExternalIdentity.objects.all().delete()


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("accounts", "0002_external_identity"),
    ]

    operations = [migrations.RunPython(forwards, backwards)]

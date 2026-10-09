from django.contrib.auth import get_user_model
from django.test import TestCase


class MeTests(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create(username="user-test-123", email="a@example.com")

    def test_anonymous_cannot_read_or_update(self):
        self.assertEqual(self.client.get("/api/me/").status_code, 401)
        res = self.client.patch(
            "/api/me/", {"first_name": "A", "last_name": "B"}, content_type="application/json"
        )
        self.assertEqual(res.status_code, 401)

    def test_new_user_has_blank_names(self):
        self.client.force_login(self.user)
        body = self.client.get("/api/me/").json()
        self.assertEqual((body["first_name"], body["last_name"]), ("", ""))

    def test_update_names(self):
        self.client.force_login(self.user)
        res = self.client.patch(
            "/api/me/", {"first_name": " Ada ", "last_name": "Lovelace"}, content_type="application/json"
        )
        self.assertEqual(res.status_code, 200)
        self.user.refresh_from_db()
        self.assertEqual((self.user.first_name, self.user.last_name), ("Ada", "Lovelace"))
        self.assertEqual(self.client.get("/api/me/").json()["first_name"], "Ada")

    def test_blank_names_rejected(self):
        self.client.force_login(self.user)
        res = self.client.patch(
            "/api/me/", {"first_name": "  ", "last_name": "B"}, content_type="application/json"
        )
        self.assertEqual(res.status_code, 422)

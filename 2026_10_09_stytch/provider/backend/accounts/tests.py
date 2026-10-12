from types import SimpleNamespace
from unittest import mock

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


class ColorTests(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create(username="user-test-123")

    def add(self, hex):
        return self.client.post("/api/colors/", {"hex": hex}, content_type="application/json")

    def test_anonymous_cannot_list_or_add(self):
        self.assertEqual(self.client.get("/api/colors/").status_code, 401)
        self.assertEqual(self.add("#ff0000").status_code, 401)

    def test_add_and_list(self):
        self.client.force_login(self.user)
        self.assertEqual(self.add("#FF0000").status_code, 200)
        self.add("#00ff00")
        self.add("#ff0000")
        hexes = [color["hex"] for color in self.client.get("/api/colors/").json()]
        self.assertEqual(hexes, ["#ff0000", "#00ff00"])

    def test_only_own_colors_listed(self):
        other = get_user_model().objects.create(username="user-test-456")
        self.client.force_login(other)
        self.add("#0000ff")
        self.client.force_login(self.user)
        self.assertEqual(self.client.get("/api/colors/").json(), [])

    def test_invalid_hex_rejected(self):
        self.client.force_login(self.user)
        self.assertEqual(self.add("red").status_code, 422)

    @mock.patch("accounts.api.client")
    def test_everyone_lists_each_person_with_colors(self, client):
        client.users.connected_apps.side_effect = lambda user_id: SimpleNamespace(
            connected_apps=[SimpleNamespace(name="Consumer")] if user_id == "user-test-456" else []
        )
        self.assertEqual(self.client.get("/api/colors/everyone/").status_code, 401)
        other = get_user_model().objects.create(username="user-test-456", first_name="Ada", last_name="Lovelace")
        get_user_model().objects.create(username="user-test-789", first_name="No", last_name="Colors")
        self.client.force_login(other)
        self.add("#0000ff")
        self.add("#00ff00")
        self.client.force_login(self.user)
        self.add("#ff0000")
        people = self.client.get("/api/colors/everyone/").json()
        self.assertEqual(
            [(p["first_name"], p["authed_from"], [c["hex"] for c in p["colors"]]) for p in people],
            [
                ("", ["Color Colors"], ["#ff0000"]),
                ("Ada", ["Color Colors", "Consumer"], ["#0000ff", "#00ff00"]),
                ("No", ["Color Colors"], []),
            ],
        )

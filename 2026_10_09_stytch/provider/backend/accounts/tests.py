from unittest import mock
from urllib.parse import parse_qs, urlparse

from django.contrib.auth import get_user_model
from django.test import TestCase, override_settings

from .models import ExternalIdentity


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

    def test_everyone_lists_each_person_with_colors(self):
        self.assertEqual(self.client.get("/api/colors/everyone/").status_code, 401)
        other = get_user_model().objects.create(username="user-test-456", first_name="Ada", last_name="Lovelace")
        ExternalIdentity.objects.create(user=other, issuer="https://issuer.example", subject="user-456")
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
                ("", "Color Colors", ["#ff0000"]),
                ("Ada", "Consumer", ["#0000ff", "#00ff00"]),
                ("No", "Color Colors", []),
            ],
        )

DISCOVERY = {
    "authorization_endpoint": "http://localhost:5273/oauth/authorize ",
    "token_endpoint": "https://issuer.example/token",
    "userinfo_endpoint": "https://issuer.example/userinfo",
    "jwks_uri": "https://issuer.example/jwks",
    "issuer": "https://issuer.example",
}


@override_settings(PROVIDER_CLIENT_ID="client-123", PROVIDER_CLIENT_SECRET="shh")
@mock.patch("accounts.provider_auth.discovery", return_value=DISCOVERY)
class ProviderLoginTests(TestCase):
    def start(self):
        res = self.client.get("/api/auth/login/")
        self.assertEqual(res.status_code, 302)
        url = urlparse(res["Location"])
        return url, {k: v[0] for k, v in parse_qs(url.query).items()}

    def test_login_redirects_to_provider_with_pkce(self, _):
        url, params = self.start()
        self.assertEqual(f"{url.scheme}://{url.netloc}{url.path}", "http://localhost:5273/oauth/authorize")
        self.assertEqual(params["client_id"], "client-123")
        self.assertEqual(params["code_challenge_method"], "S256")
        self.assertIn("openid", params["scope"])
        self.assertTrue(params["state"] and params["code_challenge"])

    def test_callback_rejects_wrong_state(self, _):
        self.start()
        res = self.client.get("/api/auth/callback/", {"code": "abc", "state": "wrong"})
        self.assertEqual(res.status_code, 400)
        self.assertEqual(self.client.get("/api/me/").status_code, 401)

    def test_callback_without_login_attempt_rejected(self, _):
        res = self.client.get("/api/auth/callback/", {"code": "abc", "state": "x"})
        self.assertEqual(res.status_code, 400)

    @mock.patch("accounts.provider_auth.verify_id_token", return_value={"iss": "https://issuer.example", "sub": "user-abc", "email": "p@example.com"})
    @mock.patch("accounts.provider_auth.exchange_code", return_value={"id_token": "x", "access_token": "y"})
    def test_callback_logs_user_in_and_logout_ends_it(self, exchange, _verify, _):
        _, params = self.start()
        res = self.client.get("/api/auth/callback/", {"code": "abc", "state": params["state"]})
        self.assertEqual((res.status_code, res["Location"]), (302, "/"))
        self.assertEqual(exchange.call_args[0][0], "abc")
        me = self.client.get("/api/me/").json()
        self.assertEqual(me["email"], "p@example.com")
        identity = ExternalIdentity.objects.get(issuer="https://issuer.example", subject="user-abc")
        self.assertEqual(identity.user_id, me["id"])
        # state is single-use
        self.assertEqual(self.client.get("/api/auth/callback/", {"code": "abc", "state": params["state"]}).status_code, 400)
        self.assertEqual(self.client.post("/api/auth/logout/").status_code, 200)
        self.assertEqual(self.client.get("/api/me/").status_code, 401)
        # logging in again reuses the same user
        _, params = self.start()
        self.client.get("/api/auth/callback/", {"code": "abc", "state": params["state"]})
        self.assertEqual(self.client.get("/api/me/").json()["id"], me["id"])

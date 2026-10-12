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


from unittest import mock
from urllib.parse import parse_qs, urlparse

from django.test import override_settings

DISCOVERY = {
    "authorization_endpoint": "http://localhost:5274/oauth/authorize ",
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
        self.assertEqual(f"{url.scheme}://{url.netloc}{url.path}", "http://localhost:5274/oauth/authorize")
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

    @mock.patch("accounts.provider_auth.verify_id_token", return_value={"sub": "user-abc", "email": "p@example.com"})
    @mock.patch("accounts.provider_auth.exchange_code", return_value={"id_token": "x", "access_token": "y"})
    def test_callback_logs_user_in_and_logout_ends_it(self, exchange, _verify, _):
        _, params = self.start()
        res = self.client.get("/api/auth/callback/", {"code": "abc", "state": params["state"]})
        self.assertEqual((res.status_code, res["Location"]), (302, "/"))
        self.assertEqual(exchange.call_args[0][0], "abc")
        me = self.client.get("/api/me/").json()
        self.assertEqual((me["username"], me["email"]), ("provider|user-abc", "p@example.com"))
        # state is single-use
        self.assertEqual(self.client.get("/api/auth/callback/", {"code": "abc", "state": params["state"]}).status_code, 400)
        self.assertEqual(self.client.post("/api/auth/logout/").status_code, 200)
        self.assertEqual(self.client.get("/api/me/").status_code, 401)

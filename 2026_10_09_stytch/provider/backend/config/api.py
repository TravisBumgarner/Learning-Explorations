from ninja import NinjaAPI

from accounts.api import router as accounts_router
from accounts.provider_auth import router as provider_auth_router

api = NinjaAPI(title="Color Colors API")
api.add_router("", accounts_router)
api.add_router("/auth", provider_auth_router)

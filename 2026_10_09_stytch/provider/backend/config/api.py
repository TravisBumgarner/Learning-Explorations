from ninja import NinjaAPI

from accounts.api import router as accounts_router

api = NinjaAPI(title="Color Colors API")
api.add_router("", accounts_router)

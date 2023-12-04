from fastapi import APIRouter

from core.api.v1.auth.router import fastapi_users
from core.api.v1.auth.model import auth_backend


router = APIRouter()
router.include_router(fastapi_users.get_auth_router(auth_backend))

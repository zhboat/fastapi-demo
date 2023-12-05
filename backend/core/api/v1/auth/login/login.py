from fastapi import APIRouter, Depends
from sqlmodel import select

from core.schemas.auth.reset import User as user_model
from core.api.v1.auth.router import fastapi_users
from core.api.v1.auth.model import auth_backend, async_session_context
from core.api.v1.auth.user import User
from core.api.v1.auth.router import current_active_user

router = APIRouter()
router.include_router(fastapi_users.get_auth_router(auth_backend))


@router.get(path="/user")
async def get_user_info(user: User = Depends(current_active_user)):
    async with async_session_context() as session:
        statement = select(user_model).where(user_model.email == user.email)
        ret = await session.execute(statement)
        db = ret.scalars().first()
        return {
            "id": db.id,
            "email": db.email,
            "superuser": db.is_superuser,
            "verified": db.is_verified,
        }

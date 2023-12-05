from fastapi import APIRouter, Depends, HTTPException, Body
from typing import Annotated
from sqlmodel import select
from passlib.context import CryptContext

from core.schemas.auth.reset import User as user_model
from core.api.v1.auth.model import async_session_context
from core.api.v1.auth.user import User
from core.api.v1.auth.router import current_active_user


router = APIRouter()


def get_password(password: str):
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    return pwd_context.hash(password)


@router.post(path="/reset_password")
async def reset_password(
    psw: Annotated[str, Body()], user: User = Depends(current_active_user)
):
    async with async_session_context() as session:
        statement = select(user_model).where(user_model.email == user.email)
        ret = await session.execute(statement)
        db = ret.scalars().first()
        if db:
            db.hashed_password = get_password(psw)
            db.is_verified = 1
            await session.commit()
            await session.refresh(db)
        else:
            raise HTTPException(
                status_code=2001,
                detail="仅可为本用户重置密码",
            )

from typing import Optional
from fastapi import Depends, Request
from fastapi_users import schemas, BaseUserManager, IntegerIDMixin
from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase

from config import config
from core.api.v1.auth.user import User, get_user_db


class UserManager(IntegerIDMixin, BaseUserManager[User, int]):
    verification_token_secret = config.JWT_SECRET

    async def on_after_request_verify(
        self, user: User, token: str, request: Optional[Request] = None
    ) -> None:
        # return await super().on_after_request_verify(user, token, request)
        print(f"Verification requested for user {user.id}. Verification token: {token}")


class UserCreate(schemas.BaseUserCreate):
    pass


class UserRead(schemas.BaseUser[int]):
    pass


async def get_user_manager(user_db: SQLAlchemyUserDatabase = Depends(get_user_db)):
    yield UserManager(user_db)

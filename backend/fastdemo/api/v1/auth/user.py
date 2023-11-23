from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import Column, Integer, String, Boolean
from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable, SQLAlchemyUserDatabase

from config import config
from fastdemo.api.v1.auth.model import Base, get_async_session


class User(SQLAlchemyBaseUserTable, Base):
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)
    password = Column(String)
    is_superuser = Column(Boolean, default=False)


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User)

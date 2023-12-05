import os
import shutil
from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi_users.exceptions import UserAlreadyExists
from starlette.middleware.cors import CORSMiddleware

from config import config
from core.api.v1 import app_router
from core.api.v1.auth.model import (
    Base,
    engine,
    async_session_context,
)
from core.api.v1.auth.user import get_user_db
from core.api.v1.auth.user_manager import get_user_manager, UserCreate


def init_router(app: FastAPI):
    app.include_router(app_router, prefix=config.API_PREFIX)


def init_middleware(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in config.CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["GET", "POST"],
        allow_headers=["*"],
    )


async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def init_db_file():
    config_path = os.path.join(config.PROJECT_CONFIG_DIR, "databases")
    if not os.path.exists(config_path):
        os.makedirs(config_path)
    if not os.path.exists(config.SYSTEM_DB_PATH):
        shutil.copyfile(config.PROJECT_DB_PATH, config.SYSTEM_DB_PATH)


async def init_user():
    email = config.EMAIL
    password = config.PASSWD
    is_superuser = True
    is_active = True
    is_verified = False

    get_user_db_context = asynccontextmanager(get_user_db)
    get_user_manager_context = asynccontextmanager(get_user_manager)
    try:
        async with async_session_context() as session:
            async with get_user_db_context(session) as user_db:
                async with get_user_manager_context(user_db) as user_manager:
                    user = await user_manager.create(
                        UserCreate(
                            id=1,
                            email=email,
                            password=password,
                            is_superuser=is_superuser,
                            is_active=is_active,
                            is_verified=is_verified,
                        )
                    )
                    print(f"User created {user}")
    except UserAlreadyExists:
        pass


@asynccontextmanager
async def lifespan(app: FastAPI):
    # startup
    await init_db_file()
    await init_db()
    await init_user()
    yield
    # shutdown

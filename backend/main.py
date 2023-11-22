from fastapi import FastAPI
import uvicorn
import asyncio

from config import config
from fastdemo.init.init_server import InitServer
from fastdemo.api.v1.auth.router import fastapi_users
from fastdemo.api.v1.auth.model import auth_backend



async def init_app():
    init = InitServer()
    init.init_middleware(app)
    init.init_router(app)
    await init.init_db()
    await init.init_user()


if __name__ == "__main__":
    app = FastAPI(title=config.PROJECT_NAME, version=config.PROJECT_VERSION)
    asyncio.run(init_app())
    uvicorn.run(app, host="0.0.0.0", port=9000, reload=False)

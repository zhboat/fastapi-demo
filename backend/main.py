import uvicorn
from fastapi import FastAPI

from config import config
from core.init.init_server import lifespan, init_router, init_middleware


if __name__ == "__main__":
    app = FastAPI(
        title=config.PROJECT_NAME, version=config.PROJECT_VERSION, lifespan=lifespan
    )
    init_router(app)
    init_middleware(app)

    uvicorn.run(app, host="0.0.0.0", port=9000, reload=False)

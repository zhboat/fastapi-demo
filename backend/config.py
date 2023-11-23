import os
import typing
from pathlib import Path
from pydantic import AnyUrl, BaseSettings


class Configs(BaseSettings):
    PROJECT_NAME: str = "fastdemo"
    PROJECT_VERSION: typing.Union[int, str] = "0.1"
    PROJECT_CONFIG_DIR: Path = f"{os.environ['HOME']}/.{PROJECT_NAME}"
    BASE_URL: AnyUrl = "http://localhost:8000"
    BASE_DIR: str = os.path.dirname(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    )
    PROJECT_ROOT_DIR: str = Path(__file__).parent.as_posix()

    EMAIL: str = "admin@fastapi.com"
    PASSWD: str = "admin"
    API_PREFIX: str = "/api/v1"
    GLOBAL_ENCODING: str = "utf8"
    JWT_SECRET: str = "SECRET"
    JWT_LIFETIME: int = 3600

    CORS_ORIGINS: typing.List[typing.Any] = ["*"]

    # db
    DB_PATH: Path = "/databases/database.db"
    SYSTEM_DB_PATH: Path = PROJECT_CONFIG_DIR + DB_PATH
    PROJECT_DB_PATH: Path = PROJECT_ROOT_DIR + DB_PATH
    DB_URL: str = f"sqlite+aiosqlite:///{SYSTEM_DB_PATH}"

    class Config:
        case_sensitive = True
        env_file = ".env"
        env_file_encoding = "utf-8"


config = Configs()


from fastapi_users import FastAPIUsers

from fastdemo.api.v1.auth.user import User
from fastdemo.api.v1.auth.user_manager import get_user_manager
from fastdemo.api.v1.auth.model import auth_backend

fastapi_users = FastAPIUsers[User, int](
    get_user_manager,
    [auth_backend],
)

current_active_user = fastapi_users.current_user(active=True)
from fastapi import APIRouter

from core.api.v1.auth.login import login

# FEATURES: other routers


app_router = APIRouter()

# Authentication
auth_prefix = "/auth"
tags = ["Auth"]
app_router.include_router(login.router, prefix=auth_prefix, tags=tags)

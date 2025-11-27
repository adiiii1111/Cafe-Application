from fastapi import FastAPI, Request
from starlette.middleware.base import BaseHTTPMiddleware
from typing import List


class AllowedHostMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: FastAPI, allowed_hosts: List[str]):
        super().__init__(app)
        self.allowed_hosts = allowed_hosts

    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        return response
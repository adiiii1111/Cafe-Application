from fastapi import FastAPI
from app.menu.router import menu_router

app = FastAPI()

app.include_router(menu_router)
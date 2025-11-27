# Method	Endpoint	Description
# GET	/menu	Customer sees menu
# POST	/menu	Add item (Admin)
# PUT	/menu/{id}	Update item
# DELETE	/menu/{id}	Remove item

from typing import List
from Backend.app.db.db_connection import get_db
from Backend.app.menu.schema import MenuCreateRequest, MenuResponse, MenuUpdateRequest
from Backend.app.menu.service import MenuService
from Backend.app.utils import current_user_auth
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
menu_router = APIRouter()

@menu_router.post("/menu",response_model=MenuResponse)
async def add_menu_item(
        menu: MenuCreateRequest,
        db: Session = Depends(get_db),
        user_email_org: str = Depends(current_user_auth),
):
    try:
        service = MenuService(db)
        return await service.add_menu(menu,user_email_org)
    except Exception as e:
        raise e
    
@menu_router.get("/menu",response_model=List[MenuResponse])
async def fetch_all_items(
        db: Session = Depends(get_db),
):
    try:
        service = MenuService(db)
        return await service.fetch_all_menu()
    except Exception as e:
        raise e
    
    
@menu_router.put("/menu/{menu_id}", response_model=MenuResponse)
async def update_item(
        menu_id: int,
        request: MenuUpdateRequest,
        db: Session = Depends(get_db),
        user_email_org: str = Depends(current_user_auth)
):
    try:
        service = MenuService(db)
        return await service.update_menu_item(menu_id,request,user_email_org)
    except Exception as e:
        raise e

@menu_router.delete("/menu/{menu_id}",response_model=MenuResponse)
async def delete_item(
        menu_id: int,
        db: Session = Depends(get_db),
        user_email_org: str = Depends(current_user_auth)
):
    try:
        service = MenuService(db)
        return await service.delete_menu_item(menu_id,user_email_org)
    except Exception as e:
        raise e
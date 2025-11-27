from fastapi import HTTPException
from typing import List
from Backend.app.menu.model import MenuItems
from Backend.app.menu.schema import MenuCreateRequest, MenuResponse, MenuUpdateRequest
from Backend.app.tables.model import Table
from Backend.app.utils import get_user
from sqlalchemy.orm import Session
import logging

logger = logging.getLogger(__name__)


class MenuService:
    def __init__(self, db: Session):
        self.db = db

    async def add_menu(self, menu: MenuCreateRequest, user_email_org: str)->MenuResponse:
        try:
            email, _ = user_email_org
            logger.info(f"add_menu Initiated by user: {email}")
            user = get_user(email, self.db)
            
            menu_item = menu.dict()
            if user.user_type.lower() != "admin":
                logger.info("Unauthorized User: {email}")
                raise HTTPException(status_code=403, detail=f"Unauthorized User: {email}")
            
            existing_menu_items = self.db.query(MenuItems).all()
            for item in existing_menu_items:
                if menu_item["name"] == item.name:
                    raise HTTPException(status_code=403, detail=f"Item: {item.name} already exists")
                else:
                    pass        

            new_menu_item = MenuItems(**menu_item)
            self.db.add(new_menu_item)
            self.db.commit()
            self.db.refresh(new_menu_item)
            logger.info(f"[add_menu] Item:{new_menu_item.name} added successfully.")
            return new_menu_item
        except Exception as e:
            self.db.rollback()
            raise e
        

    async def fetch_all_menu(self)->List[MenuResponse]:
        try:
            menu = self.db.query(MenuItems).all()
            return menu
        except Exception as e:
            raise e


    async def update_menu_item(self, menu_id: int, update_request: MenuUpdateRequest,user_email_org: str) -> MenuResponse:
        try:
            email, _ = user_email_org
            logger.info(f"update_menu_item Initiated by user: {email}")
            user = get_user(email, self.db)
            
            if user.user_type.lower() != "admin":
                logger.info(f"Unauthorized User: {email}")
                raise HTTPException(status_code=403, detail=f"Unauthorized User to update_menu_item: {email}")
            menu_item = self.db.query(MenuItems).filter(MenuItems.id == menu_id).first()
            if not menu_item:
                raise HTTPException(status_code=404, detail="Item does not exist")
            if update_request.name:
                menu_item.name = update_request.name
            if update_request.category:
                menu_item.category = update_request.category
            if update_request.price is not None:
                menu_item.price = update_request.price
            if update_request.available is not None:
                menu_item.available = update_request.available
            logger.info("All Item updates starting...")
            self.db.commit()
            self.db.refresh(menu_item)
            logger.info(f"Menu Item: {menu_item.name} updated successfully !!!")
            return menu_item
        except Exception as e:
            self.db.rollback()
            raise e


    async def delete_menu_item(self, menu_id: int,user_email_org: str) -> MenuResponse:
        try:
            email, _ = user_email_org
            logger.info(f"delete_menu_item Initiated by user: {email}")
            user = get_user(email, self.db)
            
            if user.user_type.lower() != "admin":
                logger.info(f"Unauthorized User: {email}")
                raise HTTPException(status_code=403, detail=f"Unauthorized User to delete_menu_item: {email}")
            menu_item = self.db.query(MenuItems).filter(MenuItems.id == menu_id).first()
            if not menu_item:
                raise HTTPException(status_code=404, detail="Item does not exist")

            logger.info("Removing Item from menu...")
            self.db.delete(menu_item)
            self.db.commit()
            logger.info("Item Removed successfully !!!")
            return menu_item
        except Exception as e:
            self.db.rollback()
            raise e

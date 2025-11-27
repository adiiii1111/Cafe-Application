from fastapi import HTTPException
from typing import List
from sqlalchemy.orm import Session
from app.menu.model import MenuItems
from app.menu.schema import MenuCreateRequest, MenuResponse, MenuUpdateRequest
from app.utils import get_user
import logging

logger = logging.getLogger(__name__)


class MenuService:
    def __init__(self, db: Session):
        self.db = db

    # ----------------------------------------------
    # CREATE MENU ITEM
    # ----------------------------------------------
    async def add_menu(self, menu: MenuCreateRequest, user_email_org: str) -> MenuResponse:
        try:
            email, _ = user_email_org
            logger.info(f"[add_menu] Initiated by user: {email}")

            user = get_user(email, self.db)

            if user.user_type.lower() != "admin":
                raise HTTPException(status_code=403, detail=f"Unauthorized User: {email}")

            # Prevent duplicate item names
            existing_item = (
                self.db.query(MenuItems)
                .filter(MenuItems.name.ilike(menu.name))
                .first()
            )
            if existing_item:
                raise HTTPException(status_code=400, detail=f"Item '{menu.name}' already exists")

            new_menu_item = MenuItems(**menu.dict())
            self.db.add(new_menu_item)
            self.db.commit()
            self.db.refresh(new_menu_item)

            logger.info(f"[add_menu] Item '{new_menu_item.name}' added successfully")
            return new_menu_item

        except Exception as e:
            self.db.rollback()
            logger.error(f"[add_menu] Error: {e}")
            raise e

    # ----------------------------------------------
    # GET ALL MENU ITEMS
    # ----------------------------------------------
    async def fetch_all_menu(self) -> List[MenuResponse]:
        try:
            menu_items = self.db.query(MenuItems).all()
            return menu_items
        except Exception as e:
            logger.error(f"[fetch_all_menu] Error: {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch menu items")

    # ----------------------------------------------
    # UPDATE MENU ITEM
    # ----------------------------------------------
    async def update_menu_item(
        self, menu_id: int, update_request: MenuUpdateRequest, user_email_org: str
    ) -> MenuResponse:
        try:
            email, _ = user_email_org
            logger.info(f"[update_menu_item] Initiated by user: {email}")

            user = get_user(email, self.db)

            if user.user_type.lower() != "admin":
                raise HTTPException(status_code=403, detail=f"Unauthorized user: {email}")

            menu_item = self.db.query(MenuItems).filter(MenuItems.id == menu_id).first()
            if not menu_item:
                raise HTTPException(status_code=404, detail="Menu item not found")

            # Apply partial updates
            for field, value in update_request.dict(exclude_unset=True).items():
                setattr(menu_item, field, value)

            self.db.commit()
            self.db.refresh(menu_item)

            logger.info(f"[update_menu_item] Item '{menu_item.name}' updated successfully")
            return menu_item

        except Exception as e:
            self.db.rollback()
            logger.error(f"[update_menu_item] Error: {e}")
            raise e

    # ----------------------------------------------
    # DELETE MENU ITEM
    # ----------------------------------------------
    async def delete_menu_item(self, menu_id: int, user_email_org: str) -> MenuResponse:
        try:
            email, _ = user_email_org
            logger.info(f"[delete_menu_item] Initiated by user: {email}")

            user = get_user(email, self.db)

            if user.user_type.lower() != "admin":
                raise HTTPException(status_code=403, detail=f"Unauthorized user: {email}")

            menu_item = self.db.query(MenuItems).filter(MenuItems.id == menu_id).first()
            if not menu_item:
                raise HTTPException(status_code=404, detail="Menu item not found")

            self.db.delete(menu_item)
            self.db.commit()

            logger.info(f"[delete_menu_item] Item '{menu_item.name}' deleted successfully")
            return menu_item

        except Exception as e:
            self.db.rollback()
            logger.error(f"[delete_menu_item] Error: {e}")
            raise e

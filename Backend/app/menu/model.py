from app.db.base import Base
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime
from datetime import datetime, timezone

def get_utc_now():
    return datetime.now(timezone.utc)


class MenuItems(Base):
    __tablename__ = "menu_items"
    __table_args__ = {"schema": "user_profile"}

    id = Column(Integer, primary_key=True)
    name = Column(String)
    category = Column(String)
    price = Column(Float)
    available = Column(Boolean)
    created_at = Column(DateTime, default=get_utc_now)
    updated_at = Column(DateTime, default= get_utc_now, on_update=get_utc_now)
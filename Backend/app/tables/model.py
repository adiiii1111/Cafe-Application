from app.db.base import Base
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime
from datetime import datetime, timezone

def get_utc_now():
    return datetime.now(timezone.utc)


class Table(Base):
    __tablename__ = "tables"
    __table_args__ = {"schema": "user_profile"}

    id = Column(Integer, primary_key=True)
    table_number = Column(String)
    qr_url = Column(String)
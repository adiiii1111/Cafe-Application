from app.db.base import Base
from sqlalchemy import Column, String, DateTime
from datetime import datetime, timezone
import uuid

def get_utc_now():
    return datetime.now(timezone.utc)


class User(Base):
    __tablename__ = "users"
    __table_args__ = {"schema": "boxarts"}

    id = Column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    email = Column(String, unique=True)
    name = Column(String)
    password = Column(String)
    role = Column(String)
    created_at = Column(DateTime, default=get_utc_now)
    updated_at = Column(
        DateTime,
        default=get_utc_now,
        onupdate=get_utc_now,
    )

    def __init__(
        self,
        email,
        name,
        role,
        password,
    ):
        self.email = email
        self.name = name
        self.role = role
        self.password = password

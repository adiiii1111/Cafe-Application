from app.db.base import Base
from sqlalchemy import Column, String, DateTime
from datetime import datetime, timezone
import uuid

def get_utc_now():
    return datetime.now(timezone.utc)


class User(Base):
    __tablename__ = "users"
    __table_args__ = {"schema": "user_profile"}

    id = Column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    email = Column(String, unique=True)
    first_name = Column(String)
    last_name = Column(String)
    password = Column(String)
    user_type = Column(String)
    created_at = Column(DateTime, default=get_utc_now)
    updated_at = Column(
        DateTime,
        default=get_utc_now,
        onupdate=get_utc_now,
    )

    def __init__(
        self,
        email,
        first_name,
        last_name,
        user_type,
        password,
    ):
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.user_type = user_type
        self.password = password

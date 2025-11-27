from pydantic import BaseModel
from typing import Dict, Any, Optional, List
from datetime import datetime

class MenuResponse(BaseModel):
    id: int
    name: str
    category: str
    price: float
    available:bool
    created_at: datetime
    updated_at: datetime

class MenuCreateRequest(BaseModel):
    name: str
    category: str
    price: float
    available:bool

class MenuUpdateRequest(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    available:Optional[bool] = None
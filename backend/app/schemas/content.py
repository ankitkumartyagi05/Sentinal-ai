from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ContentBase(BaseModel):
    user_id: str
    content_type: str
    data: Optional[str] = None

class ContentCreate(ContentBase):
    pass

class ContentResponse(ContentBase):
    id: int
    is_flagged: bool
    created_at: datetime

    class Config:
        from_attributes = True

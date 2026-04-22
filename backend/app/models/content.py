from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, Float
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import JSONB
from ..db.base import Base

class Content(Base):
    __tablename__ = "contents"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)  # Using String just in case it maps to external auth
    content_type = Column(String, index=True) # text, image
    data = Column(Text, nullable=True) # Text content or Image URL
    is_flagged = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

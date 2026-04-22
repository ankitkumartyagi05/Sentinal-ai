from pydantic import BaseModel
from typing import Dict, Any, Optional

class TextModerationRequest(BaseModel):
    content: str
    user_id: str

class ModerationResponse(BaseModel):
    id: str
    type: str # 'text' | 'image'
    is_flagged: bool
    confidence: float
    categories: Dict[str, float]
    processing_time_ms: int
    content_preview: str
    user_id: str
    timestamp: str

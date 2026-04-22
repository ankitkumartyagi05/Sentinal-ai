from sqlalchemy.orm import Session
from ..models.moderation import ModerationLog
from ..models.content import Content

def log_moderation(db: Session, content_id: int, result: dict):
    log = ModerationLog(
        content_id=content_id,
        confidence=result.get("confidence"),
        categories=result.get("categories"),
        processing_time_ms=result.get("processing_time_ms")
    )
    db.add(log)
    db.commit()
    return log

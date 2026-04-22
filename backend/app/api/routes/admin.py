from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ...api.deps import get_db
from ...models.content import Content
from ...models.moderation import ModerationLog
from typing import List

router = APIRouter()

@router.get("/status")
def admin_status():
    return {"status": "Admin API works"}

@router.get("/logs")
def get_logs(db: Session = Depends(get_db)):
    logs = db.query(Content).order_by(Content.created_at.desc()).limit(100).all()
    return logs

@router.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    total = db.query(Content).count()
    flagged = db.query(Content).filter(Content.is_flagged == True).count()
    return {
        "total_scanned": total,
        "total_flagged": flagged,
        "uptime": "99.99%",
        "active_models": ["Sentinel-BERT", "Vision-VGG"]
    }

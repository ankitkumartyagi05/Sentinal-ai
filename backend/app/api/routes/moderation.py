from fastapi import APIRouter, UploadFile, File, Form, WebSocket, WebSocketDisconnect, Depends
import jwt
from typing import List
import uuid
import base64
from datetime import datetime
from sqlalchemy.orm import Session
from ...schemas.moderation import TextModerationRequest, ModerationResponse
from ...services.ai_service import analyze_text, analyze_image
from ...api.deps import get_current_user, get_db, oauth2_scheme
from ...models.user import User
from ...models.content import Content
from ...services.moderation_service import log_moderation
from ...workers.tasks import process_image_task
from ...core.config import settings

router = APIRouter()

from ...core.websocket import manager

@router.post("/moderate/text", response_model=ModerationResponse)
async def moderate_text(
    request: TextModerationRequest,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    # Try to get user from token, but don't fail if not present (for demo)
    user_id = "0"
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        user_id = payload.get("sub", "0")
    except:
        pass

    result = analyze_text(request.content)
    
    # Save content (use a dummy user_id if not logged in)
    db_content = Content(
        user_id=str(user_id),
        content_type="text",
        data=request.content,
        is_flagged=result["is_flagged"]
    )
    db.add(db_content)
    db.commit()
    db.refresh(db_content)
    
    # Log moderation
    log_moderation(db, db_content.id, result)
    
    response = ModerationResponse(
        id=str(uuid.uuid4()),
        type="text",
        is_flagged=result["is_flagged"],
        confidence=result["confidence"],
        categories=result["categories"],
        processing_time_ms=result["processing_time_ms"],
        content_preview=request.content[:50] + "..." if len(request.content) > 50 else request.content,
        user_id=str(user_id),
        timestamp=datetime.utcnow().isoformat()
    )
    
    await manager.broadcast(response.model_dump())
    return response

@router.post("/moderate/image")
async def moderate_image(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    contents = await file.read()
    
    # Since Celery uses JSON, we don't pass raw bytes easily.
    # We will trigger celery task using base64 encoded string
    b64_img = base64.b64encode(contents).decode('utf-8')
    task = process_image_task.delay(b64_img)
    
    # Save content
    db_content = Content(
        user_id=str(current_user.id),
        content_type="image",
        data=f"Image: {file.filename} (Processing)",
        is_flagged=False
    )
    db.add(db_content)
    db.commit()
    
    return {"message": "Image moderation started in background", "task_id": task.id}

@router.websocket("/ws/dashboard")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

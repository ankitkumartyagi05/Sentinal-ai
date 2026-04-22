from .celery_app import celery_app
from app.ai.text import analyze_text
from app.ai.image import analyze_image

@celery_app.task
def process_text_task(text: str):
    return analyze_text(text)

@celery_app.task
def process_image_task(file_bytes: bytes):
    return analyze_image(file_bytes)

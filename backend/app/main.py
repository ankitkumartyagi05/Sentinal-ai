from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .api.routes.moderation import router as moderation_router
from .api.routes.admin import router as admin_router
from .api.routes.auth import router as auth_router
from .api.routes.upload import router as upload_router
from .db.init_db import init_db

app = FastAPI(
    title="SentinelAI Platform",
    version="1.0.0",
    description="Real-Time Content Moderation API"
)

# Start DB on startup
@app.on_event("startup")
def on_startup():
    init_db()

# Allow CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Since it's a demo, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(moderation_router, prefix="/api/v1")
app.include_router(admin_router, prefix="/api/v1/admin")
app.include_router(auth_router, prefix="/api/v1/auth")
app.include_router(upload_router, prefix="/api/v1/upload")

@app.get("/")
def read_root():
    return {"message": "SentinelAI API is running"}

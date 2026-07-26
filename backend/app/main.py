"""
Main FastAPI Application Entrypoint for KSP-CopSight Backend.
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.core.config import settings
from backend.app.db.session import init_db, SessionLocal
from backend.app.db.seed import seed_database
from backend.app.api.v1.auth import router as auth_router
from backend.app.api.v1.incidents import router as incidents_router
from backend.app.api.v1.ai_ops import router as ai_router
from backend.app.api.v1.analytics import router as analytics_router
from backend.app.api.v1.audit import router as audit_router
from backend.app.api.v1.ws import router as ws_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    init_db()
    db = SessionLocal()
    try:
        seed_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "datasets", "seed_ksp_data.json"))
        seed_database(db, seed_path)
    finally:
        db.close()


@app.get("/")
def root_check():
    return {
        "status": "ONLINE",
        "system": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "documentation": "/docs"
    }


# Include Routers
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(incidents_router, prefix=settings.API_V1_STR)
app.include_router(ai_router, prefix=settings.API_V1_STR)
app.include_router(analytics_router, prefix=settings.API_V1_STR)
app.include_router(audit_router, prefix=settings.API_V1_STR)
app.include_router(ws_router, prefix=settings.API_V1_STR)

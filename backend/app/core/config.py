"""
App Configuration Settings for KSP-CopSight Backend.
"""

import os
from pydantic import BaseModel


class Settings(BaseModel):
    PROJECT_NAME: str = "KSP-CopSight Agentic AI Ops Manager"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    SECRET_KEY: str = os.getenv("SECRET_KEY", "KSP-SECRET-KEY-AI-OPS-2026-PRODUCTION-HASH")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_HOURS: int = 24
    
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./ksp_copsight.db")


settings = Settings()

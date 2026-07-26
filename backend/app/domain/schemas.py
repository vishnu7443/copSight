"""
Pydantic Data Schemas for KSP-CopSight API.
"""

from typing import List, Optional, Any, Dict
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field


# --- Role & Auth Schemas ---
class UserRoleEnum(str):
    CONSTABLE = "CONSTABLE"
    INSPECTOR = "INSPECTOR"
    SUPERINTENDENT = "SUPERINTENDENT"
    ADMIN = "ADMIN"


class TokenSchema(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    username: str
    role: str
    full_name: str
    station_id: Optional[str] = None


class LoginRequest(BaseModel):
    username: str
    password: str


class UserResponse(BaseModel):
    id: str
    username: str
    email: str
    full_name: str
    badge_number: str
    role: str
    station_id: Optional[str] = None

    class Config:
        from_attributes = True


# --- Station Schemas ---
class StationResponse(BaseModel):
    id: str
    station_code: str
    name: str
    district: str
    zone: str
    latitude: float
    longitude: float
    address: str

    class Config:
        from_attributes = True


# --- Incident Schemas ---
class IncidentBase(BaseModel):
    fir_number: str
    station_id: str
    incident_date: str
    filed_date: str
    ipc_sections: List[str]
    category: str
    status: str
    location_name: str
    latitude: float
    longitude: float
    complainant_name: str
    accused_name: str
    investigating_officer: str
    raw_fir_text: str


class IncidentCreate(IncidentBase):
    pass


class IncidentResponse(IncidentBase):
    id: str

    class Config:
        from_attributes = True


# --- Audit Schemas ---
class AuditLogCreate(BaseModel):
    user_id: Optional[str] = None
    username: str
    user_role: str
    action: str
    resource_target: str
    details: Optional[Dict[str, Any]] = None
    ip_address: str = "127.0.0.1"


class AuditLogResponse(AuditLogCreate):
    id: str
    timestamp: datetime

    class Config:
        from_attributes = True


# --- AI Router Schemas ---
class AIQueryRequest(BaseModel):
    prompt: str
    station_id: Optional[str] = None


class AISummarizeRequest(BaseModel):
    fir_id: str

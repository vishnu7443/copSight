"""
SQLAlchemy Database Models for KSP-CopSight.
"""

import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, DateTime, Text, JSON, ForeignKey
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()


def generate_uuid() -> str:
    return str(uuid.uuid4())


class StationModel(Base):
    __tablename__ = "police_stations"

    id = Column(String, primary_key=True, default=generate_uuid)
    station_code = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    district = Column(String, nullable=False)
    zone = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    address = Column(Text, nullable=False)

    users = relationship("UserModel", back_populates="station")
    incidents = relationship("IncidentModel", back_populates="station")


class UserModel(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=generate_uuid)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    badge_number = Column(String, unique=True, nullable=False)
    role = Column(String, nullable=False)  # CONSTABLE, INSPECTOR, SUPERINTENDENT, ADMIN
    station_id = Column(String, ForeignKey("police_stations.id"), nullable=True)

    station = relationship("StationModel", back_populates="users")


class IncidentModel(Base):
    __tablename__ = "incidents"

    id = Column(String, primary_key=True, default=generate_uuid)
    fir_number = Column(String, unique=True, index=True, nullable=False)
    station_id = Column(String, ForeignKey("police_stations.id"), nullable=False)
    incident_date = Column(String, nullable=False)
    filed_date = Column(String, nullable=False)
    ipc_sections = Column(JSON, nullable=False)  # List[str]
    category = Column(String, index=True, nullable=False)
    status = Column(String, index=True, nullable=False)
    location_name = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    complainant_name = Column(String, nullable=False)
    accused_name = Column(String, nullable=False)
    investigating_officer = Column(String, nullable=False)
    raw_fir_text = Column(Text, nullable=False)

    station = relationship("StationModel", back_populates="incidents")


class AuditLogModel(Base):
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, nullable=True)
    username = Column(String, nullable=False)
    user_role = Column(String, nullable=False)
    action = Column(String, index=True, nullable=False)
    resource_target = Column(String, nullable=False)
    details = Column(JSON, nullable=True)
    ip_address = Column(String, nullable=False, default="127.0.0.1")
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False)

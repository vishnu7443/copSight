"""
Database Seeder for Karnataka State Police Demo Dataset.
"""

import json
import os
from sqlalchemy.orm import Session
from backend.app.db.models import StationModel, UserModel, IncidentModel, AuditLogModel
from backend.app.core.security import get_password_hash


def seed_database(db: Session, seed_file_path: str):
    """
    Populates database with seed_ksp_data.json if tables are empty.
    """
    if db.query(StationModel).first():
        print("Database already contains data. Skipping seed.")
        return

    if not os.path.exists(seed_file_path):
        print(f"Seed file not found at {seed_file_path}")
        return

    with open(seed_file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    # 1. Seed Stations
    for stn in data.get("police_stations", []):
        station = StationModel(
            id=stn["id"],
            station_code=stn["station_code"],
            name=stn["name"],
            district=stn["district"],
            zone=stn["zone"],
            latitude=stn["latitude"],
            longitude=stn["longitude"],
            address=stn["address"]
        )
        db.add(station)
    db.commit()

    # 2. Seed Users
    for usr in data.get("users", []):
        user = UserModel(
            id=usr["id"],
            username=usr["username"],
            email=usr["email"],
            password_hash=get_password_hash(usr["password"]),
            full_name=usr["full_name"],
            badge_number=usr["badge_number"],
            role=usr["role"],
            station_id=usr.get("station_id")
        )
        db.add(user)
    db.commit()

    # 3. Seed Incidents
    for inc in data.get("incidents", []):
        incident = IncidentModel(
            id=inc["id"],
            fir_number=inc["fir_number"],
            station_id=inc["station_id"],
            incident_date=inc["incident_date"],
            filed_date=inc["filed_date"],
            ipc_sections=inc["ipc_sections"],
            category=inc["category"],
            status=inc["status"],
            location_name=inc["location_name"],
            latitude=inc["latitude"],
            longitude=inc["longitude"],
            complainant_name=inc["complainant_name"],
            accused_name=inc["accused_name"],
            investigating_officer=inc["investigating_officer"],
            raw_fir_text=inc["raw_fir_text"]
        )
        db.add(incident)
    db.commit()

    # 4. Seed initial Audit Log
    initial_audit = AuditLogModel(
        username="SYSTEM_INIT",
        user_role="ADMIN",
        action="DATABASE_SEED",
        resource_target="KSP-CopSight Database",
        details={"status": "SUCCESS", "stations_seeded": len(data.get("police_stations", [])), "incidents_seeded": len(data.get("incidents", []))},
        ip_address="127.0.0.1"
    )
    db.add(initial_audit)
    db.commit()

    print("Successfully seeded KSP-CopSight Database!")

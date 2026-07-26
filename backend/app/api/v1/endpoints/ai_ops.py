"""
AI Ops API Endpoints for KSP-CopSight.
Handles natural language agent queries, FIR summarization, briefings, provenance tracing, and case similarity scoring.
"""

from typing import Dict, Any, List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.security import get_current_user
from app.db.models import User, Incident, AuditLog
from ai.gateway import AIGateway
from pydantic import BaseModel

router = APIRouter()
ai_gateway = AIGateway()


class AgentQueryRequest(BaseModel):
    prompt: str
    station_id: Optional[str] = None


@router.post("/query")
def execute_agent_query(
    req: AgentQueryRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Dict[str, Any]:
    """
    Executes top-level AI Orchestrator + Multi-Agent Pipeline.
    """
    incidents = db.query(Incident).all()
    inc_dicts = [
        {
            "id": i.id,
            "fir_number": i.fir_number,
            "station_id": i.station_id,
            "incident_date": i.incident_date.isoformat(),
            "filed_date": i.filed_date.isoformat(),
            "ipc_sections": i.ipc_sections,
            "category": i.category.value if hasattr(i.category, "value") else str(i.category),
            "status": i.status.value if hasattr(i.status, "value") else str(i.status),
            "location_name": i.location_name,
            "latitude": i.latitude,
            "longitude": i.longitude,
            "complainant_name": i.complainant_name,
            "accused_name": i.accused_name,
            "investigating_officer": i.investigating_officer,
            "raw_fir_text": i.raw_fir_text
        }
        for i in incidents
    ]

    result = ai_gateway.process_natural_query(
        prompt=req.prompt,
        user_role=current_user.role.value if hasattr(current_user.role, "value") else str(current_user.role),
        all_incidents=inc_dicts,
        station_id=req.station_id
    )

    # Log audit entry
    audit = AuditLog(
        user_id=current_user.id,
        user_role=current_user.role.value if hasattr(current_user.role, "value") else str(current_user.role),
        action="AI_ORCHESTRATED_QUERY",
        target_resource="ai/query",
        ip_address="127.0.0.1",
        details_json=f"Prompt: {req.prompt[:80]}... | Confidence: {result.get('confidence_score')}"
    )
    db.add(audit)
    db.commit()

    return result


@router.get("/similarity/{incident_id}")
def get_case_similarity(
    incident_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Dict[str, Any]:
    """
    Computes pairwise case similarity match scores for a given FIR incident.
    """
    target = db.query(Incident).filter(Incident.id == incident_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="FIR Incident not found")

    all_incidents = db.query(Incident).all()
    inc_dicts = [
        {
            "id": i.id,
            "fir_number": i.fir_number,
            "station_id": i.station_id,
            "incident_date": i.incident_date.isoformat(),
            "ipc_sections": i.ipc_sections,
            "category": i.category.value if hasattr(i.category, "value") else str(i.category),
            "status": i.status.value if hasattr(i.status, "value") else str(i.status),
            "location_name": i.location_name,
            "latitude": i.latitude,
            "longitude": i.longitude,
            "complainant_name": i.complainant_name,
            "accused_name": i.accused_name,
            "investigating_officer": i.investigating_officer,
            "raw_fir_text": i.raw_fir_text
        }
        for i in all_incidents
    ]

    target_dict = [d for d in inc_dicts if d["id"] == incident_id][0]
    similar_cases = ai_gateway.similarity_agent.find_similar_cases(target_dict, inc_dicts)

    return {
        "target_fir_number": target.fir_number,
        "similar_cases": similar_cases
    }


@router.get("/briefing")
def get_daily_briefing(
    station_id: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Dict[str, Any]:
    """
    Generates official police daily operational briefing.
    """
    incidents = db.query(Incident).all()
    inc_dicts = [
        {
            "id": i.id,
            "fir_number": i.fir_number,
            "station_id": i.station_id,
            "incident_date": i.incident_date.isoformat(),
            "category": i.category.value if hasattr(i.category, "value") else str(i.category),
            "status": i.status.value if hasattr(i.status, "value") else str(i.status),
            "location_name": i.location_name,
            "investigating_officer": i.investigating_officer
        }
        for i in incidents
    ]

    report = ai_gateway.report_agent.generate_daily_briefing(inc_dicts, station_id)
    return {
        "report": report.dict(),
        "generated_by": current_user.full_name,
        "role": current_user.role.value if hasattr(current_user.role, "value") else str(current_user.role)
    }

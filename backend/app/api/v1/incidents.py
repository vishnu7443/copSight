"""
Incident & FIR Management Endpoints with Real-Time WebSocket Broadcasting.
"""

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.db.models import IncidentModel, UserModel
from backend.app.domain.schemas import IncidentResponse, IncidentCreate
from backend.app.core.security import get_current_user, RoleChecker
from backend.app.core.audit_middleware import record_audit_log
from backend.app.api.v1.ws import ws_manager

router = APIRouter(prefix="/incidents", tags=["Incidents & FIRs"])


@router.get("", response_model=List[IncidentResponse])
def list_incidents(
    category: Optional[str] = Query(None, description="Filter by crime category"),
    station_id: Optional[str] = Query(None, description="Filter by police station ID"),
    search: Optional[str] = Query(None, description="Text search keyword"),
    status: Optional[str] = Query(None, description="Incident status filter"),
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    """
    List incidents with filtering, search, and station RBAC context.
    """
    query = db.query(IncidentModel)

    # Station scoping for Constable / Inspector role if restricted
    if current_user.role in ["CONSTABLE", "INSPECTOR"] and current_user.station_id:
        query = query.filter(IncidentModel.station_id == current_user.station_id)
    elif station_id:
        query = query.filter(IncidentModel.station_id == station_id)

    if category and category != "ALL":
        query = query.filter(IncidentModel.category == category)
    if status:
        query = query.filter(IncidentModel.status == status)

    if search:
        search_kw = f"%{search.lower()}%"
        query = query.filter(
            (IncidentModel.location_name.ilike(search_kw)) |
            (IncidentModel.raw_fir_text.ilike(search_kw)) |
            (IncidentModel.fir_number.ilike(search_kw))
        )

    results = query.order_by(IncidentModel.filed_date.desc()).all()

    record_audit_log(
        db=db,
        username=current_user.username,
        user_role=current_user.role,
        action="SEARCH_INCIDENTS",
        resource_target="Incidents Table",
        details={"results_count": len(results), "category": category, "search_kw": search},
        user_id=current_user.id
    )

    return results


@router.get("/{incident_id}", response_model=IncidentResponse)
def get_incident(
    incident_id: str,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    """Fetch single FIR incident detail."""
    incident = db.query(IncidentModel).filter(IncidentModel.id == incident_id).first()
    if not incident:
        raise HTTPException(status_code=404, detail="FIR incident record not found")

    record_audit_log(
        db=db,
        username=current_user.username,
        user_role=current_user.role,
        action="VIEW_FIR_DETAIL",
        resource_target=f"FIR {incident.fir_number}",
        details={"incident_id": incident_id},
        user_id=current_user.id
    )

    return incident


@router.post("", response_model=IncidentResponse, status_code=status.HTTP_201_CREATED)
async def create_incident(
    payload: IncidentCreate,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(RoleChecker(["INSPECTOR", "SUPERINTENDENT", "ADMIN"]))
):
    """File a new FIR incident and broadcast real-time event to all clients."""
    new_inc = IncidentModel(**payload.dict())
    db.add(new_inc)
    db.commit()
    db.refresh(new_inc)

    record_audit_log(
        db=db,
        username=current_user.username,
        user_role=current_user.role,
        action="CREATE_FIR",
        resource_target=f"FIR {new_inc.fir_number}",
        details={"fir_number": new_inc.fir_number, "category": new_inc.category},
        user_id=current_user.id
    )

    # Real-Time Broadcast Event
    await ws_manager.broadcast({
        "event": "INCIDENT_CREATED",
        "data": {
            "id": new_inc.id,
            "fir_number": new_inc.fir_number,
            "category": new_inc.category,
            "location_name": new_inc.location_name,
            "latitude": new_inc.latitude,
            "longitude": new_inc.longitude,
            "status": new_inc.status,
            "filed_date": new_inc.filed_date,
            "investigating_officer": new_inc.investigating_officer,
            "raw_fir_text": new_inc.raw_fir_text,
            "complainant_name": new_inc.complainant_name,
            "accused_name": new_inc.accused_name,
            "ipc_sections": new_inc.ipc_sections,
            "station_id": new_inc.station_id
        }
    })

    return new_inc

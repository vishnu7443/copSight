"""
Audit Trail & Compliance Endpoints.
"""

from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.db.models import AuditLogModel
from backend.app.domain.schemas import AuditLogResponse
from backend.app.core.security import RoleChecker, get_current_user

router = APIRouter(prefix="/audit", tags=["Audit & Compliance"])


@router.get("/logs", response_model=List[AuditLogResponse])
def get_audit_logs(
    action: Optional[str] = Query(None, description="Filter by action type"),
    user_role: Optional[str] = Query(None, description="Filter by user role"),
    limit: int = Query(50, ge=1, le=500),
    db: Session = Depends(get_db),
    current_user = Depends(RoleChecker(["SUPERINTENDENT", "ADMIN"]))
):
    """
    Retrieve audit trail records (Restricted to Superintendents and Admins).
    """
    query = db.query(AuditLogModel)
    if action:
        query = query.filter(AuditLogModel.action == action)
    if user_role:
        query = query.filter(AuditLogModel.user_role == user_role)

    return query.order_by(AuditLogModel.timestamp.desc()).limit(limit).all()

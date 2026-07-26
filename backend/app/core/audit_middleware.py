"""
Audit Middleware & Logger Utility.
Records every protected API request into the audit_logs table.
"""

from typing import Optional, Dict, Any
from sqlalchemy.orm import Session
from backend.app.db.models import AuditLogModel


def record_audit_log(
    db: Session,
    username: str,
    user_role: str,
    action: str,
    resource_target: str,
    details: Optional[Dict[str, Any]] = None,
    ip_address: str = "127.0.0.1",
    user_id: Optional[str] = None
) -> AuditLogModel:
    """
    Immutably records an audit event to the database.
    """
    audit_entry = AuditLogModel(
        user_id=user_id,
        username=username,
        user_role=user_role,
        action=action,
        resource_target=resource_target,
        details=details or {},
        ip_address=ip_address
    )
    db.add(audit_entry)
    db.commit()
    db.refresh(audit_entry)
    return audit_entry

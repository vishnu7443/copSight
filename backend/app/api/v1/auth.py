"""
Authentication Endpoints.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.db.models import UserModel
from backend.app.domain.schemas import LoginRequest, TokenSchema, UserResponse
from backend.app.core.security import verify_password, create_access_token, get_current_user
from backend.app.core.audit_middleware import record_audit_log

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login", response_model=TokenSchema)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    """Authenticate officer and return JWT access token."""
    user = db.query(UserModel).filter(UserModel.username == request.username).first()
    if not user or not verify_password(request.password, user.password_hash):
        record_audit_log(
            db=db,
            username=request.username,
            user_role="UNKNOWN",
            action="LOGIN_FAILED",
            resource_target="Auth System",
            details={"status": "INVALID_CREDENTIALS"}
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": user.username, "role": user.role, "user_id": user.id})

    record_audit_log(
        db=db,
        username=user.username,
        user_role=user.role,
        action="LOGIN_SUCCESS",
        resource_target="Auth System",
        details={"badge_number": user.badge_number, "station_id": user.station_id},
        user_id=user.id
    )

    return TokenSchema(
        access_token=access_token,
        token_type="bearer",
        user_id=user.id,
        username=user.username,
        role=user.role,
        full_name=user.full_name,
        station_id=user.station_id
    )


@router.get("/me", response_model=UserResponse)
def get_current_user_profile(current_user: UserModel = Depends(get_current_user)):
    """Fetch current authenticated officer profile."""
    return current_user

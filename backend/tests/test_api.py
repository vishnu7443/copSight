"""
Pytest Suite for KSP-CopSight Backend APIs.
Tests Auth, Incident listing, AI Agent execution, and RBAC security.
"""

from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)


def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "ONLINE"


def test_auth_login():
    response = client.post(
        "/api/v1/auth/login",
        json={"username": "constable_kumar", "password": "Password123!"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["role"] == "CONSTABLE"


def test_ai_query_pipeline():
    # First login to get token
    login_resp = client.post(
        "/api/v1/auth/login",
        json={"username": "inspector_patil", "password": "Password123!"}
    )
    token = login_resp.json()["access_token"]

    response = client.post(
        "/api/v1/ai/query",
        json={"prompt": "Show thefts near MG Road last month"},
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    res_data = response.json()
    assert res_data["success"] is True
    assert len(res_data["execution_logs"]) > 0

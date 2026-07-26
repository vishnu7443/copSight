# System Architecture Specification

## Architectural Strategy: Clean Architecture

KSP-CopSight follows Clean Architecture principles, ensuring strict separation of concerns, framework independence, testability, and maintainability.

```
                          ┌───────────────────────────┐
                          │   Frontend (React + TS)   │
                          └─────────────┬─────────────┘
                                        │ REST / JSON (JWT Auth)
                          ┌─────────────▼─────────────┐
                          │   API Layer (FastAPI)     │
                          └─────────────┬─────────────┘
                                        │
             ┌──────────────────────────┼──────────────────────────┐
             │                          │                          │
  ┌──────────▼──────────┐    ┌──────────▼──────────┐    ┌──────────▼──────────┐
  │   Use Cases &       │    │   AI Agentic Ops    │    │  Audit & Security   │
  │   Domain Services   │    │      Engine         │    │     Middleware      │
  └──────────┬──────────┘    └──────────┬──────────┘    └──────────┬──────────┘
             │                          │                          │
             └──────────────────────────┼──────────────────────────┘
                                        │
                          ┌─────────────▼─────────────┐
                          │  Data Access / Repository │
                          │ (SQLAlchemy + Spatial DB) │
                          └───────────────────────────┘
```

---

## Backend Component Architecture

1. **Domain Layer (`backend/app/domain`)**:
   - Entities: User, Role, Station, Incident/FIR, AuditLog, AgentLog.
   - Enums: RoleEnum (`CONSTABLE`, `INSPECTOR`, `SP`, `ADMIN`), CrimeCategory, IncidentStatus.

2. **Use Case Layer (`backend/app/use_cases`)**:
   - Authentication & Token management (JWT).
   - Incident Search & Filtering.
   - FIR Summarization & Structuring.
   - Spatial Hotspot Analysis.
   - Audit Trail recording.

3. **AI Gateway & Agent Engine (`ai/` & `backend/app/ai`)**:
   - Modular Agent Pipeline: Safety -> Search -> Summary -> Validation -> Report.
   - Prompt templates with strict JSON schema outputs.
   - Grounding validation & confidence evaluation algorithm.

4. **Infrastructure Layer (`backend/app/infra`)**:
   - Database connection & Session management (PostgreSQL / PostGIS / SQLite SpatiaLite).
   - Password hashing (bcrypt) & Security utilities.
   - PDF generation engine (ReportLab / Jinja).

5. **API Layer (`backend/app/api`)**:
   - Routers: `/api/v1/auth`, `/api/v1/incidents`, `/api/v1/ai`, `/api/v1/analytics`, `/api/v1/audit`.
   - Middleware: RBAC Enforcement, Rate Limiting, Audit Logging.

---

## Frontend Architecture (`frontend/src`)

- **State Management**: React Context / Hooks for Auth & Global state.
- **Component Design System**:
  - `components/common/`: Glassmorphic UI components (Button, Modal, Card, Badge, Input, Table, Skeleton, Navbar, Sidebar).
  - `components/gis/`: Leaflet Crime Map, Spatial Markers, Cluster Layer, Heatmap Overlay.
  - `components/ai/`: Agent Chat/Query Console, Agent Thinking Process Inspector, FIR Drawer.
  - `components/analytics/`: Recharts-based KPI graphs, station comparison charts.
  - `components/audit/`: Audit Log Table & Filtering.
- **API Client**: Axios/Fetch instance with automatic JWT Bearer token injection and error interceptors.
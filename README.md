# KSP-CopSight: Production-Grade Agentic AI Ops Manager

**KSP-CopSight** is an AI-powered Agentic Intelligence & Operations Manager custom-engineered for Karnataka State Police (KSP). It empowers officers, inspectors, and district superintendents with natural language crime database querying, automatic FIR document summarization, spatial GIS hotspot analysis, and multi-agent decision support—backed by strict audit trails and role-based access control (RBAC).

---

## 🏛️ System Architecture Overview

```
KSP-CopSight/
├── docs/                     # Full Architecture, PRD, API, DB & Agent Specs
├── backend/                  # Python FastAPI Backend (Clean Architecture)
│   │   ├── api/              # Auth, Incidents, AI Ops, Analytics, Audit Routers
│   │   ├── core/             # JWT Auth, Bcrypt Passwords, Audit Middleware
│   │   ├── db/               # SQLAlchemy Models, Session & Seeders
│   │   ├── domain/           # Data Schemas & Enums
│   │   └── main.py           # FastAPI Application Entry
│   ├── tests/                # Pytest Verification Suite
│   └── run.py                # Server Runner
├── ai/                       # Multi-Agent AI Engine Pipeline
│   ├── agents/               # Safety, Search, Summary, Validation, Trend, Report Agents
│   ├── gateway.py            # AI Gateway Orchestrator
│   └── prompts.py            # Guardrailed System Prompts & Pydantic Schemas
├── frontend/                 # 21st-Century React + TS + Vite + Tailwind + Leaflet Map
│   ├── src/
│   │   ├── components/       # GIS Map, AI Console, Summary Drawer, Charts, Tables
│   │   ├── pages/            # Dashboard, Incidents, AIMap, Analytics, Audit, Login
│   │   └── services/         # API Client with JWT Interceptors
├── datasets/                 # Seed JSON (Bengaluru & Mysuru KSP Stations & FIRs)
└── infra/                    # Docker Compose Infrastructure Config
```

---

## 🤖 Multi-Agent Pipeline Workflow

```
User Prompt -> Safety Agent (Guardrails) -> Search Agent (SQL Translation) -> Summary Agent (Entity Extraction) -> Validation Agent (Grounding Confidence) -> Trend Agent -> Audit Logger
```

1. **Safety Agent**: Checks for illegal prompts, extrajudicial instructions, or RBAC violations.
2. **Search Agent**: Translates natural language into spatial SQL filters.
3. **Summary Agent**: Extracts timeline, accused details, weapons, vehicles, and Modus Operandi from raw FIR text.
4. **Validation Agent**: Evaluates factual grounding against source text and assigns a verifiable confidence score (e.g. 96%).
5. **Trend Agent**: Calculates crime surge shift metrics and generates tactical patrol recommendations.
6. **Report Agent**: Generates official police daily briefings and executive summaries.

---

## 🔑 Demo Login Credentials

| Role | Username | Password | Access Scope |
|---|---|---|---|
| **Constable** | `constable_kumar` | `Password123!` | Station FIRs, AI Search & Summary |
| **Inspector** | `inspector_patil` | `Password123!` | FIR Creation, Station Management, AI Tools |
| **Superintendent** | `sp_gowda` | `Password123!` | Statewide Analytics, Daily Briefings, Audit Logs |
| **System Admin** | `admin_sys` | `Password123!` | Full System Scope & Immutable Audit Trail |

---

## 🚀 Quick Start Instructions

### 1. Run Backend Server
```bash
cd backend
pip install -r requirements.txt
python run.py
```
*The backend automatically initializes the database and seeds Karnataka Police stations and FIRs upon startup at `http://127.0.0.1:8000`.*
*Interactive API Swagger Documentation available at `http://127.0.0.1:8000/docs`.*

### 2. Run Frontend Application
```bash
cd frontend
npm install
npm run dev
```
*Access the 21st-century command center UI at `http://localhost:3000`.*

### 3. Run Backend Test Suite
```bash
cd backend
pytest tests/test_api.py
```

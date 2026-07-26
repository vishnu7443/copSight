# KSP-CopSight: Full System Implementation Summary

**KSP-CopSight** is a production-grade Agentic Intelligence & Operations Manager custom-engineered for Karnataka State Police (KSP). It empowers officers, inspectors, and district superintendents with natural language crime database querying, automatic FIR document summarization, spatial GIS crime hotspot mapping, daily briefing generation, role-based access control (RBAC), and immutable audit logging.

---

## 🏛️ 1. Architecture & Technology Stack

- **Backend**: Python 3.12 + FastAPI (Clean Architecture: `domain` -> `use_cases` -> `infra` -> `api`).
- **Database**: Relational SQLite / PostGIS with automatic seed dataset loading.
- **Real-Time Sync Engine**: WebSockets (`ws://127.0.0.1:8000/api/v1/ws/live-feed`) for instant client synchronization upon FIR creation or case updates.
- **Frontend**: React + TypeScript + Vite + Tailwind CSS + Leaflet GIS + Recharts.
- **Typography**: Google Fonts **Poppins** (Headings & Banners) + **Roboto** (Body text & Tables).
- **Design System**: Dual-Panel Modern Glassmorphic Command Aesthetic with 10/10 UX responsiveness.

---

## 🤖 2. Multi-Agent AI Engine Pipeline

KSP-CopSight replaces black-box chatbots with an explainable, audit-logged multi-agent pipeline:

```
User Prompt -> Safety Agent -> Search Agent -> Summary Agent -> Validation Agent -> Trend Agent -> Audit Logger
```

1. **Safety Agent (`ai/agents/safety_agent.py`)**:
   - Enforces legal guardrails, blocks illegal or extrajudicial directives, and checks RBAC access scope.
2. **Search Agent (`ai/agents/search_agent.py`)**:
   - Translates natural language queries (e.g. *"Show thefts near MG Road last month"*) into structured database parameters and explainable SQL representation.
3. **Summary Agent (`ai/agents/summary_agent.py`)**:
   - Extracts executive summaries, timelines, accused details, victim statements, weapons, vehicles, and Modus Operandi (MO) from raw FIR narratives.
4. **Validation & Grounding Agent (`ai/agents/validation_agent.py`)**:
   - Verifies extracted entities against raw text to compute a factual grounding confidence score (0.00 to 1.00) and flag low-confidence extractions.
5. **Trend Agent (`ai/agents/trend_agent.py`)**:
   - Analyzes crime frequencies across stations to detect statistical surge rates, category dominances, and tactical patrol recommendations.
6. **Report Agent (`ai/agents/report_agent.py`)**:
   - Generates official police daily operational briefings and executive district summaries.

---

## 🎨 3. UI/UX & Redesigned Dual-Panel Experience

### A. Dual-Panel Login & RBAC Showcase (`LoginPage.tsx`)
- **Left Panel**: Clean, modern white card layout with floating input fields, eye password toggle, bold Poppins *"Welcome Back!"* header, and dark primary button.
- **One-Click RBAC Profile Switcher**:
  - 👮 **Constable Kumar** (`PC-4892`) - Station Scope
  - 🕵️ **Inspector Patil** (`PI-1042`) - Station & Division Scope + FIR Filing
  - 🎖️ **SP Ananya Gowda, IPS** (`IPS-088`) - District / Statewide Scope + Audit Trail Access
  - ⚡ **System Admin** (`SYS-001`) - Global Admin Scope
- **Right Panel**: Deep dark charcoal card (`#0b0f19`) featuring a glowing neon hexagon frame around a 3D Shield emblem, *"Command Intelligence Anywhere"* title, subtitle, and carousel dots.

### B. Navigation & Ticker Bar (`Navbar.tsx` & `HeaderTicker.tsx`)
- **Header Ticker**: Live real-time radar ticker showing WebSocket connection status, station alert pings, and live FIR dispatch updates.
- **Pitch Modal Button**: *"How CopSight Works"* button in top header.

### C. Pitch & Analogy Modal (`PitchModal.tsx`)
Includes 3 core analogies to pitch to judges:
1. 📚 **The Smart Librarian**: Searches scattered FIR books, links vehicle & station records, highlights key details, displays everything on a map. *(Never accuses; acts as a research assistant)*.
2. 🗺️ **Google Maps Analogy**: Never drives your car—gives routes, traffic, and arrival times. The officer decides which route to take.
3. 💻 **GitHub Copilot Analogy**: Suggests relevant FIRs, similar cases, crime summaries, and trend analysis with complete audit explainability.

---

## 📊 4. Module & Page Breakdown

### 1. Executive Command Center (`DashboardPage.tsx`)
- High-Alert Station Dispatch Radar Ticker.
- Real-time KPI Cards (Total Filed FIRs, Active Investigations, Crime Surge Rate, Monitored Stations).
- Interactive Canvas-rendered Leaflet GIS Crime Map.
- Live FIR Dispatch Stream with slide-over FIR summary drawer.

### 2. AI Agent Ops Console (`AIAgentConsolePage.tsx`)
- Dedicated multi-pane AI Intelligence & Reasoning Laboratory.
- Natural Language query bar with sample prompt chips.
- Step-by-step reasoning inspector displaying telemetry logs for each agent.
- Confidence gauge meter and structured entity tag pill display.

### 3. Case Files & Interactive FIR Database (`IncidentsPage.tsx`)
- Advanced tabular FIR search and multi-parametric filter bar (Category, Location, Text).
- **"+ File New FIR Record"** Modal with live GPS location input, off-category selection, BNS section auto-suggestions, and real-time WebSocket broadcast to all online client sessions.

### 4. Dynamic Crime Analytics (`AnalyticsPage.tsx`)
- Dynamic Station Scope selector (Statewide vs 10 individual stations).
- Time Range selector (Last 7 Days, Last 30 Days, Last 90 Days, Year to Date).
- Dynamic Ratio Donut Chart, Station Workload Bar Chart, and Monthly Surge Area Chart.
- Web Speech API Voice Narration Player in Daily Briefing modal (**"Listen to Voice Briefing"**).

### 5. Immutable Audit Trail Portal (`AuditPage.tsx`)
- Strict RBAC restriction (Superintendents and Admins only).
- Complete log recording of user logins, AI queries, FIR views, and report exports with IP address and timestamp.
- One-click CSV log exporter.

---

## 📂 5. File Structure Reference

```
KSP-CopSight/
├── docs/                     # PRD, Architecture, API, DB, Agents, Tasks & Summary Docs
├── backend/                  # Python FastAPI Clean Architecture Backend
│   ├── app/
│   │   ├── api/v1/           # Auth, Incidents, AI Ops, Analytics, Audit & WS Routers
│   │   ├── core/             # Security (JWT/bcrypt), Config, Audit Middleware
│   │   ├── db/               # SQLAlchemy Models, Session & Seeders
│   │   ├── domain/           # Schemas & Enums
│   │   └── main.py           # FastAPI Entry Point
│   ├── tests/                # Pytest Test Suite
│   └── run.py                # Server Runner
├── ai/                       # Multi-Agent AI Engine Pipeline
│   ├── agents/               # Safety, Search, Summary, Validation, Trend, Report Agents
│   ├── gateway.py            # AI Gateway Orchestrator
│   └── prompts.py            # System Prompts & Pydantic Schemas
├── frontend/                 # 10/10 Modern React + TS + Vite + Tailwind UI
│   ├── src/
│   │   ├── components/       # Common, GIS Map, AI Console, Briefing, Audit, Incidents
│   │   ├── context/          # Auth & WebSocket Providers
│   │   ├── pages/            # Dashboard, AIAgentConsole, Incidents, AIMap, Analytics, Audit, Login
│   │   └── services/         # Axios API Client
├── datasets/                 # Karnataka State Police Seed JSON (10 Stations, 10 FIRs)
└── infra/                    # Docker Compose Config
```

---

## 🚀 6. How to Run

1. **Start Backend**:
   ```bash
   uv run -p .venv python backend/run.py
   ```
2. **Start Frontend**:
   ```bash
   cd frontend
   npx vite
   ```
3. **Access URLs**:
   - **Frontend App**: `http://localhost:3000/` (or `http://localhost:3004/`)
   - **Backend API**: `http://127.0.0.1:8000/`
   - **Swagger Docs**: `http://127.0.0.1:8000/docs`

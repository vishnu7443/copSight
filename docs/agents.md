# AI Agent Architecture & Pipeline

## Agent Overview
Instead of a monolithic LLM chatbot, **KSP-CopSight** uses a modular pipeline of deterministic, specialized agents. Each agent has a clear responsibility, explicit input/output schemas, visible audit logging, and confidence metrics.

```
                    ┌────────────────────────┐
                    │       AI Gateway       │
                    └───────────┬────────────┘
                                │
   ┌───────────────┬────────────┴───┬────────────────┬─────────────────┐
   │               │                │                │                 │
┌──┴─────────┐ ┌───┴──────────┐ ┌───┴──────────┐ ┌───┴──────────┐ ┌─────┴────────────┐
│   Search   │ │   Summary    │ │    Trend     │ │    Report    │ │   Validation &    │
│   Agent    │ │    Agent     │ │    Agent     │ │    Agent     │ │   Safety Agent    │
└────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ └───────────────────┘
```

---

## Agent Definitions

### 1. AI Gateway
- **Responsibility**: Route incoming user requests, enforce authentication/RBAC, record prompt telemetry, and trigger the agent workflow pipeline.
- **Input**: Natural language prompt, user token (role: Constable, Inspector, SP, Admin).
- **Output**: Unified agent response payload with execution logs, confidence scores, and safety status.

### 2. Search Agent
- **Responsibility**: Convert natural language queries (e.g., *"Show thefts near MG Road last month"*) into structured SQL / Spatial PostGIS queries, execute them safely, and return formatted incident lists with geographic coordinates.
- **Input**: Query string, temporal parameters, spatial bounds.
- **Output**: JSON incident records, SQL execution log, match metadata.

### 3. Summary Agent
- **Responsibility**: Analyze raw FIR text documents and extract key structured intelligence.
- **Output**:
  - Abstractive summary
  - Incident timeline
  - Entities (accused, victims, witnesses)
  - Weapons & vehicles involved
  - Modus Operandi (MO) classification

### 4. Trend Agent
- **Responsibility**: Analyze historical crime data across police stations/districts over time windows.
- **Output**:
  - Hotspot cluster detections
  - Crime surge alerts (%)
  - Temporal patterns (time of day, day of week)
  - Comparative station analytics

### 5. Report Agent
- **Responsibility**: Aggregate multi-agent findings into official police briefing documents (PDF / structured JSON export) suitable for daily briefing, shift handovers, and command reviews.

### 6. Validation Agent
- **Responsibility**: Inspect AI outputs for hallucinations, missing required fields, low confidence thresholds, or non-grounded claims. Assigns a verifiable `confidence_score` (0.00 - 1.00).

### 7. Safety Agent
- **Responsibility**: Block non-compliant prompts (e.g., illegal instructions, unverified arrest recommendations, biased/political output, unauthorized data access across jurisdictional RBAC bounds).

---

## Sequential Agent Workflow Pipeline
```
User Prompt -> AI Gateway -> Safety Check -> Search Agent -> Summary Agent -> Validation Agent -> Final Audit-Logged Response
```
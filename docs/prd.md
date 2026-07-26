# Product Requirements Document (PRD) - KSP-CopSight

## Executive Summary
**KSP-CopSight** is an AI-powered Agentic Intelligence & Operations Manager custom-engineered for Karnataka State Police (KSP). It empowers officers, inspectors, and district superintendents with natural language crime database querying, automatic FIR document summarization, spatial GIS hotspot analysis, and multi-agent decision support—backed by strict audit trails and role-based access control (RBAC).

---

## Core System Objectives
1. **Accelerate FIR Analysis**: Reduce time spent reading long FIR text from 30+ minutes to under 10 seconds via structured entity extraction (accused, victims, weapons, MO, timeline).
2. **Geospatial Intelligence**: Provide real-time spatial heatmaps and cluster analysis across police stations and districts.
3. **Conversational Crime Intelligence**: Enable officers to search incidents in natural language (e.g. *"Show armed robberies near Indiranagar in the last 30 days"*).
4. **Deterministic & Explainable AI**: Utilize specialized, audit-logged multi-agent AI pipelines with verifiable confidence scoring rather than black-box chatbots.
5. **Chain-of-Custody Compliance**: Ensure strict RBAC and immutable audit logs for every system query and report generation.

---

## User Persona & Access Hierarchy
| Role | Access Level & Scope | Primary Tasks |
|---|---|---|
| **Constable / Sub-Inspector** | Station Scope | Search local FIRs, view incident map, extract FIR summaries |
| **Inspector (Station Head)** | Station & Division Scope | Manage station case list, review trend reports, generate shift briefs |
| **Superintendent of Police (SP)** | District / Statewide Scope | High-level analytics, district comparisons, resource allocation |
| **System Admin** | Global System Scope | User management, RBAC configuration, system audit log monitoring |

---

## Core Features & System Capabilities

### 1. Unified Operational Dashboard
- Real-time KPI summary (Total FIRs, Solved vs Pending, Crime Surge Alerts, High-Risk Hotspots).
- Spatial GIS map with layer filters (Crime Type, Date Range, Station Boundary, Heatmap mode).
- Recent case activity feed with instant summary drawer.

### 2. Multi-Agent AI Ops Center
- **Natural Language Search Agent**: Converts conversational query to spatial SQL filters.
- **FIR Summarizer Agent**: Extracts timeline, weapons, vehicles, modus operandi, and accused entities.
- **Validation Agent**: Computes factual grounding score and flags low-confidence extractions.
- **Safety Agent**: Enforces legal guardrails and RBAC query boundaries.

### 3. FIR Case Management & Search
- Advanced multi-parametric search (BNS / IPC Sections, Station, Status, Date Range, Location radius).
- Detailed FIR viewer with original text alongside AI structured extraction.

### 4. Interactive GIS Crime Hotspot Map
- Interactive markers, cluster groups, heatmaps, station jurisdiction boundaries, spatial distance measurement.

### 5. Shift Briefing & PDF Report Generator
- Automated generation of official police daily briefings and district executive summaries.

### 6. Audit & Compliance Portal
- Full audit log of all searches, AI agent executions, exports, and user logins with IP address, timestamp, and role context.
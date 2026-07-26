# REST API Specification

All protected endpoints require HTTP Header `Authorization: Bearer <jwt_token>`.

## 1. Authentication Endpoints (`/api/v1/auth`)
- `POST /api/v1/auth/login`: Authenticate officer, return JWT token & user profile with role.
- `GET /api/v1/auth/me`: Fetch current authenticated user identity & permissions.

## 2. Incident & FIR Endpoints (`/api/v1/incidents`)
- `GET /api/v1/incidents`: List incidents with pagination, date filters, station, category, status.
- `GET /api/v1/incidents/{id}`: Fetch detailed FIR record by ID.
- `POST /api/v1/incidents`: Create new FIR record (Inspector / Admin).
- `PUT /api/v1/incidents/{id}`: Update incident status or investigation notes.
- `GET /api/v1/incidents/gis/hotspots`: Return geospatial incident clusters & coordinates for map rendering.

## 3. AI Agent Operations (`/api/v1/ai`)
- `POST /api/v1/ai/query`: Execute natural language search agent pipeline. Returns structured SQL filter + matching incidents + agent step logs.
- `POST /api/v1/ai/summarize/{fir_id}`: Execute Summary Agent on target FIR document. Returns extracted timeline, entities, weapons, MO, and confidence score.
- `POST /api/v1/ai/report/briefing`: Generate daily operational briefing report for station or district.

## 4. Analytics Endpoints (`/api/v1/analytics`)
- `GET /api/v1/analytics/kpis`: Get high-level KPI cards (Total cases, surge rate, solved status, active hotspots).
- `GET /api/v1/analytics/trends`: Crime rate trends over time (monthly, day-of-week breakdown).
- `GET /api/v1/analytics/stations`: Station comparison & workload distribution.

## 5. Audit & Compliance (`/api/v1/audit`)
- `GET /api/v1/audit/logs`: Retrieve audit trail log records (Admin / Superintendent).
- `GET /api/v1/audit/export`: Export audit logs in CSV / JSON format.

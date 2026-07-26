# Database Schema & Design Specification

## Relational Models Overview

### 1. `users`
- `id`: UUID (PK)
- `username`: String (Unique)
- `email`: String (Unique)
- `password_hash`: String
- `full_name`: String
- `badge_number`: String (Unique)
- `role`: Enum (`CONSTABLE`, `INSPECTOR`, `SP`, `ADMIN`)
- `station_id`: UUID (FK -> `police_stations.id`, nullable for statewide roles)
- `created_at`: Timestamp

### 2. `police_stations`
- `id`: UUID (PK)
- `station_code`: String (Unique, e.g., `KSP-BLR-IND-01`)
- `name`: String (e.g., `Indiranagar Police Station`)
- `district`: String (e.g., `Bengaluru Urban`)
- `zone`: String (e.g., `East Zone`)
- `latitude`: Float
- `longitude`: Float
- `address`: Text

### 3. `incidents` (FIRs)
- `id`: UUID (PK)
- `fir_number`: String (Unique, e.g., `FIR-2026-BLR-0492`)
- `station_id`: UUID (FK -> `police_stations.id`)
- `incident_date`: Timestamp
- `filed_date`: Timestamp
- `ipc_sections`: String Array / JSON (e.g., `["IPC 379", "IPC 392"]`)
- `category`: Enum (`THEFT`, `ROBBERY`, `ASSAULT`, `CYBERCRIME`, `HOMICIDE`, `NARCOTICS`, `OTHER`)
- `status`: Enum (`OPEN`, `UNDER_INVESTIGATION`, `CHARGESHEET_FILED`, `CLOSED`)
- `location_name`: String
- `latitude`: Float
- `longitude`: Float
- `raw_fir_text`: Text
- `accused_name`: String (Nullable)
- `complainant_name`: String
- `investigating_officer`: String

### 4. `ai_summaries`
- `id`: UUID (PK)
- `fir_id`: UUID (FK -> `incidents.id`)
- `summary_text`: Text
- `timeline`: JSON
- `extracted_entities`: JSON (weapons, vehicles, suspects)
- `modus_operandi`: Text
- `confidence_score`: Float (0.00 - 1.00)
- `generated_at`: Timestamp

### 5. `audit_logs`
- `id`: UUID (PK)
- `user_id`: UUID (FK -> `users.id`)
- `username`: String
- `user_role`: String
- `action`: String (e.g., `AI_SEARCH`, `VIEW_FIR`, `LOGIN`, `EXPORT_REPORT`)
- `resource_target`: String
- `details`: JSON
- `ip_address`: String
- `timestamp`: Timestamp

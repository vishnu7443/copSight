# Architectural & Engineering Decisions

## Key Architectural Choices

1. **Why FastAPI?**
   - High performance async I/O, native Pydantic schema validation, automatic OpenAPI doc generation, and smooth AI/LLM integration in Python.

2. **Why PostgreSQL + PostGIS (with SpatiaLite fallback for local zero-config testing)?**
   - Police incident data is inherently geospatial. PostGIS allows optimized spatial queries (polygon containment, nearest-neighbor radius search, spatial clustering).

3. **Why React + TypeScript + Vite?**
   - Type-safe, component-driven UI for fast rendering of crime maps, dynamic filtering, analytical charts, and audit trail tables.

4. **Why Leaflet & OpenStreetMap?**
   - Lightweight, open-source, highly responsive GIS mapping with tile layer rendering, heatmaps, and custom incident marker clusters.

5. **Why JWT & Strict RBAC?**
   - Stateless authentication supporting hierarchical roles (`Constable`, `Inspector`, `Superintendent`, `System Admin`) restricting sensitive FIR details according to station/jurisdiction boundaries.

6. **Why Read-Only AI Assistance?**
   - AI outputs assist decision making, but never perform automated legal actions or modify court evidence directly, mitigating legal and compliance risks.

7. **Why Mandatory Audit Logging?**
   - Every read, search, summary, and export action is logged with timestamp, user ID, IP address, user role, action type, and confidence score for complete chain-of-custody transparency.

8. **Why Confidence Scoring?**
   - Officers need explicit insight into LLM extraction reliability (e.g., 94% confidence extraction vs 65% low-confidence warning).

9. **Why Specialized Multi-Agent System over Monolithic Prompt?**
   - Modular, single-responsibility agents perform better, fail predictably, allow modular fallback, and produce audit-verifiable outputs.

10. **Why SQL-First Query Agent over Vector DB for Core FIR Search?**
    - Structured government crime records rely on relational fields (dates, IPC sections, station codes, GPS points). Vector DBs are reserved for unstructured document RAG in future phases.

---

## Future Roadmap Decisions
- **Neo4j / Graph DB**: Entity linkage across suspect networks once link volume grows.
- **Kafka / Event Streaming**: Real-time dispatch feed ingestion.
- **On-Premises LLM / vLLM**: Offline local inference for air-gapped police networks.
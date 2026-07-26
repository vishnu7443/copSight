# Security & RBAC Guidelines

## 1. Authentication & Session Management
- **Algorithm**: JWT with HMAC-SHA256 signature (`HS256`).
- **Token Expiry**: Short-lived access tokens (8 hours).
- **Password Security**: Passwords hashed using `bcrypt` with minimum work factor 12.

## 2. Role-Based Access Control (RBAC) Matrix
| Resource Endpoint | Constable | Inspector | Superintendent | Admin |
|---|---|---|---|---|
| View Public Station Incidents | ✅ | ✅ | ✅ | ✅ |
| View Sensitive FIR Text | Station Scope | Division Scope | State Scope | ✅ |
| Create / Edit FIR Case | ❌ | ✅ | ✅ | ✅ |
| Execute AI Search & Summary | ✅ | ✅ | ✅ | ✅ |
| Generate District Briefing | ❌ | Station Level | State Level | ✅ |
| View System Audit Logs | ❌ | ❌ | ✅ (Read-Only) | ✅ |
| User & System Admin | ❌ | ❌ | ❌ | ✅ |

## 3. Mandatory Audit Logging Policy
- **Coverage**: Every API request to protected routes passes through the `AuditMiddleware`.
- **Payload**: User ID, Badge Number, Role, Timestamp (UTC), Endpoint Path, Method, Client IP, Query Parameters, Response Status Code.
- **Immutability**: Audit log records are insert-only and cannot be edited or deleted by non-Admin roles.

## 4. AI Guardrails & Prompt Safety
- **Prompt Sanitization**: Inputs are sanitized against SQL injection, prompt injection, and unauthorized data leakage.
- **Safety Agent Enforcement**: Requests attempting to generate illegal commands, private personal data leaks beyond jurisdictional scope, or unverified automated arrest recommendations are rejected automatically.

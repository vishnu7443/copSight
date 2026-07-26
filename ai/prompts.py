"""
Pydantic Schemas and Prompt Templates for KSP-CopSight Multi-Agent AI Engine.
Provides deterministic structured outputs for Search, Summary, Validation, Safety, Trend, and Report agents.
"""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class SafetyCheckResult(BaseModel):
    is_safe: bool = Field(..., description="Whether the prompt is safe and legally compliant.")
    reason: str = Field(..., description="Explanation of safety check evaluation.")
    blocked_category: Optional[str] = Field(None, description="Category of guardrail violation if any.")


class SearchAgentOutput(BaseModel):
    generated_sql: str = Field(..., description="Safe generated SQL/Filter query description.")
    category_filter: Optional[str] = Field(None, description="Extracted crime category filter.")
    location_keyword: Optional[str] = Field(None, description="Extracted spatial or location keyword.")
    date_range_days: Optional[int] = Field(None, description="Extracted temporal window in days.")
    explanation: str = Field(..., description="Natural language explanation of how search query was constructed.")
    filters: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Extracted search filter dictionary.")


class FIRSummaryOutput(BaseModel):
    summary_text: str = Field(..., description="Concise executive summary of the FIR narrative.")
    executive_summary: Optional[str] = Field(None, description="Executive summary alias.")
    timeline: List[Dict[str, str]] = Field(..., description="Chronological event breakdown with time and description.")
    timeline_events: Optional[List[Dict[str, str]]] = Field(default_factory=list, description="Timeline events alias.")
    accused_details: List[str] = Field(..., description="Identified accused or suspect descriptions.")
    victim_details: List[str] = Field(..., description="Identified complainant / victim descriptions.")
    weapons_involved: List[str] = Field(..., description="Weapons or tools recovered/used.")
    vehicles_involved: List[str] = Field(..., description="Vehicles used in crime commission.")
    key_entities: Optional[List[str]] = Field(default_factory=list, description="Combined extracted key entities.")
    modus_operandi: str = Field(..., description="Method of operation / criminal tactic.")
    ipc_sections_suggested: List[str] = Field(..., description="Relevant BNS / IPC legal sections.")


class ValidationAgentOutput(BaseModel):
    confidence_score: float = Field(..., ge=0.0, le=1.0, description="Verifiable factual grounding confidence score.")
    is_hallucination_detected: bool = Field(..., description="True if unverified claims or hallucination found.")
    validation_notes: str = Field(..., description="Validation critique and missing field warnings.")
    field_completeness: float = Field(..., ge=0.0, le=1.0, description="Completeness metric of extracted fields.")


class TrendAgentOutput(BaseModel):
    crime_surge_detected: bool = Field(..., description="Whether a statistical surge is detected.")
    surge_percentage: float = Field(..., description="Calculated % shift in incident frequency.")
    dominant_category: str = Field(..., description="Most frequent crime category in time window.")
    hotspot_zones: List[str] = Field(..., description="High density location clusters.")
    recommendations: List[str] = Field(..., description="Tactical policing / patrol recommendations.")


class ReportAgentOutput(BaseModel):
    report_title: str = Field(..., description="Official title of briefing report.")
    summary_overview: str = Field(..., description="High-level executive briefing summary.")
    key_findings: List[str] = Field(..., description="Bullet points of critical operational highlights.")
    action_items: List[str] = Field(..., description="Recommended police dispatch / patrol actions.")
    security_clearance_level: str = Field(..., description="Classification level (STATION, DISTRICT, STATE).")


# Safety Prompt Instructions
SAFETY_SYSTEM_PROMPT = """You are the KSP-CopSight Safety Agent for Karnataka State Police.
Your task is to analyze incoming user queries and enforce strict legal guardrails:
1. Block illegal, political, or extrajudicial prompts.
2. Reject requests asking for automated arrest execution.
3. Ensure RBAC boundary compliance based on user role ({user_role}).
Return a JSON matching SafetyCheckResult.
"""

SEARCH_AGENT_PROMPT = """You are the Search Agent for KSP-CopSight.
Translate natural language queries into structured database query parameters:
Extract category, location_keyword, date_range_days, and an explainable SQL representation.
"""

SUMMARY_AGENT_PROMPT = """You are the Summary Agent for KSP-CopSight.
Analyze the following FIR text and extract structured crime intelligence:
- Executive summary
- Chronological timeline
- Accused & suspect descriptions
- Victim & complainant details
- Weapons & vehicles involved
- Modus Operandi (MO)
"""

VALIDATION_AGENT_PROMPT = """You are the Validation & Grounding Agent for KSP-CopSight.
Verify extracted intelligence against raw FIR text:
Calculate confidence_score (0.0 to 1.0), verify completeness, and detect any hallucination.
"""

"""
AI Orchestrator Agent for KSP-CopSight.
Detects user query intent, creates a task plan, and dynamically routes execution to specialized sub-agents.
"""

import re
from typing import Dict, Any, List


class OrchestratorAgent:
    """
    Top-level AI Orchestrator.
    Analyzes intent, formulates execution plans, and coordinates sub-agent workflows.
    """

    def analyze_and_plan(self, user_prompt: str, user_role: str = "INSPECTOR") -> Dict[str, Any]:
        prompt_lower = user_prompt.lower().strip()

        # Intent Detection Logic
        if any(w in prompt_lower for w in ["briefing", "report", "district overview", "daily summary"]):
            intent = "GENERATE_BRIEFING"
            planned_steps = ["SafetyAgent", "SearchAgent", "TrendAgent", "ReportAgent"]
            description = "Generate official police daily operational briefing"
        elif any(w in prompt_lower for w in ["summarize", "fir detail", "case summary", "narrative"]):
            intent = "SUMMARIZE_FIR"
            planned_steps = ["SafetyAgent", "SearchAgent", "SummaryAgent", "ValidationAgent"]
            description = "Extract structured intelligence & entities from raw FIR text"
        elif any(w in prompt_lower for w in ["trend", "surge", "increase", "hotspot", "patrol"]):
            intent = "CRIME_TREND_ANALYSIS"
            planned_steps = ["SafetyAgent", "SearchAgent", "TrendAgent"]
            description = "Analyze historical crime surge & compute tactical patrol recommendations"
        elif any(w in prompt_lower for w in ["relationship", "owner", "vehicle", "suspect link", "associate"]):
            intent = "ENTITY_RELATIONSHIP_SEARCH"
            planned_steps = ["SafetyAgent", "SearchAgent", "SummaryAgent"]
            description = "Traverse entity connections (Vehicle -> Owner -> FIR -> Officer -> Location)"
        else:
            intent = "SEARCH_CRIME_RECORDS"
            planned_steps = ["SafetyAgent", "SearchAgent", "SummaryAgent", "ValidationAgent"]
            description = "Natural language spatial and category query translation"

        return {
            "intent": intent,
            "description": description,
            "planned_steps": planned_steps,
            "orchestration_metadata": {
                "user_role": user_role,
                "confidence_score": 0.96,
                "confidence_level": "HIGH",
                "estimated_execution_time_ms": 140
            }
        }

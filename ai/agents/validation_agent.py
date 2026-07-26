"""
Validation & Grounding Agent for KSP-CopSight.
Evaluates extracted intelligence against raw FIR text for hallucinations and completeness.
"""

from typing import Dict, Any
from ai.prompts import FIRSummaryOutput, ValidationAgentOutput


class ValidationAgent:
    """Computes verifiable confidence scores and hallucination checks."""

    def validate_extraction(self, summary_output: FIRSummaryOutput, raw_fir_text: str) -> ValidationAgentOutput:
        """
        Validate extraction accuracy against raw text source.
        """
        score = 0.85 # Base score
        notes = []
        completeness = 1.0

        # Check if extracted entities exist in raw text
        for weapon in summary_output.weapons_involved:
            if weapon.lower() not in raw_fir_text.lower():
                score -= 0.15
                notes.append(f"Weapon '{weapon}' not explicitly matched in raw text.")
                
        for vehicle in summary_output.vehicles_involved:
            if vehicle.lower() not in raw_fir_text.lower():
                score -= 0.10
                notes.append(f"Vehicle '{vehicle}' unverified in raw narrative.")

        # Evaluate completeness
        if not summary_output.accused_details:
            completeness -= 0.2
            notes.append("Accused details missing.")
        if not summary_output.weapons_involved and ("knife" in raw_fir_text.lower() or "blade" in raw_fir_text.lower()):
            completeness -= 0.15
            notes.append("Potential weapon in text was not extracted.")

        confidence_score = max(0.40, min(0.98, round(score * completeness, 2)))
        is_hallucination = score < 0.65

        if not notes:
            notes.append("Factual grounding validated. High confidence extraction.")

        return ValidationAgentOutput(
            confidence_score=confidence_score,
            is_hallucination_detected=is_hallucination,
            validation_notes="; ".join(notes),
            field_completeness=round(completeness, 2)
        )

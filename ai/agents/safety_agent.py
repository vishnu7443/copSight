"""
Safety Agent for KSP-CopSight.
Evaluates prompt guardrails, legal constraints, and RBAC compliance.
"""

from typing import Dict, Any
from ai.prompts import SafetyCheckResult


class SafetyAgent:
    """Enforces AI safety guardrails, legal bounds, and RBAC rules."""

    UNSAFE_KEYWORDS = [
        "encounter", "extrajudicial", "fake arrest", "bribe", "torture", 
        "political target", "hack database", "drop charges illegally"
    ]

    def evaluate(self, prompt: str, user_role: str = "CONSTABLE") -> SafetyCheckResult:
        """
        Evaluate prompt for safety violations.
        """
        prompt_lower = prompt.lower()
        
        # Check unsafe keywords
        for keyword in self.UNSAFE_KEYWORDS:
            if keyword in prompt_lower:
                return SafetyCheckResult(
                    is_safe=False,
                    reason=f"Prompt contains illegal or non-compliant directive: '{keyword}'",
                    blocked_category="ILLEGAL_DIRECTIVE"
                )

        # RBAC-based checks
        if "delete audit" in prompt_lower or "drop all logs" in prompt_lower:
            if user_role not in ["ADMIN"]:
                return SafetyCheckResult(
                    is_safe=False,
                    reason="Insufficient privileges to perform audit modification query.",
                    blocked_category="RBAC_VIOLATION"
                )

        return SafetyCheckResult(
            is_safe=True,
            reason="Prompt passed legal compliance and safety guardrails.",
            blocked_category=None
        )

    # Alias for gateway call
    evaluate_prompt = evaluate

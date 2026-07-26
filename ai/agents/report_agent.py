"""
Report Agent for KSP-CopSight.
Generates structured daily briefing and executive crime reports.
"""

from typing import Dict, Any, List
from ai.prompts import ReportAgentOutput


class ReportAgent:
    """Generates official police briefing reports from multi-agent outputs."""

    def generate_briefing(self, station_name: str, incidents: List[Dict[str, Any]], trend_data: Dict[str, Any]) -> ReportAgentOutput:
        """
        Produce executive daily operational report payload.
        """
        title = f"Daily Operational Briefing - {station_name}"
        total_cases = len(incidents)

        summary_overview = (
            f"Official Karnataka State Police intelligence briefing for {station_name}. "
            f"A total of {total_cases} active incidents recorded in the current evaluation window. "
            f"Dominant criminal category identified: {trend_data.get('dominant_category', 'THEFT')}."
        )

        key_findings = [
            f"Total Active Cases Evaluated: {total_cases}",
            f"Crime Surge Indicator: {trend_data.get('surge_percentage', 0.0)}% shift",
            f"Primary Hotspot Clusters: {', '.join(trend_data.get('hotspot_zones', ['Central Corridor']))}",
            "Special Intelligence Note: High prevalence of two-wheeler chain snatching and cyber digital arrest scams."
        ]

        action_items = trend_data.get("recommendations", [
            "Increase high-visibility foot patrols.",
            "Review CCTV footage at key junctions."
        ])

        return ReportAgentOutput(
            report_title=title,
            summary_overview=summary_overview,
            key_findings=key_findings,
            action_items=action_items,
            security_clearance_level="OFFICIAL - FOR POLICE USE ONLY"
        )

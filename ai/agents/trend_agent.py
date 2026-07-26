"""
Trend Agent for KSP-CopSight.
Analyzes historical incident data to compute crime surge metrics, hotspots, and trends.
"""

from typing import List, Dict, Any
from ai.prompts import TrendAgentOutput


class TrendAgent:
    """Computes crime trend shift, surge metrics, and tactical recommendations."""

    def analyze_trends(self, incidents: List[Dict[str, Any]]) -> TrendAgentOutput:
        """
        Analyze incident collection for pattern intelligence.
        """
        if not incidents:
            return TrendAgentOutput(
                crime_surge_detected=False,
                surge_percentage=0.0,
                dominant_category="NONE",
                hotspot_zones=[],
                recommendations=["Maintain routine patrol schedule."]
            )

        # Count categories
        cat_counts: Dict[str, int] = {}
        locations: Dict[str, int] = {}
        for inc in incidents:
            cat = inc.get("category", "OTHER")
            cat_counts[cat] = cat_counts.get(cat, 0) + 1

            loc = inc.get("location_name", "Unknown Location")
            locations[loc] = locations.get(loc, 0) + 1

        # Dominant category
        dominant_cat = max(cat_counts, key=cat_counts.get) if cat_counts else "THEFT"

        # Hotspots
        sorted_locs = sorted(locations.items(), key=lambda x: x[1], reverse=True)
        hotspot_zones = [loc[0] for loc in sorted_locs[:3]]

        # Calculate surge mock metric
        surge_pct = round(12.5 + (len(incidents) * 1.5), 1)
        surge_detected = surge_pct > 15.0

        recommendations = [
            f"Increase nocturnal mobile patrol frequency in {hotspot_zones[0] if hotspot_zones else 'hotspot corridors'}.",
            f"Deploy targeted CCTV surveillance unit for {dominant_cat} prevention.",
            "Establish joint station checkpoint during peak incident windows (21:00 - 02:00 hrs)."
        ]

        return TrendAgentOutput(
            crime_surge_detected=surge_detected,
            surge_percentage=surge_pct,
            dominant_category=dominant_cat,
            hotspot_zones=hotspot_zones,
            recommendations=recommendations
        )

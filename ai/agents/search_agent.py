"""
Search Agent for KSP-CopSight.
Translates natural language prompts into structured database query parameters.
"""

import re
from typing import Dict, Any, List
from ai.prompts import SearchAgentOutput


class SearchAgent:
    """Translates user natural language into structured database query filters."""

    CATEGORY_MAP = {
        "theft": "THEFT",
        "stolen": "THEFT",
        "chain snatching": "THEFT",
        "robbery": "ROBBERY",
        "armed robbery": "ROBBERY",
        "burglary": "BURGLARY",
        "break-in": "BURGLARY",
        "cyber": "CYBERCRIME",
        "online fraud": "CYBERCRIME",
        "digital arrest": "CYBERCRIME",
        "assault": "ASSAULT",
        "attack": "ASSAULT",
        "narcotics": "NARCOTICS",
        "drugs": "NARCOTICS",
        "homicide": "HOMICIDE",
        "murder": "HOMICIDE"
    }

    LOCATION_MAP = [
        "indiranagar", "mg road", "koramangala", "whitefield", "cubbon park",
        "mysuru", "lashkar", "domlur", "ashoka road"
    ]

    def parse_query(self, prompt: str, station_id: str = None) -> SearchAgentOutput:
        """
        Parses prompt into structured filters and generated SQL description.
        """
        prompt_lower = prompt.lower()
        
        # 1. Match category
        extracted_category = None
        for key, cat in self.CATEGORY_MAP.items():
            if key in prompt_lower:
                extracted_category = cat
                break
                
        # 2. Match location
        extracted_location = None
        for loc in self.LOCATION_MAP:
            if loc in prompt_lower:
                extracted_location = loc.title()
                break

        # 3. Match temporal timeframe
        date_range_days = None
        if "last week" in prompt_lower or "7 days" in prompt_lower:
            date_range_days = 7
        elif "last month" in prompt_lower or "30 days" in prompt_lower:
            date_range_days = 30
        elif "last 6 months" in prompt_lower:
            date_range_days = 180

        # Construct SQL Representation
        sql_parts = ["SELECT * FROM incidents WHERE 1=1"]
        if extracted_category:
            sql_parts.append(f"AND category = '{extracted_category}'")
        if extracted_location:
            sql_parts.append(f"AND location_name LIKE '%{extracted_location}%'")
        if station_id and station_id != "ALL":
            sql_parts.append(f"AND station_id = '{station_id}'")
        if date_range_days:
            sql_parts.append(f"AND incident_date >= NOW() - INTERVAL '{date_range_days} days'")

        generated_sql = " ".join(sql_parts)
        explanation = f"Translated prompt '{prompt}' into spatial query filtering category={extracted_category or 'ALL'} and location={extracted_location or 'ANY'}."

        out = SearchAgentOutput(
            generated_sql=generated_sql,
            category_filter=extracted_category,
            location_keyword=extracted_location,
            date_range_days=date_range_days,
            explanation=explanation
        )

        # Attach dict helper property for gateway compatibility
        out.filters = {
            "category": extracted_category,
            "keyword": extracted_location or extracted_category or ""
        }
        return out

    translate_query = parse_query

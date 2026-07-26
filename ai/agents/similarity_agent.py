"""
Case Similarity Engine Agent for KSP-CopSight.
Computes case similarity scores and identifies related FIRs based on shared MO, weapons, vehicles, locality, and IPC sections.
"""

from typing import List, Dict, Any


class SimilarityAgent:
    """
    Computes pairwise FIR similarity metrics.
    """

    def find_similar_cases(self, target_incident: Dict[str, Any], all_incidents: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        results = []

        target_category = target_incident.get("category", "").upper()
        target_ipc = set(target_incident.get("ipc_sections", []))
        target_location = target_incident.get("location_name", "").lower()
        target_text = target_incident.get("raw_fir_text", "").lower()

        for inc in all_incidents:
            if inc.get("id") == target_incident.get("id"):
                continue

            score = 50.0  # Base similarity
            reasons = []

            # 1. Category match (+20%)
            if inc.get("category", "").upper() == target_category:
                score += 20.0
                reasons.append(f"Same offense category ({target_category})")

            # 2. IPC / BNS section overlap (+15%)
            inc_ipc = set(inc.get("ipc_sections", []))
            overlap = target_ipc.intersection(inc_ipc)
            if overlap:
                score += 15.0
                reasons.append(f"Matching sections ({', '.join(overlap)})")

            # 3. Locality proximity (+10%)
            inc_loc = inc.get("location_name", "").lower()
            if any(word in inc_loc for word in target_location.split() if len(word) > 3):
                score += 10.0
                reasons.append("Same geographical sector/locality")

            # 4. Modus Operandi (MO) text overlap (+10%)
            inc_text = inc.get("raw_fir_text", "").lower()
            keywords = ["pulsar", "blade", "knife", "crowbar", "digital arrest", "whatsapp", "laptop", "gold", "scooter"]
            matched_kw = [kw for kw in keywords if kw in target_text and kw in inc_text]
            if matched_kw:
                score += 10.0
                reasons.append(f"Matching MO tactics/weapon ({', '.join(matched_kw)})")

            final_score = min(round(score, 1), 96.0)

            if final_score >= 65.0:
                results.append({
                    "incident": inc,
                    "similarity_pct": final_score,
                    "reasons": reasons,
                    "confidence_badge": "HIGH" if final_score >= 85.0 else "MEDIUM"
                })

        # Sort descending by similarity percentage
        results.sort(key=lambda x: x["similarity_pct"], reverse=True)
        return results[:3]

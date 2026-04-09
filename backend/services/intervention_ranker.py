"""
Intervention ranking service — returns and ranks intervention strategies.

Currently reads from mock data.
Future: ranks interventions using optimization models considering
cost, feasibility, delay reduction, and cross-region impact.
"""

from backend.data.mock_data import INTERVENTIONS


def get_interventions(alert_id: str) -> list:
    """Return ranked interventions for an alert, sorted by strategy score."""
    interventions = INTERVENTIONS.get(alert_id, [])
    return sorted(interventions, key=lambda x: x["strategy_score"], reverse=True)


def get_top_intervention(alert_id: str) -> dict | None:
    """Return the highest-scoring intervention."""
    interventions = get_interventions(alert_id)
    return interventions[0] if interventions else None

"""
Alert service — retrieves and filters alerts.

Currently reads from mock data.
Future: queries DB + calls ML models for real-time severity scoring.
"""

from backend.data.mock_data import REGIONS, ALERTS, ALERT_DETAILS_KPIS


def get_all_regions() -> list:
    return REGIONS


def get_region_by_id(region_id: str) -> dict | None:
    return next((r for r in REGIONS if r["id"] == region_id), None)


def get_alerts_by_region(region_id: str) -> list:
    return ALERTS.get(region_id, [])


def get_alert_by_id(alert_id: str) -> dict | None:
    for region_alerts in ALERTS.values():
        for alert in region_alerts:
            if alert["id"] == alert_id:
                return alert
    return None


def get_alert_kpis(alert_id: str) -> dict | None:
    return ALERT_DETAILS_KPIS.get(alert_id)

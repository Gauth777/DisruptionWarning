"""
Weather disruption ML model placeholder.

This module will be owned by the weather-ML team member.
It should provide severity predictions, probability estimates,
and cascading impact weights for weather-type disruptions.

Integration point: services/tree_builder.py calls predict_weather_severity()
to get the root severity score, then tree_scoring.py propagates it.
"""


def predict_weather_severity(
    event_type: str,
    location: str,
    wind_speed_kmh: float = 0,
    rainfall_mm: float = 0,
) -> dict:
    """
    Predict severity and probability of a weather disruption.
    
    Returns demo values now. Replace with actual ML model inference.
    Expected output shape must be maintained for downstream compatibility.
    """
    return {
        "severity": 88,
        "probability": 0.82,
        "predicted_duration_hours": 72,
        "confidence_interval": [60, 84],
        "model_version": "demo-v0",
    }


def get_weather_dependency_weights(event_type: str) -> dict:
    """
    Return dependency weights for downstream nodes given a weather event type.
    """
    return {
        "port_operations": 0.93,
        "coastal_roads": 0.87,
        "power_infrastructure": 0.75,
    }

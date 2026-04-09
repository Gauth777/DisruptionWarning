"""
Strike disruption ML model placeholder.

This module will be owned by the strike-ML team member.
It should provide severity predictions, probability estimates,
and cascading impact weights for strike-type disruptions.

Integration point: services/tree_builder.py calls predict_strike_severity()
to get the root severity score, then tree_scoring.py propagates it.
"""


def predict_strike_severity(
    location: str,
    sector: str = "logistics",
    historical_duration_days: int = 3,
) -> dict:
    """
    Predict severity and probability of a strike disruption.
    
    Returns demo values now. Replace with actual ML model inference.
    Expected output shape must be maintained for downstream compatibility.
    """
    return {
        "severity": 92,
        "probability": 0.91,
        "predicted_duration_hours": 96,
        "confidence_interval": [84, 108],
        "model_version": "demo-v0",
    }


def get_strike_dependency_weights(location: str) -> dict:
    """
    Return dependency weights for downstream nodes given a strike location.
    These weights feed into tree_scoring.compute_node_score().
    """
    return {
        "logistics_throughput": 0.92,
        "dispatch_capacity": 0.85,
        "route_stability": 0.78,
    }

"""
Tree builder service — constructs and returns impact trees for alerts.

Currently reads pre-built trees from mock data.
Future: dynamically builds trees using ML model outputs from
strike_model.py / weather_model.py + tree_scoring.py.
"""

from backend.data.mock_data import IMPACT_TREES
from backend.ml.tree_scoring import flatten_tree, get_propagation_depth, count_nodes


def get_impact_tree(alert_id: str) -> dict | None:
    """Return the full impact tree for an alert."""
    return IMPACT_TREES.get(alert_id)


def get_tree_flat_nodes(alert_id: str) -> list:
    """Return flattened node list for table display."""
    tree = IMPACT_TREES.get(alert_id)
    if not tree:
        return []
    return flatten_tree(tree)


def get_tree_stats(alert_id: str) -> dict:
    """Return summary stats for the impact tree."""
    tree = IMPACT_TREES.get(alert_id)
    if not tree:
        return {}
    flat = flatten_tree(tree)
    regions = set(n["region"] for n in flat)
    return {
        "total_nodes": count_nodes(tree),
        "max_depth": get_propagation_depth(tree),
        "unique_regions": list(regions),
        "region_count": len(regions),
    }

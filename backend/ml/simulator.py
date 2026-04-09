"""
Simulation engine placeholder.

Future: runs Monte Carlo or scenario simulations to project
72-hour cascading impact under different intervention strategies.
"""

from backend.ml.tree_scoring import compute_tree_scores


def simulate_72h_projection(tree: dict, interventions: list = None) -> dict:
    """
    Simulate 72-hour forward projection of cascading impact.
    
    Currently returns a simple scaled version of current state.
    Future: full simulation with time-stepped propagation.
    """
    def scale_tree(node: dict, factor: float) -> dict:
        scaled = {**node, "score": min(100, round(node["score"] * factor))}
        if node.get("children"):
            scaled["children"] = [scale_tree(c, factor) for c in node["children"]]
        return scaled

    projection_factor = 1.15  # 15% degradation over 72h without intervention
    if interventions:
        avg_reduction = sum(i.get("delay_reduction_pct", 0) for i in interventions) / len(interventions)
        projection_factor = max(0.7, projection_factor - (avg_reduction / 100))

    return {
        "projected_tree": scale_tree(tree, projection_factor),
        "projection_hours": 72,
        "applied_interventions": len(interventions or []),
        "model_version": "demo-v0",
    }

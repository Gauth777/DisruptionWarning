"""
Tree scoring engine — computes cascading impact scores across the hierarchy.

Current: returns hardcoded demo scores from mock data.
Future: replace compute_node_score() with ML inference calls.

Formula (to be driven by ML):
  child_score = parent_score * dependency_weight * vulnerability * (1 - resilience)
"""


def compute_node_score(
    parent_score: float,
    dependency_weight: float = 0.85,
    vulnerability: float = 0.80,
    resilience: float = 0.15,
) -> float:
    """
    Compute cascading score for a child node.
    Replace this with ML model output when ready.
    """
    return round(parent_score * dependency_weight * vulnerability * (1 - resilience), 1)


def compute_tree_scores(tree: dict) -> dict:
    """
    Walk the tree and recompute scores using the formula.
    Currently a pass-through — uses pre-set demo values.
    Swap this to call ML inference per node in production.
    """
    # Future: recursively recalculate using compute_node_score
    return tree


def get_propagation_depth(tree: dict, depth: int = 0) -> int:
    """Return max depth of the impact tree."""
    if not tree.get("children"):
        return depth
    return max(get_propagation_depth(c, depth + 1) for c in tree["children"])


def count_nodes(tree: dict) -> int:
    """Count total nodes in the tree."""
    count = 1
    for child in tree.get("children", []):
        count += count_nodes(child)
    return count


def flatten_tree(tree: dict, nodes: list = None) -> list:
    """Flatten tree into a list of node dicts for table display."""
    if nodes is None:
        nodes = []
    nodes.append({
        "id": tree["id"],
        "label": tree["label"],
        "level": tree["level"],
        "score": tree["score"],
        "contribution": tree["contribution"],
        "delay_hours": tree["delay_hours"],
        "region": tree["region"],
    })
    for child in tree.get("children", []):
        flatten_tree(child, nodes)
    return nodes

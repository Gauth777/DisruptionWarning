from fastapi import APIRouter, HTTPException
from backend.services.alert_service import get_alert_by_id, get_alert_kpis
from backend.services.tree_builder import get_impact_tree, get_tree_flat_nodes, get_tree_stats
from backend.services.intervention_ranker import get_interventions

router = APIRouter(prefix="/api/alerts", tags=["alerts"])


@router.get("/{alert_id}")
def get_alert_detail(alert_id: str):
    alert = get_alert_by_id(alert_id)
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")

    kpis = get_alert_kpis(alert_id)
    tree = get_impact_tree(alert_id)
    flat_nodes = get_tree_flat_nodes(alert_id)
    tree_stats = get_tree_stats(alert_id)

    return {
        "alert": alert,
        "kpis": kpis,
        "impact_tree": tree,
        "flat_nodes": flat_nodes,
        "tree_stats": tree_stats,
    }


@router.get("/{alert_id}/interventions")
def get_alert_interventions(alert_id: str):
    alert = get_alert_by_id(alert_id)
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return get_interventions(alert_id)

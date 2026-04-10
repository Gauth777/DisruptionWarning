from fastapi import APIRouter, HTTPException
from services.alert_service import get_all_regions, get_region_by_id, get_alerts_by_region

router = APIRouter(prefix="/api/regions", tags=["regions"])


@router.get("")
def list_regions():
    return get_all_regions()


@router.get("/{region_id}")
def get_region(region_id: str):
    region = get_region_by_id(region_id)
    if not region:
        raise HTTPException(status_code=404, detail="Region not found")
    return region


@router.get("/{region_id}/alerts")
def list_region_alerts(region_id: str):
    region = get_region_by_id(region_id)
    if not region:
        raise HTTPException(status_code=404, detail="Region not found")
    return get_alerts_by_region(region_id)

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production" ? "/_/backend" : "http://localhost:8000");

async function fetchAPI<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
  return res.json();
}

import type { Region, Alert, AlertDetail, Intervention } from "./types";

export const api = {
  getRegions: () => fetchAPI<Region[]>("/api/regions"),
  getRegionAlerts: (regionId: string) => fetchAPI<Alert[]>(`/api/regions/${regionId}/alerts`),
  getAlertDetail: (alertId: string) => fetchAPI<AlertDetail>(`/api/alerts/${alertId}`),
  getInterventions: (alertId: string) => fetchAPI<Intervention[]>(`/api/alerts/${alertId}/interventions`),
};

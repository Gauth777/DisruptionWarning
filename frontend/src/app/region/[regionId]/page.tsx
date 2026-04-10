"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Alert } from "@/lib/types";
import { api } from "@/lib/api";
import KpiCard from "@/components/KpiCard";
import AlertCard from "@/components/AlertCard";

export default function RegionAlertsPage() {
  const params = useParams();
  const regionId = params.regionId as string;
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getRegionAlerts(regionId).then((data) => {
      setAlerts(data);
      setLoading(false);
    }).catch((err) => {
      console.error("Failed to fetch alerts:", err);
      setError("Failed to load alerts. Please try again later.");
      setLoading(false);
    });
  }, [regionId]);

  const regionName = regionId
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

  const avgSeverity = alerts.length
    ? Math.round(alerts.reduce((s, a) => s + a.severity, 0) / alerts.length)
    : 0;
  const maxDelay = alerts.length
    ? Math.max(...alerts.map((a) => a.expected_delay_hours))
    : 0;
  const crossRegionCount = alerts.filter((a) => a.cross_region_spread).length;

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-1">
          {regionName}
        </h2>
        <p className="text-sm text-text-secondary">Latest disruption alerts and risk indicators</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <KpiCard label="Active Alerts" value={alerts.length} accent="text-severity-high" />
        <KpiCard label="Avg Severity" value={avgSeverity} accent="text-severity-critical" />
        <KpiCard label="Max Delay Risk" value={maxDelay} unit="hrs" accent="text-severity-high" />
        <KpiCard
          label="Network Stability"
          value={100 - avgSeverity}
          unit="%"
          accent={100 - avgSeverity > 40 ? "text-accent-emerald" : "text-severity-critical"}
        />
      </div>

      {/* Cross-region summary */}
      {crossRegionCount > 0 && (
        <div className="glass rounded-xl p-3 mb-6 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-severity-critical animate-pulse" />
          <span className="text-xs text-text-secondary">
            <span className="font-bold text-severity-critical">{crossRegionCount}</span> alert
            {crossRegionCount > 1 ? "s" : ""} with cross-region propagation detected
          </span>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-accent-cyan/30 border-t-accent-cyan rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="glass rounded-xl p-6 text-center">
          <p className="text-severity-critical font-semibold mb-2">Error Loading Alerts</p>
          <p className="text-text-secondary text-sm">{error}</p>
        </div>
      ) : alerts.length === 0 ? (
        <div className="glass rounded-xl p-6 text-center">
          <p className="text-text-secondary">No active alerts for this region.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {alerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      )}
    </div>
  );
}

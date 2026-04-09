"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { AlertDetail, Intervention } from "@/lib/types";
import { api } from "@/lib/api";
import { getSeverityColor, getSeverityLabel, getTypeIcon } from "@/lib/utils";
import KpiCard from "@/components/KpiCard";
import ImpactTree from "@/components/ImpactTree";
import InterventionPanel from "@/components/InterventionPanel";
import NodeImpactTable from "@/components/NodeImpactTable";

export default function AlertDashboardPage() {
  const params = useParams();
  const alertId = params.alertId as string;
  const [detail, setDetail] = useState<AlertDetail | null>(null);
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"current" | "projected">("current");
  const [simMode, setSimMode] = useState(false);

  useEffect(() => {
    Promise.all([api.getAlertDetail(alertId), api.getInterventions(alertId)])
      .then(([d, i]) => {
        setDetail(d);
        setInterventions(i);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [alertId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 border-2 border-accent-cyan/30 border-t-accent-cyan rounded-full animate-spin" />
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="text-center py-32">
        <p className="text-text-secondary">Alert not found</p>
        <Link href="/" className="text-accent-cyan text-sm mt-2 inline-block">
          ← Back to regions
        </Link>
      </div>
    );
  }

  const { alert, kpis, impact_tree, flat_nodes } = detail;
  const sevColor = getSeverityColor(alert.severity);

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header row */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl">{getTypeIcon(alert.type)}</span>
            <h2 className="text-xl font-bold text-text-primary">{alert.title}</h2>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                alert.severity >= 80
                  ? "bg-severity-critical/20 text-severity-critical"
                  : alert.severity >= 60
                  ? "bg-severity-high/20 text-severity-high"
                  : "bg-severity-medium/20 text-severity-medium"
              }`}
            >
              {getSeverityLabel(alert.severity)}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-text-muted">
            <span>Origin: {alert.origin_region}</span>
            <span> </span>
            {alert.cross_region_spread && (
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-severity-critical" />
                Cross-Region: {alert.impacted_regions.join(", ")}
              </span>
            )}
          </div>
        </div>

        {/* View mode toggles */}
        <div className="flex items-center gap-3">
          <div className="glass rounded-lg p-1 flex">
            <button
              onClick={() => setViewMode("current")}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                viewMode === "current"
                  ? "bg-accent-cyan/20 text-accent-cyan"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              Current State
            </button>
            <button
              onClick={() => setViewMode("projected")}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                viewMode === "projected"
                  ? "bg-accent-purple/20 text-accent-purple"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              Projected 72h
            </button>
          </div>
          <button
            onClick={() => setSimMode(!simMode)}
            className={`glass px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              simMode
                ? "border-accent-emerald/50 text-accent-emerald"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            {simMode ? "● Sim On" : "○ Simulation"}
          </button>
        </div>
      </div>

      {/* Projected 72h banner */}
      {viewMode === "projected" && (
        <div className="glass rounded-xl p-3 flex items-center gap-3 border-accent-purple/30">
          <span className="text-accent-purple text-sm">⏱</span>
          <span className="text-xs text-text-secondary">
            Showing <span className="font-semibold text-accent-purple">projected 72-hour</span> impact estimates.
            Scores are extrapolated with a 15% degradation factor.
          </span>
        </div>
      )}

      {/* KPI row */}
      {kpis && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          <KpiCard
            label="Severity"
            value={viewMode === "projected" ? Math.min(100, Math.round(kpis.severity * 1.15)) : kpis.severity}
            accent={sevColor}
          />
          <KpiCard
            label="Confidence"
            value={`${(kpis.confidence * 100).toFixed(0)}%`}
            confidence={kpis.confidence}
          />
          <KpiCard label="Prop. Depth" value={kpis.propagation_depth} accent="text-accent-purple" />
          <KpiCard label="Affected Nodes" value={kpis.affected_nodes} accent="text-accent-cyan" />
          <KpiCard
            label="Impacted Regions"
            value={kpis.impacted_regions}
            accent="text-severity-high"
          />
          <KpiCard
            label="Peak Delay"
            value={viewMode === "projected" ? Math.round(kpis.peak_delay_hours * 1.15) : kpis.peak_delay_hours}
            unit="hrs"
            accent="text-severity-critical"
          />
          <KpiCard
            label="Spread Index"
            value={kpis.national_spread_index.toFixed(2)}
            accent={
              kpis.national_spread_index > 0.5 ? "text-severity-critical" : "text-accent-emerald"
            }
          />
        </div>
      )}

      {/* Main content: Tree + Interventions */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        {/* Impact Tree */}
        <div className="glass rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              Cascading Impact Tree
            </h3>
            <div className="flex items-center gap-4 text-[9px] text-text-muted">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm bg-severity-critical" /> Critical ≥80
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm bg-severity-high" /> High ≥60
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm bg-severity-medium" /> Medium ≥40
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm bg-severity-low" /> Low &lt;40
              </span>
            </div>
          </div>
          {impact_tree && <ImpactTree tree={impact_tree} />}
        </div>

        {/* Interventions sidebar */}
        <div>
          <InterventionPanel interventions={interventions} />
        </div>
      </div>

      {/* Node breakdown table */}
      {flat_nodes && <NodeImpactTable nodes={flat_nodes} />}

      {/* Sim mode info */}
      {simMode && (
        <div className="glass rounded-xl p-4 border-accent-emerald/30 animate-slide-up">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
            <span className="text-xs font-semibold text-accent-emerald uppercase tracking-widest">
              Simulation Mode Active
            </span>
          </div>
          <p className="text-xs text-text-secondary">
            Simulation engine is connected via <code className="text-accent-cyan font-mono text-[10px]">POST /api/simulate</code>.
            Future integration will allow scenario testing with different intervention combinations.
          </p>
        </div>
      )}
    </div>
  );
}

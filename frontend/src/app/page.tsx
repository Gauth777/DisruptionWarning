"use client";

import { useEffect, useState } from "react";
import type { Region } from "@/lib/types";
import { api } from "@/lib/api";
import RegionCard from "@/components/RegionCard";

export default function HomePage() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getRegions().then((data) => {
      setRegions(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Region Intelligence
        </h2>
        <p className="text-sm text-text-secondary">
          Select a region to view active supply chain disruption alerts and cascading impact analysis.
        </p>
      </div>

      {/* Summary strip */}
      <div className="glass rounded-xl p-4 mb-8 flex items-center gap-8 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-fit">
          <span className="w-2 h-2 rounded-full bg-severity-critical animate-pulse" />
          <span className="text-xs text-text-muted">
            <span className="font-bold text-text-primary tabular-nums">
              {regions.reduce((s, r) => s + r.active_alerts, 0)}
            </span>{" "}
            Total Active Alerts
          </span>
        </div>
        <div className="w-px h-6 bg-border" />
        <div className="flex items-center gap-2 min-w-fit">
          <span className="text-xs text-text-muted">
            <span className="font-bold text-text-primary tabular-nums">
              {regions.reduce((s, r) => s + r.affected_nodes, 0)}
            </span>{" "}
            Nodes Affected
          </span>
        </div>
        <div className="w-px h-6 bg-border" />
        <div className="flex items-center gap-2 min-w-fit">
          <span className="text-xs text-text-muted">
            <span className="font-bold text-text-primary tabular-nums">5</span> Regions Monitored
          </span>
        </div>
        <div className="w-px h-6 bg-border" />
        <div className="flex items-center gap-2 min-w-fit">
          <span className="text-xs text-text-muted">
            Avg Risk{" "}
            <span className="font-bold text-severity-high tabular-nums">
              {regions.length
                ? Math.round(regions.reduce((s, r) => s + r.risk_index, 0) / regions.length)
                : 0}
            </span>
          </span>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-accent-cyan/30 border-t-accent-cyan rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map((region, i) => (
            <div key={region.id} style={{ animationDelay: `${i * 100}ms` }}>
              <RegionCard region={region} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

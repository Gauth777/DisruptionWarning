import Link from "next/link";
import type { Region } from "@/lib/types";
import { getStatusColor } from "@/lib/utils";

export default function RegionCard({ region }: { region: Region }) {
  const statusColor = getStatusColor(region.status);

  return (
    <Link href={`/region/${region.id}`}>
      <div className="glass glass-hover rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:glow-cyan group animate-slide-up">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent-cyan transition-colors">
              {region.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2 h-2 rounded-full ${
                region.status === "critical" ? "bg-severity-critical animate-pulse" :
                region.status === "elevated" ? "bg-severity-high" :
                "bg-severity-medium"
              }`} />
              <span className={`text-xs capitalize ${statusColor}`}>{region.status}</span>
            </div>
          </div>
          <div className="text-3xl font-bold tabular-nums text-text-primary">
            {region.risk_index}
            <span className="text-xs text-text-muted font-normal ml-1">/100</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-bg-primary/50 rounded-lg p-3">
            <span className="text-[10px] uppercase tracking-widest text-text-muted block">
              Active Alerts
            </span>
            <span className="text-xl font-bold tabular-nums text-severity-high">
              {region.active_alerts}
            </span>
          </div>
          <div className="bg-bg-primary/50 rounded-lg p-3">
            <span className="text-[10px] uppercase tracking-widest text-text-muted block">
              Affected Nodes
            </span>
            <span className="text-xl font-bold tabular-nums text-accent-cyan">
              {region.affected_nodes}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-text-muted">
            Risk Index
          </span>
          <div className="flex-1 mx-3 h-1.5 rounded-full bg-bg-primary overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                region.risk_index >= 70 ? "bg-severity-critical" :
                region.risk_index >= 50 ? "bg-severity-high" :
                "bg-severity-medium"
              }`}
              style={{ width: `${region.risk_index}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

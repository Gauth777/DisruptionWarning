import Link from "next/link";
import type { Alert } from "@/lib/types";
import { getSeverityColor, getSeverityLabel, getTypeIcon } from "@/lib/utils";

export default function AlertCard({ alert }: { alert: Alert }) {
  const sevColor = getSeverityColor(alert.severity);
  const sevLabel = getSeverityLabel(alert.severity);
  const icon = getTypeIcon(alert.type);

  return (
    <div className="glass rounded-xl p-5 animate-slide-up transition-all duration-300 hover:border-border-light">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{icon}</span>
          <div>
            <h4 className="text-sm font-semibold text-text-primary">{alert.title}</h4>
            <span className="text-[10px] uppercase tracking-widest text-text-muted">
              {alert.type}
            </span>
          </div>
        </div>
        <div className={`text-2xl font-bold tabular-nums ${sevColor}`}>
          {alert.severity}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-3">
        <div className="bg-bg-primary/50 rounded-lg p-2.5 text-center">
          <span className="text-[9px] uppercase tracking-widest text-text-muted block">
            Severity
          </span>
          <span className={`text-xs font-semibold ${sevColor}`}>{sevLabel}</span>
        </div>
        <div className="bg-bg-primary/50 rounded-lg p-2.5 text-center">
          <span className="text-[9px] uppercase tracking-widest text-text-muted block">
            Prob.
          </span>
          <span className="text-xs font-semibold text-text-primary">
            {(alert.probability * 100).toFixed(0)}%
          </span>
        </div>
        <div className="bg-bg-primary/50 rounded-lg p-2.5 text-center">
          <span className="text-[9px] uppercase tracking-widest text-text-muted block">
            ETA
          </span>
          <span className="text-xs font-semibold text-text-primary">{alert.eta_hours}h</span>
        </div>
        <div className="bg-bg-primary/50 rounded-lg p-2.5 text-center">
          <span className="text-[9px] uppercase tracking-widest text-text-muted block">
            Delay
          </span>
          <span className="text-xs font-semibold text-severity-high">
            {alert.expected_delay_hours}h
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                alert.cross_region_spread ? "bg-severity-critical" : "bg-accent-emerald"
              }`}
            />
            <span className="text-[10px] text-text-muted">
              {alert.cross_region_spread ? "Cross-Region" : "Contained"}
            </span>
          </div>
          <span className="text-[10px] text-text-muted">
            {alert.impacted_regions_count} region{alert.impacted_regions_count > 1 ? "s" : ""}
          </span>
          <span className="text-[10px] text-text-muted">{alert.impact_radius_km}km</span>
        </div>
        <Link
          href={`/alert/${alert.id}`}
          className="text-xs font-medium text-accent-cyan hover:text-accent-blue transition-colors flex items-center gap-1"
        >
          View Impact Tree →
        </Link>
      </div>
    </div>
  );
}

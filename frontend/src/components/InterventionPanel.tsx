import type { Intervention } from "@/lib/types";

function FeasibilityBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    high: "bg-accent-emerald/20 text-accent-emerald",
    medium: "bg-severity-medium/20 text-severity-medium",
    low: "bg-severity-critical/20 text-severity-critical",
  };
  return (
    <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium uppercase ${colors[level] || ""}`}>
      {level}
    </span>
  );
}

export default function InterventionPanel({
  interventions,
}: {
  interventions: Intervention[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
          Optimal Interventions
        </h3>
        <span className="text-[10px] text-text-muted">{interventions.length} strategies</span>
      </div>

      {interventions.map((int, i) => (
        <div
          key={int.id}
          className="glass rounded-xl p-4 animate-slide-up transition-all duration-300 hover:border-border-light"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tabular-nums text-accent-cyan">
                #{i + 1}
              </span>
              <div>
                <h4 className="text-xs font-semibold text-text-primary leading-tight">
                  {int.title}
                </h4>
                <FeasibilityBadge level={int.feasibility} />
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold tabular-nums text-accent-emerald">
                {int.strategy_score}
              </span>
              <span className="text-[9px] text-text-muted block">Score</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-bg-primary/50 rounded-lg p-2 text-center">
              <span className="text-[9px] uppercase tracking-widest text-text-muted block">
                Delay ↓
              </span>
              <span className="text-sm font-bold tabular-nums text-accent-emerald">
                {int.delay_reduction_pct}%
              </span>
            </div>
            <div className="bg-bg-primary/50 rounded-lg p-2 text-center">
              <span className="text-[9px] uppercase tracking-widest text-text-muted block">
                Loss ↓
              </span>
              <span className="text-sm font-bold tabular-nums text-accent-emerald">
                {int.loss_reduction_pct}%
              </span>
            </div>
            <div className="bg-bg-primary/50 rounded-lg p-2 text-center">
              <span className="text-[9px] uppercase tracking-widest text-text-muted block">
                Cost Δ
              </span>
              <span className="text-sm font-bold tabular-nums text-severity-high">
                ₹{int.cost_delta_lakhs}L
              </span>
            </div>
            <div className="bg-bg-primary/50 rounded-lg p-2 text-center">
              <span className="text-[9px] uppercase tracking-widest text-text-muted block">
                Recovery
              </span>
              <span className="text-sm font-bold tabular-nums text-accent-cyan">
                +{int.recovery_gain_hours}h
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

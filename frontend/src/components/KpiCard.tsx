interface KpiCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "neutral";
  accent?: string;
  confidence?: number;
}

export default function KpiCard({ label, value, unit, trend, accent, confidence }: KpiCardProps) {
  const trendIcon = trend === "up" ? "↑" : trend === "down" ? "↓" : "";
  const trendColor =
    trend === "up" ? "text-severity-critical" : trend === "down" ? "text-accent-emerald" : "";

  return (
    <div className="glass rounded-xl p-4 flex flex-col gap-1 min-w-[140px] animate-fade-in">
      <span className="text-[10px] uppercase tracking-widest text-text-muted">{label}</span>
      <div className="flex items-baseline gap-1.5">
        <span className={`text-2xl font-bold tabular-nums ${accent || "text-text-primary"}`}>
          {value}
        </span>
        {unit && <span className="text-xs text-text-secondary">{unit}</span>}
        {trendIcon && <span className={`text-xs ${trendColor}`}>{trendIcon}</span>}
      </div>
      {confidence !== undefined && (
        <div className="mt-1 flex items-center gap-1.5">
          <div className="flex-1 h-1 rounded-full bg-bg-primary overflow-hidden">
            <div
              className="h-full rounded-full bg-accent-cyan/60 transition-all duration-700"
              style={{ width: `${confidence * 100}%` }}
            />
          </div>
          <span className="text-[9px] text-text-muted">{(confidence * 100).toFixed(0)}%</span>
        </div>
      )}
    </div>
  );
}

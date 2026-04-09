export function getSeverityColor(score: number): string {
  if (score >= 80) return "text-severity-critical";
  if (score >= 60) return "text-severity-high";
  if (score >= 40) return "text-severity-medium";
  return "text-severity-low";
}

export function getSeverityBg(score: number): string {
  if (score >= 80) return "bg-severity-critical/20 border-severity-critical/40";
  if (score >= 60) return "bg-severity-high/20 border-severity-high/40";
  if (score >= 40) return "bg-severity-medium/20 border-severity-medium/40";
  return "bg-severity-low/20 border-severity-low/40";
}

export function getSeverityLabel(score: number): string {
  if (score >= 80) return "Critical";
  if (score >= 60) return "High";
  if (score >= 40) return "Medium";
  return "Low";
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    critical: "text-severity-critical",
    elevated: "text-severity-high",
    moderate: "text-severity-medium",
    low: "text-severity-low",
  };
  return map[status] || "text-text-secondary";
}

export function getTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    weather: "🌀",
    strike: "⚡",
    logistics: "🚢",
    supply: "📦",
    infrastructure: "🏗️",
  };
  return icons[type] || "⚠️";
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-IN").format(n);
}

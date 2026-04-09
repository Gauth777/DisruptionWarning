import type { FlatNode } from "@/lib/types";
import { getSeverityColor } from "@/lib/utils";

export default function NodeImpactTable({ nodes }: { nodes: FlatNode[] }) {
  const levelLabels = ["Root", "L1 · Infrastructure", "L2 · Operational", "L3 · Business"];

  return (
    <div className="glass rounded-xl overflow-hidden animate-fade-in">
      <div className="p-4 border-b border-border">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
          Node Breakdown
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border text-text-muted">
              <th className="text-left p-3 font-medium">Node</th>
              <th className="text-center p-3 font-medium">Level</th>
              <th className="text-center p-3 font-medium">Score</th>
              <th className="text-center p-3 font-medium">Contribution</th>
              <th className="text-center p-3 font-medium">Delay</th>
              <th className="text-left p-3 font-medium">Region</th>
            </tr>
          </thead>
          <tbody>
            {nodes.map((node) => (
              <tr
                key={node.id}
                className="border-b border-border/50 hover:bg-bg-card-hover transition-colors"
              >
                <td className="p-3 font-medium text-text-primary">{node.label}</td>
                <td className="p-3 text-center">
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-bg-primary text-text-secondary">
                    {levelLabels[node.level] || `L${node.level}`}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <span className={`font-bold tabular-nums ${getSeverityColor(node.score)}`}>
                    {node.score}
                  </span>
                </td>
                <td className="p-3 text-center tabular-nums text-text-secondary">
                  {node.contribution}%
                </td>
                <td className="p-3 text-center tabular-nums text-text-secondary">
                  {node.delay_hours}h
                </td>
                <td className="p-3">
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-accent-cyan/10 text-accent-cyan font-medium">
                    {node.region}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import type { TreeNode } from "@/lib/types";
import { getSeverityColor, getSeverityBg } from "@/lib/utils";

function TreeNodeCard({ node, isRoot }: { node: TreeNode; isRoot?: boolean }) {
  const sevColor = getSeverityColor(node.score);
  const sevBg = getSeverityBg(node.score);

  return (
    <div className="flex flex-col items-center">
      {/* Node card */}
      <div
        className={`rounded-xl border p-3.5 min-w-[180px] max-w-[200px] transition-all duration-300 hover:scale-105 ${
          isRoot
            ? "bg-severity-critical/10 border-severity-critical/50 glow-cyan min-w-[220px]"
            : sevBg
        }`}
        style={{ animationDelay: `${node.level * 150}ms` }}
      >
        <div className="flex items-start justify-between mb-2">
          <span
            className={`text-xs font-semibold leading-tight ${
              isRoot ? "text-severity-critical" : "text-text-primary"
            }`}
          >
            {node.label}
          </span>
          <span className={`text-lg font-bold tabular-nums ml-2 ${sevColor}`}>{node.score}</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-bg-primary/60 text-accent-cyan font-medium">
            {node.region}
          </span>
          <span className="text-[9px] text-text-muted tabular-nums">
            {node.contribution}%
          </span>
          <span className="text-[9px] text-text-muted tabular-nums">
            {node.delay_hours}h
          </span>
        </div>
        {/* Score bar */}
        <div className="mt-2 h-1 rounded-full bg-bg-primary/60 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              node.score >= 80 ? "bg-severity-critical" :
              node.score >= 60 ? "bg-severity-high" :
              node.score >= 40 ? "bg-severity-medium" :
              "bg-severity-low"
            }`}
            style={{ width: `${node.score}%` }}
          />
        </div>
      </div>

      {/* Children */}
      {node.children && node.children.length > 0 && (
        <>
          {/* Vertical connector from parent */}
          <div className="w-px h-6 bg-border-light" />

          {/* Horizontal bar and children */}
          <div className="relative">
            {node.children.length > 1 && (
              <div
                className="absolute top-0 h-px bg-border-light"
                style={{
                  left: "50%",
                  right: "50%",
                  transform: `translateX(-${(node.children.length - 1) * 50}%)`,
                  width: `${(node.children.length - 1) * 100}%`,
                  marginLeft: `-${((node.children.length - 1) * 100) / 2}%`,
                }}
              />
            )}
            <div className="flex gap-4 items-start">
              {node.children.map((child) => (
                <div key={child.id} className="flex flex-col items-center">
                  <div className="w-px h-6 bg-border-light" />
                  <TreeNodeCard node={child} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function ImpactTree({ tree }: { tree: TreeNode }) {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="inline-flex justify-center min-w-full p-6">
        <TreeNodeCard node={tree} isRoot />
      </div>
    </div>
  );
}

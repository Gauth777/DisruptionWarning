"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-50 glass border-b border-border">
      <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center text-sm font-bold text-bg-primary">
            EW
          </div>
          <div>
            <h1 className="text-sm font-semibold text-text-primary tracking-tight group-hover:text-accent-cyan transition-colors">
              Early Warning
            </h1>
            <p className="text-[10px] text-text-muted uppercase tracking-widest">
              Supply Chain Predictor
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          {!isHome && (
            <Link
              href="/"
              className="text-xs text-text-secondary hover:text-accent-cyan transition-colors"
            >
              ← All Regions
            </Link>
          )}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse-slow" />
            <span className="text-xs text-text-muted">System Active</span>
          </div>
        </div>
      </div>
    </header>
  );
}

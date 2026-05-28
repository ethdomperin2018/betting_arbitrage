"use client";

import { useState } from "react";
import { AppSidebar } from "./AppSidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-0 w-full flex-1 bg-[#0a0a0a] text-zinc-100">
      <div className="hidden lg:flex">
        <AppSidebar />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative h-full w-[min(100%,260px)] shadow-xl">
            <AppSidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center border-b border-white/[0.06] bg-zinc-950 px-4 py-3 lg:hidden">
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-md border border-white/10"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <span className="h-0.5 w-4 bg-zinc-400" />
            <span className="h-0.5 w-4 bg-zinc-400" />
            <span className="h-0.5 w-4 bg-zinc-400" />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}

import type { ReactNode } from "react";

type MockFrameProps = {
  children: ReactNode;
  url?: string;
  variant?: "browser" | "phone";
  className?: string;
  glow?: boolean;
};

export function MockFrame({
  children,
  url = "clutchodds.com/arbitrage",
  variant = "browser",
  className = "",
  glow = true,
}: MockFrameProps) {
  if (variant === "phone") {
    return (
      <div className={`relative isolate ${className}`}>
        {glow && (
          <div
            className="pointer-events-none absolute -inset-3 z-0 rounded-3xl bg-[var(--brand-red)]/10 blur-2xl"
            aria-hidden
          />
        )}
        <div className="relative z-10 overflow-hidden rounded-[1.35rem] border-2 border-zinc-700 bg-black p-1.5 shadow-2xl shadow-black/70">
          <div className="flex justify-center py-1.5">
            <span className="h-1 w-12 rounded-full bg-zinc-800" />
          </div>
          <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative isolate ${className}`}>
      {glow && (
        <div
          className="pointer-events-none absolute -inset-4 z-0 rounded-2xl bg-[var(--brand-red)]/10 blur-3xl"
          aria-hidden
        />
      )}
      <div className="glow-red relative z-10 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-zinc-900 to-black shadow-2xl">
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#0f0f0f] px-3 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="ml-2 flex flex-1 items-center rounded-md border border-white/[0.06] bg-black/60 px-3 py-1">
            <span className="truncate text-[10px] text-zinc-500">{url}</span>
          </div>
        </div>
        <div className="p-3 sm:p-4">{children}</div>
      </div>
    </div>
  );
}

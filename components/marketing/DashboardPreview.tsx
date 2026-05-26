import { BookLogo } from "@/components/BookLogo";

const MOCK_ROWS = [
  {
    event: "DAL Mavericks @ BOS Celtics",
    market: "Moneyline",
    bookA: { key: "fanduel", title: "FanDuel" },
    bookB: { key: "draftkings", title: "DraftKings" },
    profit: "+6.32%",
    hot: true,
  },
  {
    event: "LAL Lakers @ GSW Warriors",
    market: "Moneyline",
    bookA: { key: "betmgm", title: "BetMGM" },
    bookB: { key: "betrivers", title: "BetRivers" },
    profit: "+2.18%",
    hot: false,
  },
  {
    event: "NYK Knicks @ PHI 76ers",
    market: "Moneyline",
    bookA: { key: "draftkings", title: "DraftKings" },
    bookB: { key: "fanduel", title: "FanDuel" },
    profit: "+1.94%",
    hot: false,
  },
];

function OpportunitiesTable({
  compact,
  showScan,
}: {
  compact?: boolean;
  showScan?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-white/[0.08] bg-[#080808] ${compact ? "text-[9px]" : "text-[11px]"}`}
    >
      {showScan && (
        <div
          className="pointer-events-none absolute left-0 right-0 z-10 h-px bg-gradient-to-r from-transparent via-[var(--brand-red)] to-transparent [animation:scan-line_4s_ease-in-out_infinite]"
          aria-hidden
        />
      )}
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-3 py-2">
        <span className="font-display text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
          Opportunities
        </span>
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--profit-green)] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--profit-green)]" />
          </span>
          <span className="text-[9px] font-medium uppercase text-[var(--profit-green)]">
            Live
          </span>
        </span>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/[0.04] text-left text-[8px] uppercase tracking-wider text-zinc-600">
            <th className="px-2.5 py-2 font-medium">Event</th>
            <th className="px-2 py-2 font-medium">Market</th>
            <th className="px-2 py-2 font-medium">Books</th>
            <th className="px-2.5 py-2 text-right font-medium">Profit</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_ROWS.map((row) => (
            <tr
              key={row.event}
              className={`border-b border-white/[0.04] last:border-0 ${row.hot ? "bg-[var(--brand-red)]/[0.06]" : ""}`}
            >
              <td className="max-w-[120px] truncate px-2.5 py-2.5 font-medium text-zinc-200">
                {row.event}
              </td>
              <td className="px-2 py-2.5 text-zinc-500">{row.market}</td>
              <td className="px-2 py-2.5">
                <div className="flex items-center gap-1">
                  <BookLogo
                    bookKey={row.bookA.key}
                    bookTitle={row.bookA.title}
                    size={compact ? 16 : 20}
                  />
                  <BookLogo
                    bookKey={row.bookB.key}
                    bookTitle={row.bookB.title}
                    size={compact ? 16 : 20}
                  />
                </div>
              </td>
              <td className="px-2.5 py-2.5 text-right font-display text-sm font-bold text-[var(--profit-green)]">
                {row.profit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BrowserChrome({ url }: { url: string }) {
  return (
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
  );
}

export function DashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--brand-red)]/20 blur-[80px] animate-pulse-glow"
        aria-hidden
      />

      {/* Laptop */}
      <div
        className="relative z-10 mx-auto w-full max-w-[540px] animate-float"
        style={{ perspective: "1400px" }}
      >
        <div
          className="glow-red overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-zinc-900 to-black shadow-2xl"
          style={{
            transform: "rotateY(-10deg) rotateX(4deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <BrowserChrome url="clutchodds.com/arbitrage" />
          <div className="p-3 sm:p-4">
            <OpportunitiesTable showScan />
          </div>
          <div className="h-3 bg-gradient-to-b from-zinc-800 to-zinc-950" />
          <div className="mx-auto h-2 w-[92%] rounded-b-lg bg-zinc-800" />
        </div>
      </div>

      {/* Phone */}
      <div
        className="absolute -bottom-4 -left-2 z-20 w-[38%] max-w-[168px] sm:-left-6 sm:bottom-2 sm:max-w-[190px]"
        style={{ transform: "rotate(-6deg)" }}
      >
        <div className="overflow-hidden rounded-[1.25rem] border-2 border-zinc-700 bg-black p-1 shadow-2xl shadow-black/80">
          <div className="flex justify-center py-1">
            <span className="h-1 w-10 rounded-full bg-zinc-800" />
          </div>
          <div className="rounded-[1rem] border border-white/[0.06] bg-zinc-950 p-1.5">
            <OpportunitiesTable compact />
          </div>
        </div>
      </div>

      {/* Floating profit badge */}
      <div className="absolute -right-2 top-8 z-30 hidden rounded-lg border border-[var(--profit-green)]/30 bg-black/90 px-3 py-2 shadow-lg sm:block">
        <p className="text-[9px] uppercase tracking-wider text-zinc-500">Best arb</p>
        <p className="font-display text-2xl font-bold text-[var(--profit-green)]">
          +6.32%
        </p>
      </div>
    </div>
  );
}

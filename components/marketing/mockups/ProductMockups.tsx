import { BookLogo } from "@/components/BookLogo";

const PNL_BARS = [38, 52, 45, 68, 58, 82, 74, 92, 88, 96, 85, 100];

export function ScanFeedMock() {
  const rows = [
    { event: "DAL @ BOS", profit: "+6.32%", hot: true },
    { event: "LAL @ GSW", profit: "+2.18%", hot: false },
    { event: "NYK @ PHI", profit: "+1.94%", hot: false },
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#080808] text-[11px]">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
        <span className="font-display text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
          Live scan · 4 leagues
        </span>
        <span className="flex items-center gap-1 text-[9px] font-medium uppercase text-[var(--profit-green)]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--profit-green)]" />
          Scanning
        </span>
      </div>
      <ul className="divide-y divide-white/[0.04]">
        {rows.map((r) => (
          <li
            key={r.event}
            className={`flex items-center justify-between px-3 py-2.5 ${r.hot ? "bg-[var(--brand-red)]/[0.08]" : ""}`}
          >
            <span className="font-medium text-zinc-200">{r.event}</span>
            <span className="font-display font-bold text-[var(--profit-green)]">{r.profit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ArbDetailMock() {
  return (
    <div className="overflow-hidden rounded-lg border border-emerald-900/40 bg-gradient-to-br from-emerald-950/40 to-zinc-950 text-[11px]">
      <div className="border-b border-white/[0.06] px-3 py-2">
        <p className="text-[9px] uppercase text-zinc-500">NBA · Tonight 7:30 PM</p>
        <p className="mt-0.5 font-display text-sm font-bold text-white">
          Mavericks @ Celtics
        </p>
      </div>
      <div className="space-y-2 px-3 py-3">
        <div className="flex items-center gap-2 rounded-md bg-black/40 px-2 py-2">
          <BookLogo bookKey="fanduel" bookTitle="FanDuel" size={22} />
          <div className="min-w-0 flex-1">
            <p className="text-zinc-400">Celtics ML</p>
            <p className="font-semibold text-emerald-400">+145 · $412</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-md bg-black/40 px-2 py-2">
          <BookLogo bookKey="draftkings" bookTitle="DraftKings" size={22} />
          <div className="min-w-0 flex-1">
            <p className="text-zinc-400">Mavericks ML</p>
            <p className="font-semibold text-emerald-400">-132 · $588</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-white/[0.06] bg-emerald-950/30 px-3 py-2.5">
        <span className="text-zinc-400">Guaranteed profit</span>
        <span className="font-display text-lg font-bold text-[var(--profit-green)]">
          $63.20
        </span>
      </div>
    </div>
  );
}

export function PnlDashboardMock() {
  const max = Math.max(...PNL_BARS);

  return (
    <div className="space-y-3 text-[11px]">
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Total PNL", value: "+$2,847", positive: true },
          { label: "ROI", value: "+4.2%", positive: true },
          { label: "Arbs logged", value: "38", positive: false },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-white/[0.06] bg-black/50 px-2 py-2 text-center"
          >
            <p className="text-[9px] uppercase tracking-wider text-zinc-500">{s.label}</p>
            <p
              className={`font-display mt-1 text-sm font-bold ${s.positive ? "text-[var(--profit-green)]" : "text-white"}`}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-white/[0.08] bg-[#080808] p-3">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-display text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
            PNL · Last 30 days
          </span>
          <span className="text-[9px] text-zinc-600">Manual bet log</span>
        </div>
        <div className="flex h-28 items-end justify-between gap-1">
          {PNL_BARS.map((h, i) => (
            <div
              key={i}
              className="w-full rounded-t-sm bg-gradient-to-t from-[var(--brand-red)] to-[var(--profit-green)]/80"
              style={{ height: `${(h / max) * 100}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function BetLogMock() {
  const rows = [
    { game: "DAL @ BOS", profit: "+$63", result: "won" },
    { game: "LAL @ GSW", profit: "+$22", result: "won" },
    { game: "NYK @ PHI", profit: "—", result: "pending" },
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#080808] text-[10px]">
      <div className="border-b border-white/[0.06] px-3 py-2 font-display text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
        Manual bet log
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/[0.04] text-left text-[8px] uppercase text-zinc-600">
            <th className="px-2 py-1.5">Game</th>
            <th className="px-2 py-1.5">Profit</th>
            <th className="px-2 py-1.5">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.game} className="border-b border-white/[0.04] last:border-0">
              <td className="px-2 py-2 text-zinc-300">{r.game}</td>
              <td className="px-2 py-2 font-semibold text-[var(--profit-green)]">
                {r.profit}
              </td>
              <td className="px-2 py-2">
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[8px] uppercase ${
                    r.result === "won"
                      ? "bg-emerald-950 text-emerald-400"
                      : "bg-zinc-900 text-zinc-500"
                  }`}
                >
                  {r.result}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TelegramAlertMock() {
  return (
    <div className="space-y-2 p-3 text-[10px]">
      <div className="rounded-lg border border-[#2AABEE]/30 bg-[#1a2a35] p-2.5">
        <p className="font-semibold text-[#2AABEE]">Clutch Odds Bot</p>
        <p className="mt-1.5 leading-relaxed text-zinc-300">
          <span className="font-bold text-white">ARB</span> · NBA
          <br />
          Mavericks @ Celtics
          <br />
          <span className="text-[var(--profit-green)]">+6.32% ROI · $63.20 profit</span>
        </p>
        <p className="mt-2 text-[9px] text-zinc-500">FanDuel +145 · DraftKings -132</p>
      </div>
      <div className="rounded-lg border border-white/[0.06] bg-zinc-900/80 p-2 text-zinc-500">
        Tap to open scanner →
      </div>
    </div>
  );
}

export function FiltersMock() {
  return (
    <div className="space-y-2 p-1 text-[11px]">
      {[
        { label: "Total stake", value: "$1,000" },
        { label: "Min ROI %", value: "1.0" },
        { label: "Refresh", value: "3600s · Auto" },
      ].map((f) => (
        <div
          key={f.label}
          className="flex items-center justify-between rounded-md border border-zinc-800 bg-zinc-900/80 px-2.5 py-2"
        >
          <span className="text-zinc-500">{f.label}</span>
          <span className="font-medium text-white">{f.value}</span>
        </div>
      ))}
      <button
        type="button"
        className="w-full rounded-md bg-emerald-600 py-2 text-center text-[10px] font-semibold text-white"
      >
        Full refresh
      </button>
    </div>
  );
}

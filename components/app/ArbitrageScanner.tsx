"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ArbitrageOpportunity, GameLineSummary } from "@/lib/odds/types";
import { formatAmerican } from "@/lib/odds/format";
import { arbRoiPercent } from "@/lib/odds/roi";
import { BookLogo } from "@/components/BookLogo";
import { ManualBetsPanel } from "@/components/ManualBetsPanel";
import {
  buildDemoOddsPayload,
  demoLoadDelayMs,
  OPPORTUNITIES_USE_DEMO_DATA,
} from "@/lib/opportunities-demo";

interface OddsPayload {
  fetchedAt?: string;
  sports?: string[];
  market?: string;
  requestedTotalStake?: number;
  arbitrageOpportunities?: ArbitrageOpportunity[];
  games?: GameLineSummary[];
  error?: string;
  light?: boolean;
}

/** Auto-refresh interval (seconds). Default 1 hour. */
const DEFAULT_INTERVAL_SEC = 3600;

function formatUpdatedAgo(ms: number): string {
  const sec = Math.max(0, Math.floor(ms / 1000));
  if (sec === 0) return "just now";
  if (sec === 1) return "1 second ago";
  if (sec < 60) return `${sec} seconds ago`;
  const min = Math.floor(sec / 60);
  return min === 1 ? "1 minute ago" : `${min} minutes ago`;
}

export function ArbitrageScanner({ showBetLog = false }: { showBetLog?: boolean }) {
  const [totalStake, setTotalStake] = useState("1000");
  const [data, setData] = useState<OddsPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [betsRefresh, setBetsRefresh] = useState(0);
  const [logBetStatus, setLogBetStatus] = useState<string | null>(null);

  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshIntervalSec, setRefreshIntervalSec] = useState(
    String(DEFAULT_INTERVAL_SEC)
  );
  const [minRoiPercent, setMinRoiPercent] = useState("0");

  const [lastUpdatedAt, setLastUpdatedAt] = useState<number | null>(null);
  const [nowMs, setNowMs] = useState(() => Date.now());

  const abortRef = useRef<AbortController | null>(null);

  const stakeNum = useMemo(() => {
    const n = Number(totalStake);
    return Number.isFinite(n) && n > 0 ? n : 1000;
  }, [totalStake]);

  const intervalSec = useMemo(() => {
    const n = Number(refreshIntervalSec);
    if (!Number.isFinite(n) || n < 1) return DEFAULT_INTERVAL_SEC;
    return Math.floor(n);
  }, [refreshIntervalSec]);

  const minRoi = useMemo(() => {
    const n = Number(minRoiPercent);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  }, [minRoiPercent]);

  const load = useCallback(
    async (options?: { light?: boolean }) => {
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;

      setLoading(true);
      try {
        if (OPPORTUNITIES_USE_DEMO_DATA) {
          await new Promise((r) => window.setTimeout(r, demoLoadDelayMs()));
          if (ctrl.signal.aborted) return;
          setData(buildDemoOddsPayload(stakeNum));
          setLastUpdatedAt(Date.now());
          return;
        }

        const q = new URLSearchParams({ totalStake: String(stakeNum) });
        if (options?.light) q.set("light", "1");
        const res = await fetch(`/api/odds?${q}`, {
          cache: "no-store",
          signal: ctrl.signal,
        });
        const json = (await res.json()) as OddsPayload;
        if (!res.ok && !json.error) {
          json.error = `Request failed (${res.status})`;
        }
        if (ctrl.signal.aborted) return;
        setData(json);
        setLastUpdatedAt(Date.now());
      } catch (e) {
        if (ctrl.signal.aborted) return;
        setData({
          error: e instanceof Error ? e.message : "Failed to load odds",
        });
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    },
    [stakeNum]
  );

  useEffect(() => {
    const t = window.setTimeout(() => void load({ light: true }), 0);
    return () => window.clearTimeout(t);
  }, [load]);

  useEffect(() => {
    if (!autoRefresh) return;
    const id = window.setInterval(() => {
      void load({ light: true });
    }, intervalSec * 1000);
    return () => window.clearInterval(id);
  }, [autoRefresh, intervalSec, load]);

  useEffect(() => {
    const id = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const allArbs = useMemo(
    () => data?.arbitrageOpportunities ?? [],
    [data?.arbitrageOpportunities]
  );
  const arbs = useMemo(
    () => allArbs.filter((a) => arbRoiPercent(a) >= minRoi),
    [allArbs, minRoi]
  );
  const games = data?.games ?? [];
  const nearMiss = games.filter(
    (g) => !g.isArbitrage && g.impliedProbabilitySum < 1.02
  );

  const updatedAgoLabel =
    lastUpdatedAt === null
      ? null
      : formatUpdatedAgo(nowMs - lastUpdatedAt);

  async function logBet(arb: ArbitrageOpportunity) {
    setLogBetStatus("Saving…");
    if (OPPORTUNITIES_USE_DEMO_DATA) {
      window.setTimeout(() => {
        setLogBetStatus(`Bet logged (demo): ${arb.matchup}`);
        window.setTimeout(() => setLogBetStatus(null), 3000);
      }, 300);
      return;
    }
    try {
      const res = await fetch("/api/bets/from-arb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(arb),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) {
        setLogBetStatus(json.error ?? "Failed to log bet");
        return;
      }
      setBetsRefresh((n) => n + 1);
      setLogBetStatus("Bet logged.");
      window.setTimeout(() => setLogBetStatus(null), 3000);
    } catch (e) {
      setLogBetStatus(e instanceof Error ? e.message : "Failed to log bet");
    }
  }

  return (
    <>
     <header className="mb-8 border-b border-zinc-800 pb-6">
       <p className="mt-1 max-w-2xl text-sm leading-relaxed text-zinc-400">
         {OPPORTUNITIES_USE_DEMO_DATA ? (
           <>
             Showing <strong className="font-medium text-zinc-300">sample opportunities</strong>{" "}
             for preview. Stake and ROI filters still apply to the demo list.
           </>
         ) : (
           <>
             Auto-refreshes odds on an interval. Use{" "}
             <strong className="font-medium text-zinc-300">Full refresh</strong>{" "}
             to save to Neon and run Telegram alerts. Auto-refresh uses light mode
             (display only, ~4 API credits per tick).
           </>
         )}
       </p>

       <div className="mt-6 flex flex-wrap items-end gap-4">
         <label className="flex flex-col gap-1 text-xs text-zinc-500">
           <span>Total stake ($)</span>
           <input
             type="number"
             min={1}
             step="1"
             value={totalStake}
             onChange={(e) => setTotalStake(e.target.value)}
             className="w-40 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500/60"
           />
         </label>
         <label className="flex flex-col gap-1 text-xs text-zinc-500">
           <span>Min ROI % (arbs)</span>
           <input
             type="number"
             min={0}
             step="0.1"
             value={minRoiPercent}
             onChange={(e) => setMinRoiPercent(e.target.value)}
             className="w-28 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500/60"
           />
         </label>
         <label className="flex flex-col gap-1 text-xs text-zinc-500">
           <span>Interval (sec)</span>
           <input
             type="number"
             min={1}
             step="1"
             value={refreshIntervalSec}
             onChange={(e) => setRefreshIntervalSec(e.target.value)}
             disabled={!autoRefresh}
             className="w-24 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500/60 disabled:opacity-50"
           />
         </label>
         <label className="flex items-center gap-2 pb-2 text-sm text-zinc-300">
           <input
             type="checkbox"
             checked={autoRefresh}
             onChange={(e) => setAutoRefresh(e.target.checked)}
             className="rounded border-zinc-600 bg-zinc-900"
           />
           Auto-refresh
         </label>
         <button
           type="button"
           onClick={() => void load({ light: false })}
           disabled={loading}
           className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:opacity-50"
         >
           {loading ? "Refreshing…" : OPPORTUNITIES_USE_DEMO_DATA ? "Refresh demo" : "Full refresh"}
         </button>
       </div>

       <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500">
         {updatedAgoLabel && (
           <span className="text-zinc-400">
             Updated {updatedAgoLabel}
             {autoRefresh && (
               <span className="text-zinc-600">
                 {" "}
                 · next in ~{intervalSec}s
               </span>
             )}
           </span>
         )}
         {data?.fetchedAt && (
           <span>
             Snapshot:{" "}
             <time dateTime={data.fetchedAt}>
               {new Date(data.fetchedAt).toLocaleString()}
             </time>
           </span>
         )}
         {loading && (
           <span className="text-emerald-500/80">
             {OPPORTUNITIES_USE_DEMO_DATA ? "Updating demo…" : "Fetching…"}
           </span>
         )}
       </div>

       {data?.error && !OPPORTUNITIES_USE_DEMO_DATA && (
         <p className="mt-4 rounded-lg border border-amber-900/60 bg-amber-950/40 px-4 py-3 text-sm text-amber-200">
           {data.error}
         </p>
       )}
     </header>

     <section className="mb-12">
       <h2 className="text-lg font-medium text-white">Arbitrage opportunities</h2>
       <p className="mt-1 text-sm text-zinc-500">
         {data?.market} · Regions: US
         {minRoi > 0 && (
           <span className="text-zinc-400">
             {" "}
             · Showing ROI ≥ {minRoi}%
             {allArbs.length > arbs.length &&
               ` (${allArbs.length - arbs.length} hidden)`}
           </span>
         )}
       </p>

       {arbs.length === 0 && !loading && (
         <p className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-8 text-center text-sm text-zinc-400">
           {allArbs.length > 0 && minRoi > 0
             ? `${allArbs.length} arb(s) found but none meet ROI ≥ ${minRoi}%. Lower the filter or refresh.`
             : OPPORTUNITIES_USE_DEMO_DATA
               ? "No demo arbs match your ROI filter. Lower Min ROI % or refresh."
               : `No cross-book arb on this snapshot (${games.length} games). Arbs are rare — try full refresh after line moves.`}
         </p>
       )}

       <ul className="mt-6 space-y-6">
         {arbs.map((arb) => (
           <li
             key={arb.eventId}
             className="rounded-2xl border border-emerald-900/40 bg-gradient-to-br from-emerald-950/30 to-zinc-900/80 p-5 shadow-lg shadow-black/20"
           >
             <div className="flex flex-wrap items-baseline justify-between gap-2">
               <div>
                 <p className="text-xs uppercase text-zinc-500">
                   {arb.sportTitle} ·{" "}
                   {new Date(arb.commenceTime).toLocaleString()}
                 </p>
                 <p className="mt-1 text-xl font-semibold text-white">
                   {arb.matchup}
                 </p>
               </div>
               <div className="text-right text-sm text-emerald-300">
                 <div>
                   ROI {arbRoiPercent(arb).toFixed(2)}% · profit $
                   {arb.guaranteedProfit.toFixed(2)}
                 </div>
                 <div className="text-zinc-400">
                   Implied Σ {arb.impliedProbabilitySum.toFixed(4)}
                 </div>
               </div>
             </div>

             <ul className="mt-4 space-y-2 border-t border-zinc-800 pt-4 text-sm">
               {arb.legs.map((leg) => (
                 <li
                   key={leg.side}
                   className="flex flex-wrap items-center gap-x-2 gap-y-1 text-zinc-200"
                 >
                   <BookLogo
                     bookKey={leg.bookKey}
                     bookTitle={leg.bookTitle}
                     size={30}
                   />
                   <span className="font-medium text-white">
                     {leg.bookTitle}
                   </span>
                   <span className="text-zinc-500">→</span>
                   <span>{leg.teamName}</span>
                   <span className="text-emerald-400">
                     {formatAmerican(leg.american)}
                   </span>
                   <span className="text-zinc-500">·</span>
                   <span>decimal {leg.decimalOdds.toFixed(3)}</span>
                   <span className="ml-auto tabular-nums text-white">
                     ${leg.stake.toFixed(2)}
                   </span>
                 </li>
               ))}
             </ul>

             <p className="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-300">
               <span>
                 <span className="text-zinc-500">Total staked:</span>{" "}
                 <span className="tabular-nums text-white">
                   ${arb.totalStake.toFixed(2)}
                 </span>
               </span>
               <button
                 type="button"
                 onClick={() => void logBet(arb)}
                 className="rounded-lg border border-zinc-600 px-3 py-1 text-xs font-medium text-zinc-200 hover:border-emerald-600 hover:text-emerald-300 cursor-pointer"
               >
                 Log bet
               </button>
             </p>
           </li>
         ))}
       </ul>
     </section>

     <section>
       <h2 className="text-lg font-medium text-white">Best prices per side</h2>
       <p className="mt-1 text-sm text-zinc-500">
         Top sheet per team across books.{" "}
         <span className="text-zinc-400">
           {nearMiss.length} near-miss (Σ &lt; 1.02).
         </span>
       </p>

       <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-800">
         <table className="w-full min-w-[640px] text-left text-sm">
           <thead className="bg-zinc-900/80 text-xs uppercase text-zinc-500">
             <tr>
               <th className="px-4 py-3 font-medium">Game</th>
               <th className="px-4 py-3 font-medium">Best home</th>
               <th className="px-4 py-3 font-medium">Best away</th>
               <th className="px-4 py-3 font-medium">1/d₁ + 1/d₂</th>
               <th className="px-4 py-3 font-medium">Arb?</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-zinc-800 bg-zinc-950/80">
             {games.map((g) => (
               <tr key={g.eventId} className="hover:bg-zinc-900/60">
                 <td className="px-4 py-3">
                   <div className="font-medium text-white">{g.matchup}</div>
                   <div className="text-xs text-zinc-500">{g.sportTitle}</div>
                 </td>
                 <td className="px-4 py-3 text-zinc-300">
                   {g.homeBestLine ? (
                     <div className="flex items-start gap-2">
                       <BookLogo
                         bookKey={g.homeBestLine.bookKey}
                         bookTitle={g.homeBestLine.bookTitle}
                         size={26}
                         className="mt-0.5"
                       />
                       <div>
                         {g.homeBestLine.bookTitle} ·{" "}
                         <span className="text-emerald-400">
                           {formatAmerican(g.homeBestLine.american)}
                         </span>
                         <div className="text-xs text-zinc-600">
                           d={g.homeBestLine.decimalOdds.toFixed(3)}
                         </div>
                       </div>
                     </div>
                   ) : (
                     "—"
                   )}
                 </td>
                 <td className="px-4 py-3 text-zinc-300">
                   {g.awayBestLine ? (
                     <div className="flex items-start gap-2">
                       <BookLogo
                         bookKey={g.awayBestLine.bookKey}
                         bookTitle={g.awayBestLine.bookTitle}
                         size={26}
                         className="mt-0.5"
                       />
                       <div>
                         {g.awayBestLine.bookTitle} ·{" "}
                         <span className="text-emerald-400">
                           {formatAmerican(g.awayBestLine.american)}
                         </span>
                         <div className="text-xs text-zinc-600">
                           d={g.awayBestLine.decimalOdds.toFixed(3)}
                         </div>
                       </div>
                     </div>
                   ) : (
                     "—"
                   )}
                 </td>
                 <td className="px-4 py-3 tabular-nums text-zinc-300">
                   {g.homeBestLine && g.awayBestLine
                     ? g.impliedProbabilitySum.toFixed(4)
                     : "—"}
                 </td>
                 <td className="px-4 py-3">
                   {g.isArbitrage ? (
                     <span className="rounded-full bg-emerald-950 px-2 py-0.5 text-xs font-medium text-emerald-300">
                       Yes
                     </span>
                   ) : (
                     <span className="text-xs text-zinc-500">No</span>
                   )}
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>

       {!loading && games.length === 0 && !data?.error && !OPPORTUNITIES_USE_DEMO_DATA && (
         <p className="mt-6 text-center text-sm text-zinc-500">
           No games returned. Check API key and league schedule.
         </p>
       )}
     </section>

     {logBetStatus && (
       <p className="mb-4 text-sm text-zinc-400">{logBetStatus}</p>
     )}

     {showBetLog && <ManualBetsPanel refreshToken={betsRefresh} />}
    </>
  );
}

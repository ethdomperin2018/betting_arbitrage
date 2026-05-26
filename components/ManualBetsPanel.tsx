"use client";

import { useCallback, useEffect, useState } from "react";
import { formatAmerican } from "@/lib/odds/format";
import { BookLogo } from "@/components/BookLogo";

interface ManualBetLeg {
  bookKey?: string;
  bookTitle: string;
  teamName: string;
  american: number;
  stake: number;
}

interface ManualBetRow {
  id: string;
  betDate: string;
  matchup: string;
  sportKey: string | null;
  legA: ManualBetLeg;
  legB: ManualBetLeg;
  expectedProfit: number | null;
  result: string;
  notes: string | null;
}

const RESULTS = ["pending", "won", "lost", "push", "partial"] as const;

export function ManualBetsPanel({ refreshToken = 0 }: { refreshToken?: number }) {
  const [bets, setBets] = useState<ManualBetRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/bets?limit=50", { cache: "no-store" });
      const json = (await res.json()) as { bets?: ManualBetRow[]; error?: string };
      if (!res.ok) {
        setError(json.error ?? `Failed (${res.status})`);
        setBets([]);
        return;
      }
      setBets(json.bets ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load bets");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(t);
  }, [load, refreshToken]);

  async function updateResult(id: string, result: string) {
    const res = await fetch(`/api/bets/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ result }),
    });
    if (res.ok) void load();
  }

  return (
    <section className="mb-12">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 className="text-lg font-medium text-white">Manual bet log</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Track bets you placed (Phase 1 testing). Requires DATABASE_URL.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          disabled={loading}
          className="text-sm text-emerald-400 hover:text-emerald-300 disabled:opacity-50"
        >
          Reload
        </button>
      </div>

      {error && (
        <p className="mt-3 rounded-lg border border-amber-900/60 bg-amber-950/40 px-3 py-2 text-sm text-amber-200">
          {error}
        </p>
      )}

      <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-800">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-zinc-900/80 text-xs uppercase text-zinc-500">
            <tr>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Game</th>
              <th className="px-4 py-3 font-medium">Bet A</th>
              <th className="px-4 py-3 font-medium">Bet B</th>
              <th className="px-4 py-3 font-medium">Profit</th>
              <th className="px-4 py-3 font-medium">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 bg-zinc-950/80">
            {bets.map((b) => (
              <tr key={b.id} className="hover:bg-zinc-900/60">
                <td className="px-4 py-3 text-xs text-zinc-400 whitespace-nowrap">
                  {new Date(b.betDate).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-white">{b.matchup}</td>
                <td className="px-4 py-3 text-zinc-300">
                  <div className="flex items-center gap-2">
                    <BookLogo
                      bookKey={b.legA.bookKey ?? b.legA.bookTitle}
                      bookTitle={b.legA.bookTitle}
                      size={22}
                    />
                    <span>
                      {b.legA.bookTitle} · {b.legA.teamName}{" "}
                      {formatAmerican(b.legA.american)} · ${b.legA.stake.toFixed(0)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-zinc-300">
                  <div className="flex items-center gap-2">
                    <BookLogo
                      bookKey={b.legB.bookKey ?? b.legB.bookTitle}
                      bookTitle={b.legB.bookTitle}
                      size={22}
                    />
                    <span>
                      {b.legB.bookTitle} · {b.legB.teamName}{" "}
                      {formatAmerican(b.legB.american)} · ${b.legB.stake.toFixed(0)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 tabular-nums text-emerald-400">
                  {b.expectedProfit != null
                    ? `$${b.expectedProfit.toFixed(2)}`
                    : "—"}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={b.result}
                    onChange={(e) => void updateResult(b.id, e.target.value)}
                    className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs text-white"
                  >
                    {RESULTS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!loading && bets.length === 0 && !error && (
        <p className="mt-4 text-center text-sm text-zinc-500">
          No bets logged yet. Use &quot;Log bet&quot; on an arb card when one appears.
        </p>
      )}
    </section>
  );
}

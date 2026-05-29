"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

interface BetRow {
  expectedProfit: number | null;
  result: string;
}

export function AnalyticsPanel() {
  const [bets, setBets] = useState<BetRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/bets?limit=200", { cache: "no-store" });
      const json = (await res.json()) as { bets?: BetRow[]; error?: string };
      if (!res.ok) {
        setError(json.error ?? "Failed to load");
        setBets([]);
        return;
      }
      setBets(json.bets ?? []);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const stats = useMemo(() => {
    const logged = bets.length;
    const won = bets.filter((b) => b.result === "won").length;
    const pending = bets.filter((b) => b.result === "pending").length;
    const expectedTotal = bets.reduce(
      (s, b) => s + (b.expectedProfit ?? 0),
      0
    );
    return { logged, won, pending, expectedTotal };
  }, [bets]);

  return (
    <>
      {error && (
        <p className="mb-4 rounded-lg border border-amber-900/60 bg-amber-950/40 px-4 py-3 text-sm text-amber-200">
          {error}
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Bets logged", value: String(stats.logged) },
          { label: "Won", value: String(stats.won) },
          { label: "Pending", value: String(stats.pending) },
          {
            label: "Expected profit (all)",
            value: `$${stats.expectedTotal.toFixed(2)}`,
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-white/[0.08] bg-zinc-900/50 p-4"
          >
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              {s.label}
            </p>
            <p className="mt-2 font-display text-2xl font-bold text-white">
              {s.value}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

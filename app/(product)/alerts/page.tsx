"use client";

import { useEffect, useState } from "react";
import { AppPageHeader } from "@/components/app/AppPageHeader";

export default function AlertsPage() {
  const [configured, setConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    void fetch("/api/app/telegram-status", { cache: "no-store" })
      .then((r) => r.json())
      .then((j: { configured?: boolean }) => setConfigured(Boolean(j.configured)))
      .catch(() => setConfigured(false));
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-10">
      <AppPageHeader
        title="Alerts"
        description="Telegram messages fire after a full refresh when new arbs are saved to the database."
      />
      <div className="rounded-xl border border-white/[0.08] bg-zinc-900/50 p-6">
        <p className="text-sm text-zinc-400">Telegram status</p>
        <p className="mt-2 text-lg font-medium text-white">
          {configured === null && "Checking…"}
          {configured === true && (
            <span className="text-emerald-400">Connected (env vars set)</span>
          )}
          {configured === false && (
            <span className="text-amber-300">Not configured</span>
          )}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-zinc-500">
          Add <code className="text-zinc-400">TELEGRAM_BOT_TOKEN</code> and{" "}
          <code className="text-zinc-400">TELEGRAM_CHAT_ID</code> to{" "}
          <code className="text-zinc-400">.env.local</code>. See{" "}
          <code className="text-zinc-400">docs/POLLING.md</code> for setup. Light
          auto-refresh does not send alerts.
        </p>
      </div>
    </div>
  );
}

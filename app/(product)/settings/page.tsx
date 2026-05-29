import Link from "next/link";
import { AppPageHeader } from "@/components/app/AppPageHeader";
import { DemoSessionPanel } from "@/components/auth/DemoSessionPanel";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-10">
      <AppPageHeader
        title="Settings"
        description="Server and scanner configuration for Phase 1."
      />
      <div className="space-y-4 text-sm text-zinc-400">
        <DemoSessionPanel />
        <section className="rounded-xl border border-white/[0.08] bg-zinc-900/50 p-5">
          <h2 className="font-medium text-white">Environment</h2>
          <ul className="mt-3 list-inside list-disc space-y-1">
            <li>
              <code className="text-zinc-300">THE_ODDS_API_KEY</code> — required for
              odds
            </li>
            <li>
              <code className="text-zinc-300">DATABASE_URL</code> — bet log + persist
            </li>
            <li>
              <code className="text-zinc-300">TELEGRAM_BOT_TOKEN</code> /{" "}
              <code className="text-zinc-300">TELEGRAM_CHAT_ID</code> — alerts
            </li>
          </ul>
        </section>
        <section className="rounded-xl border border-white/[0.08] bg-zinc-900/50 p-5">
          <h2 className="font-medium text-white">Scanner defaults</h2>
          <p className="mt-2">
            Stake, ROI filter, and refresh interval are controlled on the{" "}
            <Link href="/opportunities" className="text-[var(--brand-red)] hover:underline">
              Opportunities
            </Link>{" "}
            page (default refresh 3600s).
          </p>
        </section>
      </div>
    </div>
  );
}

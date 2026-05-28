import Link from "next/link";
import { AppPageHeader } from "@/components/app/AppPageHeader";

const CARDS = [
  {
    title: "Opportunities",
    href: "/opportunities",
    desc: "Scan live moneyline arbs, filter by ROI, and log bets.",
  },
  {
    title: "My Bets",
    href: "/my-bets",
    desc: "Review and update results on arbs you placed.",
  },
  {
    title: "Analytics",
    href: "/analytics",
    desc: "PNL and ROI from your manual bet log.",
  },
  {
    title: "Alerts",
    href: "/alerts",
    desc: "Telegram notifications on new arbs after full refresh.",
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-10">
      <AppPageHeader
        title="Dashboard"
        description="Phase 1 private tool — NBA, NFL, NHL, and MLB moneylines via The Odds API."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {CARDS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-xl border border-white/[0.08] bg-zinc-900/50 p-5 transition hover:border-[var(--brand-red)]/40 hover:bg-zinc-900"
          >
            <h2 className="font-display text-lg font-semibold text-white">{c.title}</h2>
            <p className="mt-2 text-sm text-zinc-500">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

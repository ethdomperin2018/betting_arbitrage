import Link from "next/link";
import { DashboardPreview } from "./DashboardPreview";
import { HeroGlow } from "./marketing-ui";

const TRUST = [
  {
    title: "Real-time scanning",
    desc: "24/7 market monitoring",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: "Boost your edge",
    desc: "Find +EV and arb plays",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    title: "100% private",
    desc: "Your stack, your keys",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06]">
      <HeroGlow />
      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 sm:pb-28 sm:pt-16 lg:px-8 lg:pb-32 lg:pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
          <div className="max-w-xl lg:max-w-none">
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-red)]/30 bg-[var(--brand-red)]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-red)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-red)] animate-pulse" />
              Beat the books
            </p>

            <h1 className="font-display mt-6 text-[2.35rem] font-bold uppercase italic leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              Find{" "}
              <span className="text-[var(--brand-red)]">+EV and arbitrage</span>{" "}
              opportunities in real time
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg">
              Scan NBA, NFL, NHL, and MLB moneylines across every major US
              sportsbook. Spot mispriced lines, size your stakes, and strike
              before the market corrects.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4 sm:gap-5">
              <Link
                href="/arbitrage"
                className="btn-primary inline-flex items-center gap-2 rounded-md px-7 py-4 text-sm font-bold uppercase tracking-wide text-white"
              >
                Start free trial
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="#pricing"
                className="group inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-white transition hover:text-[var(--brand-red)]"
              >
                View pricing
                <span className="transition group-hover:translate-x-0.5">→</span>
              </Link>
            </div>

            <ul className="mt-14 grid gap-8 border-t border-white/[0.06] pt-10 sm:grid-cols-3 sm:gap-6">
              {TRUST.map((item) => (
                <li key={item.title} className="flex gap-3 sm:flex-col sm:gap-2">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--brand-red)]/25 bg-[var(--brand-red)]/10 text-[var(--brand-red)]">
                    {item.icon}
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold uppercase tracking-wide text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative lg:min-h-[420px] lg:pl-4">
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
}

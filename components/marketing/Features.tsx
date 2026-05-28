import Link from "next/link";
import { MockFrame } from "./MockFrame";
import { ScanFeedMock, BetLogMock } from "./mockups/ProductMockups";
import { SectionEyebrow, SectionTitle } from "./marketing-ui";

const FEATURES = [
  {
    title: "Real-time opportunities",
    desc: "Instant view of cross-book moneyline arbs with best prices per side, ROI %, and optimal stake split.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
  {
    title: "Advanced filters",
    desc: "Filter by minimum ROI, refresh interval, and league so you only see plays worth your time.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
      />
    ),
  },
  {
    title: "Smart alerts",
    desc: "Telegram pings when a new arbitrage hits your database — never miss a line while you're away.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    ),
  },
  {
    title: "Performance analytics",
    desc: "Log manual bets, track ROI, and review profit through your real-world testing window.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
      />
    ),
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionEyebrow>Built for serious bettors</SectionEyebrow>
        <SectionTitle>Powerful tools. Real results.</SectionTitle>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-zinc-500 sm:text-base">
          Everything you need to find, size, and track arbitrage — without the
          noise of a public tout service.
        </p>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <MockFrame url="clutchodds.com/arbitrage">
            <ScanFeedMock />
          </MockFrame>
          <MockFrame url="clutchodds.com/arbitrage">
            <BetLogMock />
          </MockFrame>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {FEATURES.map((f) => (
            <article key={f.title} className="card-feature group relative rounded-xl p-6 sm:p-7">
              <span className="inline-flex rounded-lg border border-white/10 bg-zinc-900 p-3 text-[var(--brand-red)]">
                <svg
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {f.icon}
                </svg>
              </span>
              <h3 className="font-display mt-5 text-lg font-semibold tracking-wide text-white">
                {f.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">{f.desc}</p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center">
          <Link
            href="/arbitrage"
            className="text-sm font-bold uppercase tracking-wide text-[var(--brand-red)] transition hover:text-white"
          >
            Try the live scanner →
          </Link>
        </p>
      </div>
    </section>
  );
}

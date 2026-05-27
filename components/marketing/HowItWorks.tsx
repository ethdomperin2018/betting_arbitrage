import { SectionEyebrow, SectionTitle } from "./marketing-ui";

const STEPS = [
  {
    n: "01",
    title: "Connect odds",
    desc: "Live moneylines stream from The Odds API across NBA, NFL, NHL, and MLB.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
      />
    ),
  },
  {
    n: "02",
    title: "Find the edge",
    desc: "We compare every book, pick the best price per side, and flag true two-way arbs.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    ),
  },
  {
    n: "03",
    title: "Size & execute",
    desc: "Optimal stake split for your bankroll — you place bets manually at each book.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative border-t border-white/[0.06] bg-[var(--surface)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionEyebrow>Three steps to profit</SectionEyebrow>
        <SectionTitle>How it works</SectionTitle>

        <div className="relative mt-20 grid gap-12 md:grid-cols-3 md:gap-8">
          <div
            className="pointer-events-none absolute left-[16%] right-[16%] top-12 hidden h-px bg-gradient-to-r from-[var(--brand-red)]/0 via-[var(--brand-red)]/40 to-[var(--brand-red)]/0 md:block"
            aria-hidden
          />
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="relative rounded-2xl border border-white/[0.06] bg-black/40 p-8 text-center backdrop-blur-sm md:text-left"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--brand-red)] bg-[var(--brand-red)]/10 text-[var(--brand-red)] md:mx-0">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {s.icon}
                </svg>
              </div>
              <span className="font-display mt-6 block text-5xl font-bold text-[var(--brand-red)]/25">
                {s.n}
              </span>
              <h3 className="font-display -mt-2 text-xl font-bold uppercase tracking-wide text-white">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

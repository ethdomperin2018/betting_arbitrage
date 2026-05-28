import Link from "next/link";
import { SectionEyebrow, SectionTitle } from "./marketing-ui";

const PLANS = [
  {
    name: "Private beta",
    price: "$0",
    period: "while you validate",
    featured: true,
    perks: [
      "Moneyline arbitrage scanner",
      "Auto-refresh + min ROI filter",
      "Telegram alerts on new arbs",
      "Neon DB + manual bet log",
    ],
    cta: "Open app",
    href: "/opportunities",
  },
  {
    name: "Pro",
    price: "Soon",
    period: "after validation",
    featured: false,
    perks: [
      "Player props & alt markets",
      "Custom alert rules",
      "Multi-user workspace",
      "Priority API polling",
    ],
    cta: "Join waitlist",
    href: "#faq",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,30,30,0.08),transparent_65%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionEyebrow>Simple pricing</SectionEyebrow>
        <SectionTitle>Start finding arbs today</SectionTitle>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm text-zinc-500">
          Private beta — no billing while you validate the scanner and bet log on
          real lines.
        </p>

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 ${
                plan.featured
                  ? "glow-red border border-[var(--brand-red)]/40 bg-gradient-to-b from-[var(--brand-red)]/[0.08] to-[var(--surface-card)]"
                  : "border border-white/[0.08] bg-[var(--surface-card)]"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--brand-red)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Current plan
                </span>
              )}
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-red)]">
                {plan.name}
              </p>
              <p className="font-display mt-4 text-5xl font-bold text-white">
                {plan.price}
              </p>
              <p className="mt-1 text-sm text-zinc-500">{plan.period}</p>
              <ul className="mt-8 space-y-3">
                {plan.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-zinc-400">
                    <span className="mt-0.5 text-[var(--brand-red)]">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`mt-8 block w-full rounded-md py-3.5 text-center text-xs font-bold uppercase tracking-wider transition ${
                  plan.featured
                    ? "btn-primary text-white"
                    : "border border-white/15 text-white hover:border-white/30 hover:bg-white/5"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

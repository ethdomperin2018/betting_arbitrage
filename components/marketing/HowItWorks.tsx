import { MockFrame } from "./MockFrame";
import {
  ArbDetailMock,
  BetLogMock,
  ScanFeedMock,
  TelegramAlertMock,
} from "./mockups/ProductMockups";
import { SectionEyebrow, SectionTitle } from "./marketing-ui";

const STEPS = [
  {
    n: "01",
    title: "Connect odds",
    desc: "Live moneylines stream from The Odds API across NBA, NFL, NHL, and MLB. Auto-refresh keeps your board current without burning credits on every tick.",
    visual: <ScanFeedMock />,
    url: "clutchodds.com/arbitrage",
  },
  {
    n: "02",
    title: "Find the edge",
    desc: "We compare every book, pick the best price per side, and flag true two-way arbs with ROI % and optimal stake split for your bankroll.",
    visual: <ArbDetailMock />,
    url: "clutchodds.com/arbitrage",
    reverse: true,
  },
  {
    n: "03",
    title: "Get alerts & execute",
    desc: "Telegram pings surface fresh arbs, then you log outcomes in the bet tracker to keep execution clean and repeatable.",
    visual: (
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-white/[0.06] bg-zinc-950">
          <TelegramAlertMock />
        </div>
        <BetLogMock />
      </div>
    ),
    url: "clutchodds.com/arbitrage",
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

        <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                step.reverse ? "lg:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className={step.reverse ? "lg:pl-8" : "lg:pr-8"}>
                <span className="font-display text-6xl font-bold text-[var(--brand-red)]/20 sm:text-7xl">
                  {step.n}
                </span>
                <h3 className="font-display -mt-4 text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-zinc-500">
                  {step.desc}
                </p>
              </div>
              <MockFrame url={step.url} className="w-full">
                {step.visual}
              </MockFrame>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

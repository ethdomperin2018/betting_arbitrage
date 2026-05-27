"use client";

import { useState } from "react";
import { SectionEyebrow, SectionTitle } from "./marketing-ui";

const FAQ = [
  {
    q: "Is this guaranteed profit?",
    a: "No. Lines move, limits apply, and one leg can fail. The tool finds theoretical arbs from aggregated odds — you must execute quickly and accept sportsbook risk.",
  },
  {
    q: "Which sportsbooks are supported?",
    a: "Whatever The Odds API returns for US regions on your plan — typically FanDuel, DraftKings, BetMGM, Caesars, and more.",
  },
  {
    q: "Do you place bets for me?",
    a: "No. This is a private research and execution-support tool. You place all bets manually at each book.",
  },
  {
    q: "How often do odds refresh?",
    a: "You control the interval on the dashboard. Full refresh saves to your database and can trigger Telegram alerts; light refresh is display-only to save API credits.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="border-t border-white/[0.06] bg-[var(--surface)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionEyebrow>Got questions?</SectionEyebrow>
        <SectionTitle>FAQ</SectionTitle>

        <dl className="mt-14 space-y-3">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={`overflow-hidden rounded-xl border transition ${
                  isOpen
                    ? "border-[var(--brand-red)]/30 bg-[var(--brand-red)]/[0.04]"
                    : "border-white/[0.08] bg-black/30"
                }`}
              >
                <dt>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="font-display text-base font-semibold uppercase tracking-wide text-white sm:text-lg">
                      {item.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[var(--brand-red)] transition ${
                        isOpen
                          ? "rotate-45 border-[var(--brand-red)]/50 bg-[var(--brand-red)]/10"
                          : "border-white/10"
                      }`}
                    >
                      +
                    </span>
                  </button>
                </dt>
                {isOpen && (
                  <dd className="border-t border-white/[0.06] px-5 pb-5 pt-3 text-sm leading-relaxed text-zinc-500">
                    {item.a}
                  </dd>
                )}
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

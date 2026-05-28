import Link from "next/link";
import type { ReactNode } from "react";
import { MockFrame } from "./MockFrame";
import {
  ArbDetailMock,
  FiltersMock,
  PnlDashboardMock,
  TelegramAlertMock,
} from "./mockups/ProductMockups";
import { SectionEyebrow, SectionTitle } from "./marketing-ui";

function ShowcaseCard({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="relative isolate flex flex-col gap-3">
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function ProductVisuals() {
  return (
    <section className="relative border-t border-white/[0.06] bg-black py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(255,30,30,0.08),transparent_55%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionEyebrow>Platform preview</SectionEyebrow>
        <SectionTitle>See your edge in action</SectionTitle>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-zinc-500 sm:text-base">
          Drill into stake sizing, filters, alerts, and PNL — the workflows you use
          after you spot an opportunity.
        </p>

        <div className="mt-16">
          <ShowcaseCard label="Track cumulative PNL and ROI from your manual bet log">
            <MockFrame url="clutchodds.com/arbitrage" glow>
              <PnlDashboardMock />
            </MockFrame>
          </ShowcaseCard>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <ShowcaseCard label="Sized legs with book, odds, and guaranteed profit">
            <MockFrame url="clutchodds.com/arbitrage" glow={false}>
              <ArbDetailMock />
            </MockFrame>
          </ShowcaseCard>
          <ShowcaseCard label="Instant Telegram alerts on new arbs">
            <MockFrame
              variant="phone"
              glow={false}
              className="mx-auto w-full max-w-[260px]"
            >
              <TelegramAlertMock />
            </MockFrame>
          </ShowcaseCard>

          <ShowcaseCard label="Control stake, ROI filter, and refresh">
            <MockFrame url="clutchodds.com/arbitrage" glow={false}>
              <FiltersMock />
            </MockFrame>
          </ShowcaseCard>

          <div className="flex flex-col justify-center rounded-xl border border-[var(--brand-red)]/20 bg-[var(--brand-red)]/[0.06] p-6 text-center sm:col-span-2 lg:col-span-1 lg:text-left">
            <p className="font-display text-lg font-bold uppercase text-white">
              Ready to test?
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              Open the scanner and run your first live snapshot.
            </p>
            <Link
              href="/opportunities"
              className="btn-primary mt-4 inline-block rounded-md px-5 py-3 text-xs font-bold uppercase tracking-wide text-white"
            >
              Launch app
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

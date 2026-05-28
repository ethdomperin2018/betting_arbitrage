import Image from "next/image";
import Link from "next/link";
import { BookLogo } from "@/components/BookLogo";
import { APP_NAV } from "@/lib/app-nav";
import { OPPORTUNITY_ROWS } from "./mockups/opportunities-data";

const MOBILE_CARDS = [
  {
    event: "DAL Mavericks @ BOS Celtics",
    legA: { key: "fanduel", title: "FanDuel", odds: "+145" },
    legB: { key: "draftkings", title: "DraftKings", odds: "-165" },
    profitPct: "+6.32%",
    profitUsd: "$63.20",
    hot: true,
  },
  {
    event: "LAL Lakers @ GSW Warriors",
    legA: { key: "betmgm", title: "BetMGM", odds: "+120" },
    legB: { key: "betrivers", title: "BetRivers", odds: "-140" },
    profitPct: "+2.18%",
    profitUsd: "$21.80",
    hot: false,
  },
];

const MOBILE_NAV = [
  { label: "Dashboard", href: "/dashboard", active: false },
  { label: "Opportunities", href: "/opportunities", active: true },
  { label: "My Bets", href: "/my-bets", active: false },
  { label: "Alerts", href: "/alerts", active: false },
  { label: "More", href: "/settings", active: false },
];

function MobileAppMock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-[186px] shrink-0 sm:w-[198px] lg:w-[212px] ${className}`}
    >
      <div
        className="overflow-hidden rounded-[2rem] border-[3px] border-zinc-700/90 bg-black ring-1 ring-white/15"
        style={{
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.05), 0 25px 50px -12px rgba(0,0,0,0.9), 0 0 60px -10px rgba(220,38,38,0.35), -8px 0 40px rgba(0,0,0,0.5)",
        }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between bg-black px-4 pt-2 text-[9px] text-zinc-500">
          <span>9:41</span>
          <span className="flex gap-1">
            <span className="h-2 w-3 rounded-sm bg-zinc-700" />
            <span className="h-2 w-2 rounded-full bg-zinc-700" />
          </span>
        </div>

        {/* App header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] bg-zinc-950 px-3 py-2.5">
          <div className="relative h-7 w-[100px]">
            <Image
              src="/logo.jpg"
              alt="Clutch Odds"
              fill
              className="object-contain object-left"
              sizes="100px"
            />
          </div>
          <button
            type="button"
            className="flex h-8 w-8 flex-col items-center justify-center gap-1 rounded-md border border-white/10"
            aria-label="Menu"
          >
            <span className="h-0.5 w-4 bg-zinc-400" />
            <span className="h-0.5 w-4 bg-zinc-400" />
            <span className="h-0.5 w-4 bg-zinc-400" />
          </button>
        </div>

        {/* Screen title */}
        <div className="flex items-center justify-between bg-zinc-950 px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm font-bold uppercase tracking-wide text-white">
              Opportunities
            </span>
            <span className="rounded bg-[var(--brand-red)] px-1.5 py-0.5 text-[10px] font-bold text-white">
              18
            </span>
          </div>
          <span className="text-zinc-500" aria-hidden>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </span>
        </div>

        {/* Cards */}
        <div className="space-y-2 bg-black px-2 py-2">
          {MOBILE_CARDS.map((card) => (
            <div
              key={card.event}
              className={`rounded-lg border p-2.5 ${
                card.hot
                  ? "border-[var(--brand-red)]/40 bg-[var(--brand-red)]/[0.08]"
                  : "border-white/[0.06] bg-zinc-900/80"
              }`}
            >
              <p className="truncate text-[10px] font-medium text-white">{card.event}</p>
              <p className="text-[9px] text-zinc-500">Moneyline</p>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                <div className="rounded border border-white/10 bg-black/60 px-1.5 py-1.5 text-center">
                  <BookLogo bookKey={card.legA.key} bookTitle={card.legA.title} size={18} className="mx-auto" />
                  <p className="mt-1 text-[9px] text-zinc-400">{card.legA.title}</p>
                  <p className="text-[10px] font-semibold text-white">{card.legA.odds}</p>
                </div>
                <div className="rounded border border-white/10 bg-black/60 px-1.5 py-1.5 text-center">
                  <BookLogo bookKey={card.legB.key} bookTitle={card.legB.title} size={18} className="mx-auto" />
                  <p className="mt-1 text-[9px] text-zinc-400">{card.legB.title}</p>
                  <p className="text-[10px] font-semibold text-white">{card.legB.odds}</p>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between text-[9px]">
                <span className="font-semibold text-[var(--profit-green)]">
                  {card.profitPct} profit
                </span>
                <span className="font-semibold text-[var(--profit-green)]">
                  {card.profitUsd}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom nav */}
        <div className="flex justify-around border-t border-white/[0.08] bg-zinc-950 px-1 py-2">
          {MOBILE_NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center gap-0.5 px-1"
            >
              <span
                className={`h-1 w-1 rounded-full ${item.active ? "bg-[var(--brand-red)]" : "bg-transparent"}`}
              />
              <span
                className={`text-[7px] font-medium ${item.active ? "text-[var(--brand-red)]" : "text-zinc-500"}`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function DesktopAppMock() {
  return (
    <div className="relative h-full w-full">
      <div
        className="relative ml-auto w-full origin-right"
        style={{
          transform:
            "perspective(1400px) rotateY(-20deg) rotateX(6deg) rotateZ(-1deg) scale(1.02)",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="overflow-hidden rounded-xl border border-zinc-600/50 bg-gradient-to-b from-zinc-700 to-zinc-950"
          style={{
            boxShadow:
              "0 40px 80px -20px rgba(0,0,0,0.85), 0 0 80px -20px rgba(220,38,38,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <div className="m-2.5 overflow-hidden rounded-lg border border-zinc-900 bg-black shadow-inner sm:m-3">
            <div className="flex min-h-[300px] sm:min-h-[340px] lg:min-h-[380px]">
              <aside className="hidden w-[148px] shrink-0 border-r border-white/[0.06] bg-zinc-950 py-4 sm:block">
                <div className="relative mx-3 mb-5 h-7 w-[100px]">
                  <Image
                    src="/logo.jpg"
                    alt="Clutch Odds"
                    fill
                    className="object-contain object-left"
                    sizes="100px"
                  />
                </div>
                <nav className="space-y-0.5 px-2 text-[11px]">
                  {APP_NAV.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block rounded-md px-2 py-1.5 transition ${
                        item.label === "Opportunities"
                          ? "bg-[var(--brand-red)] font-semibold text-white"
                          : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </aside>

              {/* Main */}
              <div className="min-w-0 flex-1 bg-[#0a0a0a]">
                <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-sm font-bold uppercase tracking-wide text-white">
                      Opportunities
                    </span>
                    <span className="rounded bg-[var(--brand-red)] px-2 py-0.5 text-[10px] font-bold text-white">
                      18
                    </span>
                  </div>
                  <div className="hidden gap-2 sm:flex">
                    <span className="rounded border border-white/10 px-2.5 py-1 text-[9px] text-zinc-400">
                      Filters
                    </span>
                    <span className="rounded border border-white/10 px-2.5 py-1 text-[9px] text-zinc-400">
                      Sort: Highest Profit
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto text-[11px]">
                  <table className="w-full min-w-[360px]">
                    <thead>
                      <tr className="border-b border-white/[0.04] text-left text-[9px] uppercase text-zinc-600">
                        <th className="px-2 py-1.5 font-medium">Event</th>
                        <th className="px-2 py-1.5 font-medium">Market</th>
                        <th className="px-2 py-1.5 font-medium">Books</th>
                        <th className="px-2 py-1.5 text-right font-medium">Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {OPPORTUNITY_ROWS.map((row) => (
                        <tr
                          key={row.event}
                          className={`border-b border-white/[0.04] ${row.hot ? "bg-[var(--brand-red)]/[0.06]" : ""}`}
                        >
                          <td className="max-w-[140px] truncate px-3 py-2.5 font-medium text-zinc-200">
                            {row.event}
                          </td>
                          <td className="px-3 py-2.5 text-zinc-500">{row.market}</td>
                          <td className="px-3 py-2.5">
                            <div className="flex gap-1">
                              {row.books.map((b) => (
                                <BookLogo
                                  key={b.key}
                                  bookKey={b.key}
                                  bookTitle={b.title}
                                  size={20}
                                />
                              ))}
                            </div>
                          </td>
                          <td className="px-3 py-2.5 text-right font-display text-sm font-bold text-[var(--profit-green)]">
                            {row.profit}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="border-t border-white/[0.06] p-3">
                  <Link
                    href="/opportunities"
                    className="block rounded-md border border-white/10 bg-zinc-900 py-2.5 text-center text-[10px] font-semibold uppercase tracking-wider text-zinc-400 transition hover:border-[var(--brand-red)]/40 hover:text-white"
                  >
                    View all opportunities →
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="h-4 bg-gradient-to-b from-zinc-600 to-zinc-900" />
          <div className="mx-auto h-2.5 w-[90%] rounded-b-lg bg-zinc-800 shadow-lg" />
        </div>

        {/* Floating profit callout */}
        <div
          className="absolute -right-2 top-8 z-10 hidden rounded-lg border border-[var(--profit-green)]/40 bg-zinc-950/95 px-4 py-3 backdrop-blur-sm sm:block lg:-right-4 lg:top-10"
          style={{ boxShadow: "0 0 30px rgba(34,197,94,0.15)" }}
        >
          <p className="text-[9px] font-medium uppercase tracking-widest text-zinc-500">
            Best arb
          </p>
          <p className="font-display text-2xl font-bold text-[var(--profit-green)]">
            +6.32%
          </p>
        </div>
      </div>
    </div>
  );
}

export function DashboardPreview() {
  return (
    <div className="relative mx-auto w-full sm:max-w-none">
      {/* Ambient lighting */}
      <div
        className="pointer-events-none absolute left-[8%] top-[35%] h-40 w-40 rounded-full bg-[var(--brand-red)]/25 blur-[70px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[5%] top-[25%] h-64 w-80 rounded-full bg-[var(--brand-red)]/10 blur-[90px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(255,40,40,0.1),transparent_65%)]"
        aria-hidden
      />

      <div className="relative mx-auto h-[320px] w-full overflow-visible max-sm:max-w-[min(100%,380px)] sm:h-[420px] lg:h-[480px] xl:h-[500px]">
        {/* Laptop — full UI visible (sidebar + content) */}
        <div className="absolute inset-y-3 right-0 left-0 z-10 flex items-center justify-end sm:inset-y-5 lg:inset-y-6">
          <div className="w-full min-w-0 max-w-[900px] origin-right">
            <DesktopAppMock />
          </div>
        </div>

        {/* Phone — lower-left; sits low so sidebar + table above stay visible */}
        <div className="absolute -left-2 top-[56%] z-30 max-sm:top-[58%] sm:-left-4 sm:top-[52%] lg:top-[54%]">
          <div className="origin-top-left translate-x-0.5 scale-[0.58] max-sm:scale-[0.62] sm:translate-x-1.5 sm:scale-[0.7] lg:translate-x-2 lg:scale-[0.74] xl:scale-[0.76]">
            <MobileAppMock />
          </div>
        </div>
      </div>
    </div>
  );
}

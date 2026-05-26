import Link from "next/link";
import { BrandLogo } from "./BrandLogo";

const LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
  { label: "App", href: "/arbitrage" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-black">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <BrandLogo size="lg" />
            <p className="mt-3 max-w-xs text-sm text-zinc-600">
              Private arbitrage & +EV tooling for serious bettors. Not affiliated
              with any sportsbook.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs font-semibold uppercase tracking-wider text-zinc-500 transition hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-zinc-600 sm:flex-row">
          <p>© {new Date().getFullYear()} Clutch Odds. All rights reserved.</p>
          <p className="text-zinc-700">
            For entertainment & research. Gamble responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
}

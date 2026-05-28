import Link from "next/link";
import { BookLogo } from "@/components/BookLogo";
import { APP_NAV } from "@/lib/app-nav";
import { OPPORTUNITY_ROWS } from "./opportunities-data";

/** Matches hero / arbitrage table — used across homepage sections */
export function OpportunitiesPanelMock({
  showSidebar = true,
}: {
  showSidebar?: boolean;
}) {
  return (
    <div className="flex overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a] text-[11px]">
      {showSidebar && (
        <aside className="hidden w-[108px] shrink-0 border-r border-white/[0.06] bg-zinc-950 py-3 sm:block">
          <nav className="space-y-0.5 px-2">
            {APP_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-md px-2 py-1.5 text-[10px] transition ${
                  item.label === "Opportunities"
                    ? "bg-[var(--brand-red)] font-semibold text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="font-display text-[10px] font-bold uppercase tracking-wide text-white sm:text-xs">
              Opportunities
            </span>
            <span className="rounded bg-[var(--brand-red)] px-1.5 py-0.5 text-[9px] font-bold text-white">
              18
            </span>
          </div>
          <span className="flex items-center gap-1 text-[9px] font-medium uppercase text-[var(--profit-green)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--profit-green)]" />
            Live
          </span>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.04] text-left text-[8px] uppercase text-zinc-600">
              <th className="px-2 py-1.5 font-medium">Event</th>
              <th className="hidden px-2 py-1.5 font-medium sm:table-cell">Market</th>
              <th className="px-2 py-1.5 font-medium">Books</th>
              <th className="px-2 py-1.5 text-right font-medium">Profit</th>
            </tr>
          </thead>
          <tbody>
            {OPPORTUNITY_ROWS.map((row) => (
              <tr
                key={row.event}
                className={`border-b border-white/[0.04] last:border-0 ${row.hot ? "bg-[var(--brand-red)]/[0.06]" : ""}`}
              >
                <td className="max-w-[120px] truncate px-2 py-2 font-medium text-zinc-200">
                  {row.event}
                </td>
                <td className="hidden px-2 py-2 text-zinc-500 sm:table-cell">{row.market}</td>
                <td className="px-2 py-2">
                  <div className="flex gap-0.5">
                    {row.books.map((b) => (
                      <BookLogo
                        key={b.key}
                        bookKey={b.key}
                        bookTitle={b.title}
                        size={18}
                      />
                    ))}
                  </div>
                </td>
                <td className="px-2 py-2 text-right font-display font-bold text-[var(--profit-green)]">
                  {row.profit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

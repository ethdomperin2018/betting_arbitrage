import { getBookBrand } from "@/lib/bookmakerBranding";

const BOOKS = [
  { key: "fanduel", name: "FanDuel" },
  { key: "draftkings", name: "DraftKings" },
  { key: "betmgm", name: "BetMGM" },
  { key: "williamhill_us", name: "bet365" },
  { key: "caesars", name: "Caesars" },
  { key: "foxbet", name: "Fox Bet" },
  { key: "betrivers", name: "BetRivers" },
  { key: "bovada", name: "Bovada" },
];

function BookPill({ bookKey, name }: { bookKey: string; name: string }) {
  const brand = getBookBrand(bookKey, name);
  return (
    <span className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2">
      <span
        className="flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-bold"
        style={{ backgroundColor: brand.bg, color: brand.fg }}
      >
        {brand.short}
      </span>
      <span className="text-sm font-semibold tracking-wide text-zinc-300">
        {name}
      </span>
    </span>
  );
}

export function SportsbooksBar() {
  const row = [...BOOKS, ...BOOKS];

  return (
    <section className="overflow-hidden border-b border-white/[0.06] bg-[#060606] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
          We monitor all major sportsbooks
        </p>
      </div>
      <div className="relative mt-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#060606] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#060606] to-transparent" />
        <div className="flex w-max animate-marquee gap-4 px-4">
          {row.map((b, i) => (
            <BookPill key={`${b.key}-${i}`} bookKey={b.key} name={b.name} />
          ))}
        </div>
      </div>
      <p className="mt-6 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-red)]">
          & more →
        </span>
      </p>
    </section>
  );
}

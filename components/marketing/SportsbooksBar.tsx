import { BookLogo } from "@/components/BookLogo";
import {
  TRACKED_BOOKMAKER_KEYS,
  getBookDisplayName,
} from "@/lib/bookmakerDisplay";

function BookPill({ bookKey }: { bookKey: string }) {
  const name = getBookDisplayName(bookKey);
  return (
    <span className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2">
      <BookLogo bookKey={bookKey} bookTitle={name} size={28} />
      <span className="text-sm font-semibold tracking-wide text-zinc-300">
        {name}
      </span>
    </span>
  );
}

export function SportsbooksBar() {
  const row = [...TRACKED_BOOKMAKER_KEYS, ...TRACKED_BOOKMAKER_KEYS];

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
          {row.map((key, i) => (
            <BookPill key={`${key}-${i}`} bookKey={key} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { BookLogo } from "@/components/BookLogo";
import { getBookBrand } from "@/lib/bookmakerBranding";
import { BOOK_FAVICON_DOMAINS } from "@/lib/bookmakerLogos";
import { AppPageHeader } from "@/components/app/AppPageHeader";

const DISPLAY_NAMES: Record<string, string> = {
  williamhill_us: "Caesars (William Hill US)",
  betonlineag: "BetOnline.ag",
  mybookieag: "MyBookie.ag",
  unibet_us: "Unibet US",
  pointsbetus: "PointsBet US",
  foxbet: "Fox Bet",
};

export default function BookmakersPage() {
  const keys = Object.keys(BOOK_FAVICON_DOMAINS).sort();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-10">
      <AppPageHeader
        title="Bookmakers"
        description="US-region books we track through The Odds API on your plan."
      />
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {keys.map((key) => {
          const title = DISPLAY_NAMES[key] ?? getBookBrand(key, key).short;
          return (
            <li
              key={key}
              className="flex items-center gap-3 rounded-lg border border-white/[0.08] bg-zinc-900/40 px-4 py-3"
            >
              <BookLogo bookKey={key} bookTitle={title} size={32} />
              <div>
                <p className="text-sm font-medium text-white">{title}</p>
                <p className="text-xs text-zinc-600">{key}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

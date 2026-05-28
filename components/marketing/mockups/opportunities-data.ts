import { bookRef } from "@/lib/bookmakerDisplay";

export const OPPORTUNITY_ROWS = [
  {
    event: "DAL Mavericks @ BOS Celtics",
    market: "Moneyline",
    books: [bookRef("fanduel"), bookRef("fanatics"), bookRef("draftkings")],
    profit: "+6.32%",
    hot: true,
  },
  {
    event: "LAL Lakers @ GSW Warriors",
    market: "Moneyline",
    books: [bookRef("betmgm"), bookRef("betonlineag"), bookRef("betrivers")],
    profit: "+2.18%",
    hot: false,
  },
  {
    event: "NYK Knicks @ PHI 76ers",
    market: "Moneyline",
    books: [bookRef("caesars"), bookRef("bovada")],
    profit: "+1.94%",
    hot: false,
  },
] as const;

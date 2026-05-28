export const OPPORTUNITY_ROWS = [
  {
    event: "DAL Mavericks @ BOS Celtics",
    market: "Moneyline",
    books: [
      { key: "fanduel", title: "FanDuel" },
      { key: "draftkings", title: "DraftKings" },
      { key: "betmgm", title: "BetMGM" },
    ],
    profit: "+6.32%",
    hot: true,
  },
  {
    event: "LAL Lakers @ GSW Warriors",
    market: "Moneyline",
    books: [
      { key: "betmgm", title: "BetMGM" },
      { key: "betrivers", title: "BetRivers" },
    ],
    profit: "+2.18%",
    hot: false,
  },
  {
    event: "NYK Knicks @ PHI 76ers",
    market: "Moneyline",
    books: [
      { key: "draftkings", title: "DraftKings" },
      { key: "fanduel", title: "FanDuel" },
    ],
    profit: "+1.94%",
    hot: false,
  },
] as const;

export const SIDEBAR_NAV = [
  "Dashboard",
  "Opportunities",
  "My Bets",
  "Bookmakers",
  "Alerts",
] as const;

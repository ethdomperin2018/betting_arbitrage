export type AppNavItem = {
  href: string;
  label: string;
  /** Match active state (prefix for nested routes) */
  match?: string;
};

export const APP_NAV: AppNavItem[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/opportunities", label: "Opportunities", match: "/opportunities" },
  { href: "/my-bets", label: "My Bets" },
  { href: "/bookmakers", label: "Bookmakers" },
  { href: "/alerts", label: "Alerts" },
  { href: "/analytics", label: "Analytics" },
  { href: "/settings", label: "Settings" },
];

export function isNavActive(pathname: string, item: AppNavItem): boolean {
  const key = item.match ?? item.href;
  if (pathname === "/arbitrage" && key === "/opportunities") return true;
  if (key === "/dashboard") return pathname === "/dashboard";
  return pathname === key || pathname.startsWith(`${key}/`);
}

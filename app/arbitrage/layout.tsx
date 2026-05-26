import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arbitrage scanner — Clutch Odds",
  description: "Moneyline arbitrage scanner — Clutch Odds",
};

export default function ArbitrageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

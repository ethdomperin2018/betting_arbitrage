import type { Metadata } from "next";
import { AppShell } from "@/components/app/AppShell";

export const metadata: Metadata = {
  title: {
    default: "App — Clutch Odds",
    template: "%s — Clutch Odds",
  },
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}

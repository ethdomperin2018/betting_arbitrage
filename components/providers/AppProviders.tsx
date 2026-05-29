"use client";

import { DemoAuthProvider } from "@/components/auth/DemoAuthProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <DemoAuthProvider>{children}</DemoAuthProvider>;
}

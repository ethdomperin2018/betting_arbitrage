"use client";

import { usePathname } from "next/navigation";
import { AuthGate } from "@/components/auth/AuthGate";
import { AppPageHeader } from "@/components/app/AppPageHeader";
import { LoginRequiredNotice } from "@/components/app/LoginRequiredNotice";

type LoginGatedPageProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function LoginGatedPage({ title, description, children }: LoginGatedPageProps) {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-10">
      <AppPageHeader title={title} description={description} />
      <AuthGate fallback={<LoginRequiredNotice feature={title} returnTo={pathname} />}>
        {children}
      </AuthGate>
    </div>
  );
}

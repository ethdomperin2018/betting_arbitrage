import { LoginGatedPage } from "@/components/app/LoginGatedPage";

export default function AnalyticsPage() {
  return (
    <LoginGatedPage
      title="Analytics"
      description="Performance summary from your bet log. Sign in to view stats and trends."
    />
  );
}

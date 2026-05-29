import { AnalyticsPanel } from "@/components/app/AnalyticsPanel";
import { LoginGatedPage } from "@/components/app/LoginGatedPage";

export default function AnalyticsPage() {
  return (
    <LoginGatedPage
      title="Analytics"
      description="Summary from your manual bet log. Mark results on My Bets for accurate tracking."
    >
      <AnalyticsPanel />
    </LoginGatedPage>
  );
}

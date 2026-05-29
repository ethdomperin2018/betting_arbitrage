import { ArbitrageScanner } from "@/components/app/ArbitrageScanner";
import { LoginGatedPage } from "@/components/app/LoginGatedPage";

export default function OpportunitiesPage() {
  return (
    <LoginGatedPage
      title="Opportunities"
      description="Live moneyline arbitrage across US books. Use Full refresh to persist odds and send Telegram alerts."
    >
      <ArbitrageScanner />
    </LoginGatedPage>
  );
}

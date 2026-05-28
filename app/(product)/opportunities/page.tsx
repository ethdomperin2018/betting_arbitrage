import { ArbitrageScanner } from "@/components/app/ArbitrageScanner";
import { AppPageHeader } from "@/components/app/AppPageHeader";

export default function OpportunitiesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-10">
      <AppPageHeader
        title="Opportunities"
        description="Live moneyline arbitrage across US books. Use Full refresh to persist odds and send Telegram alerts."
      />
      <ArbitrageScanner />
    </div>
  );
}

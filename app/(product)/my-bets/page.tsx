import { ManualBetsPanel } from "@/components/ManualBetsPanel";
import { AppPageHeader } from "@/components/app/AppPageHeader";

export default function MyBetsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-10">
      <AppPageHeader
        title="My Bets"
        description="Manual bet log for Phase 1 testing. Log arbs from the Opportunities screen."
      />
      <ManualBetsPanel />
    </div>
  );
}

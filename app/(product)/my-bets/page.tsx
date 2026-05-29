import { LoginGatedPage } from "@/components/app/LoginGatedPage";
import { ManualBetsPanel } from "@/components/ManualBetsPanel";

export default function MyBetsPage() {
  return (
    <LoginGatedPage
      title="My Bets"
      description="Manual bet log for Phase 1 testing. Log arbs from the Opportunities screen."
    >
      <ManualBetsPanel />
    </LoginGatedPage>
  );
}

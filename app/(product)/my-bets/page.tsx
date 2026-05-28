import { LoginGatedPage } from "@/components/app/LoginGatedPage";

export default function MyBetsPage() {
  return (
    <LoginGatedPage
      title="My Bets"
      description="Track logged arbs and results. Sign in to view and manage your bet log."
    />
  );
}

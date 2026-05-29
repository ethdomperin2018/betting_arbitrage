import { AppPageHeader } from "@/components/app/AppPageHeader";
import { MyInfoPanel } from "@/components/app/MyInfoPanel";

export default function MyInfoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-10">
      <AppPageHeader
        title="My Info"
        description="Your demo account details. Real profiles will live here later."
      />
      <MyInfoPanel />
    </div>
  );
}

import { AppPageHeader } from "@/components/app/AppPageHeader";
import { LoginRequiredNotice } from "@/components/app/LoginRequiredNotice";

type LoginGatedPageProps = {
  title: string;
  description: string;
};

export function LoginGatedPage({ title, description }: LoginGatedPageProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-10">
      <AppPageHeader title={title} description={description} />
      <LoginRequiredNotice feature={title} />
    </div>
  );
}

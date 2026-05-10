import ResumeContent from "@/components/pages/ResumeContent";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-config";

export default async function LocaleResumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return <ResumeContent dictionary={dict} />;
}

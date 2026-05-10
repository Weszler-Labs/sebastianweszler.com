import HomeContent from "@/components/pages/HomeContent";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-config";

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return <HomeContent dictionary={dict} locale={locale} />;
}

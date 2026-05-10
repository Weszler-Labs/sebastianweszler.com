import AboutContent from "@/components/pages/AboutContent";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-config";

export default async function LocaleAboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return <AboutContent dictionary={dict} locale={locale} />;
}

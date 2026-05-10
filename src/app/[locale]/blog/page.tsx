import BlogContent from "@/components/pages/BlogContent";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-config";

export default async function LocaleBlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return <BlogContent dictionary={dict} locale={locale} />;
}

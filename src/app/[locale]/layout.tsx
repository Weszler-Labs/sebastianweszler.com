import SiteShell from "@/components/SiteShell";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-config";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pl" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <SiteShell dictionary={dict}>
      {children}
    </SiteShell>
  );
}

import SiteShell from "@/components/SiteShell";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pl" }];
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <SiteShell>
      {children}
    </SiteShell>
  );
}

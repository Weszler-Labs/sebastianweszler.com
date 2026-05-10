import ProjectsContent from "@/components/pages/ProjectsContent";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-config";

export default async function LocaleProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return <ProjectsContent dictionary={dict} />;
}

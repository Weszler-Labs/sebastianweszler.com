import SiteShell from "@/components/SiteShell";
import ProjectsPage from '../[locale]/projects/page';
import { getDictionary } from "@/lib/i18n";

export default async function ProjectsPageWrapper() {
  const dict = await getDictionary("en");
  return (
    <SiteShell dictionary={dict}>
      <ProjectsPage params={Promise.resolve({ locale: 'en' })} />
    </SiteShell>
  );
}

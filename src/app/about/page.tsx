import SiteShell from "@/components/SiteShell";
import AboutPage from '../[locale]/about/page';
import { getDictionary } from "@/lib/i18n";

export default async function AboutPageWrapper() {
  const dict = await getDictionary("en");
  return (
    <SiteShell dictionary={dict}>
      <AboutPage params={Promise.resolve({ locale: 'en' })} />
    </SiteShell>
  );
}

import SiteShell from "@/components/SiteShell";
import ContactPage from '../[locale]/contact/page';
import { getDictionary } from "@/lib/i18n";

export default async function ContactPageWrapper() {
  const dict = await getDictionary("en");
  return (
    <SiteShell dictionary={dict}>
      <ContactPage params={Promise.resolve({ locale: 'en' })} />
    </SiteShell>
  );
}

import SiteShell from "@/components/SiteShell";
import ResumePage from '../[locale]/resume/page';
import { getDictionary } from "@/lib/i18n";

export default async function ResumePageWrapper() {
  const dict = await getDictionary("en");
  return (
    <SiteShell dictionary={dict}>
      <ResumePage params={Promise.resolve({ locale: 'en' })} />
    </SiteShell>
  );
}

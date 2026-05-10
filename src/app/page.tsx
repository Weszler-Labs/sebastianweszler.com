import SiteShell from "@/components/SiteShell";
import HomeContent from "@/components/pages/HomeContent";
import { getDictionary } from "@/lib/i18n";

export default async function RootHome() {
  const dict = await getDictionary("en");

  return (
    <SiteShell>
      <HomeContent dictionary={dict} locale="en" />
    </SiteShell>
  );
}

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import type { Dict } from "@/lib/i18n-shared";
import { getT } from "@/lib/i18n-shared";

const pillars = [
  {
    icon: "/icons/architecture.svg",
    key: "pillar1",
  },
  {
    icon: "/icons/team.svg",
    key: "pillar2",
  },
  {
    icon: "/icons/strategy.svg",
    key: "pillar3",
  },
  {
    icon: "/icons/quality.svg",
    key: "pillar4",
  },
];

export default function EngineeringLeadershipContent({ dictionary, locale }: { dictionary?: Dict; locale?: string }) {
  const t = dictionary ? getT(dictionary) : (s: string) => s;
  const prefix = locale && locale !== "en" ? `/${locale}` : "";

  return (
    <div className="flex flex-col gap-12 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-serif">
          {t("leadership.title")}
        </h1>
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          {t("leadership.subtitle")}
        </p>
      </div>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-serif">
            {t("leadership.philosophyTitle")}
          </h2>
          <div className="prose prose-zinc dark:prose-invert max-w-none space-y-4">
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t("leadership.philosophyBody")}
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-serif">
            {t("leadership.pillarsTitle")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <div
                key={pillar.key}
                className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm"
              >
                <Image
                  src={pillar.icon}
                  alt=""
                  width={32}
                  height={32}
                  className="mb-3 dark:invert"
                />
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                  {t(`leadership.${pillar.key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {t(`leadership.${pillar.key}.body`)}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-serif">
            {t("leadership.approachTitle")}
          </h2>
          <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {t("leadership.approachBody")}
          </p>
        </section>
      </ScrollReveal>

      <div className="flex justify-center sm:justify-start">
        <Link
          href={prefix || "/"}
          className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          {t("leadership.backToHome")}
        </Link>
      </div>
    </div>
  );
}

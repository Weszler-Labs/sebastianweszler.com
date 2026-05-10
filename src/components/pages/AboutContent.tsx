import Image from "next/image";
import Link from "next/link";
import SkillsetVisualization from "@/components/SkillsetVisualization";
import type { Dict } from "@/lib/i18n-shared";
import { getT } from "@/lib/i18n-shared";

export default function AboutContent({ dictionary, locale }: { dictionary?: Dict; locale?: string }) {
  const t = dictionary ? getT(dictionary) : (s: string) => s;
  const prefix = locale && locale !== "en" ? `/${locale}` : "";

  return (
    <div className="flex flex-col gap-12 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center gap-8">
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex-shrink-0">
          <Image
            src="/cartoon2.png"
            alt="Sebastian Weszler"
            fill
            className="object-contain rounded-2xl"
            priority
          />
        </div>

        <div className="flex flex-col gap-4 text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {t("about.title")}
          </h1>
          <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {t("about.intro")}
          </p>
        </div>
      </div>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          {t("about.paragraph1")}
        </p>
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          {t("about.paragraph2")}
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 text-center sm:text-left">
          {t("about.technicalSkills")}
        </h2>
        <SkillsetVisualization />
      </div>

      <div className="flex justify-center sm:justify-start">
        <Link
          href={prefix || "/"}
          className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          {t("about.backToHome")}
        </Link>
      </div>
    </div>
  );
}

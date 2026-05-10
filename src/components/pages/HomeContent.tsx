import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import type { Dict } from "@/lib/i18n-shared";
import { getT } from "@/lib/i18n-shared";

export default function HomeContent({ dictionary, locale }: { dictionary?: Dict; locale?: string }) {
  const t = dictionary ? getT(dictionary) : (s: string) => s;
  const prefix = locale && locale !== "en" ? `/${locale}` : "";

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-start mb-8">
        <button
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          aria-label={t("home.replayAnimation")}
        >
          <Image
            src="/replay.svg"
            alt=""
            width={20}
            height={20}
            className="dark:invert"
          />
        </button>
      </div>

      <div className="flex flex-col items-center gap-6 text-center">
        <div className="mb-4">
          <Image
            src="/logo_02.png"
            alt="Sebastian Weszler logo"
            width={150}
            height={300}
            className="object-contain dark:invert"
            priority
          />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-serif">
            Sebastian Weszler
          </h1>
          <p className="text-xl font-medium text-zinc-600 dark:text-zinc-400">
            {t("home.subtitle")}
          </p>
        </div>

        <ScrollReveal>
          <p className="max-w-md text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">
            {t("home.description")}
          </p>
        </ScrollReveal>

        <Link
          href={`${prefix}/about`}
          className="mt-4 text-zinc-900 dark:text-zinc-50 font-semibold border-b-2 border-zinc-900 dark:border-zinc-50 hover:pb-1 transition-all"
        >
          {t("home.moreAboutMe")}
        </Link>
      </div>
    </div>
  );
}

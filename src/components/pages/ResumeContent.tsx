import type { Dict } from "@/lib/i18n-shared";
import { getT } from "@/lib/i18n-shared";

function ExperienceEntry({
  title,
  period,
  description,
  achievements,
  isFirst,
}: {
  title: string;
  period: string;
  description: string;
  achievements?: string[];
  isFirst?: boolean;
}) {
  return (
    <div className="relative pl-6 border-l-2 border-zinc-100 dark:border-zinc-800">
      <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-white dark:border-black ${isFirst ? "bg-zinc-900 dark:bg-zinc-50" : "bg-zinc-400 dark:bg-zinc-600"}`} />
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
          {title}
        </h3>
        <span className="text-sm font-medium text-zinc-500">{period}</span>
      </div>
      <p className="text-zinc-600 dark:text-zinc-400 mt-2">
        {description}
      </p>
      {achievements && achievements.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {achievements.map((a, i) => (
            <li key={i} className="text-sm text-zinc-500 dark:text-zinc-400 flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 shrink-0" />
              {a}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ResumeContent({ dictionary }: { dictionary?: Dict }) {
  const t = dictionary ? getT(dictionary) : (s: string) => s;

  const leadAchievements = [
    t("resume.experienceLeadAchievement1"),
    t("resume.experienceLeadAchievement2"),
    t("resume.experienceLeadAchievement3"),
    t("resume.experienceLeadAchievement4"),
  ];

  const entrepreneurAchievements = [
    t("resume.experienceEntrepreneurAchievement1"),
    t("resume.experienceEntrepreneurAchievement2"),
    t("resume.experienceEntrepreneurAchievement3"),
  ];

  return (
    <div className="flex flex-col gap-10 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {t("resume.title")}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            {t("resume.description")}
          </p>
        </div>
        <a
          href="/resume.pdf"
          target="_blank"
          className="inline-flex items-center justify-center px-4 py-2 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 text-sm font-bold rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          {t("resume.downloadPdf")}
        </a>
      </div>

      <div className="space-y-12">
        <section className="bg-zinc-50 dark:bg-zinc-800/30 rounded-xl p-6 border border-zinc-100 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
            {t("resume.profile")}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {t("resume.profileBody")}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 border-b border-zinc-100 dark:border-zinc-800 pb-2 mb-6">
            {t("resume.experience")}
          </h2>
          <div className="space-y-8">
            <ExperienceEntry
              title={t("resume.experienceLeadTitle")}
              period={t("resume.experienceLeadPeriod")}
              description={t("resume.experienceLeadDesc")}
              achievements={leadAchievements}
              isFirst
            />

            <ExperienceEntry
              title={t("resume.experienceEntrepreneurTitle")}
              period={t("resume.experienceEntrepreneurPeriod")}
              description={t("resume.experienceEntrepreneurDesc")}
              achievements={entrepreneurAchievements}
            />

            <ExperienceEntry
              title={t("resume.experienceTechTitle")}
              period={t("resume.experienceTechPeriod")}
              description={t("resume.experienceTechDesc")}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 border-b border-zinc-100 dark:border-zinc-800 pb-2 mb-6">
            {t("resume.education")}
          </h2>
          <div className="relative pl-6 border-l-2 border-zinc-100 dark:border-zinc-800">
            <div className="absolute -left-[9px] top-1 w-4 h-4 bg-zinc-900 dark:bg-zinc-50 rounded-full border-4 border-white dark:border-black" />
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                {t("resume.educationTitle")}
              </h3>
              <span className="text-sm font-medium text-zinc-500">{t("resume.educationPeriod")}</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 mt-1">
              {t("resume.educationDesc")}
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 border-b border-zinc-100 dark:border-zinc-800 pb-2 mb-6">
            {t("resume.technicalSkills")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-zinc-50 mb-2">{t("resume.skillFrontend")}</h4>
              <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                <li>React / Next.js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Redux / Zustand</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-zinc-50 mb-2">{t("resume.skillBackend")}</h4>
              <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                <li>Node.js / Express</li>
                <li>Python / FastAPI / Django</li>
                <li>PostgreSQL / MongoDB</li>
                <li>REST & GraphQL</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-zinc-50 mb-2">{t("resume.skillDevops")}</h4>
              <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                <li>Docker / Kubernetes</li>
                <li>GitHub Actions</li>
                <li>AWS / Vercel</li>
                <li>Linux / Shell</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-zinc-50 mb-2">{t("resume.skillLeadership")}</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {t("resume.skillLeadershipItems")}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

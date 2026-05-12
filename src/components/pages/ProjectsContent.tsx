import type { Dict } from "@/lib/i18n-shared";
import { getT } from "@/lib/i18n-shared";

const projects = [
  {
    title: "Event-Driven Platform",
    description:
      "A production-grade microservices platform demonstrating distributed systems architecture, event-driven communication with Redis Streams, saga pattern for distributed transactions, circuit breaker resilience, and full observability stack.",
    tags: ["Python", "Go", "Redis", "Docker", "PostgreSQL", "CI/CD"],
    href: "https://github.com/Weszler-Labs/event-driven-platform",
  },
  {
    title: "AI Code Reviewer",
    description:
      "An intelligent code review automation tool powered by AI. Analyzes pull requests for bugs, security issues, performance problems, and style violations with a modular plugin architecture.",
    tags: ["Python", "AI/ML", "GitHub Actions", "OpenAI", "DevTools"],
    href: "https://github.com/Weszler-Labs/ai-code-reviewer",
  },
  {
    title: "google-kickstart",
    description: "Solutions for Google Kickstart competitive programming rounds in Python.",
    tags: ["Python", "Algorithms", "Competitive Programming"],
    href: "https://github.com/SWeszler/google-kickstart",
  },
  {
    title: "scrumpoker",
    description: "A real-time Scrum Poker application for agile teams to estimate tasks.",
    tags: ["JavaScript", "Real-time", "Agile"],
    href: "https://github.com/SWeszler/scrumpoker",
  },
  {
    title: "django-k8s",
    description: "A template and guide for deploying Django applications on Kubernetes.",
    tags: ["Python", "Django", "Kubernetes", "Docker"],
    href: "https://github.com/SWeszler/django-k8s",
  },
  {
    title: "fastapi-template",
    description: "A production-ready template for FastAPI with best practices, testing, and CI/CD.",
    tags: ["Python", "FastAPI", "API", "Template"],
    href: "https://github.com/SWeszler/fastapi-template",
  },
];

export default function ProjectsContent({ dictionary }: { dictionary?: Dict }) {
  const t = dictionary ? getT(dictionary) : (s: string) => s;

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {t("projects.title")}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          {t("projects.description")}
        </p>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {project.title}
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-50 transition-colors"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          {t("projects.experience")}
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              {t("projects.experienceLeadTitle")}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">{t("projects.experienceLeadPeriod")}</p>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              {t("projects.experienceLeadDesc")}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              {t("projects.experienceEntrepreneurTitle")}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">{t("projects.experienceEntrepreneurPeriod")}</p>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              {t("projects.experienceEntrepreneurDesc")}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              {t("projects.experienceTechTitle")}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">{t("projects.experienceTechPeriod")}</p>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              {t("projects.experienceTechDesc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const localeLabels: Record<string, Record<string, string>> = {
  en: {
    home: "Home",
    about: "About",
    projects: "Projects",
    blog: "Blog",
    contact: "Contact",
    resume: "Resume",
  },
  pl: {
    home: "Strona Główna",
    about: "O Mnie",
    projects: "Projekty",
    blog: "Blog",
    contact: "Kontakt",
    resume: "CV",
  },
};

const locales = ["en", "pl"];

function getLocaleFromPath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && locales.includes(segments[0])) {
    return segments[0];
  }
  return "en";
}

export default function Navigation() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const labels = localeLabels[locale];

  const navLinks = [
    { key: "home", href: locale === "en" ? "/" : `/${locale}` },
    { key: "about", href: locale === "en" ? "/about" : `/${locale}/about` },
    { key: "projects", href: locale === "en" ? "/projects" : `/${locale}/projects` },
    { key: "blog", href: locale === "en" ? "/blog" : `/${locale}/blog` },
    { key: "contact", href: locale === "en" ? "/contact" : `/${locale}/contact` },
    { key: "resume", href: locale === "en" ? "/resume" : `/${locale}/resume` },
  ];

  const otherLocale = locales.find((l) => l !== locale)!;

  const toggleHref = pathname === "/"
    ? `/${otherLocale}`
    : pathname.replace(`/${locale}`, `/${otherLocale}`).replace(/\/$/, "") || "/";

  return (
    <nav className="mb-12 flex items-center justify-between">
      <ul className="flex flex-wrap gap-6 text-sm font-medium">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.key}>
              <Link
                href={link.href}
                className={`transition-colors hover:text-zinc-900 dark:hover:text-zinc-50 ${
                  isActive
                    ? "text-zinc-900 dark:text-zinc-50 border-b-2 border-zinc-900 dark:border-zinc-50 pb-1"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {labels[link.key]}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center gap-2">
        <Link
          href={toggleHref}
          className="px-2 py-1 text-xs font-medium rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          aria-label={`Switch to ${otherLocale === "pl" ? "Polish" : "English"}`}
        >
          {otherLocale === "pl" ? "PL" : "EN"}
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}

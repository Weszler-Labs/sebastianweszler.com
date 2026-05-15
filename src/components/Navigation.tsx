"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import type { Dict } from "@/lib/i18n-shared";
import { getT } from "@/lib/i18n-shared";
import { locales, defaultLocale } from "@/lib/i18n-config";

function getLocaleFromPath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && locales.includes(segments[0] as typeof locales[number])) {
    return segments[0];
  }
  return defaultLocale;
}

export default function Navigation({ dictionary }: { dictionary?: Dict }) {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const t = dictionary ? getT(dictionary) : (s: string) => s;

  const navLinks: { key: string; href: string }[] = [
    { key: "home", href: locale === defaultLocale ? "/" : `/${locale}` },
    { key: "about", href: locale === defaultLocale ? "/about" : `/${locale}/about` },
    { key: "projects", href: locale === defaultLocale ? "/projects" : `/${locale}/projects` },
    { key: "blog", href: locale === defaultLocale ? "/blog" : `/${locale}/blog` },
    { key: "contact", href: locale === defaultLocale ? "/contact" : `/${locale}/contact` },
    { key: "resume", href: locale === defaultLocale ? "/resume" : `/${locale}/resume` },
  ];

  const otherLocale = locales.find((l) => l !== locale)!;

  const toggleHref = pathname === "/"
    ? `/${otherLocale}`
    : locale === "en" && !pathname.startsWith("/en")
      ? `/${otherLocale}${pathname}`
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
                className={`transition-colors hover:text-primary ${
                  isActive
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-muted"
                }`}
              >
                {t(`nav.${link.key}`)}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center gap-2">
        <Link
          href={toggleHref}
          className="px-2 py-1 text-xs font-medium rounded-md bg-surface text-muted hover:bg-surface-hover transition-colors"
          aria-label={t("nav.toggleLanguage")}
        >
          {otherLocale === "pl" ? "PL" : "EN"}
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}

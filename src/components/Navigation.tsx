"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dict } from "@/lib/i18n-shared";
import { getT } from "@/lib/i18n-shared";
import { locales, defaultLocale } from "@/lib/i18n-config";
import ThemeToggle from "./ThemeToggle";

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
    { key: "home", href: `/${locale}` },
    { key: "about", href: `/${locale}/about` },
    { key: "projects", href: `/${locale}/projects` },
    { key: "blog", href: `/${locale}/blog` },
    { key: "contact", href: `/${locale}/contact` },
    { key: "resume", href: `/${locale}/resume` },
  ];

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
      <ThemeToggle />
    </nav>
  );
}

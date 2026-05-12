import Navigation from "./Navigation";
import AnimatedLayout from "./AnimatedLayout";
import NewsletterSignup from "./NewsletterSignup";
import type { Dict } from "@/lib/i18n-shared";

export default function SiteShell({ children, dictionary }: { children: React.ReactNode; dictionary?: Dict }) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/SWeszler" },
    { name: "LinkedIn", href: "https://linkedin.com/in/sebastianweszler" },
    { name: "Medium", href: "https://medium.com/@s.weszler" },
    { name: "LeetCode", href: "https://leetcode.com/sweszler/" },
    { name: "Email", href: "mailto:sebastian.weszler@gmail.com" },
  ];

  return (
    <>
      <Navigation dictionary={dictionary} />
      <AnimatedLayout>
        {children}
      </AnimatedLayout>
      <footer className="mt-16 pt-8 border-t border-border flex flex-col items-center gap-6 text-sm text-muted" role="contentinfo">
        <NewsletterSignup dictionary={dictionary} />
        <div className="flex gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              aria-label={`Visit my ${link.name} profile`}
            >
              {link.name}
            </a>
          ))}
        </div>
        <p>&copy; {currentYear} Sebastian Weszler. All rights reserved.</p>
      </footer>
    </>
  );
}

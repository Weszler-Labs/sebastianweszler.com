import Navigation from "./Navigation";
import AnimatedLayout from "./AnimatedLayout";

export default function SiteShell({ children }: { children: React.ReactNode }) {
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
      <Navigation />
      <AnimatedLayout>
        {children}
      </AnimatedLayout>
      <footer className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex flex-col items-center gap-4 text-sm text-zinc-500" role="contentinfo">
        <div className="flex gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
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

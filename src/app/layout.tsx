import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../../components/theme-provider";
import { PageTransition } from "../../components/page-transition";

export const metadata: Metadata = {
  metadataBase: new URL("https://sebastianweszler.com"),
  title: "Sebastian Weszler | Software Engineer",
  description: "Software Engineer | Technology Enthusiast | Problem-Solver. Passionate about using technology to solve problems and improve people's lives.",
  openGraph: {
    title: "Sebastian Weszler | Software Engineer",
    description: "Software Engineer | Technology Enthusiast | Problem-Solver",
    url: "https://sebastianweszler.com",
    siteName: "Sebastian Weszler",
    images: [
      {
        url: "/cartoon2.png",
        width: 300,
        height: 300,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();
  
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex-1 flex flex-col items-center justify-center p-8 sm:p-24">
            <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 sm:p-12">
              <PageTransition>{children}</PageTransition>
              
              <footer className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex flex-col items-center gap-4 text-sm text-zinc-500">
                <div className="flex gap-6">
                  {[
                    { name: "GitHub", href: "https://github.com/SWeszler" },
                    { name: "LinkedIn", href: "https://linkedin.com/in/sebastianweszler" },
                    { name: "Medium", href: "https://medium.com/@s.weszler" },
                    { name: "LeetCode", href: "https://leetcode.com/sweszler/" },
                    { name: "Email", href: "mailto:sebastian.weszler@gmail.com" },
                  ].map((link) => (
                    <a 
                      key={link.name} 
                      href={link.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
                <p>&copy; {currentYear} Sebastian Weszler. All rights reserved.</p>
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

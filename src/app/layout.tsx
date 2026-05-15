import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

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
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-300">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-card dark:focus:bg-primary dark:focus:text-card focus:rounded-lg"
        >
          Skip to main content
        </a>
        <main id="main-content" className="flex-1 flex flex-col items-center p-4 sm:p-12 md:p-24">
          <div className="w-full max-w-4xl bg-white dark:bg-zinc-900 shadow-xl border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 md:p-16">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}

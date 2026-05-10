"use client";

import { useState } from "react";
import type { Dict } from "@/lib/i18n-shared";
import { getT } from "@/lib/i18n-shared";

export default function ContactContent({ dictionary }: { dictionary?: Dict }) {
  const t = dictionary ? getT(dictionary) : (s: string) => s;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {t("contact.title")}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          {t("contact.description")}
        </p>
      </div>

      <div className="flex flex-col gap-12">
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                {t("contact.email")}
              </h3>
              <a
                href="mailto:sebastian.weszler@gmail.com"
                className="text-blue-600 dark:text-blue-400 hover:underline text-lg"
              >
                sebastian.weszler@gmail.com
              </a>
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                {t("contact.socials")}
              </h3>
              <div className="flex flex-col gap-2">
                <a
                  href="https://linkedin.com/in/sebastianweszler"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/SWeszler"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://medium.com/@s.weszler"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                >
                  Medium
                </a>
              </div>
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-8">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                  {t("contact.messageSent")}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {t("contact.messageSentDesc")}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t("contact.sendAnother")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
                  >
                    {t("contact.name")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-hidden"
                    placeholder={t("contact.namePlaceholder")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
                  >
                    {t("contact.emailLabel")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-hidden"
                    placeholder={t("contact.emailPlaceholder")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
                  >
                    {t("contact.message")}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-hidden resize-none"
                    placeholder={t("contact.messagePlaceholder")}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 font-bold rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all"
                >
                  {t("contact.sendMessage")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

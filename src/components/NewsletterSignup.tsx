"use client";

import { useState } from "react";
import type { Dict } from "@/lib/i18n-shared";
import { getT } from "@/lib/i18n-shared";

const NEWSLETTER_API_URL = process.env.NEXT_PUBLIC_NEWSLETTER_API_URL || "https://api.buttondown.email/v1/subscribers";
const NEWSLETTER_API_KEY = process.env.NEXT_PUBLIC_NEWSLETTER_API_KEY || "";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterSignup({ dictionary }: { dictionary?: Dict }) {
  const t = dictionary ? getT(dictionary) : (s: string) => s;

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setErrorMsg(t("newsletter.emailRequired"));
      return;
    }

    if (!validateEmail(email)) {
      setStatus("error");
      setErrorMsg(t("newsletter.emailInvalid"));
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (NEWSLETTER_API_KEY) {
        headers["Authorization"] = `Token ${NEWSLETTER_API_KEY}`;
      }

      const response = await fetch(NEWSLETTER_API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(body || "Failed to subscribe");
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg(t("newsletter.error"));
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center gap-2 py-4">
        <div className="w-10 h-10 bg-success-bg text-success rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <p className="text-sm font-medium text-foreground">{t("newsletter.success")}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xs">
      <h3 className="text-sm font-semibold text-foreground mb-1">{t("newsletter.title")}</h3>
      <p className="text-xs text-muted mb-3">{t("newsletter.description")}</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") {
              setStatus("idle");
              setErrorMsg("");
            }
          }}
          placeholder={t("newsletter.emailPlaceholder")}
          required
          aria-label={t("newsletter.emailPlaceholder")}
          className="flex-1 min-w-0 px-3 py-2 text-sm bg-card border border-border rounded-lg focus:ring-2 focus:ring-focus focus:border-transparent transition-all outline-hidden placeholder:text-muted text-foreground"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-4 py-2 text-sm font-bold bg-primary text-card rounded-lg hover:bg-primary-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === "loading" ? t("newsletter.subscribing") : t("newsletter.subscribe")}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-1 text-xs text-error">{errorMsg}</p>
      )}
    </div>
  );
}

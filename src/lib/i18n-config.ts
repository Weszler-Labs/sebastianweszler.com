export const locales = ["en", "pl"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  pl: "Polski",
};

export const localePaths: Record<Locale, string> = {
  en: "",
  pl: "pl",
};

import "server-only";

import type { Dict } from "./i18n-shared";
export type { Dict } from "./i18n-shared";
export { getT } from "./i18n-shared";
import { Locale, defaultLocale } from "./i18n-config";

const dictionaries: Record<Locale, () => Promise<Dict>> = {
  en: () => import("@/../messages/en.json").then((m) => m.default as Dict),
  pl: () => import("@/../messages/pl.json").then((m) => m.default as Dict),
};

export async function getDictionary(locale: Locale): Promise<Dict> {
  return dictionaries[locale]?.() ?? dictionaries[defaultLocale]();
}

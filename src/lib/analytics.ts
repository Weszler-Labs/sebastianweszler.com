// src/lib/analytics.ts
export const PLAUSIBLE_DOMAIN = "sebastianweszler.com";

export function trackEvent(name: string, props?: Record<string, any>) {
  if (typeof window !== "undefined" && (window as any).plausible) {
    (window as any).plausible(name, { props });
  }
}

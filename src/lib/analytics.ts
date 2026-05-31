// src/lib/analytics.ts
export const PLAUSIBLE_DOMAIN = "sebastianweszler.com";

interface PlausibleWindow extends Window {
  plausible?: (name: string, options: { props?: Record<string, unknown> }) => void;
}

export function trackEvent(name: string, props?: Record<string, unknown>) {
  const plausibleWindow = window as PlausibleWindow;
  if (typeof window !== "undefined" && typeof plausibleWindow.plausible === "function") {
    plausibleWindow.plausible(name, { props });
  }
}

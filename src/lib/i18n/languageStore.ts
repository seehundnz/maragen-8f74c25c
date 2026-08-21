import { useSyncExternalStore } from "react";

import { resolveLanguage, type Language, type LanguagePreference } from "./index";

const SETTINGS_KEY = "vhf.settings";

const listeners = new Set<() => void>();

function readPreference(): LanguagePreference {
  if (typeof window === "undefined") return "auto";
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    if (!raw) return "auto";
    const parsed = JSON.parse(raw) as { language?: LanguagePreference };
    const pref = parsed.language;
    return pref === "en" || pref === "de" ? pref : "auto";
  } catch {
    return "auto";
  }
}

/** Resolved synchronously at module init so the very first client render uses the right language. */
let current: Language = typeof window === "undefined" ? "en" : resolveLanguage(readPreference());

function emit() {
  listeners.forEach((fn) => fn());
}

export function setLanguagePreference(pref: LanguagePreference) {
  const next = resolveLanguage(pref);
  if (next === current) return;
  current = next;
  emit();
}

/** Re-read the stored preference (e.g. after external changes). */
export function syncLanguageFromStorage() {
  setLanguagePreference(readPreference());
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === SETTINGS_KEY) syncLanguageFromStorage();
  });
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

export function useLanguage(): Language {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => "en" as Language,
  );
}

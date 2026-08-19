import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";

import { en, type TranslationKey } from "./en";
import { de } from "./de";

export type Language = "en" | "de";
export type LanguagePreference = "auto" | Language;

const DICTIONARIES: Record<Language, Record<TranslationKey, string>> = { en, de };

export function resolveLanguage(preference: LanguagePreference | undefined): Language {
  if (preference === "en" || preference === "de") return preference;
  if (typeof navigator !== "undefined") {
    const langs = [navigator.language, ...(navigator.languages ?? [])];
    if (langs.some((l) => typeof l === "string" && l.toLowerCase().startsWith("de"))) return "de";
  }
  return "en";
}

export type TFunction = (key: TranslationKey, vars?: Record<string, string | number>) => string;

interface I18nValue {
  lang: Language;
  t: TFunction;
}

const I18nContext = createContext<I18nValue>({ lang: "en", t: (key) => en[key] });

export function I18nProvider({ lang, children }: { lang: Language; children: ReactNode }) {
  const t = useCallback<TFunction>(
    (key, vars) => {
      const dict = DICTIONARIES[lang] ?? en;
      const raw = dict[key] ?? en[key] ?? key;
      if (!vars) return raw;
      return raw.replace(/\{(\w+)\}/g, (match, name: string) =>
        name in vars ? String(vars[name]) : match,
      );
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, t }), [lang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useT(): I18nValue {
  return useContext(I18nContext);
}

export type { TranslationKey };

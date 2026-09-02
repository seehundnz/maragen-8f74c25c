import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";

import { en, type TranslationKey } from "./en";
import { de } from "./de";
import { fr } from "./fr";
import { nl } from "./nl";
import { es } from "./es";
import { it } from "./it";
import { nb } from "./nb";
import { sv } from "./sv";

export const LANGUAGES = ["en", "de", "fr", "nl", "es", "it", "sv", "nb"] as const;
export type Language = (typeof LANGUAGES)[number];
export type LanguagePreference = "auto" | Language;

const DICTIONARIES: Record<Language, Record<string, string>> = { en, de, fr, nl, es, it, nb };

export function isLanguage(value: unknown): value is Language {
  return typeof value === "string" && (LANGUAGES as readonly string[]).includes(value);
}

export function resolveLanguage(preference: LanguagePreference | undefined): Language {
  if (isLanguage(preference)) return preference;
  if (typeof navigator !== "undefined") {
    const langs = [navigator.language, ...(navigator.languages ?? [])];
    for (const l of langs) {
      if (typeof l !== "string") continue;
      const code = l.toLowerCase().slice(0, 2);
      if (isLanguage(code)) return code;
    }
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

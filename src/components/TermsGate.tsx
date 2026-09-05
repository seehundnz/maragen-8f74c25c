import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Languages, Radio, ScrollText } from "lucide-react";

import { useT, type LanguagePreference } from "@/lib/i18n";
import { setLanguagePreference } from "@/lib/i18n/languageStore";
import { useLocalState } from "@/hooks/useLocalState";
import { useSettings } from "@/hooks/useFleet";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/** Bump when the terms change materially so users are asked again. */
export const TERMS_VERSION = 1;

interface TermsAcceptance {
  version: number;
}

/** Routes the user may visit before accepting (so the terms can be read). */
const ALLOWED_PATHS = new Set(["/terms", "/privacy"]);

export function TermsGate({ children }: { children: React.ReactNode }) {
  const { t } = useT();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { value, setValue, hydrated } = useLocalState<TermsAcceptance>("vhf-terms-accepted", {
    version: 0,
  });
  const { settings, setSettings } = useSettings();
  const [checked, setChecked] = useState(false);

  const accepted = value.version >= TERMS_VERSION;
  // During SSR/first paint and while storage hydrates, render the app (avoids
  // a flash of the gate for returning users and hydration mismatches).
  if (!hydrated || accepted || ALLOWED_PATHS.has(pathname)) return <>{children}</>;

  const points = ["gate.p1", "gate.p2", "gate.p3", "gate.p4"] as const;

  return (
    <div className="fixed inset-0 z-50 flex h-[100dvh] flex-col overflow-y-auto bg-background pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-8">
        <div className="mb-6 flex justify-end">
          <Select
            value={settings.language ?? "auto"}
            onValueChange={(v) => {
              const pref = v as LanguagePreference;
              setSettings((s) => ({ ...s, language: pref }));
              setLanguagePreference(pref);
            }}
          >
            <SelectTrigger className="w-auto gap-2" aria-label={t("settings.language")}>
              <Languages className="size-4 shrink-0" aria-hidden />
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="auto">{t("settings.language.auto")}</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="hr">Hrvatski</SelectItem>
              <SelectItem value="it">Italiano</SelectItem>
              <SelectItem value="nl">Nederlands</SelectItem>
              <SelectItem value="nb">Norsk</SelectItem>
              <SelectItem value="sv">Svenska</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Radio className="size-6" aria-hidden />
          </span>
          <h1 className="text-xl font-bold tracking-tight">{t("gate.title")}</h1>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">{t("gate.intro")}</p>

        <ul className="mt-4 space-y-2.5">
          {points.map((key) => (
            <li key={key} className="flex gap-2.5 text-sm">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              <span>{t(key)}</span>
            </li>
          ))}
        </ul>

        <Link
          to="/terms"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          <ScrollText className="size-4" aria-hidden />
          {t("gate.readTerms")}
        </Link>

        <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card p-4">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 accent-primary"
          />
          <span className="text-sm">{t("gate.checkbox")}</span>
        </label>

        <Button
          className="mt-4 w-full"
          size="lg"
          disabled={!checked}
          onClick={() => setValue({ version: TERMS_VERSION })}
        >
          {t("gate.accept")}
        </Button>
      </div>
    </div>
  );
}

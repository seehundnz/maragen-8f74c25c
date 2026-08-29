import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, AlertCircle, Radio, Phone } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { CALL_META, CALL_TYPES, type CallType } from "@/lib/types";
import { useT } from "@/lib/i18n";

const CALL_ICONS: Record<CallType, typeof AlertTriangle> = {
  mayday: AlertTriangle,
  panpan: AlertCircle,
  securite: Radio,
  standard: Phone,
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VHF Call Builder — Emergency & Routine Radio Calls" },
      {
        name: "description",
        content:
          "Build spoken VHF radio calls: Mayday distress, Pan-Pan urgency, Sécurité safety and routine calls with live GPS position and UTC time.",
      },
      { property: "og:title", content: "VHF Call Builder — Emergency & Routine Radio Calls" },
      {
        property: "og:description",
        content:
          "Mayday, Pan-Pan, Sécurité and routine VHF call scripts with vessel data, live GPS and UTC time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t } = useT();
  return (
    <AppShell>
      <div className="py-4 sm:py-8">
        <h1 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          {t("home.title")}
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">{t("home.subtitle")}</p>

        <div className="mt-6 grid gap-3 sm:gap-4">
          {CALL_TYPES.map((type) => {
            const Icon = CALL_ICONS[type];
            return (
              <div key={type} data-call={type}>
                <Link
                  to="/call/$type"
                  params={{ type }}
                  className="flex items-center gap-4 rounded-xl border-2 border-primary/60 bg-primary/10 px-5 py-5 transition-colors hover:bg-primary/20 active:bg-primary/30 sm:px-6 sm:py-6"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground sm:size-14">
                    <Icon className="size-6 sm:size-7" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-bold tracking-wider text-primary sm:text-xl">
                      {CALL_META[type].label}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-muted-foreground sm:text-sm">
                      {t(`call.${type}.description`)}
                    </span>
                  </span>
                  <span className="shrink-0 text-2xl text-primary" aria-hidden>
                    ›
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}

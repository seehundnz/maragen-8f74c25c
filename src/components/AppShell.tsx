import { Link } from "@tanstack/react-router";
import { Radio, Ship, Settings as SettingsIcon } from "lucide-react";
import type { ReactNode } from "react";

import { useT } from "@/lib/i18n";

export function AppShell({ children }: { children: ReactNode }) {
  const { t } = useT();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <Radio className="size-5 text-primary" aria-hidden />
            <span className="text-sm font-bold tracking-[0.2em] uppercase">{t("app.name")}</span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link
              to="/vessels"
              className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              <Ship className="size-4" aria-hidden />
              <span className="hidden sm:inline">{t("nav.vessels")}</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              <SettingsIcon className="size-4" aria-hidden />
              <span className="hidden sm:inline">{t("nav.settings")}</span>
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 pt-4 pb-32 sm:pb-24">
        {children}
        <footer className="mt-8 text-center text-xs text-muted-foreground">
          <Link to="/privacy" className="underline-offset-4 hover:underline">
            {t("nav.privacy")}
          </Link>
        </footer>
      </main>
    </div>
  );
}

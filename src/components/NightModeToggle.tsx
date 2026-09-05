import { Moon, Sun, Flashlight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useFleet";
import { useT } from "@/lib/i18n";
import { nextTheme, resolveTheme, type ThemeMode } from "@/lib/types";

const ICONS: Record<ThemeMode, typeof Moon> = {
  dark: Moon,
  light: Sun,
  night: Flashlight,
};

export function NightModeToggle() {
  const { settings, setSettings } = useSettings();
  const { t } = useT();
  const theme = resolveTheme(settings);
  const upcoming = nextTheme(theme);
  const Icon = ICONS[theme];
  const label = `${t("settings.theme")}: ${t(`settings.theme.${theme}`)} — ${t("nav.themeNext")} ${t(
    `settings.theme.${upcoming}`,
  )}`;

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      onClick={() => setSettings((s) => ({ ...s, theme: nextTheme(resolveTheme(s)) }))}
      className="shrink-0 text-muted-foreground hover:text-foreground"
    >
      <Icon className="size-4" aria-hidden />
    </Button>
  );
}

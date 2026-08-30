import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useFleet";
import { useT } from "@/lib/i18n";

export function NightModeToggle() {
  const { settings, setSettings } = useSettings();
  const { t } = useT();
  const isNight = settings.nightMode === true;

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isNight ? t("nav.nightModeOff") : t("nav.nightModeOn")}
      title={isNight ? t("nav.nightModeOff") : t("nav.nightModeOn")}
      onClick={() => setSettings((s) => ({ ...s, nightMode: !isNight }))}
      className="shrink-0 text-muted-foreground hover:text-foreground"
    >
      {isNight ? <Moon className="size-4" aria-hidden /> : <Sun className="size-4" aria-hidden />}
    </Button>
  );
}

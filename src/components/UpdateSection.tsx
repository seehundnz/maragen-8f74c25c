import { useEffect, useState } from "react";
import { RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";
import { BUILD_DATE, checkForUpdate, applyUpdate, onUpdateAvailable, swAllowed } from "@/lib/pwa";

export function UpdateSection() {
  const { t } = useT();
  const [available, setAvailable] = useState(false);
  const [checking, setChecking] = useState(false);
  const [checked, setChecked] = useState(false);
  const [buildLabel, setBuildLabel] = useState("");

  useEffect(() => onUpdateAvailable(setAvailable), []);
  useEffect(() => {
    setBuildLabel(new Date(BUILD_DATE).toLocaleString());
  }, []);

  const onCheck = async () => {
    setChecking(true);
    try {
      const found = await checkForUpdate();
      setAvailable(found);
      setChecked(true);
      if (!found && !swAllowed()) window.location.reload();
    } finally {
      setChecking(false);
    }
  };

  return (
    <section className="space-y-3 rounded-xl border border-border bg-card p-4">
      <h2 className="text-sm font-semibold">{t("settings.appHeading")}</h2>
      <p className="text-xs text-muted-foreground">{t("settings.offlineHint")}</p>
      <p className="text-xs text-muted-foreground">
        <span className="font-medium text-foreground">{t("settings.buildDate")}:</span>{" "}
        <span className="font-mono">{buildLabel}</span>
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="secondary" size="sm" onClick={onCheck} disabled={checking}>
          <RefreshCw className={`size-4 ${checking ? "animate-spin" : ""}`} aria-hidden />
          {checking ? t("settings.checking") : t("settings.checkUpdate")}
        </Button>
        {available && (
          <Button size="sm" onClick={() => void applyUpdate()}>
            <Download className="size-4" aria-hidden />
            {t("settings.updateNow")}
          </Button>
        )}
      </div>

      {available ? (
        <p className="text-xs text-primary">{t("settings.updateAvailable")}</p>
      ) : checked ? (
        <p className="text-xs text-muted-foreground">{t("settings.upToDate")}</p>
      ) : (
        <p className="text-xs text-muted-foreground">{t("settings.updateHint")}</p>
      )}
    </section>
  );
}

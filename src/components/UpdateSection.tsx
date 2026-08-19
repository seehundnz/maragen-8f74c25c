import { useEffect, useState } from "react";
import { RefreshCw, Download, Wifi, WifiOff, MonitorSmartphone, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";
import { BUILD_DATE, checkForUpdate, applyUpdate, onUpdateAvailable, swAllowed, getSwStatus, onSwStatusChange, isOnline, isPwaInstalled, onConnectionChange, onInstallModeChange, getLastUpdateCheck, type SwStatus } from "@/lib/pwa";

function statusIcon(status: SwStatus) {
  switch (status) {
    case "active":
      return <CheckCircle2 className="size-4 text-emerald-500" aria-hidden />;
    case "waiting":
    case "installing":
      return <Loader2 className="size-4 animate-spin text-amber-500" aria-hidden />;
    case "unsupported":
    case "notRegistered":
      return <AlertCircle className="size-4 text-muted-foreground" aria-hidden />;
  }
}

export function UpdateSection() {
  const { t } = useT();
  const [available, setAvailable] = useState(false);
  const [checking, setChecking] = useState(false);
  const [checked, setChecked] = useState(false);
  const [buildLabel, setBuildLabel] = useState("");
  const [swStatus, setSwStatus] = useState<SwStatus>(getSwStatus());
  const [online, setOnline] = useState(isOnline());
  const [installed, setInstalled] = useState(isPwaInstalled());
  const [lastCheck, setLastCheck] = useState(getLastUpdateCheck());

  useEffect(() => onUpdateAvailable(setAvailable), []);
  useEffect(() => {
    setBuildLabel(new Date(BUILD_DATE).toLocaleString());
  }, []);
  useEffect(() => onSwStatusChange(setSwStatus), []);
  useEffect(() => onConnectionChange(() => setOnline(isOnline())), []);
  useEffect(() => onInstallModeChange(() => setInstalled(isPwaInstalled())), []);

  const onCheck = async () => {
    setChecking(true);
    try {
      const found = await checkForUpdate();
      setAvailable(found);
      setChecked(true);
      setLastCheck(getLastUpdateCheck());
      if (!found && !swAllowed()) window.location.reload();
    } finally {
      setChecking(false);
    }
  };

  return (
    <section className="space-y-3 rounded-xl border border-border bg-card p-4">
      <h2 className="text-sm font-semibold">{t("settings.appHeading")}</h2>
      <p className="text-xs text-muted-foreground">{t("settings.offlineHint")}</p>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="rounded-lg border border-border p-2">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("settings.swStatus")}</p>
          <div className="mt-1 flex items-center gap-1.5 text-xs">
            {statusIcon(swStatus)}
            <span>{t(`settings.swStatus.${swStatus}`)}</span>
          </div>
        </div>
        <div className="rounded-lg border border-border p-2">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("settings.connection")}</p>
          <div className="mt-1 flex items-center gap-1.5 text-xs">
            {online ? <Wifi className="size-4 text-emerald-500" aria-hidden /> : <WifiOff className="size-4 text-destructive" aria-hidden />}
            <span>{online ? t("settings.online") : t("settings.offline")}</span>
          </div>
        </div>
        <div className="rounded-lg border border-border p-2">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("settings.installStatus")}</p>
          <div className="mt-1 flex items-center gap-1.5 text-xs">
            <MonitorSmartphone className={`size-4 ${installed ? "text-emerald-500" : "text-muted-foreground"}`} aria-hidden />
            <span>{installed ? t("settings.installed") : t("settings.notInstalled")}</span>
          </div>
        </div>
        <div className="rounded-lg border border-border p-2">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("settings.buildDate")}</p>
          <p className="mt-1 font-mono text-xs">{buildLabel}</p>
        </div>
      </div>

      {lastCheck && (
        <p className="text-xs text-muted-foreground">
          {t("settings.lastChecked")}: <span className="font-mono">{lastCheck.toLocaleString()}</span>
        </p>
      )}

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


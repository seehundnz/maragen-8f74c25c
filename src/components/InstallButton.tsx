import { useEffect, useState } from "react";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { useT } from "@/lib/i18n";
import {
  detectPlatform,
  hasInstallPrompt,
  isPwaInstalled,
  onInstallModeChange,
  onInstallPromptChange,
  promptInstall,
  type InstallPlatform,
} from "@/lib/pwa";
import type { TranslationKey } from "@/lib/i18n";

const PLATFORM_ORDER: InstallPlatform[] = ["ios-safari", "android", "desktop"];

function steps(platform: InstallPlatform): TranslationKey[] {
  switch (platform) {
    case "ios-safari":
    case "ios-other":
      return ["install.ios.step1", "install.ios.step2", "install.ios.step3"];
    case "android":
      return ["install.android.step1", "install.android.step2", "install.android.step3"];
    default:
      return ["install.desktop.step1", "install.desktop.step2"];
  }
}

function platformLabelKey(platform: InstallPlatform): TranslationKey {
  switch (platform) {
    case "ios-safari":
    case "ios-other":
      return "install.platform.ios";
    case "android":
      return "install.platform.android";
    default:
      return "install.platform.desktop";
  }
}

/** Normalises the detected platform into one of the three displayed groups. */
function groupOf(platform: InstallPlatform): InstallPlatform {
  if (platform === "ios-other") return "ios-safari";
  return platform;
}

export function InstallButton() {
  const { t } = useT();
  const isMobile = useIsMobile();
  const [ready, setReady] = useState(false);
  const [installed, setInstalled] = useState(true);
  const [canPrompt, setCanPrompt] = useState(false);
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState<InstallPlatform>("desktop");

  useEffect(() => {
    setInstalled(isPwaInstalled());
    setPlatform(detectPlatform());
    setCanPrompt(hasInstallPrompt());
    setReady(true);
  }, []);
  useEffect(() => onInstallModeChange(() => setInstalled(isPwaInstalled())), []);
  useEffect(() => onInstallPromptChange(setCanPrompt), []);

  if (!ready || installed || !isMobile) return null;

  const onInstall = async () => {
    const accepted = await promptInstall();
    if (accepted) setOpen(false);
  };

  const current = groupOf(platform);
  const others = PLATFORM_ORDER.filter((p) => p !== current);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <Download className="size-4" aria-hidden />
        <span className="hidden sm:inline">{t("nav.install")}</span>
        <span className="sr-only sm:hidden">{t("nav.install")}</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85dvh] overflow-y-auto max-w-sm">
          <DialogHeader>
            <DialogTitle>{t("install.title")}</DialogTitle>
            <DialogDescription>{t("install.intro")}</DialogDescription>
          </DialogHeader>

          {/* Detected platform first, with its native install button */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">
              {t(platformLabelKey(current))}
            </h3>
            {current === "ios-safari" && (
              <p className="rounded-md border border-border bg-secondary/40 p-3 text-xs text-muted-foreground">
                {t("install.iosOther.note")}
              </p>
            )}
            <ol className="list-decimal space-y-1.5 pl-5 text-sm text-foreground">
              {steps(current).map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ol>
            {canPrompt && (
              <Button size="sm" onClick={() => void onInstall()}>
                <Download className="size-4" aria-hidden />
                {t("install.button")}
              </Button>
            )}
          </div>

          {/* Other platforms so crew members on any device can install */}
          <div className="space-y-3 border-t border-border pt-3">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t("install.otherDevices")}
            </h3>
            {others.map((p) => (
              <div key={p} className="space-y-1">
                <p className="text-sm font-semibold text-foreground">{t(platformLabelKey(p))}</p>
                <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                  {steps(p).map((key) => (
                    <li key={key}>{t(key)}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
              {t("install.close")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

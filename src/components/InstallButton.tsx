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

function steps(platform: InstallPlatform): string[] {
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
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t("install.title")}</DialogTitle>
            <DialogDescription>{t("install.intro")}</DialogDescription>
          </DialogHeader>

          {platform === "ios-other" && (
            <p className="rounded-md border border-border bg-secondary/40 p-3 text-xs text-muted-foreground">
              {t("install.iosOther.note")}
            </p>
          )}

          <ol className="list-decimal space-y-2 pl-5 text-sm text-foreground">
            {steps(platform).map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ol>

          <div className="flex justify-end gap-2">
            {canPrompt && (
              <Button size="sm" onClick={() => void onInstall()}>
                <Download className="size-4" aria-hidden />
                {t("install.button")}
              </Button>
            )}
            <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
              {t("install.close")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

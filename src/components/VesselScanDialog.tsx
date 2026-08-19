import { useEffect, useRef, useState } from "react";
import { QrCode } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { decodeVessel, type SharedVessel } from "@/lib/vesselShare";
import { useT } from "@/lib/i18n";

export function VesselScanDialog({
  open,
  onOpenChange,
  onDetected,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDetected: (vessel: SharedVessel) => void;
}) {
  const { t } = useT();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraError, setCameraError] = useState(false);
  const [pasted, setPasted] = useState("");
  const [pasteError, setPasteError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    let stopped = false;
    let controls: { stop: () => void } | null = null;

    void (async () => {
      try {
        const { BrowserQRCodeReader } = await import("@zxing/browser");
        const reader = new BrowserQRCodeReader();
        const video = videoRef.current;
        if (!video) return;
        const result = await reader.decodeFromVideoDevice(
          undefined,
          video,
          (res) => {
            if (stopped || !res) return;
            const vessel = decodeVessel(res.getText());
            if (!vessel) return;
            stopped = true;
            controls?.stop();
            onDetected(vessel);
          },
        );
        controls = result;
        if (stopped) result.stop();
      } catch {
        setCameraError(true);
      }
    })();

    return () => {
      stopped = true;
      controls?.stop();
    };
  }, [open, onDetected]);

  useEffect(() => {
    if (!open) {
      setCameraError(false);
      setPasted("");
      setPasteError(null);
    }
  }, [open]);

  const importPasted = () => {
    const vessel = decodeVessel(pasted);
    if (!vessel) {
      setPasteError(t("share.invalidCode"));
      return;
    }
    setPasteError(null);
    onDetected(vessel);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{t("share.scanTitle")}</DialogTitle>
          <DialogDescription>{t("share.scanHint")}</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-muted">
            <video
              ref={videoRef}
              className="size-full object-cover"
              muted
              playsInline
              aria-label={t("share.scanTitle")}
            />
            {cameraError && (
              <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-sm text-muted-foreground">
                {t("share.cameraError")}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="share-code">{t("share.pasteLabel")}</Label>
            <Input
              id="share-code"
              value={pasted}
              onChange={(e) => setPasted(e.target.value)}
              placeholder="VHFV1:…"
            />
            {pasteError && <p className="text-xs text-destructive">{pasteError}</p>}
            <Button
              variant="secondary"
              className="w-full"
              onClick={importPasted}
              disabled={!pasted.trim()}
            >
              <QrCode /> {t("share.pasteAction")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

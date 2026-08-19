import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { encodeVessel } from "@/lib/vesselShare";
import { useT } from "@/lib/i18n";
import type { Vessel } from "@/lib/types";

export function VesselQrDialog({
  vessel,
  open,
  onOpenChange,
}: {
  vessel: Vessel | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useT();
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const code = vessel ? encodeVessel(vessel) : "";

  useEffect(() => {
    if (!open || !vessel) {
      setDataUrl(null);
      return;
    }
    let cancelled = false;
    void (async () => {
      const QRCode = await import("qrcode");
      const url = await QRCode.toDataURL(code, {
        errorCorrectionLevel: "M",
        margin: 1,
        width: 512,
        color: { dark: "#000000", light: "#ffffff" },
      });
      if (!cancelled) setDataUrl(url);
    })();
    return () => {
      cancelled = true;
    };
  }, [open, vessel, code]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success(t("share.copied"));
    } catch {
      toast.error(t("call.copyFailed"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{t("share.qrTitle")}</DialogTitle>
          <DialogDescription>{t("share.qrHint")}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-xl bg-white p-3">
            {dataUrl ? (
              <img
                src={dataUrl}
                alt={t("share.qrAlt", { name: vessel?.name ?? "" })}
                className="size-56"
              />
            ) : (
              <div className="size-56 animate-pulse rounded bg-muted" />
            )}
          </div>
          <p className="text-center text-sm font-semibold">{vessel?.name}</p>
          <p className="font-mono text-xs text-muted-foreground">
            MMSI {vessel?.mmsi} · {vessel?.callSign}
          </p>
          <Button variant="secondary" size="sm" onClick={copy} className="w-full">
            <Copy /> {t("share.copyCode")}
          </Button>
          <p className="text-center text-xs text-muted-foreground">{t("share.privacyNote")}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

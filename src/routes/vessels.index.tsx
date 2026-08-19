import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Pencil, Plus, QrCode, ScanLine, Ship, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VesselQrDialog } from "@/components/VesselQrDialog";
import { VesselScanDialog } from "@/components/VesselScanDialog";
import { createVesselId, useSettings, useVessels } from "@/hooks/useFleet";
import type { Vessel } from "@/lib/types";
import { sharedToVessel, type SharedVessel } from "@/lib/vesselShare";
import { useT } from "@/lib/i18n";

const title = "Vessels — VHF Call Builder";
const description =
  "Manage your saved vessel profiles: name, MMSI, call sign, description and default persons on board.";

export const Route = createFileRoute("/vessels/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: VesselsPage,
});

function VesselsPage() {
  const { vessels, setVessels } = useVessels();
  const { t } = useT();
  const { settings, setSettings } = useSettings();
  const activeId = settings.activeVesselId ?? vessels[0]?.id ?? null;

  const [shareVessel, setShareVessel] = useState<Vessel | null>(null);
  const [scanOpen, setScanOpen] = useState(false);
  const [pending, setPending] = useState<SharedVessel | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Vessel | null>(null);

  const onDetected = useCallback((vessel: SharedVessel) => {
    setScanOpen(false);
    setPending(vessel);
  }, []);

  const duplicate = pending ? vessels.find((v) => v.mmsi === pending.mmsi) : undefined;

  const commitImport = (mode: "new" | "update") => {
    if (!pending) return;
    if (mode === "update" && duplicate) {
      const merged: Vessel = sharedToVessel(pending, duplicate.id);
      setVessels((list) => list.map((v) => (v.id === merged.id ? merged : v)));
      setSettings((s) => ({ ...s, activeVesselId: merged.id }));
      toast.success(t("share.updated", { name: merged.name }));
    } else {
      const created: Vessel = sharedToVessel(pending, createVesselId());
      setVessels((list) => [...list, created]);
      setSettings((s) => ({ ...s, activeVesselId: created.id }));
      toast.success(t("share.imported", { name: created.name }));
    }
    setPending(null);
  };

  return (
    <AppShell>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">{t("vessels.title")}</h1>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" onClick={() => setScanOpen(true)}>
            <ScanLine /> {t("share.scan")}
          </Button>
          <Button asChild size="sm">
            <Link to="/vessels/$id" params={{ id: "new" }}>
              <Plus /> {t("vessels.add")}
            </Link>
          </Button>
        </div>
      </div>

      {vessels.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-8 text-center">
          <Ship className="mx-auto mb-3 size-8 text-muted-foreground" aria-hidden />
          <p className="text-sm text-muted-foreground">{t("vessels.empty")}</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {vessels.map((v) => (
            <li
              key={v.id}
              className="flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4"
            >
              <div>
                <p className="flex items-center gap-2 font-semibold">
                  {v.name}
                  {v.id === activeId && (
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[0.65rem] tracking-wider uppercase">
                      {t("vessels.active")}
                    </span>
                  )}
                </p>
                <p className="font-mono text-sm text-muted-foreground">
                  MMSI {v.mmsi} · {v.callSign}
                </p>
                {(v.vesselType || v.length || v.hullColor) && (
                  <p className="text-xs text-muted-foreground">
                    {[v.length, v.vesselType, v.hullColor].filter(Boolean).join(" · ")}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={t("vessels.setActive")}
                  onClick={() => setSettings((s) => ({ ...s, activeVesselId: v.id }))}
                >
                  <Star className={v.id === activeId ? "fill-primary text-primary" : ""} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={t("share.qrTitle")}
                  onClick={() => setShareVessel(v)}
                >
                  <QrCode />
                </Button>
                <Button variant="ghost" size="icon" aria-label={t("vessels.edit")} asChild>
                  <Link to="/vessels/$id" params={{ id: v.id }}>
                    <Pencil />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={t("vessels.delete")}
                  onClick={() => {
                    setVessels((list) => list.filter((x) => x.id !== v.id));
                    if (activeId === v.id) setSettings((s) => ({ ...s, activeVesselId: null }));
                    toast.success(t("vessels.deleted", { name: v.name }));
                  }}
                >
                  <Trash2 />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <VesselQrDialog
        vessel={shareVessel}
        open={shareVessel !== null}
        onOpenChange={(o) => !o && setShareVessel(null)}
      />
      <VesselScanDialog open={scanOpen} onOpenChange={setScanOpen} onDetected={onDetected} />

      <Dialog open={pending !== null} onOpenChange={(o) => !o && setPending(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t("share.confirmTitle")}</DialogTitle>
            <DialogDescription>
              {duplicate ? t("share.duplicate", { mmsi: pending?.mmsi ?? "" }) : t("share.scanHint")}
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-xl border border-border bg-card p-3">
            <p className="font-semibold">{pending?.name}</p>
            <p className="font-mono text-sm text-muted-foreground">
              MMSI {pending?.mmsi} · {pending?.callSign}
            </p>
            {pending && (pending.vesselType || pending.length || pending.hullColor) && (
              <p className="text-xs text-muted-foreground">
                {[pending.length, pending.vesselType, pending.hullColor].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {duplicate ? (
              <>
                <Button onClick={() => commitImport("update")}>{t("share.updateExisting")}</Button>
                <Button variant="secondary" onClick={() => commitImport("new")}>
                  {t("share.addAsNew")}
                </Button>
              </>
            ) : (
              <Button onClick={() => commitImport("new")}>{t("share.import")}</Button>
            )}
            <Button variant="ghost" onClick={() => setPending(null)}>
              {t("share.cancel")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}

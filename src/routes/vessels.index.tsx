import { createFileRoute, Link } from "@tanstack/react-router";
import { Pencil, Plus, Ship, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { useSettings, useVessels } from "@/hooks/useFleet";
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

  return (
    <AppShell>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("vessels.title")}</h1>
        <Button asChild size="sm">
          <Link to="/vessels/$id" params={{ id: "new" }}>
            <Plus /> {t("vessels.add")}
          </Link>
        </Button>
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
    </AppShell>
  );
}

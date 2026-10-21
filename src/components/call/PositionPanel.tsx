import { useState } from "react";
import { Crosshair, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { GeoError } from "@/hooks/useGeoPosition";
import { useT } from "@/lib/i18n";
import { formatPositionShort, parseCoordinate, utcClockString, type Fix } from "@/lib/position";
import type { Settings } from "@/lib/types";

interface PositionPanelProps {
  now: Date | null;
  fix: Fix | null;
  error: GeoError | null;
  loading: boolean;
  refresh: () => void;
  setManualFix: (latitude: number, longitude: number) => void;
  settings: Pick<Settings, "autoUpdate" | "intervalSeconds" | "positionFormat">;
}

export function PositionPanel({
  now,
  fix,
  error,
  loading,
  refresh,
  setManualFix,
  settings,
}: PositionPanelProps) {
  const { t } = useT();
  const [manualOpen, setManualOpen] = useState(false);
  const [manualLat, setManualLat] = useState("");
  const [manualLon, setManualLon] = useState("");

  const applyManual = () => {
    const la = parseCoordinate(manualLat, "latitude");
    const lo = parseCoordinate(manualLon, "longitude");
    if (la !== null && lo !== null) {
      setManualFix(la, lo);
      toast.success(t("call.manualPositionSet"));
    } else {
      toast.error(t("call.invalidCoordinates"));
    }
  };

  return (
    <section className="grid gap-3 rounded-xl border border-border bg-card p-4">
      <div className="grid gap-4 sm:grid-cols-[1fr_1.5fr]">
        <div className="space-y-1">
          <p className="text-xs leading-4 tracking-widest text-muted-foreground uppercase">
            {t("call.utcTime")}
          </p>
          <p className="font-mono text-sm leading-6 whitespace-nowrap tabular-nums">
            {now ? utcClockString(now) : "--:--:-- UTC"}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs leading-4 tracking-widest text-muted-foreground uppercase">
            {t("call.position")}
          </p>
          <p className="font-mono text-sm leading-6 whitespace-nowrap">
            {formatPositionShort(fix, settings.positionFormat)}
          </p>
          <p className="text-xs text-muted-foreground">
            {fix?.manual
              ? t("call.manualEntry")
              : fix
                ? `±${Math.round(fix.accuracy ?? 0)} m · ${new Date(fix.timestamp).toUTCString().slice(17, 25)} UTC`
                : error
                  ? t(`call.gpsError.${error}`)
                  : t("call.waitingGps")}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" size="sm" onClick={refresh} disabled={loading}>
          <RefreshCw className={loading ? "animate-spin" : ""} /> {t("call.refreshFix")}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setManualOpen((o) => !o)}
          aria-pressed={manualOpen}
        >
          <Crosshair /> {t("call.manualPosition")}
        </Button>
        <span className="self-center text-xs text-muted-foreground">
          {settings.autoUpdate
            ? t("call.autoUpdateOn", { seconds: settings.intervalSeconds })
            : t("call.autoUpdateOff")}
        </span>
      </div>

      {manualOpen && (
        <div className="grid gap-2 sm:col-span-2 sm:grid-cols-3">
          <div>
            <Label htmlFor="lat">{t("call.latitude")}</Label>
            <Input
              id="lat"
              inputMode="decimal"
              value={manualLat}
              onChange={(e) => setManualLat(e.target.value)}
              placeholder="54.32100"
            />
          </div>
          <div>
            <Label htmlFor="lon">{t("call.longitude")}</Label>
            <Input
              id="lon"
              inputMode="decimal"
              value={manualLon}
              onChange={(e) => setManualLon(e.target.value)}
              placeholder="10.12345"
            />
          </div>
          <Button className="self-end" onClick={applyManual}>
            {t("call.usePosition")}
          </Button>
        </div>
      )}
    </section>
  );
}

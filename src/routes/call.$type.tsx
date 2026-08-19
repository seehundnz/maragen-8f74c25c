import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Copy, Crosshair, Loader2, Maximize2, RefreshCw, Share2, Square, Volume2, X } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { CallTabs } from "@/components/CallTabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGeoPosition, useUtcNow } from "@/hooks/useGeoPosition";
import { useSpeech } from "@/hooks/useSpeech";
import { useSettings, useVessels } from "@/hooks/useFleet";
import { buildScript } from "@/lib/templates";
import { formatPositionShort, utcClockString } from "@/lib/position";
import { CALL_META, isCallType, type CallInput, type CallType } from "@/lib/types";
import { useT, type TranslationKey } from "@/lib/i18n";

export const Route = createFileRoute("/call/$type")({
  loader: ({ params }) => {
    if (!isCallType(params.type)) throw notFound();
    return { type: params.type as CallType };
  },
  head: ({ params }) => {
    const meta = isCallType(params.type) ? CALL_META[params.type as CallType] : null;
    const title = meta ? `${meta.title} — VHF Call Builder` : "VHF Call Builder";
    const description = meta
      ? meta.description
      : "Build spoken VHF radio calls from your vessel data, GPS position and UTC time.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: CallPage,
});

const NATURE_PRESETS: Record<CallType, { key: TranslationKey; value: string }[]> = {
  mayday: [
    { key: "nature.sinking", value: "Sinking" },
    { key: "nature.takingOnWater", value: "Taking on water" },
    { key: "nature.fire", value: "Fire on board" },
    { key: "nature.pob", value: "Person overboard" },
    { key: "nature.grounding", value: "Grounding" },
    { key: "nature.capsized", value: "Capsized" },
    { key: "nature.collision", value: "Collision" },
    { key: "nature.medical", value: "Medical emergency" },
  ],
  panpan: [
    { key: "nature.engineFailure", value: "Engine failure" },
    { key: "nature.steeringFailure", value: "Steering failure" },
    { key: "nature.dismasted", value: "Dismasted" },
    { key: "nature.adrift", value: "Adrift" },
    { key: "nature.outOfFuel", value: "Out of fuel" },
    { key: "nature.medicalAdvice", value: "Medical advice required" },
    { key: "nature.riggingDamage", value: "Rigging damage" },
  ],
  securite: [
    { key: "nature.navHazard", value: "Navigation hazard sighted" },
    { key: "nature.floatingObject", value: "Floating object adrift" },
    { key: "nature.unlitBuoy", value: "Unlit buoy" },
    { key: "nature.restrictedManoeuvrability", value: "Restricted manoeuvrability" },
    { key: "nature.severeWeather", value: "Severe weather observed" },
  ],
  standard: [],
};

function CallPage() {
  const { type } = Route.useLoaderData();
  const meta = CALL_META[type];
  const { t } = useT();
  const { vessels } = useVessels();
  const { settings, setSettings } = useSettings();
  const now = useUtcNow();
  const { fix, error, loading, refresh, setManualFix } = useGeoPosition(
    settings.autoUpdate,
    settings.intervalSeconds,
  );
  const [readMode, setReadMode] = useState(false);
  const speech = useSpeech();
  const [manualOpen, setManualOpen] = useState(false);
  const [manualLat, setManualLat] = useState("");
  const [manualLon, setManualLon] = useState("");
  const [input, setInput] = useState<CallInput>({
    nature: "",
    assistance: "immediate assistance",
    pob: "",
    channel: "",
    station: "",
    message: "",
  });

  const MESSAGE_PLACEHOLDER: Record<CallType, TranslationKey> = {
    mayday: "call.additionalMessagePlaceholder",
    panpan: "call.additionalMessagePlaceholder.panpan",
    securite: "call.additionalMessagePlaceholder.securite",
    standard: "call.additionalMessagePlaceholder.standard",
  };

  const activeVessel =
    vessels.find((v) => v.id === settings.activeVesselId) ?? vessels[0] ?? null;

  const script = useMemo(
    () =>
      buildScript(type, {
        vessel: activeVessel,
        fix,
        now: now ?? new Date(0),
        input: { ...input, channel: input.channel || settings.defaultChannel },
        positionFormat: settings.positionFormat,
      }),
    [type, activeVessel, fix, now, input, settings.defaultChannel, settings.positionFormat],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(script);
      toast.success(t("call.copied"));
    } catch {
      toast.error(t("call.copyFailed"));
    }
  };

  const share = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: meta.title, text: script });
      } catch {
        /* user cancelled */
      }
    } else {
      void copy();
    }
  };

  const toggleSpeak = async () => {
    if (speech.speaking) {
      speech.stop();
      return;
    }
    const result = await speech.speak(script, { useAiVoice: settings.useAiVoice !== false });
    if (result.failed) toast.error(t("call.speechUnavailable"));
    else if (result.fallback) toast.info(t("call.offlineVoice"));
  };

  const SpeakButton = ({ size = "sm" as const }) => (
    <Button size={size} variant="secondary" onClick={toggleSpeak}>
      {speech.loading ? (
        <Loader2 className="animate-spin" />
      ) : speech.speaking ? (
        <Square />
      ) : (
        <Volume2 />
      )}
      {speech.speaking ? t("call.stop") : t("call.speak")}
    </Button>
  );

  return (
    <div data-call={type} className="transition-colors duration-300">
      <AppShell>
        <div className="space-y-4">
          <section className="call-surface rounded-xl border border-primary/40 p-4">
            <h1 className="text-2xl font-black tracking-[0.15em] text-primary uppercase">
              {meta.label}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{t(`call.${type}.description`)}</p>
          </section>

          <section className="grid gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-[1fr_1.5fr]">
            <div>
              <p className="text-xs tracking-widest text-muted-foreground uppercase">{t("call.utcTime")}</p>
              <p className="font-mono text-xl tabular-nums">
                {now ? utcClockString(now) : "--:--:-- UTC"}
              </p>
            </div>
            <div>
              <p className="text-xs tracking-widest text-muted-foreground uppercase">{t("call.position")}</p>
              <p className="font-mono text-xl break-words">
                {formatPositionShort(fix, settings.positionFormat)}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {fix?.manual
                  ? t("call.manualEntry")
                  : fix
                    ? `±${Math.round(fix.accuracy ?? 0)} m · ${new Date(fix.timestamp).toUTCString().slice(17, 25)} UTC`
                    : (error ?? t("call.waitingGps"))}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:col-span-2">
              <Button variant="secondary" size="sm" onClick={refresh} disabled={loading}>
                <RefreshCw className={loading ? "animate-spin" : ""} /> {t("call.refreshFix")}
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setManualOpen((o) => !o)} aria-pressed={manualOpen}>
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
                <Button
                  className="self-end"
                  onClick={() => {
                    const la = Number(manualLat);
                    const lo = Number(manualLon);
                    if (Number.isFinite(la) && Number.isFinite(lo)) {
                      setManualFix(la, lo);
                      toast.success(t("call.manualPositionSet"));
                    } else {
                      toast.error(t("call.invalidCoordinates"));
                    }
                  }}
                >
                  {t("call.usePosition")}
                </Button>
              </div>
            )}
          </section>

          <section className="space-y-3 rounded-xl border border-border bg-card p-4">
            <div>
              <Label htmlFor="vessel">{t("call.vessel")}</Label>
              {vessels.length ? (
                <Select
                  value={activeVessel?.id ?? ""}
                  onValueChange={(id) => setSettings((s) => ({ ...s, activeVesselId: id }))}
                >
                  <SelectTrigger id="vessel">
                    <SelectValue placeholder={t("call.selectVessel")} />
                  </SelectTrigger>
                  <SelectContent>
                    {vessels.map((v) => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.name} · {v.mmsi}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {t("call.noVessel")}{" "}
                  <Link to="/vessels" className="text-primary underline">
                    {t("call.addYourVessel")}
                  </Link>
                </p>
              )}
            </div>

            {type === "standard" ? (
              <div>
                <Label htmlFor="station">{t("call.stationCalled")}</Label>
                <Input
                  id="station"
                  value={input.station}
                  onChange={(e) => setInput((i) => ({ ...i, station: e.target.value }))}
                  placeholder="Kiel Marina"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="nature">
                  {type === "securite" ? t("call.safetyMessage") : t("call.natureOfSituation")}
                </Label>
                <Input
                  id="nature"
                  value={input.nature}
                  onChange={(e) => setInput((i) => ({ ...i, nature: e.target.value }))}
                  placeholder={type === "securite" ? "Container adrift" : "Taking on water"}
                />
                <div className="flex flex-wrap gap-2">
                  {NATURE_PRESETS[type].map((preset) => (
                    <button
                      key={preset.key}
                      type="button"
                      onClick={() => setInput((i) => ({ ...i, nature: preset.value }))}
                      className="rounded-full border border-border px-3 py-1 text-xs transition-colors hover:border-primary hover:text-primary"
                    >
                      {t(preset.key)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-3">
              {type !== "securite" && type !== "standard" && (
                <div>
                  <Label htmlFor="assistance">{t("call.assistanceRequired")}</Label>
                  <Input
                    id="assistance"
                    value={input.assistance}
                    onChange={(e) => setInput((i) => ({ ...i, assistance: e.target.value }))}
                  />
                </div>
              )}
              {type !== "standard" && (
                <div>
                  <Label htmlFor="pob">{t("call.pob")}</Label>
                  <Input
                    id="pob"
                    inputMode="numeric"
                    value={input.pob}
                    onChange={(e) => setInput((i) => ({ ...i, pob: e.target.value }))}
                    placeholder={activeVessel?.pob || "4"}
                  />
                </div>
              )}
              <div>
                <Label htmlFor="channel">{t("call.channel")}</Label>
                <Input
                  id="channel"
                  inputMode="numeric"
                  value={input.channel}
                  onChange={(e) => setInput((i) => ({ ...i, channel: e.target.value }))}
                  placeholder={activeVessel?.channel || settings.defaultChannel}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="message">{t("call.additionalMessage")}</Label>
              <Textarea
                id="message"
                rows={2}
                value={input.message}
                onChange={(e) => setInput((i) => ({ ...i, message: e.target.value }))}
                placeholder={t(MESSAGE_PLACEHOLDER[type])}
              />
            </div>
          </section>

          <section className="rounded-xl border-2 border-primary bg-card p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-bold tracking-widest text-primary uppercase">
                {t("call.radioScript")}
              </h2>
              <div className="flex flex-wrap gap-2">
                <SpeakButton />
                <Button size="sm" variant="secondary" onClick={copy}>
                  <Copy /> {t("call.copy")}
                </Button>
                <Button size="sm" variant="secondary" onClick={share}>
                  <Share2 /> {t("call.share")}
                </Button>
                <Button size="sm" onClick={() => setReadMode(true)}>
                  <Maximize2 /> {t("call.read")}
                </Button>
              </div>
            </div>
            <pre className="font-mono text-base leading-relaxed break-words whitespace-pre-wrap">
              {script}
            </pre>
            <p className="mt-3 text-xs text-muted-foreground">{t("call.scriptEnglishNote")}</p>
          </section>

          <p className="pb-2 text-xs text-muted-foreground">{t("call.disclaimer")}</p>
        </div>
      </AppShell>

      <CallTabs active={type} />

      {readMode && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-background p-5">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-lg font-black tracking-widest text-primary">{meta.label}</span>
              <div className="flex gap-2">
                <SpeakButton />
                <Button variant="secondary" size="sm" onClick={() => setReadMode(false)}>
                  <X /> {t("call.close")}
                </Button>
              </div>
            </div>
            <pre className="font-mono text-2xl leading-relaxed break-words whitespace-pre-wrap sm:text-3xl">
              {script}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

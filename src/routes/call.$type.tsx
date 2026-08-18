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

const NATURE_PRESETS: Record<CallType, string[]> = {
  mayday: [
    "Sinking",
    "Taking on water",
    "Fire on board",
    "Person overboard",
    "Grounding",
    "Capsized",
    "Collision",
    "Medical emergency",
  ],
  panpan: [
    "Engine failure",
    "Steering failure",
    "Dismasted",
    "Adrift",
    "Out of fuel",
    "Medical advice required",
    "Rigging damage",
  ],
  securite: [
    "Navigation hazard sighted",
    "Floating object adrift",
    "Unlit buoy",
    "Restricted manoeuvrability",
    "Severe weather observed",
  ],
  standard: [],
};

function CallPage() {
  const { type } = Route.useLoaderData();
  const meta = CALL_META[type];
  const { vessels } = useVessels();
  const { settings, setSettings } = useSettings();
  const now = useUtcNow();
  const { fix, error, loading, refresh, setManualFix } = useGeoPosition(
    settings.autoUpdate,
    settings.intervalSeconds,
  );
  const [readMode, setReadMode] = useState(false);
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
      toast.success("Radio script copied");
    } catch {
      toast.error("Could not copy — select the text manually");
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

  return (
    <div data-call={type} className="transition-colors duration-300">
      <AppShell>
        <div className="space-y-4">
          <section className="call-surface rounded-xl border border-primary/40 p-4">
            <h1 className="text-2xl font-black tracking-[0.15em] text-primary uppercase">
              {meta.label}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{meta.description}</p>
          </section>

          <section className="grid gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-2">
            <div>
              <p className="text-xs tracking-widest text-muted-foreground uppercase">UTC time</p>
              <p className="font-mono text-xl tabular-nums">
                {now ? utcClockString(now) : "--:--:-- UTC"}
              </p>
            </div>
            <div>
              <p className="text-xs tracking-widest text-muted-foreground uppercase">Position</p>
              <p className="font-mono text-base break-words">
                {formatPositionShort(fix, settings.positionFormat)}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {fix?.manual
                  ? "Manual entry"
                  : fix
                    ? `±${Math.round(fix.accuracy ?? 0)} m · ${new Date(fix.timestamp).toUTCString().slice(17, 25)} UTC`
                    : (error ?? "Waiting for GPS…")}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:col-span-2">
              <Button variant="secondary" size="sm" onClick={refresh} disabled={loading}>
                <RefreshCw className={loading ? "animate-spin" : ""} /> Refresh fix
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setManualOpen((o) => !o)}>
                <Crosshair /> Manual position
              </Button>
              <span className="self-center text-xs text-muted-foreground">
                {settings.autoUpdate
                  ? `Auto-update every ${settings.intervalSeconds}s`
                  : "Auto-update off"}
              </span>
            </div>
            {manualOpen && (
              <div className="grid gap-2 sm:col-span-2 sm:grid-cols-3">
                <div>
                  <Label htmlFor="lat">Latitude (decimal)</Label>
                  <Input
                    id="lat"
                    inputMode="decimal"
                    value={manualLat}
                    onChange={(e) => setManualLat(e.target.value)}
                    placeholder="54.32100"
                  />
                </div>
                <div>
                  <Label htmlFor="lon">Longitude (decimal)</Label>
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
                      toast.success("Manual position set");
                    } else {
                      toast.error("Enter valid decimal coordinates");
                    }
                  }}
                >
                  Use position
                </Button>
              </div>
            )}
          </section>

          <section className="space-y-3 rounded-xl border border-border bg-card p-4">
            <div>
              <Label htmlFor="vessel">Vessel</Label>
              {vessels.length ? (
                <Select
                  value={activeVessel?.id ?? ""}
                  onValueChange={(id) => setSettings((s) => ({ ...s, activeVesselId: id }))}
                >
                  <SelectTrigger id="vessel">
                    <SelectValue placeholder="Select vessel" />
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
                  No vessel saved yet.{" "}
                  <Link to="/vessels" className="text-primary underline">
                    Add your vessel
                  </Link>
                </p>
              )}
            </div>

            {type === "standard" ? (
              <div>
                <Label htmlFor="station">Station called</Label>
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
                  {type === "securite" ? "Safety message" : "Nature of the situation"}
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
                      key={preset}
                      type="button"
                      onClick={() => setInput((i) => ({ ...i, nature: preset }))}
                      className="rounded-full border border-border px-3 py-1 text-xs transition-colors hover:border-primary hover:text-primary"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-3">
              {type !== "securite" && type !== "standard" && (
                <div>
                  <Label htmlFor="assistance">Assistance required</Label>
                  <Input
                    id="assistance"
                    value={input.assistance}
                    onChange={(e) => setInput((i) => ({ ...i, assistance: e.target.value }))}
                  />
                </div>
              )}
              {type !== "standard" && (
                <div>
                  <Label htmlFor="pob">Persons on board</Label>
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
                <Label htmlFor="channel">VHF channel</Label>
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
              <Label htmlFor="message">Additional message</Label>
              <Textarea
                id="message"
                rows={2}
                value={input.message}
                onChange={(e) => setInput((i) => ({ ...i, message: e.target.value }))}
                placeholder="Anything else the coast station should know"
              />
            </div>
          </section>

          <section className="rounded-xl border-2 border-primary bg-card p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-bold tracking-widest text-primary uppercase">
                Radio script
              </h2>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={copy}>
                  <Copy /> Copy
                </Button>
                <Button size="sm" variant="secondary" onClick={share}>
                  <Share2 /> Share
                </Button>
                <Button size="sm" onClick={() => setReadMode(true)}>
                  <Maximize2 /> Read
                </Button>
              </div>
            </div>
            <pre className="font-mono text-base leading-relaxed break-words whitespace-pre-wrap">
              {script}
            </pre>
          </section>

          <p className="pb-2 text-xs text-muted-foreground">
            This app is an aid only. It does not replace proper radio training, a DSC distress
            alert, or the skipper's judgement. Always send a DSC alert first where available.
          </p>
        </div>
      </AppShell>

      <CallTabs active={type} />

      {readMode && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-background p-5">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-lg font-black tracking-widest text-primary">{meta.label}</span>
              <Button variant="secondary" size="sm" onClick={() => setReadMode(false)}>
                <X /> Close
              </Button>
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

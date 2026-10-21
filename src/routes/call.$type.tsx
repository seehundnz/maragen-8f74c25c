import { createFileRoute, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Copy, Maximize2, Share2 } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { CallTabs } from "@/components/CallTabs";
import { CallDetailsForm } from "@/components/call/CallDetailsForm";
import { Channel16Notice } from "@/components/call/Channel16Notice";
import { DscSection } from "@/components/call/DscSection";
import { FurtherComms } from "@/components/call/FurtherComms";
import { PositionPanel } from "@/components/call/PositionPanel";
import { ReadModeOverlay } from "@/components/call/ReadModeOverlay";
import { SpeakButton } from "@/components/call/SpeakButton";
import { Button } from "@/components/ui/button";
import { useGeoPosition, useUtcNow } from "@/hooks/useGeoPosition";
import { useSpeech } from "@/hooks/useSpeech";
import { useSettings, useVessels } from "@/hooks/useFleet";
import { buildScript } from "@/lib/templates";
import { CALL_META, isCallType, type CallInput, type CallType } from "@/lib/types";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/call/$type")({
  staticData: { sitemap: true },
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
        { property: "og:type", content: "website" },
        ...(meta
          ? [{ property: "og:url", content: `https://app.vhfcall.eu/call/${params.type}` }]
          : []),
        { name: "twitter:card", content: "summary" },
      ],
      links: meta ? [{ rel: "canonical", href: `https://app.vhfcall.eu/call/${params.type}` }] : [],
    };
  },
  component: CallPage,
});

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
  const speech = useSpeech();
  const [readMode, setReadMode] = useState(false);
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
    const result = await speech.speak(script, { useAiVoice: settings.useAiVoice === true });
    if (result.failed) toast.error(t("call.speechUnavailable"));
    else if (result.fallback) toast.info(t("call.offlineVoice"));
  };

  const speakButton = (
    <SpeakButton speaking={speech.speaking} loading={speech.loading} onClick={toggleSpeak} />
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

          {type === "mayday" && <DscSection />}

          <PositionPanel
            now={now}
            fix={fix}
            error={error}
            loading={loading}
            refresh={refresh}
            setManualFix={setManualFix}
            settings={settings}
          />

          <CallDetailsForm
            type={type}
            vessels={vessels}
            activeVessel={activeVessel}
            onSelectVessel={(id) => setSettings((s) => ({ ...s, activeVesselId: id }))}
            input={input}
            setInput={setInput}
            defaultChannel={settings.defaultChannel}
          />

          {type !== "standard" && <Channel16Notice />}

          <section className="rounded-xl border-2 border-primary bg-card p-4">
            <div className="mb-3 grid grid-cols-[1fr_auto] items-center gap-3">
              <h2 className="text-sm font-bold tracking-widest text-primary uppercase">
                {t("call.radioScript")}
              </h2>
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end">
                {speakButton}
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

          {type === "mayday" && <FurtherComms />}

          <p className="pb-2 text-xs text-muted-foreground">{t("call.disclaimer")}</p>
        </div>
      </AppShell>

      <CallTabs active={type} />

      {readMode && (
        <ReadModeOverlay
          label={meta.label}
          script={script}
          showChannel16={type !== "standard"}
          speakButton={speakButton}
          onClose={() => setReadMode(false)}
        />
      )}
    </div>
  );
}

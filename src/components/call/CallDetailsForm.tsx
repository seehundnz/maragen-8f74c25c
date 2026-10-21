import type { Dispatch, SetStateAction } from "react";
import { Link } from "@tanstack/react-router";

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
import { useT, type TranslationKey } from "@/lib/i18n";
import type { CallInput, CallType, Vessel } from "@/lib/types";

/** Preset buttons: the label is translated, the inserted value stays English for the radio script. */
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

const MESSAGE_PLACEHOLDER: Record<CallType, TranslationKey> = {
  mayday: "call.additionalMessagePlaceholder",
  panpan: "call.additionalMessagePlaceholder.panpan",
  securite: "call.additionalMessagePlaceholder.securite",
  standard: "call.additionalMessagePlaceholder.standard",
};

interface CallDetailsFormProps {
  type: CallType;
  vessels: Vessel[];
  activeVessel: Vessel | null;
  onSelectVessel: (id: string) => void;
  input: CallInput;
  setInput: Dispatch<SetStateAction<CallInput>>;
  defaultChannel: string;
}

export function CallDetailsForm({
  type,
  vessels,
  activeVessel,
  onSelectVessel,
  input,
  setInput,
  defaultChannel,
}: CallDetailsFormProps) {
  const { t } = useT();

  return (
    <section className="space-y-3 rounded-xl border border-border bg-card p-4">
      <div>
        <Label htmlFor="vessel">{t("call.vessel")}</Label>
        {vessels.length ? (
          <Select value={activeVessel?.id ?? ""} onValueChange={onSelectVessel}>
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
            placeholder={activeVessel?.channel || defaultChannel}
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
  );
}

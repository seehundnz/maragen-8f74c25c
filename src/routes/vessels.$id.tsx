import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createVesselId, useSettings, useVessels } from "@/hooks/useFleet";
import type { Vessel } from "@/lib/types";

const title = "Edit vessel — VHF Call Builder";
const description = "Add or edit a vessel profile with name, MMSI, call sign and default details.";

export const Route = createFileRoute("/vessels/$id")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: VesselEditPage,
});

const EMPTY: Vessel = {
  id: "",
  name: "",
  mmsi: "",
  callSign: "",
  vesselType: "",
  length: "",
  hullColor: "",
  pob: "",
  channel: "",
};

function VesselEditPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { vessels, setVessels, hydrated } = useVessels();
  const { setSettings } = useSettings();
  const [draft, setDraft] = useState<Vessel>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!hydrated || id === "new") return;
    const found = vessels.find((v) => v.id === id);
    if (found) setDraft(found);
  }, [hydrated, id, vessels]);

  const set = (key: keyof Vessel, value: string) => setDraft((d) => ({ ...d, [key]: value }));

  const save = () => {
    const next: Record<string, string> = {};
    if (!draft.name.trim()) next["name"] = "Vessel name is required";
    if (!/^\d{9}$/.test(draft.mmsi.trim())) next["mmsi"] = "MMSI must be exactly 9 digits";
    if (!draft.callSign.trim()) next["callSign"] = "Call sign is required";
    setErrors(next);
    if (Object.keys(next).length) return;

    const vessel: Vessel = { ...draft, id: draft.id || createVesselId() };
    setVessels((list) =>
      list.some((v) => v.id === vessel.id)
        ? list.map((v) => (v.id === vessel.id ? vessel : v))
        : [...list, vessel],
    );
    setSettings((s) => ({ ...s, activeVesselId: vessel.id }));
    toast.success(`${vessel.name} saved`);
    void navigate({ to: "/vessels" });
  };

  return (
    <AppShell>
      <h1 className="mb-4 text-2xl font-bold">{id === "new" ? "Add vessel" : "Edit vessel"}</h1>
      <div className="space-y-4 rounded-xl border border-border bg-card p-4">
        <Field
          id="name"
          label="Vessel name"
          value={draft.name}
          onChange={(v) => set("name", v)}
          error={errors["name"]}
          placeholder="Seabird"
        />
        <Field
          id="mmsi"
          label="MMSI (9 digits)"
          value={draft.mmsi}
          onChange={(v) => set("mmsi", v.replace(/\D/g, "").slice(0, 9))}
          error={errors["mmsi"]}
          placeholder="211123456"
        />
        <Field
          id="callSign"
          label="Call sign"
          value={draft.callSign}
          onChange={(v) => set("callSign", v.toUpperCase())}
          error={errors["callSign"]}
          placeholder="DK1234"
        />
        <div className="grid gap-3 sm:grid-cols-3">
          <Field
            id="type"
            label="Vessel type"
            value={draft.vesselType ?? ""}
            onChange={(v) => set("vesselType", v)}
            placeholder="Sailing yacht"
          />
          <Field
            id="length"
            label="Length"
            value={draft.length ?? ""}
            onChange={(v) => set("length", v)}
            placeholder="11 metre"
          />
          <Field
            id="hull"
            label="Hull colour"
            value={draft.hullColor ?? ""}
            onChange={(v) => set("hullColor", v)}
            placeholder="white"
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            id="pob"
            label="Default persons on board"
            value={draft.pob ?? ""}
            onChange={(v) => set("pob", v.replace(/\D/g, ""))}
            placeholder="4"
          />
          <Field
            id="channel"
            label="Default VHF channel"
            value={draft.channel ?? ""}
            onChange={(v) => set("channel", v)}
            placeholder="16"
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={save}>Save vessel</Button>
          <Button variant="ghost" onClick={() => void navigate({ to: "/vessels" })}>
            Cancel
          </Button>
        </div>
      </div>
    </AppShell>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | undefined;
  placeholder?: string;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

import { z } from "zod";
import type { Vessel } from "@/lib/types";

const vesselDataSchema = z.object({
  name: z.string().min(1).max(80),
  mmsi: z.string().regex(/^\d{0,9}$/),
  callSign: z.string().max(20),
  vesselType: z.string().max(60).optional(),
  length: z.string().max(30).optional(),
  hullColor: z.string().max(40).optional(),
  pob: z.string().max(4).optional(),
  channel: z.string().max(6).optional(),
});

const payloadSchema = z.object({
  v: z.literal(1),
  t: z.literal("vessel"),
  d: vesselDataSchema,
});

export type SharedVessel = z.infer<typeof vesselDataSchema>;

const PREFIX = "VHFV1:";

function toBase64Url(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(input: string): string {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded + "=".repeat((4 - (padded.length % 4)) % 4));
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodeVessel(vessel: Vessel): string {
  const data: SharedVessel = {
    name: vessel.name,
    mmsi: vessel.mmsi,
    callSign: vessel.callSign,
    ...(vessel.vesselType ? { vesselType: vessel.vesselType } : {}),
    ...(vessel.length ? { length: vessel.length } : {}),
    ...(vessel.hullColor ? { hullColor: vessel.hullColor } : {}),
    ...(vessel.pob ? { pob: vessel.pob } : {}),
    ...(vessel.channel ? { channel: vessel.channel } : {}),
  };
  return PREFIX + toBase64Url(JSON.stringify({ v: 1, t: "vessel", d: data }));
}

export function decodeVessel(raw: string): SharedVessel | null {
  const trimmed = raw.trim();
  if (!trimmed.startsWith(PREFIX)) return null;
  try {
    const json = JSON.parse(fromBase64Url(trimmed.slice(PREFIX.length)));
    const parsed = payloadSchema.safeParse(json);
    return parsed.success ? parsed.data.d : null;
  } catch {
    return null;
  }
}

export function sharedToVessel(shared: SharedVessel, id: string): Vessel {
  const vessel: Vessel = {
    id,
    name: shared.name,
    mmsi: shared.mmsi,
    callSign: shared.callSign,
  };
  if (shared.vesselType !== undefined) vessel.vesselType = shared.vesselType;
  if (shared.length !== undefined) vessel.length = shared.length;
  if (shared.hullColor !== undefined) vessel.hullColor = shared.hullColor;
  if (shared.pob !== undefined) vessel.pob = shared.pob;
  if (shared.channel !== undefined) vessel.channel = shared.channel;
  return vessel;
}

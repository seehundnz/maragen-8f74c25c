import type { CallInput, CallType, Vessel } from "./types";
import { formatPosition, utcTimeString, type Fix } from "./position";

const MISSING = (label: string) => `[${label}]`;

export interface TemplateContext {
  vessel: Vessel | null;
  fix: Fix | null;
  now: Date;
  input: CallInput;
  positionFormat: "ddm" | "dd";
}

function vesselName(vessel: Vessel | null): string {
  return vessel?.name?.trim() ? vessel.name.toUpperCase() : MISSING("VESSEL NAME");
}

function value(raw: string | undefined, label: string): string {
  return raw && raw.trim() ? raw.trim() : MISSING(label);
}

function identityBlock(ctx: TemplateContext): string[] {
  const { vessel } = ctx;
  const lines = [
    `THIS IS ${vesselName(vessel)}, ${vesselName(vessel)}, ${vesselName(vessel)}`,
    `Call sign ${value(vessel?.callSign, "CALL SIGN")}, MMSI ${value(vessel?.mmsi, "MMSI")}`,
  ];
  return lines;
}

function positionBlock(ctx: TemplateContext): string[] {
  return [
    `My position is ${formatPosition(ctx.fix, ctx.positionFormat)}`,
    `Time ${utcTimeString(ctx.now)}`,
  ];
}

function description(vessel: Vessel | null): string | null {
  if (!vessel) return null;
  const parts = [vessel.length, vessel.vesselType, vessel.hullColor && `${vessel.hullColor} hull`]
    .filter((p) => p && p.trim())
    .map((p) => (p as string).trim());
  if (!parts.length) return null;
  return `My vessel is a ${parts.join(", ")}`;
}

export function buildScript(type: CallType, ctx: TemplateContext): string {
  const { input, vessel } = ctx;
  const channel = value(input.channel || vessel?.channel, "CHANNEL");
  const pob = value(input.pob || vessel?.pob, "PERSONS ON BOARD");
  const desc = description(vessel);
  const lines: string[] = [];

  if (type === "mayday") {
    lines.push("MAYDAY, MAYDAY, MAYDAY");
    lines.push(...identityBlock(ctx));
    lines.push("MAYDAY");
    lines.push(`${vesselName(vessel)}, MMSI ${value(vessel?.mmsi, "MMSI")}`);
    lines.push(...positionBlock(ctx));
    lines.push(`Nature of distress: ${value(input.nature, "NATURE OF DISTRESS")}`);
    lines.push(`I require ${value(input.assistance, "ASSISTANCE REQUIRED")}`);
    if (pob.trim()) lines.push(`${pob} persons on board`);
    if (desc) lines.push(desc);
    if (input.message.trim()) lines.push(input.message.trim());
    lines.push(`I am listening on VHF channel ${channel}`);
    lines.push("OVER");
  } else if (type === "panpan") {
    lines.push("PAN-PAN, PAN-PAN, PAN-PAN");
    lines.push("ALL STATIONS, ALL STATIONS, ALL STATIONS");
    lines.push(...identityBlock(ctx));
    lines.push(...positionBlock(ctx));
    lines.push(`Nature of urgency: ${value(input.nature, "NATURE OF URGENCY")}`);
    lines.push(`I require ${value(input.assistance, "ASSISTANCE REQUIRED")}`);
    if (pob.trim()) lines.push(`${pob} persons on board`);
    if (desc) lines.push(desc);
    if (input.message.trim()) lines.push(input.message.trim());
    lines.push(`I am listening on VHF channel ${channel}`);
    lines.push("OVER");
  } else if (type === "securite") {
    lines.push("SÉCURITÉ, SÉCURITÉ, SÉCURITÉ");
    lines.push("ALL STATIONS, ALL STATIONS, ALL STATIONS");
    lines.push(...identityBlock(ctx));
    lines.push(...positionBlock(ctx));
    lines.push(`Safety message: ${value(input.nature || input.message, "SAFETY MESSAGE")}`);
    lines.push(`I am listening on VHF channel ${channel}`);
    lines.push("OUT");
  } else {
    const station = value(input.station, "STATION CALLED");
    lines.push(`${station.toUpperCase()}, ${station.toUpperCase()}, ${station.toUpperCase()}`);
    lines.push(...identityBlock(ctx));
    lines.push(`Message: ${value(input.message, "MESSAGE")}`);
    lines.push(`Request to switch to VHF channel ${channel}`);
    lines.push("OVER");
  }

  return lines.join("\n");
}

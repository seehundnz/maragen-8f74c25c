export type CallType = "mayday" | "panpan" | "securite" | "standard";

export const CALL_TYPES: CallType[] = ["mayday", "panpan", "securite", "standard"];

export interface Vessel {
  id: string;
  name: string;
  mmsi: string;
  callSign: string;
  vesselType?: string;
  length?: string;
  hullColor?: string;
  pob?: string;
  channel?: string;
}

export interface Settings {
  autoUpdate: boolean;
  intervalSeconds: number;
  defaultChannel: string;
  positionFormat: "ddm" | "dd";
  activeVesselId: string | null;
  useAiVoice: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  autoUpdate: true,
  intervalSeconds: 10,
  defaultChannel: "16",
  positionFormat: "ddm",
  activeVesselId: null,
  useAiVoice: true,
};

export interface CallInput {
  nature: string;
  assistance: string;
  pob: string;
  channel: string;
  station: string;
  message: string;
}

export const CALL_META: Record<
  CallType,
  { label: string; short: string; title: string; description: string }
> = {
  mayday: {
    label: "MAYDAY",
    short: "Distress",
    title: "Mayday Distress Call",
    description:
      "Generate a spoken Mayday distress call with your vessel data, live GPS position and UTC time.",
  },
  panpan: {
    label: "PAN-PAN",
    short: "Urgency",
    title: "Pan-Pan Urgency Call",
    description:
      "Generate a spoken Pan-Pan urgency call with vessel details, live position and UTC time.",
  },
  securite: {
    label: "SÉCURITÉ",
    short: "Safety",
    title: "Sécurité Safety Call",
    description:
      "Generate a spoken Sécurité safety broadcast to all stations with your live position.",
  },
  standard: {
    label: "STANDARD",
    short: "Routine",
    title: "Standard Routine Call",
    description:
      "Generate a routine VHF call to a marina, station or another vessel with a working channel request.",
  },
};

export function isCallType(value: string): value is CallType {
  return (CALL_TYPES as string[]).includes(value);
}

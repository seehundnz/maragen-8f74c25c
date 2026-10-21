export interface Fix {
  latitude: number;
  longitude: number;
  accuracy: number | null;
  timestamp: number;
  manual?: boolean;
}

/**
 * Splits an absolute decimal degree value into whole degrees and minutes rounded to
 * `decimals`. Rounding happens on the total minutes, so 59.9999' carries over to the
 * next degree instead of producing "60.00 minutes".
 */
function toDegreesMinutes(abs: number, decimals: number): { deg: number; minutes: string } {
  const scale = 10 ** decimals;
  const units = Math.round(abs * 60 * scale);
  const deg = Math.floor(units / (60 * scale));
  const minuteUnits = units - deg * 60 * scale;
  return { deg, minutes: (minuteUnits / scale).toFixed(decimals) };
}

function ddm(value: number, positive: string, negative: string): string {
  const hemisphere = value >= 0 ? positive : negative;
  const { deg, minutes } = toDegreesMinutes(Math.abs(value), 2);
  const pad = positive === "North" ? 2 : 3;
  return `${String(deg).padStart(pad, "0")} degrees ${minutes} minutes ${hemisphere}`;
}

function dd(value: number, positive: string, negative: string): string {
  return `${Math.abs(value).toFixed(5)} degrees ${value >= 0 ? positive : negative}`;
}

export function formatPosition(fix: Fix | null, format: "ddm" | "dd"): string {
  if (!fix) return "[POSITION UNKNOWN]";
  const fn = format === "dd" ? dd : ddm;
  return `${fn(fix.latitude, "North", "South")}, ${fn(fix.longitude, "East", "West")}`;
}

export function formatPositionShort(fix: Fix | null, format: "ddm" | "dd"): string {
  if (!fix) return "No fix";
  if (format === "dd") {
    return `${fix.latitude.toFixed(5)}°, ${fix.longitude.toFixed(5)}°`;
  }
  const part = (value: number, pos: string, neg: string, pad: number) => {
    const { deg, minutes } = toDegreesMinutes(Math.abs(value), 3);
    return `${String(deg).padStart(pad, "0")}° ${minutes}' ${value >= 0 ? pos : neg}`;
  };
  return `${part(fix.latitude, "N", "S", 2)}  ${part(fix.longitude, "E", "W", 3)}`;
}

const COORDINATE_LIMITS = { latitude: 90, longitude: 180 } as const;

/**
 * Parses a manually typed decimal coordinate. Accepts a comma as decimal separator.
 * Returns null for empty input, non-numbers and values outside ±90° / ±180°.
 */
export function parseCoordinate(
  raw: string,
  kind: keyof typeof COORDINATE_LIMITS,
): number | null {
  const cleaned = raw.trim().replace(",", ".");
  if (!cleaned || !/^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(cleaned)) return null;
  const value = Number(cleaned);
  if (!Number.isFinite(value) || Math.abs(value) > COORDINATE_LIMITS[kind]) return null;
  return value;
}

export function utcTimeString(date: Date): string {
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const mm = String(date.getUTCMinutes()).padStart(2, "0");
  return `${hh}${mm} UTC`;
}

export function utcClockString(date: Date): string {
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const mm = String(date.getUTCMinutes()).padStart(2, "0");
  const ss = String(date.getUTCSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss} UTC`;
}

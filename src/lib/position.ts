export interface Fix {
  latitude: number;
  longitude: number;
  accuracy: number | null;
  timestamp: number;
  manual?: boolean;
}

function ddm(value: number, positive: string, negative: string): string {
  const hemisphere = value >= 0 ? positive : negative;
  const abs = Math.abs(value);
  const deg = Math.floor(abs);
  const minutes = (abs - deg) * 60;
  const pad = positive === "North" ? 2 : 3;
  return `${String(deg).padStart(pad, "0")} degrees ${minutes.toFixed(2)} minutes ${hemisphere}`;
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
    const abs = Math.abs(value);
    const deg = Math.floor(abs);
    const min = ((abs - deg) * 60).toFixed(3);
    return `${String(deg).padStart(pad, "0")}° ${min}' ${value >= 0 ? pos : neg}`;
  };
  return `${part(fix.latitude, "N", "S", 2)}  ${part(fix.longitude, "E", "W", 3)}`;
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

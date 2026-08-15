import { useLocalState } from "./useLocalState";
import { DEFAULT_SETTINGS, type Settings, type Vessel } from "@/lib/types";

export function useVessels() {
  const { value, setValue, hydrated } = useLocalState<Vessel[]>("vhf.vessels", []);
  return { vessels: value, setVessels: setValue, hydrated } as const;
}

export function useSettings() {
  const { value, setValue, hydrated } = useLocalState<Settings>("vhf.settings", DEFAULT_SETTINGS);
  return { settings: value, setSettings: setValue, hydrated } as const;
}

export function createVesselId(): string {
  return `v_${Math.random().toString(36).slice(2, 10)}`;
}

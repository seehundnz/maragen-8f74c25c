import { useCallback, useEffect, useRef, useState } from "react";
import type { Fix } from "@/lib/position";

export function useGeoPosition(autoUpdate: boolean, intervalSeconds: number) {
  const [fix, setFix] = useState<Fix | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const manualRef = useRef(false);

  const refresh = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setError("Geolocation is not available on this device");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        manualRef.current = false;
        setFix({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy ?? null,
          timestamp: pos.timestamp,
        });
        setError(null);
        setLoading(false);
      },
      (err) => {
        setError(err.message || "Position unavailable");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  }, []);

  const setManualFix = useCallback((latitude: number, longitude: number) => {
    manualRef.current = true;
    setFix({ latitude, longitude, accuracy: null, timestamp: Date.now(), manual: true });
    setError(null);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (!autoUpdate) return;
    const ms = Math.max(2, intervalSeconds) * 1000;
    const id = window.setInterval(() => {
      if (!manualRef.current) refresh();
    }, ms);
    return () => window.clearInterval(id);
  }, [autoUpdate, intervalSeconds, refresh]);

  return { fix, error, loading, refresh, setManualFix } as const;
}

export function useUtcNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

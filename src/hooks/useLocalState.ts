import { useCallback, useEffect, useSyncExternalStore } from "react";

const cache = new Map<string, unknown>();
const hydratedKeys = new Set<string>();
const listeners = new Map<string, Set<() => void>>();

function subscribers(key: string): Set<() => void> {
  let set = listeners.get(key);
  if (!set) {
    set = new Set();
    listeners.set(key, set);
  }
  return set;
}

function emit(key: string) {
  subscribers(key).forEach((fn) => fn());
}

function merge<T>(initial: T, parsed: T): T {
  return Array.isArray(initial) || typeof parsed !== "object" || parsed === null
    ? parsed
    : ({ ...(initial as object), ...(parsed as object) } as T);
}

function hydrate<T>(key: string, initial: T) {
  if (hydratedKeys.has(key)) return;
  let next = initial;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw) next = merge(initial, JSON.parse(raw) as T);
  } catch {
    /* ignore corrupt storage */
  }
  cache.set(key, next);
  hydratedKeys.add(key);
  emit(key);
}

export function useLocalState<T>(key: string, initial: T) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const set = subscribers(key);
      set.add(onChange);
      return () => {
        set.delete(onChange);
      };
    },
    [key],
  );

  const value = useSyncExternalStore(
    subscribe,
    () => (cache.has(key) ? (cache.get(key) as T) : initial),
    () => initial,
  );

  const hydrated = useSyncExternalStore(
    subscribe,
    () => hydratedKeys.has(key),
    () => false,
  );

  useEffect(() => {
    hydrate(key, initial);
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key) return;
      try {
        cache.set(key, event.newValue ? merge(initial, JSON.parse(event.newValue) as T) : initial);
      } catch {
        /* ignore corrupt storage */
      }
      emit(key);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      const prev = cache.has(key) ? (cache.get(key) as T) : initial;
      const resolved = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
      cache.set(key, resolved);
      hydratedKeys.add(key);
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        /* storage unavailable */
      }
      emit(key);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  );

  return { value, setValue: update, hydrated } as const;
}

/**
 * Recovery for stale deployments: after a new build, an open tab (or a cached
 * service-worker document) may still reference old JS chunks. Loading such a
 * chunk fails with "Importing a module script failed" / "Failed to fetch
 * dynamically imported module" and leaves a blank screen.
 *
 * We detect that specific failure, purge caches once and hard-reload.
 */

const GUARD_KEY = "vhf.chunk-reload";
const GUARD_WINDOW_MS = 30_000;

export function isChunkLoadError(error: unknown): boolean {
  const message =
    typeof error === "string"
      ? error
      : error instanceof Error
        ? `${error.name}: ${error.message}`
        : "";
  return /importing a module script failed|failed to fetch dynamically imported module|error loading dynamically imported module|module script failed to load/i.test(
    message,
  );
}

export async function recoverFromChunkError(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    const last = Number(window.sessionStorage.getItem(GUARD_KEY) ?? "0");
    if (Date.now() - last < GUARD_WINDOW_MS) return false;
    window.sessionStorage.setItem(GUARD_KEY, String(Date.now()));
  } catch {
    /* sessionStorage unavailable: still attempt a single reload */
  }

  try {
    if ("caches" in window) {
      const names = await caches.keys();
      await Promise.allSettled(names.map((n) => caches.delete(n)));
    }
  } catch {
    /* ignore */
  }

  window.location.reload();
  return true;
}

export function installChunkErrorRecovery(): () => void {
  if (typeof window === "undefined") return () => {};

  const onError = (event: ErrorEvent) => {
    if (isChunkLoadError(event.error ?? event.message)) void recoverFromChunkError();
  };
  const onRejection = (event: PromiseRejectionEvent) => {
    if (isChunkLoadError(event.reason)) void recoverFromChunkError();
  };

  window.addEventListener("error", onError);
  window.addEventListener("unhandledrejection", onRejection);
  return () => {
    window.removeEventListener("error", onError);
    window.removeEventListener("unhandledrejection", onRejection);
  };
}

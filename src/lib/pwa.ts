/**
 * Single guarded registration wrapper for the app service worker.
 * Never registers in dev, in an iframe, or in Lovable preview contexts.
 */

export const BUILD_DATE: string =
  typeof __BUILD_DATE__ === "string" ? __BUILD_DATE__ : new Date().toISOString();

const SW_URL = "/sw.js";

function isBlockedHost(hostname: string): boolean {
  return (
    hostname.startsWith("id-preview--") ||
    hostname.startsWith("preview--") ||
    hostname === "lovableproject.com" ||
    hostname.endsWith(".lovableproject.com") ||
    hostname === "lovableproject-dev.com" ||
    hostname.endsWith(".lovableproject-dev.com") ||
    hostname === "beta.lovable.dev" ||
    hostname.endsWith(".beta.lovable.dev")
  );
}

export function swAllowed(): boolean {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return false;
  if (!import.meta.env.PROD) return false;
  if (window.self !== window.top) return false;
  if (isBlockedHost(window.location.hostname)) return false;
  if (new URLSearchParams(window.location.search).has("sw") &&
      new URLSearchParams(window.location.search).get("sw") === "off") return false;
  return true;
}

async function unregisterApp(): Promise<void> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
  const regs = await navigator.serviceWorker.getRegistrations();
  await Promise.allSettled(
    regs
      .filter((r) => (r.active?.scriptURL ?? r.installing?.scriptURL ?? "").endsWith(SW_URL))
      .map((r) => r.unregister()),
  );
}

export type SwStatus = "unsupported" | "notRegistered" | "installing" | "waiting" | "active";

export type PwaHandle = {
  registration: ServiceWorkerRegistration | null;
  checkForUpdate: () => Promise<void>;
  applyUpdate: () => Promise<void>;
};

let registration: ServiceWorkerRegistration | null = null;
let swStatus: SwStatus = "notRegistered";
let lastCheck: Date | null = null;
const updateListeners = new Set<(available: boolean) => void>();
const statusListeners = new Set<(status: SwStatus) => void>();
let updateAvailable = false;

export function getSwStatus(): SwStatus {
  return swStatus;
}

export function getLastUpdateCheck(): Date | null {
  return lastCheck;
}

export function onUpdateAvailable(cb: (available: boolean) => void): () => void {
  updateListeners.add(cb);
  cb(updateAvailable);
  return () => updateListeners.delete(cb);
}

export function onSwStatusChange(cb: (status: SwStatus) => void): () => void {
  statusListeners.add(cb);
  cb(swStatus);
  return () => statusListeners.delete(cb);
}

function setSwStatus(value: SwStatus) {
  swStatus = value;
  statusListeners.forEach((cb) => cb(value));
}

function setUpdateAvailable(value: boolean) {
  updateAvailable = value;
  updateListeners.forEach((cb) => cb(value));
}


export async function registerServiceWorker(): Promise<void> {
  if (!swAllowed()) {
    await unregisterApp();
    if (!("serviceWorker" in navigator)) {
      setSwStatus("unsupported");
    } else {
      setSwStatus("notRegistered");
    }
    return;
  }
  try {
    registration = await navigator.serviceWorker.register(SW_URL, { scope: "/" });
    setSwStatus(registration.active ? "active" : registration.waiting ? "waiting" : registration.installing ? "installing" : "notRegistered");
    if (registration.waiting) setUpdateAvailable(true);
    registration.addEventListener("updatefound", () => {
      const installing = registration?.installing;
      if (installing) {
        setSwStatus("installing");
        installing.addEventListener("statechange", () => {
          if (installing.state === "installed") {
            if (navigator.serviceWorker.controller) {
              setUpdateAvailable(true);
              setSwStatus("waiting");
            } else {
              setSwStatus("active");
            }
          } else if (installing.state === "activated") {
            setSwStatus("active");
          }
        });
      }
    });
  } catch {
    setSwStatus("notRegistered");
  }
}

export async function checkForUpdate(): Promise<boolean> {
  if (!registration) return false;
  await registration.update();
  lastCheck = new Date();
  if (registration.waiting) {
    setUpdateAvailable(true);
    setSwStatus("waiting");
  } else if (registration.active) {
    setSwStatus("active");
  }
  return Boolean(registration.waiting);
}

export async function applyUpdate(): Promise<void> {
  const waiting = registration?.waiting;
  if (waiting) {
    waiting.postMessage({ type: "SKIP_WAITING" });
    await new Promise((r) => setTimeout(r, 300));
  }
  window.location.reload();
}

export function isOnline(): boolean {
  if (typeof navigator === "undefined") return true;
  return navigator.onLine;
}

export function isPwaInstalled(): boolean {
  if (typeof window === "undefined") return false;
  if ("standalone" in navigator && (navigator as Navigator).standalone === true) return true;
  return window.matchMedia("(display-mode: standalone)").matches;
}

export function onConnectionChange(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("online", cb);
  window.addEventListener("offline", cb);
  return () => {
    window.removeEventListener("online", cb);
    window.removeEventListener("offline", cb);
  };
}

export function onInstallModeChange(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(display-mode: standalone)");
  const handler = () => cb();
  mq.addEventListener("change", handler);
  if ("standalone" in navigator) {
    // iOS standalone does not change at runtime, no reliable listener available.
  }
  return () => mq.removeEventListener("change", handler);
}


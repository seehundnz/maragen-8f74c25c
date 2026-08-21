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


function deriveStatus(reg: ServiceWorkerRegistration | null): SwStatus {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return "unsupported";
  if (!reg) return "notRegistered";
  if (reg.waiting) return "waiting";
  if (reg.active) return "active";
  if (reg.installing) return "installing";
  return "notRegistered";
}

function refreshStatus() {
  const next = deriveStatus(registration);
  setSwStatus(next);
  if (registration?.waiting) setUpdateAvailable(true);
}

function trackWorker(worker: ServiceWorker | null) {
  if (!worker) return;
  worker.addEventListener("statechange", () => {
    if (worker.state === "installed" && navigator.serviceWorker.controller && registration?.waiting) {
      setUpdateAvailable(true);
    }
    refreshStatus();
  });
}

export async function registerServiceWorker(): Promise<void> {
  if (!swAllowed()) {
    await unregisterApp();
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) {
      setSwStatus("unsupported");
    } else {
      setSwStatus("notRegistered");
    }
    return;
  }
  try {
    registration = await navigator.serviceWorker.register(SW_URL, { scope: "/" });
    refreshStatus();

    // An install may already be in flight before `updatefound` could be attached.
    trackWorker(registration.installing);
    trackWorker(registration.waiting);

    registration.addEventListener("updatefound", () => {
      trackWorker(registration?.installing ?? null);
      refreshStatus();
    });

    let reloading = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      refreshStatus();
      // A new worker took over: reload once so the fresh bundle (and translations) is used.
      if (!reloading && hadController) {
        reloading = true;
        window.location.reload();
      }
    });

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") refreshStatus();
    });

    void navigator.serviceWorker.ready.then((ready) => {
      registration = ready;
      refreshStatus();
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
  const nav = navigator as Navigator & { standalone?: boolean };
  if ("standalone" in nav && nav.standalone === true) return true;
  return window.matchMedia("(display-mode: standalone)").matches;
}

/** Wipes all locally stored app data: caches, local/session storage and the service worker. */
export async function clearAllData(): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    if ("caches" in window) {
      const names = await caches.keys();
      await Promise.allSettled(names.map((n) => caches.delete(n)));
    }
  } catch {
    /* ignore */
  }
  try {
    window.localStorage.clear();
    window.sessionStorage.clear();
  } catch {
    /* ignore */
  }
  try {
    await unregisterApp();
  } catch {
    /* ignore */
  }
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
  window.addEventListener("appinstalled", handler);
  if ("standalone" in navigator) {
    // iOS standalone does not change at runtime, no reliable listener available.
  }
  return () => {
    mq.removeEventListener("change", handler);
    window.removeEventListener("appinstalled", handler);
  };
}

/* ---------------- Install prompt ---------------- */

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

let deferredPrompt: BeforeInstallPromptEvent | null = null;
const promptListeners = new Set<(available: boolean) => void>();

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    promptListeners.forEach((cb) => cb(true));
  });
  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    promptListeners.forEach((cb) => cb(false));
  });
}

export function hasInstallPrompt(): boolean {
  return deferredPrompt !== null;
}

export function onInstallPromptChange(cb: (available: boolean) => void): () => void {
  promptListeners.add(cb);
  cb(deferredPrompt !== null);
  return () => promptListeners.delete(cb);
}

export async function promptInstall(): Promise<boolean> {
  if (!deferredPrompt) return false;
  const evt = deferredPrompt;
  deferredPrompt = null;
  promptListeners.forEach((cb) => cb(false));
  await evt.prompt();
  const choice = await evt.userChoice;
  return choice.outcome === "accepted";
}

export type InstallPlatform = "ios-safari" | "ios-other" | "android" | "desktop";

export function detectPlatform(): InstallPlatform {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent;
  const isIos =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && (navigator as Navigator & { maxTouchPoints?: number }).maxTouchPoints! > 1);
  if (isIos) {
    const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);
    return isSafari ? "ios-safari" : "ios-other";
  }
  if (/Android/.test(ua)) return "android";
  return "desktop";
}


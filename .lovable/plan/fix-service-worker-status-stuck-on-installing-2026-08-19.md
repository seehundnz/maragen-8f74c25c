# Fix: service worker status stuck on "installing"

## What's happening

This is a display bug in the status panel, not a broken installation. On your iPhone the app is installed and the service worker almost certainly finished activating — the Settings panel just never noticed.

In `src/lib/pwa.ts` the status is computed once, right after registration. On the very first registration the worker is still in the `installing` phase at that moment, so the panel shows the orange spinner. The code that would move the status forward is attached inside an `updatefound` handler that is registered *after* that event has already fired, so the follow-up state changes are never observed and the label stays on "installing" forever.

## The fix

Rework status tracking in `src/lib/pwa.ts`:

- Derive the status from the registration itself in one helper (`active` > `waiting` > `installing` > `notRegistered`) and call it whenever anything changes, instead of computing once.
- Attach the `statechange` listener directly to `registration.installing` right after `register()` resolves, in addition to the `updatefound` path, so an already-started install is still tracked.
- Await `navigator.serviceWorker.ready` after registering and re-evaluate the status when it resolves — this alone resolves the stuck spinner.
- Listen for `navigator.serviceWorker.controllerchange` and refresh the status there too (covers the take-over after an update).
- Re-evaluate the status when the page becomes visible again, so a backgrounded installed app shows a current value when reopened.
- Keep the existing "update available" logic (a `waiting` worker) untouched.

`src/components/UpdateSection.tsx` needs no logic change; it already subscribes to status updates.

## Verification

Build the app and confirm the status transitions to "active" after the worker activates, and that "Check for updates" still reports up-to-date / update available correctly. On your phone the corrected status appears after the next update is applied.

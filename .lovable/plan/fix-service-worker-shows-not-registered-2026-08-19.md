# Fix: service worker shows "not registered"

## What's actually wrong

This is not a status-display bug this time — the service worker really fails to install on the published site.

Verified against https://maragen.lovable.app:

- `/sw.js` is served (200) and its workbox runtime file is served (200).
- But every file in the worker's precache list is listed with a `client/` prefix, e.g. `client/assets/styles-Dvc_eZ_h.css`.
- `https://maragen.lovable.app/client/assets/styles-Dvc_eZ_h.css` returns **404**, while the real path `https://maragen.lovable.app/assets/styles-Dvc_eZ_h.css` returns **200**.

Workbox aborts installation when a precached file cannot be fetched, so `register()` rejects, our catch block sets the status to `notRegistered`, and no offline cache is ever built.

Cause: the production build writes browser assets into a `client/` output folder that is served from the site root, so the generated precache paths carry one extra directory segment.

## The fix

In `vite.config.ts`, inside the `VitePWA` `workbox` options, strip the build-folder prefix from the generated precache entries:

- add `modifyURLPrefix: { "client/": "" }` so `client/assets/x.js` becomes `assets/x.js`.

No changes needed in `src/lib/pwa.ts` or `src/components/UpdateSection.tsx` — the status logic is correct and will report "active" once the install succeeds.

## Verification

After the change, rebuild and confirm from the published site that:

- the URLs inside `/sw.js` no longer start with `client/`,
- each of those URLs returns 200,
- the Settings panel shows the service worker as active, and "Check for updates" still works.

On the iPhone the app may need to be reopened once (or the page reloaded) for the corrected worker to install.

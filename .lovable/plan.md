# Add an "Install app" button in the header

## What the user sees

On phones and tablets, when the app is *not* already running as an installed app, a new item appears in the top navigation, to the left of "Vessels": a download icon with the label "Install". Like the other nav items, the label is hidden on small screens (icon only) and shown from `sm` upwards.

Tapping it opens a dialog with short, numbered instructions that match the user's device:

- iPhone / iPad (Safari): Share button > "Add to Home Screen" > Add.
- iPhone / iPad (Chrome or other browsers): note to open the page in Safari first, then the same steps.
- Android (Chrome/Edge): browser menu > "Install app" / "Add to Home screen".
- If the browser supports the native install prompt (Android/Chrome, desktop Chromium), the dialog also shows a primary "Install" button that triggers the real prompt directly; otherwise only the manual steps show.

The button disappears once the app runs in standalone mode, and after a successful install.

## Behaviour rules

- Only shown when: mobile/tablet viewport or touch device, and not installed (`isPwaInstalled()` from `src/lib/pwa.ts` is false).
- Nothing renders during SSR/first paint until install state is known, so no flicker.
- Listen to `beforeinstallprompt` to capture the deferred prompt, and to `appinstalled` plus the existing `onInstallModeChange` helper to hide the button.

## Technical notes

- `src/lib/pwa.ts`: add a small install-prompt module — capture and store the `beforeinstallprompt` event, expose `getInstallPrompt()`, `promptInstall()`, `onInstallPromptChange()`, and a `detectPlatform()` helper returning `ios-safari | ios-other | android | desktop`.
- New `src/components/InstallButton.tsx`: nav-styled trigger (same classes as the Vessels/Settings links) plus a shadcn `Dialog` with the platform-specific steps.
- `src/components/AppShell.tsx`: render `<InstallButton />` as the first item in the `<nav>`, before the Vessels link.
- `src/hooks/use-mobile.tsx`: reuse `useIsMobile()` for the mobile check.
- `src/lib/i18n/en.ts` and `de.ts`: new keys for the button label, dialog title/intro, and the per-platform step lists.

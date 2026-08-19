# Fix scrolling and safe areas on the read-aloud screen

The full-screen reading view on the Mayday/Pan-Pan/Sécurité/Standard pages doesn't scroll inside the installed iPhone app, and its content runs under the Dynamic Island at the top and the home indicator at the bottom.

## What changes

- The reading overlay becomes a proper full-height panel: a fixed header row (call type + Speak/Close) that stays visible, and a scrollable script area below it.
- Height uses the dynamic viewport height so iOS browser/PWA chrome doesn't cut off the bottom.
- Padding respects the iPhone safe areas: extra space at the top (status bar / Dynamic Island), bottom (home indicator) and sides in landscape.
- Momentum scrolling is enabled and the page behind the overlay is locked while it is open, so swipes scroll the script instead of the page underneath.
- Extra breathing room is added at the end of the script so the last line is never hidden behind the bottom edge.

## Technical notes

In `src/routes/call.$type.tsx`, the `readMode` overlay changes from
`fixed inset-0 overflow-y-auto p-5` to a flex column with `h-[100dvh]`,
a non-scrolling header, and a `flex-1 overflow-y-auto overscroll-contain`
body with `-webkit-overflow-scrolling: touch`. Padding uses
`max(1rem, env(safe-area-inset-*))` for top, bottom, left and right.
A small effect sets `document.body.style.overflow = "hidden"` while
`readMode` is active and restores it on close/unmount.

Verification: Playwright screenshots at 402px width with a long script to
confirm the header stays put, the script scrolls, and nothing is clipped.

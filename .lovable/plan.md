# Fix: language switch doesn't apply until reload

## What's happening

The language selector saves correctly, but the interface keeps the old language until the page is reloaded.

Cause (confirmed in the code): every call to the settings hook creates its **own private copy** of the settings in React state. The Settings page has one copy, the app root — which decides the active language — has another. Saving on the Settings page writes to device storage and updates only that page's copy; the root never hears about the change, so the translated text stays as it was. After a reload both copies read the new value from storage, which is why it "works" only after refreshing.

The same issue silently affects other cross-page settings (active vessel, refresh interval, AI voice toggle) whenever two screens read them at once.

## The fix

Make the stored-settings hook a shared source of truth instead of per-component copies:

- Keep one in-memory store per storage key, with subscribers.
- Any component writing a value notifies all subscribers, so the root re-renders with the new language immediately.
- Also listen for the browser storage event so changes in another tab apply too.

No change to storage format, keys or defaults — existing saved vessels and settings keep working.

## Technical detail

- `src/hooks/useLocalState.ts`: replace the per-instance `useState` + hydrate effect with a module-level cache `Map<string, unknown>` plus a listener set, exposed via `useSyncExternalStore` (with a server snapshot returning the initial value to keep SSR/hydration safe). Preserve the current merge behaviour (object defaults merged with parsed value, arrays replaced) and the `hydrated` flag semantics.
- `src/routes/__root.tsx` and all consumers keep their current API (`{ value, setValue, hydrated }`) — no call-site changes required.

## Verification

Switch the language in Settings and confirm header, tabs and the current page re-render instantly; then reload to confirm persistence, and check the Mayday page still shows the English script.

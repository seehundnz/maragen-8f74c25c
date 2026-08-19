# Multilingual app (English + German)

Make the whole interface translatable, ship a full German translation, and keep the generated radio scripts in English.

## What changes for you

- A language switch in Settings: English or Deutsch (plus "Automatic", which follows the phone/browser language on first launch).
- All UI text — navigation, call screens, forms, buttons, settings, privacy & imprint page — appears in the chosen language.
- The radio script itself (MAYDAY / PAN-PAN / SÉCURITÉ / standard call wording) stays in English, always, because English is the international VHF language. A short note under the script explains this.
- Labels around the script (headings, "Copy", "Speak", "Read mode", field labels) are translated; the script text is not.
- The choice is stored on the device with your other settings, so it survives restarts and works offline.

## Scope of the translation

- Call screens (all four types), input fields and helper text
- Vessel list and vessel editor
- Settings page (position auto-update, interval, AI voice switch, language)
- Privacy & Imprint page — full German version of the GDPR/DSGVO text; the imprint address block stays as-is
- Page titles and meta descriptions per route

## Technical notes

- Lightweight in-house i18n, no extra dependency: `src/lib/i18n/en.ts` and `src/lib/i18n/de.ts` holding a flat typed key/value dictionary, with `en` as the source of truth for the key type so a missing German key is a type error.
- `src/lib/i18n/index.tsx`: React context provider + `useT()` hook returning `t(key, vars?)` with simple `{name}` interpolation. Provider mounted in `src/routes/__root.tsx`; `<html lang>` follows the active language.
- Language stored in the existing settings object (`src/lib/types.ts` → `Settings.language: 'auto' | 'en' | 'de'`) via the existing `useLocalState`/settings hook, defaulting to `auto` resolved against `navigator.language`.
- `src/lib/templates.ts` stays untouched — script generation remains English-only.
- Speech: device fallback voice picks an English voice for the script regardless of UI language; the AI voice prompt stays English.
- Static strings in `src/components/AppShell.tsx`, `CallTabs.tsx`, `call.$type.tsx`, `settings.tsx`, `privacy.tsx`, `vessels.*.tsx` replaced with `t(...)` calls.

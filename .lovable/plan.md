# VHF Distress Call Builder

A mobile-first web app that generates ready-to-read VHF radio call scripts (Mayday, Pan-Pan, Sécurité) in English, using saved vessel profiles plus live GPS position and UTC time from the phone.

## Core screens

**Home / Call screen**
- Big card showing the generated radio script for the selected call type.
- Live header: current UTC time and current position (decimal degrees + degrees/decimal-minutes, the format read on the radio), with accuracy and a refresh button.
- Active vessel selector at the top; switching vessels regenerates the script instantly.
- Inputs above the script: nature of emergency (preset list + free text), persons on board, radio channel (16 default) / DSC note.
- Bottom tab menu with four tabs: MAYDAY, PAN-PAN, SÉCURITÉ, STANDARD. Tapping a tab swaps the template and carries over all entered data.
- Each call type owns the page's main colour: the whole call screen (accents, header, active tab, script card border, action buttons) re-themes to red for Mayday, orange for Pan-Pan, yellow for Sécurité, green for Standard.
- Actions: copy script, share, and a large-type "read mode" that shows the script full screen for reading aloud on the radio.

**Vessels**
- List of saved vessels, add/edit/delete, mark one as active.
- Fields: vessel name, MMSI, call sign, vessel type/length/hull colour (optional), default POB, default channel.
- Validation: MMSI must be 9 digits, call sign and name required.

## Templates (English, standard phraseology)

- Mayday (red): distress call + distress message, name spoken three times, MMSI, position, nature of distress, assistance required, POB, "Over".
- Pan-Pan (orange): urgency call, same data block, nature of urgency.
- Sécurité (yellow): safety call, addressed to all stations, position and safety message.
- Standard (green): routine call to a named station or marina — station called three times, own vessel name, call sign and MMSI, working channel request, short message, "Over".

Each script inserts vessel name, MMSI, call sign, position, UTC time, POB, nature and channel. Missing values render as clearly marked placeholders (e.g. `[POSITION UNKNOWN]`) so nothing is silently wrong.

## Position and time

- Browser Geolocation API with permission prompt, watch mode for continuous updates, manual refresh, and a manual-entry fallback if GPS is denied or unavailable.
- Auto-update of the position can be switched on or off; when on, the position refreshes on a fixed interval (default 10 seconds) and the script updates with it. Last-fix timestamp is shown.
- UTC clock ticking every second, formatted `HH:MM UTC`.

## Settings page

- Toggle: auto-update position (on by default).
- Refresh interval in seconds, default 10, sensible bounds (e.g. 2–300) with validation.
- Default radio channel and preferred position format (decimal degrees vs degrees/decimal-minutes).
- Settings persist on the device alongside the vessel profiles.


## Data storage

Everything stays on the device (local storage). No account, no internet needed after first load. Vessel profiles persist between sessions.

## Design

Marine-instrument look: deep navy base, high-contrast readable typography, oversized touch targets suited to a moving boat and daylight glare. The accent colour is a single semantic token that the selected call type swaps: red (Mayday), orange (Pan-Pan), yellow (Sécurité), green (Standard), with a short transition so the change is obvious. Text/foreground pairings are tuned per colour so yellow and green stay readable.

## Technical notes

- Routes: `/` (call screen), `/vessels`, `/vessels/$id` (edit), `/settings`. Each with its own head() metadata.
- Vessel state and settings in small localStorage-backed hooks; template generation in a pure `lib/templates.ts` module so scripts are testable.
- Geolocation in a `useGeoPosition` hook that takes the interval from settings, read only after hydration to avoid SSR mismatch.
- Disclaimer note that the app is an aid and does not replace proper radio training or DSC operation.

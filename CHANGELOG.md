# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html):

- **MAJOR** — breaking changes or fundamental reworks
- **MINOR** — new features, backwards-compatible
- **PATCH** — bug fixes, text corrections, small improvements

## [1.0.0] - 2026-09-05

First public release.

### Added

- VHF call script builder for MAYDAY, PAN-PAN, SÉCURITÉ and standard calls
- Multiple local vessel profiles (name, MMSI, call sign, type, hull color, persons on board, channel)
- MMSI validation (exactly 9 digits)
- Live GPS position and UTC time with configurable auto-refresh
- Emergency home screen with large call-type buttons
- Channel 16 notice before distress/urgency/safety scripts
- DSC distress alert instructions on the Mayday page (collapsible)
- "Further communication" section on the Mayday page (relay, SEELONCE MAYDAY, false alert cancellation, SILENCE FINI)
- Read mode (full-screen script display) with iOS safe-area support
- Text-to-speech for scripts: on-device voice by default, optional AI voice (opt-in) with NATO phonetic pronunciation
- Multilingual UI: English, German, Spanish, French, Croatian, Italian, Dutch, Norwegian, Swedish (radio scripts stay in English)
- Vessel profile sharing via QR code (offline)
- Terms gate on first launch with language selector and versioned consent
- Terms of Use page and privacy/GDPR page
- Night mode (red light) with quick toggle in the header
- PWA support: installable, offline-capable, background updates with version/build info in Settings
- Manual "update check" and "clear local data" in Settings
- AGPL-3.0-or-later licence with source code link in the app
- SEO: sitemap, canonical URLs, JSON-LD, noindex for private pages

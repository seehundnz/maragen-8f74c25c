# 📻 VHF Call Builder

**Instant VHF radio scripts for distress, urgency and safety — fast, correct and offline-capable.**

A Progressive Web App for skippers, boat owners and crew: it builds ready-to-read VHF radio calls from your stored vessel data and current GPS position — from **MAYDAY** through **PAN-PAN** and **SÉCURITÉ** to routine calls.

> ⚠️ **Important:** This app does not replace proper radio training (SRC/LRC/UBI) or official emergency procedures. It is a memory aid for stressful situations or untrained crew members. Use it at your own risk.

---

## ✨ Features

- 🚨 **Ready-made radio scripts** for MAYDAY, PAN-PAN, SÉCURITÉ and standard calls
- 🛥️ **Vessel profiles** (name, MMSI with validation, call sign, type, POB …) — save multiple vessels
- 📍 **Position & UTC automatically** from the device (GPS), with configurable refresh interval and manual entry
- 🔊 **Read aloud** — the script is spoken slowly and clearly, optionally via AI voice or offline using the device voice
- 📲 **Installable as a PWA** — runs offline on iPhone, iPad, Android and desktop
- 🔗 **Share vessel data via QR code** — crew scans and imports the profile
- 🌍 **Bilingual UI** (German/English) — radio scripts intentionally stay in English, the international language of VHF maritime communication
- 🔒 **Privacy-friendly (GDPR/DSGVO):** all data stays locally on the device, no tracking, no cookies, no external fonts or scripts

## 🛠️ Tech stack

- [TanStack Start](https://tanstack.com/start) (React 19, SSR)
- TypeScript, Tailwind CSS v4, shadcn/ui
- PWA via `vite-plugin-pwa` (service worker, offline-capable)
- QR: `qrcode` + `@zxing/browser`
- AI speech output via the Lovable AI Gateway (optional, can be disabled)

## 🚀 Development

```sh
git clone https://github.com/seehundnz/maragen-8f74c25c.git
cd maragen-8f74c25c
bun install
bun run dev
```

## 📄 Licence

This project is licensed under the [GNU Affero General Public License v3.0 or later](LICENSE) (AGPL-3.0-or-later).

Because this is a web app, the AGPL network clause applies: anyone who publicly hosts the software must make the source code of the version in use available to users. The source code for this app is available at:

**[github.com/seehundnz/maragen-8f74c25c](https://github.com/seehundnz/maragen-8f74c25c.git)**

---

_Built with ❤️ and [Lovable](https://lovable.dev) — fair winds and following seas! ⛵_

## Versioning

This project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html) (`MAJOR.MINOR.PATCH`):

- **MAJOR** — breaking changes or fundamental reworks
- **MINOR** — new features, backwards-compatible
- **PATCH** — bug fixes, text corrections, small improvements

The version lives in `package.json`, is injected at build time and shown in the app under **Settings → App & updates**. Every change is recorded in [CHANGELOG.md](CHANGELOG.md).

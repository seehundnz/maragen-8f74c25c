# 📻 VHF Call Builder

**Funksprüche für Notfall, Dringlichkeit und Sicherheit – schnell, korrekt und offline verfügbar.**

Eine Web-App (PWA) für Bootsführer, Skipper und Crew: Sie erstellt aus den gespeicherten Schiffsdaten und der aktuellen GPS-Position fertige UKW-Funksprüche – vom **MAYDAY** über **PAN-PAN** und **SÉCURITÉ** bis zu Standardanrufen.

> ⚠️ **Wichtiger Hinweis:** Diese App ersetzt keine Funkausbildung (SRC/LRC/UBI) und keine offiziellen Notfallprozeduren. Sie ist eine Gedankenstütze für stressige Situationen oder ungeschulte Crewmitglieder. Die Nutzung erfolgt auf eigene Gefahr.

---

## ✨ Features

- 🚨 **Fertige Funksprüche** für MAYDAY, PAN-PAN, SÉCURITÉ und Standard Calls – inkl. Relay, SEELONCE MAYDAY, SILENCE FINI und Widerruf einer Fehlalarmierung
- 🛥️ **Schiffsprofile** verwalten (Name, MMSI mit Validierung, Rufzeichen, Typ, POB …) – mehrere Schiffe anlegbar
- 📍 **Position & UTC automatisch** aus dem Gerät (GPS), mit einstellbarem Aktualisierungsintervall und manueller Eingabe
- 🔊 **Vorlesefunktion** – der Spruch wird langsam und deutlich vorgelesen (NATO-Alphabet für Rufzeichen, Ziffern einzeln), optional per KI-Stimme oder offline per Gerät
- 📲 **Installierbar als PWA** – läuft offline auf iPhone, iPad, Android und Desktop
- 🔗 **Schiffsdaten per QR-Code teilen** – Crew scannt und übernimmt das Profil
- 🌍 **Zweisprachig** (Deutsch/Englisch) – die Funksprüche bleiben bewusst Englisch, der internationalen Sprache im Seefunk
- 🔒 **Datenschutzfreundlich (DSGVO):** alle Daten bleiben lokal auf dem Gerät, kein Tracking, keine Cookies, keine externen Fonts oder Skripte

## 🛠️ Tech-Stack

- [TanStack Start](https://tanstack.com/start) (React 19, SSR)
- TypeScript, Tailwind CSS v4, shadcn/ui
- PWA via `vite-plugin-pwa` (Service Worker, offlinefähig)
- QR: `qrcode` + `@zxing/browser`
- KI-Sprachausgabe über das Lovable AI Gateway (optional, abschaltbar)

## 🚀 Entwicklung

```sh
git clone <repo-url>
cd <repo>
bun install
bun run dev
```

## 📄 Lizenz

Dieses Projekt steht unter der [MIT-Lizenz](LICENSE).

---

*Built with ❤️ and [Lovable](https://lovable.dev) – fair winds and following seas! ⛵*

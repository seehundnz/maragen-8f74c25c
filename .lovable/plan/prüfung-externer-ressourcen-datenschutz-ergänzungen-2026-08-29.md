# Prüfung externer Ressourcen & Datenschutz-Ergänzungen

## Ergebnis der Prüfung

Geprüft wurden alle Quelldateien, das Manifest, das Stylesheet und die Abhängigkeiten.

Keine externen Ladevorgänge beim Start der App:

- **Schriftarten:** keine. `src/styles.css` bindet keine Web-Fonts ein, es gibt kein Google-Fonts-`<link>` im Root-Route-Head. Es werden die Systemschriften des Geräts genutzt.
- **Icons:** `lucide-react` wird als npm-Paket mitgebaut, die Symbole liegen als SVG im App-Bundle. Die PWA-Icons (`icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `favicon.png`) liegen lokal in `public/`.
- **QR-Code:** `qrcode` (Erzeugung) und `@zxing/browser` (Scannen) laufen vollständig im Browser, ohne Netzwerkzugriff.
- **Kein CDN, kein Analytics, keine Tracking-Skripte, keine eingebetteten Karten/Fonts/Frames.**

Es gibt genau zwei externe Verbindungen:

1. **Sprachausgabe:** `src/routes/api/tts.ts` ruft den KI-Sprachdienst auf (nur beim Drücken von „Vorlesen“ und nur wenn die KI-Stimme aktiv ist). Bereits in den Datenschutzhinweisen beschrieben, aber ohne Nennung des Anbieters.
2. **„Unterstütze mich“-Link** in den Einstellungen auf `buymeacoffee.com`. Erst beim Klick, aber bisher nirgends in den Datenschutzhinweisen erwähnt.

## Was ergänzt werden sollte

Nur Textänderungen in den Datenschutzhinweisen (`src/lib/i18n/de.ts` und `en.ts`), Struktur der Seite bleibt gleich.

1. **Neuer Absatz „Keine externen Inhalte“** (im Abschnitt „Cookies, Tracking und Hosting“): ausdrücklicher Hinweis, dass keine Schriftarten, Icons, Skripte oder sonstigen Inhalte von fremden Servern nachgeladen werden — alle Dateien kommen vom eigenen Hosting, es entsteht also keine ungewollte IP-Übermittlung an Dritte.
2. **Neuer Abschnitt „Externe Links“**: Hinweis, dass der Spenden-Link zu Buy Me a Coffee führt, dass dort beim Aufruf die Datenschutzhinweise des Anbieters gelten und dass ohne Klick keine Daten dorthin fließen.
3. **Hosting-Abschnitt konkretisieren**: Nennung des Hosting-Anbieters (Lovable, Auslieferung über dessen Infrastruktur) und Hinweis auf mögliche Drittlandübermittlung mit Standardvertragsklauseln.
4. **Sprachdienst benennen**: im TTS-Abschnitt statt „unser Sprachdienst“ den Anbieter (Lovable AI Gateway) nennen, inkl. Hinweis, dass beim Vorlesen der Funkspruchtext (mit Schiffsname, MMSI, Rufzeichen, Position) dorthin übertragen wird — Verarbeitung nur zur Audioerzeugung, keine Speicherung.
5. **Datum** „zuletzt aktualisiert“ auf das aktuelle Datum setzen.

## Technische Details

- Betroffene Dateien: `src/lib/i18n/de.ts`, `src/lib/i18n/en.ts` (neue Keys `privacy.h.noExternal` / `privacy.p.noExternal`, `privacy.h.links` / `privacy.p.links`), `src/routes/privacy.tsx` (zwei neue `Section`-Blöcke).
- Keine Änderungen an Code, Build oder Abhängigkeiten nötig — es werden keine externen Ressourcen entfernt, weil keine vorhanden sind.

Hinweis: Die Formulierungen sind eine sorgfältige Beschreibung des technischen Ist-Zustands, ersetzen aber keine Rechtsberatung.

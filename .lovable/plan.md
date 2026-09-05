# Versionsnummern nach dem Schema 1.1.1 (Semantic Versioning)

## Ziel

Die App bekommt eine echte, gepflegte Versionsnummer im Format `MAJOR.MINOR.PATCH` (z. B. `1.2.0`) statt nur eines Build-Datums. Die Version ist in der App sichtbar, wird bei Updates angezeigt und ist in einer Änderungsliste dokumentiert.

Startversion: **1.0.0** (die App ist funktional fertig und veröffentlicht).

Bedeutung der Stellen:
- **MAJOR** (1.x.x) — grundlegende Umbauten oder Änderungen, die bestehendes Verhalten/gespeicherte Daten brechen.
- **MINOR** (x.1.x) — neue Funktionen, abwärtskompatibel (z. B. neue Sprache, neue Seite).
- **PATCH** (x.x.1) — Fehlerbehebungen, Textkorrekturen, kleine Verbesserungen.

## Was sichtbar wird

1. **Einstellungen → App & Updates:** Anzeige „Version 1.0.0" prominent, das Build-Datum bleibt als kleinere Zusatzinfo darunter.
2. **Update-Hinweis:** Wenn eine neue Version gefunden wurde, wird weiterhin der Update-Button gezeigt; nach dem Update sieht man die neue Nummer.
3. **Splash-/Zustimmungsseite und Nutzungsbedingungen:** Die Terms bekommen zusätzlich einen Stand-Hinweis („Version der Nutzungsbedingungen: 1"), passend zur bestehenden Zustimmungs-Logik.
4. **Änderungsliste:** Eine Datei `CHANGELOG.md` im Projekt, in der pro Version kurz steht, was sich geändert hat (auch gut fürs öffentliche GitHub-Repo).

## Technische Umsetzung

- `package.json`: Feld `"version": "1.0.0"` ergänzen — die einzige Quelle der Wahrheit.
- `vite.config.ts`: neben `__BUILD_DATE__` ein `__APP_VERSION__` aus `package.json` injizieren.
- `src/vite-env.d.ts`: `declare const __APP_VERSION__: string;`
- `src/lib/pwa.ts`: `export const APP_VERSION` analog zu `BUILD_DATE` (mit Fallback `"0.0.0"`).
- `src/components/UpdateSection.tsx`: neue Kachel „Version" mit `APP_VERSION`; bestehende Kachel „Installierte Version" wird zu „Build-Datum" umbenannt (Schlüssel `settings.buildDate` bleibt, Text angepasst).
- i18n: neuer Schlüssel `settings.version` in allen 9 Sprachen; Text von `settings.buildDate` in allen Sprachen auf „Build-Datum" o. ä. anpassen.
- `README.md`: kurzer Abschnitt „Versionierung" mit der obigen Regel.
- `CHANGELOG.md` neu, Format „Keep a Changelog", Eintrag `## 1.0.0` mit den bisherigen Kernfunktionen.
- Abschließend `bunx tsgo --noEmit`.

## Ablauf künftig

Bei jeder Änderung wird die Nummer in `package.json` passend erhöht und ein Eintrag in `CHANGELOG.md` ergänzt — das übernehme ich bei künftigen Aufgaben automatisch mit.

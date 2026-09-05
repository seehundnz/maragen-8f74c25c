# Drei Anzeige-Modi: Dunkel, Hell, Nacht

## Ziel
Die App bekommt drei feste Darstellungen, die per Symbol in der Kopfzeile der Reihe nach durchgeschaltet werden:

1. **Dunkel** (das heutige dunkelblaue Design, unverändert) — Standard
2. **Hell** (neu)
3. **Nacht** (das heutige Rotlicht-Design, unverändert)

Die Geräteeinstellung von Hell/Dunkel wird bewusst **nicht** übernommen.

## Was sich sichtbar ändert
- Das Symbol oben rechts schaltet nun durch alle drei Modi: Mond (dunkel) → Sonne (hell) → Rotlicht-Symbol (nacht) → wieder dunkel. Kurztext/Beschriftung nennt jeweils den nächsten Modus.
- In den Einstellungen ersetzt eine Auswahl mit drei Optionen den bisherigen Nachtmodus-Schalter.
- Für den hellen Modus entsteht eine neue Farbwelt: heller Hintergrund, dunkle Schrift, gute Lesbarkeit bei Sonne. Die vier Anruf-Farben (rot, orange, gelb, grün) bleiben erhalten, werden aber für hellen Untergrund kontraststark angepasst.
- Bestehende Nutzer mit aktivem Nachtmodus bleiben im Nachtmodus, alle anderen im dunklen Modus.

## Technische Umsetzung
- `src/lib/types.ts`: neues Feld `theme: "dark" | "light" | "night"` mit Standard `"dark"`; `nightMode` bleibt für die Migration bestehender gespeicherter Einstellungen erhalten (wird beim Lesen einmalig auf `theme` abgebildet).
- `src/styles.css`: bestehende `:root`-Tokens und `.night`-Block unverändert lassen; zusätzlich ein `.light`-Block mit hellen Tokens plus hellen `[data-call]`-Varianten (`.light [data-call="mayday"]` usw.). `color-scheme` je Modus setzen.
- `src/routes/__root.tsx`: statt nur `night` die Klasse `light`/`night` je nach `settings.theme` auf `<html>` setzen (dunkel = keine Klasse). Kein Auslesen von `prefers-color-scheme`.
- `src/components/NightModeToggle.tsx`: zum Drei-Stufen-Umschalter umbauen (Reihenfolge dark → light → night).
- `src/routes/settings.tsx`: Schalter durch Auswahlfeld mit drei Optionen ersetzen.
- Alle zehn Sprachdateien in `src/lib/i18n/` erhalten die neuen Schlüssel (Modusnamen, Hinweis, Umschalt-Beschriftungen); bestehende Nachtmodus-Texte werden wiederverwendet.
- Version in `package.json` und `CHANGELOG.md` auf die nächste Minor-Version anheben.

## Prüfung
Typecheck plus Browser-Kontrolle aller drei Modi auf Start- und Mayday-Seite (Kontrast, Lesbarkeit, Umschalt-Reihenfolge).

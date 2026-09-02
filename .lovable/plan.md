# DSC-Alarm-Überschrift auf Mayday-Seite umbrechen lassen

## Problem
Auf der Mayday-Seite überläuft die Überschrift des aufklappbaren DSC-Alarm-Blocks nach rechts, wenn `dsc.title` in anderen Sprachen länger ist als auf Deutsch. Ursache ist `whitespace-nowrap` auf dem `<span>`, der das Icon und den Titel enthält.

## Lösung
In `src/routes/call.$type.tsx` den Header des DSC-Abschnitts anpassen:

- `whitespace-nowrap` aus dem Titel-Span entfernen.
- Dem Span `min-w-0` hinzufügen, damit das Flex-Item bei langem Text schrumpfen und umbrechen kann.
- `break-words` und `leading-tight` ergänzen, damit sauber umgebrochen wird.
- Das AlertTriangle-Icon `shrink-0` geben, damit es nicht zusammengedrückt wird.

Betroffene Zeilen: ca. 194–207 (Button im `type === "mayday"`-Block).

## Validierung
- Typecheck (`bunx tsgo --noEmit`) läuft durch.
- Mobile Playwright-Ansicht prüft, dass längere Sprachfassungen (z. B. Französisch, Italienisch) nun umgebrochen werden und der Chevron sichtbar bleibt.
- Deutsch bleibt unverändert gut lesbar.

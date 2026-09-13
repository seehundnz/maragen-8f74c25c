# Positionsformat-Dropdown breiter, aber smartphone-tauglich

## Problem
Das Dropdown für das Positionsformat in `/settings` ist mit `max-w-72` zu schmal. In Sprachen wie Deutsch, Englisch oder Niederländisch wird der lange Auswahltext abgeschnitten.

## Lösung
Den `SelectTrigger` für das Positionsformat responsiv gestalten:
- Auf kleinen Bildschirmen: volle Breite mit etwas Innenabstand (`w-full` im umgebenden Layout).
- Auf größeren Bildschirmen: ausreichend breit, damit auch lange Optionen wie "Grad und Dezimalminuten (54° 19.85' N)" lesbar sind.
- Maximale Breite begrenzen, damit sie auf Smartphones nicht über den Rand ragt (z. B. `max-w-md` mit Padding der Karte).

## Technische Details
- Betroffene Datei: `src/routes/settings.tsx` (Zeile ~121, `SelectTrigger` für `positionFormat`).
- Vorgeschlagene Klassenänderung: `max-w-72` ersetzen durch `w-full max-w-md` oder ähnlich, unter Berücksichtigung der `p-4` des umgebenden `section`-Containers.
- Nur den Positionsformat-Trigger anpassen; Sprach- und Theme-Dropdown können optional mitgezogen werden, wenn sie ebenfalls lange Texte enthalten.

## Akzeptanzkriterien
- Der ausgewählte Positionsformat-Text ist im Dropdown-Trigger in allen Sprachen vollständig sichtbar.
- Das Dropdown ragt auf einem 375 px breiten Smartphone nicht über den rechten Rand hinaus.
- Keine Breite des Theme- oder Sprach-Dropdowns wird ungewollt verändert, es sei denn, es wird als sinnvoll erachtet.

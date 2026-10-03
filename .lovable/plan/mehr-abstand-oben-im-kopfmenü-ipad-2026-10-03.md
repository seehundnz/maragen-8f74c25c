# Mehr Abstand oben im Kopfmenü (iPad)

## Problem
Wenn die App vom Home-Bildschirm geöffnet wird, legt sich die Statusleiste (Uhrzeit, Akku) durchsichtig über die App. Der Kopfbereich hält zwar den vom System gemeldeten Abstand ein. Auf dem iPad ist dieser Abstand aber knapp, und der Kopfbereich ist leicht durchsichtig mit Weichzeichner. Darum wirkt die oberste Zeile direkt unter der Statusleiste verschwommen.

## Vorschlag
1. **Mehr Abstand oben:** Zum System-Abstand kommt ein kleiner fester Puffer von 0,5 rem (etwa 8 px) dazu. Ohne System-Abstand (normaler Browser) bleibt es bei 0,5 rem, damit dort keine große Lücke entsteht.
2. **Fester Hintergrund hinter der Statusleiste:** Der Streifen unter der Statusleiste bekommt einen deckenden Hintergrund statt Weichzeichner. So scheint dort kein Inhalt durch, der verschwommen aussehen könnte.
3. **Zeilen etwas höher:** Die erste Menüzeile bekommt etwas mehr vertikalen Innenabstand (py-3 auf py-3.5 ab Tablet-Breite).
4. Version auf **1.2.2** setzen und den Changelog ergänzen ("Fixed: header spacing below the status bar on iPad").

## Technische Details
- `src/components/AppShell.tsx` Header: `pt-[env(safe-area-inset-top)]` ersetzen durch `pt-[calc(env(safe-area-inset-top)+0.5rem)]`; `bg-background/95 backdrop-blur` durch deckendes `bg-background` ersetzen (oder: ein eigenes Element in Statusleisten-Höhe mit `bg-background` und `backdrop-blur` nur auf die Menüzeile).
- Innere Zeile: `sm:py-3.5`.
- Die Seiten im Lesemodus, die ebenfalls den Safe-Area-Abstand nutzen, auf denselben Puffer prüfen und angleichen.
- Prüfen mit Playwright bei iPad-Größe (820x1180) und simuliertem Safe-Area-Abstand; Mobil (402x725) darf sich nicht verschlechtern.
- `package.json` 1.2.2, `CHANGELOG.md` Eintrag.

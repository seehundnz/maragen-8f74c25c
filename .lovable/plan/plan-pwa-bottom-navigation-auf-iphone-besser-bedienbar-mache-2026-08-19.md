Plan: PWA-Bottom-Navigation auf iPhone besser bedienbar machen

Problem
Die feste Bottom-Navigation am unteren Bildschirmrand ist in der PWA auf dem iPhone zu niedrig und liegt zu dicht am Home-Indicator. Das erschwert das Tippen und kann dazu führen, dass der Nutzer versehentlich das iPhone-Home-Indicator-Gesten-System aktiviert.

Lösung
1. Viewport für Safe-Area optimieren
   - `viewport`-Meta-Tag in `src/routes/__root.tsx` auf `viewport-fit=cover` erweitern, damit `env(safe-area-inset-bottom)` verfügbar ist.

2. Safe-Area-Abstand in der Bottom-Navigation
   - `src/components/CallTabs.tsx` erhält zusätzliches Padding unten per `pb-[env(safe-area-inset-bottom)]` oder `pb-safe`.
   - Gesamthöhe der Leiste wird auf Mobilgeräten erhöht, z. B. `min-h-20` statt `min-h-16`, damit die Tippfläche komfortabel bleibt.

3. Tippfläche pro Button vergrößern
   - Jeder Button bekommt mindestens `py-3`/`min-h-14` (mindestens 44 px Haptikfläche) und bleibt optisch zentriert.
   - Beschriftung bleibt auf 2 Zeilen (Label + Kurzbezeichnung), aber mit etwas mehr vertikalem Abstand.

4. Main-Content-Ausgleich
   - `AppShell`/`main` erhält einen ausreichenden unteren Padding-Wert, der der tatsächlichen Höhe der Navigation inklusive Safe-Area entspricht, damit der letzte Inhalt nicht überdeckt wird.

5. Testen
   - Visuell in der Preview prüfen (Desktop, Mobile-Viewport).
   - Optional: Playwright-Screenshot bei 393×852 px (iPhone-Viewport) und Desktop-Viewport, um sicherzustellen, dass die Navigation in beiden Modi korrekt dargestellt wird und Inhalte nicht überdeckt werden.

Dateien
- `src/routes/__root.tsx`
- `src/components/CallTabs.tsx`
- `src/components/AppShell.tsx`

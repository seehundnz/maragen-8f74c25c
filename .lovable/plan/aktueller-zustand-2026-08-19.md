Passe das Layout im Call-Header an, damit UTC und Position optisch konsistent ausgerichtet sind und der Zeilenabstand auf Mobilgeräten passt.

## Aktueller Zustand

Im Call-Header (`src/routes/call.$type.tsx`) werden UTC und Position in einem zweispaltigen Grid dargestellt:

- UTC: Label + Uhrzeit in einer Zeile.
- Position: Label + Positionswert + zusätzliche Accuracy/Quellen-Zeile darunter.

Dadurch ist die Position visuell höher als die UTC. Auf schmalen Mobilgeräten stehen beide Werte untereinander, ohne gemeinsame Zeilenstruktur, was den Zeilenabstand unruhig wirken lässt.

## Geplante Anpassung

1. **Gemeinsame Zeilenstruktur für UTC und Position**
   - Beide Felder als einzelne Zeilen (`grid grid-cols-2` oder flex) mit identischem vertikalem Layout aufbauen.
   - Label und Wert in separaten, gleichhohen Zeilen platzieren, damit die Baselines ausgerichtet sind.

2. **Accuracy-Info aus der Positionszeile auslagern**
   - Die Zeile `±[accuracy] m · [timestamp] UTC` wird nicht mehr direkt unter dem Positionswert gezeigt, sondern entweder in einer eigenen dritten Zeile unterhalb beider Felder oder als Tooltip/Hint.
   - Damit hat das Positionsfeld die gleiche visuelle Höhe wie das UTC-Feld.

3. **Zeilenabstand und Mobile-Optimierung**
   - Auf Mobilgeräten (`< sm`) beide Zeilen mit passendem `leading` und `gap` darstellen, sodass Label und Wert nicht zu dicht oder zu weit auseinander stehen.
   - Falls nötig, Schriftgröße und Abstand so anpassen, dass beide Werte eine gemeinsame horizontale Linie bilden, wenn nebeneinander.

4. **Buttons und Auto-Update-Hinweis unverändert lassen**
   - Die bereits vorhandenen Buttons (Refresh fix, Manual position) und der Auto-Update-Status bleiben in ihrem aktuellen Stil und Verhalten.

## Technische Details

- Betroffene Datei: `src/routes/call.$type.tsx`
- Bereich: der `section`-Block mit den Status-Informationen (UTC, Position, Buttons).
- Keine Änderung an Logik oder Datenfluss; nur CSS/Layout-Änderungen mit Tailwind-Klassen.
- Keine neuen Abhängigkeiten nötig.

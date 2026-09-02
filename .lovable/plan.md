# Plan: Cache-Löschen-Block in Settings nach unten verschieben

## Ziel
Der Block zum Löschen aller App-Daten (`ClearDataSection`) soll auf der Einstellungsseite von seiner aktuellen Position nach ganz unten verschoben werden, damit er am Ende der Seite steht und weniger prominent ist.

## Aktueller Stand
In `src/routes/settings.tsx` ist die Reihenfolge:
1. Sprache
2. Auto-Update / Intervall
3. Kanal / Positionsformat
4. Nachtmodus
5. KI-Sprache
6. Update-Bereich
7. **ClearDataSection**
8. Datenschutz
9. Support
10. Quellcode

## Geplante Änderung
`ClearDataSection` aus Position 7 entfernen und nach dem Quellcode-Bereich (Position 10) einfügen. Damit ergibt sich die neue Reihenfolge:
1. Sprache
2. Auto-Update / Intervall
3. Kanal / Positionsformat
4. Nachtmodus
5. KI-Sprache
6. Update-Bereich
7. Datenschutz
8. Support
9. Quellcode
10. **ClearDataSection**

## Technische Details
- Betroffene Datei: `src/routes/settings.tsx`
- Keine neuen Komponenten oder Übersetzungen nötig
- Keine funktionalen Änderungen, nur Verschieben innerhalb des JSX

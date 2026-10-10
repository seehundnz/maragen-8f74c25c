# App-Prüfung und Aktualisierung (Version 1.3.0)

## Ausgangslage (geprüft)
- Sicherheitsscan der Pakete: 3 bekannte Schwachstellen (hoch) in Hilfsbausteinen, die nur beim Bauen der App laufen (Stil-Werkzeug, Framework-Werkzeug). Für Nutzer der App gering, sollte aber behoben werden.
- Rund 30 Pakete haben kleinere Updates (Bedienelemente, Datenabruf, Formulare).
- Alle 10 Sprachdateien haben gleich viele Texte (320) – keine offensichtlichen Lücken.
- Die Mayday/Anruf-Seite ist mit ca. 560 Zeilen die größte Datei.
- Kein vollständiger Sicherheits-Tiefenscan vorhanden; die App wird darum nicht als "sicher" bezeichnet. Empfehlung: Scan im Sicherheits-Bereich starten.

## Schritte
1. **Pakete aktualisieren**: alle Pakete auf die neueste kompatible Version; gezielt die betroffenen Unterbausteine (source-map-js ≥ 1.2.2, js-yaml ≥ 4.3.2) erzwingen. Danach Sicherheitsscan erneut prüfen.
2. **Code-Prüfung**: ungenutzte Dateien und Bausteine (z. B. nicht verwendete Bedienelemente) und Altlasten (alter Nachtmodus-Schalter neben den drei Modi) suchen; doppelte Hilfsfunktionen zusammenführen; fest eingestellte Farben (z. B. grün/gelb im Update-Bereich) auf die Farbvorgaben umstellen; Anruf-Seite in kleinere Teile zerlegen, ohne Verhalten zu ändern.
3. **Sicherheit/Datenschutz**: Vorlese-Schnittstelle (KI-Stimme) auf Missbrauchsschutz prüfen (Längenbegrenzung, nur erlaubte Eingaben); prüfen, dass weiterhin keine externen Inhalte ohne Einwilligung geladen werden (DSGVO).
4. **Texte & Übersetzungen**: alle Sprachen gegen Englisch abgleichen – fehlende, unübersetzte oder abweichende Texte, Platzhalter und Funkspruch-Wortlaut (immer Englisch) vereinheitlichen.
5. Nach jedem Schritt: Prüfung in der Vorschau (Start, Mayday, Einstellungen, alle drei Anzeige-Modi, Mobil und Desktop).
6. Version **1.3.0** und Changelog-Eintrag.

## Technische Details
- `bun update`, `overrides` in package.json für source-map-js/js-yaml; `security--dependency_scan` zur Kontrolle.
- Ungenutzte `src/components/ui/*` per `rg` ermitteln und entfernen, zugehörige Pakete nur entfernen wenn unbenutzt.
- `src/routes/call.$type.tsx` in Komponenten (DSC-Abschnitt, weitere Kommunikation, Skriptanzeige) aufteilen.
- `src/routes/api/tts.ts`: Eingabeprüfung (zod, max. Länge).
- i18n: Skript vergleicht Schlüssel und markiert Werte identisch zu `en.ts`.

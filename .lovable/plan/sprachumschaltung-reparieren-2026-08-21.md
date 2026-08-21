# Sprachumschaltung reparieren

## Was ich geprüft habe

In der Web-Vorschau funktioniert das Umschalten aktuell: Auswahl "English" setzt `language: "en"` im lokalen Speicher, `html lang` wechselt und die Oberfläche wird sofort englisch. Direkt nach einem Code-Update war der Zustand aber inkonsistent: `html lang` stand bereits auf `de`, die Texte blieben jedoch englisch — erst ein vollständiger Neuladen brachte Deutsch. Das deutet auf zwei Ursachen hin:

1. **Verzögerte Hydration der Einstellungen.** Die Sprache wird aus dem lokalen Speicher erst nach dem ersten Rendern gelesen. Bis dahin rendert die App auf Englisch; erst danach kippt sie auf die richtige Sprache. In der installierten PWA (mit gecachtem Startdokument) kann dieser Zwischenzustand sichtbar hängen bleiben.
2. **Veralteter Cache in der installierten PWA.** Der Service Worker liefert noch das alte Bundle, in dem die zuletzt hinzugefügten Übersetzungsschlüssel (Guide) fehlen — die Oberfläche wirkt dann "falsch erkannt" und reagiert nicht auf den Wechsel.

## Was ich ändern werde

### 1. Sprache synchron beim ersten Render bestimmen
- Eigener, kleiner Sprach-Store, der beim Modulstart (im Browser) den gespeicherten Wert liest, statt auf einen Effekt zu warten.
- `__root.tsx` nutzt diesen Store; damit ist die Sprache schon beim ersten Client-Render korrekt und der englische Zwischenzustand entfällt.
- Der Wert bleibt mit den bestehenden Einstellungen synchron: Änderung in den Einstellungen schreibt weiterhin in `settings.language` und aktualisiert den Store sofort (auch über mehrere Tabs/Fenster).

### 2. Sprachwechsel robust durchreichen
- Sicherstellen, dass wirklich der gesamte Baum neu rendert: der I18n-Provider bekommt zusätzlich einen `key={lang}`, sodass ein Sprachwechsel unabhängig von Memoisierung im Router immer durchschlägt.

### 3. Cache-Problem in der installierten App entschärfen
- Nach einem erfolgreichen Service-Worker-Update wird die Seite automatisch einmal neu geladen, damit neue Übersetzungen sofort aktiv sind.
- In den Einstellungen zeigt "Nach Updates suchen" nach Abschluss eine kurze Rückmeldung mit Neuladen.

## Test
- Sprache auf Automatisch / Englisch / Deutsch umschalten und prüfen, dass Kopfzeile, Einstellungen, Guide und Funkspruch-Seiten sofort wechseln.
- Nach einem Neuladen die gewählte Sprache ohne englisches Aufblitzen prüfen.
- Funksprüche bleiben unverändert englisch.

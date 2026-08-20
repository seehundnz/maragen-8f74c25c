# App-Anleitung / Benutzerhandbuch

Eine neue Seite `/guide` (Deutsch + Englisch), die Schritt für Schritt erklärt, wie die App genutzt wird und welche Funktionen sie hat. Verlinkt aus dem Header-Footer (neben Datenschutz) und von der Start-Weiterleitung.

## Was gebaut wird

### 1. Neue Route `src/routes/guide.tsx`
- `createFileRoute("/guide")` mit eigener `head()` (title, description, og:title, og:description, og:type website).
- Nutzt `AppShell` und die bestehende `Section`-Komponenten-Struktur (wie `privacy.tsx`).
- Inhalt in Sektionen gegliedert, jede mit Überschrift und Text — alles über i18n-Keys, kein hartkodierter Text.

### 2. i18n-Keys in `en.ts` und `de.ts`
Neuer Namespace `guide.*` mit folgenden Sektionen:

1. **Einleitung** — wozu die App dient (Hilfsmittel, kein Ersatz für Funkausbildung), Security-Disclaimer kurz.
2. **Erste Schritte** — Schiff anlegen (Name, MMSI 9 Ziffern, Rufzeichen, Typ/Länge/Rumpffarbe auf Englisch), mehrere Schiffe möglich, eins als aktiv setzen.
3. **Funkspruch erzeugen** — Ruf-Typ über die unteren Tabs wählen (Mayday/Pan-Pan/Sécurité/Standard), jeweilige Farbe, Daten werden übernommen. UTC-Zeit und GPS-Position automatisch vom Gerät, manuelle Eingabe als Fallback. Felder: Notlage/Art der Situation, Personen an Bord, Kanal, zusätzliche Angaben, (Station/Sicherheitsmeldung je nach Typ).
4. **Lesen & Vorlesen** — Read-Modus (Vollbild große Schrift), Speak-Button (KI-Stimme oder Gerätestimme, Einstellung in Settings), Copy, Share.
5. **DSC-Hinweis (Mayday)** — aufklappbare Sektion mit DSC-Anleitung auf der Mayday-Seite.
6. **Weitere Kommunikation (Mayday)** — aufklappbare Standard-Funktexte.
7. **Schiffe teilen & importieren** — QR-Code generieren, per Kamera scannen, Code kopieren/einfügen.
8. **Einstellungen** — Sprache, Auto-Update Position, Intervall, Standard-Kanal, Positionsformat, KI-Stimme an/aus.
9. **Offline & Installation (PWA)** — App installieren (iOS/Android/Desktop), Offline-Verhalten, Update-Status in Settings.
10. **Datenschutz** — kurzer Verweis auf `/privacy`.

### 3. Navigation / Verlinkung
- Neuer Header-Button in `AppShell.tsx` (Icon `BookOpen` aus lucide-react) zwischen "Schiffe" und "Einstellungen".
- Gleicher Stil wie die anderen Nav-Links: Icon immer, Text ab `sm`.
- Zusätzlich bleibt der Footer-Link "Datenschutz & Impressum" bestehen (keine Änderung).

## Technische Umsetzung

- Neue Datei `src/routes/guide.tsx` nach dem Muster von `privacy.tsx` (`Section`-Komponente, `useT()`).
- Alle Texte als `guide.*`-Keys in `en.ts` (Quelle) und `de.ts` ergänzen.
- `src/components/AppShell.tsx`: Footer um einen `<Link to="/guide">` erweitern.
- Keine neuen Abhängigkeiten, keine Logikänderungen — nur statische Inhaltsseite.

## Design

- Gleiche Karten-/Sektionsstruktur wie die Privacy-Seite (`rounded-xl border border-border bg-card p-4`).
- Überschriften `text-base font-semibold`, Fließtext `text-sm text-muted-foreground`.
- Wenn passend, kurze nummerierte Listen für die Schritte (`ol` / `li`).

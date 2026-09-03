# Nutzungsbedingungen (Terms of Use) auf eigener Route

## Ziel

Neue Seite `/terms` mit Nutzungsbedingungen. Die bestehenden Sicherheitshinweise (aktuell Sektion „Sicherheitshinweis" auf der Datenschutz-Seite) werden dorthin ausgelagert. Auf der Datenschutz-Seite bleibt ein kurzer Verweis/Link auf die Nutzungsbedingungen.

## Inhalt der neuen Seite `/terms`

Abschnitte (alle übersetzbar):

1. **Geltungsbereich / Zweck** — die App ist ein Hilfsmittel zum Erstellen von VHF-Funksprüchen.
2. **Sicherheitshinweis** — die bisherigen Texte `privacy.p.safety1` und `privacy.p.safety2` (ersetzt keine Funkausbildung/Funkbetriebszeugnis; im Notfall Rettungsleitstelle folgen).
3. **Haftungsausschluss** — Nutzung vollständig auf eigenes Risiko; kein Ersatz für DSC-Notalarm, Funkausbildung oder Urteil des Skippers; keine Haftung für Schäden/Folgen.
4. **Verfügbarkeit & Richtigkeit** — keine Garantie für jederzeitige Verfügbarkeit, Offline-Funktion, GPS-Genauigkeit oder Fehlerfreiheit der generierten Texte und der Sprachausgabe.
5. **Änderungen** — Bedingungen können mit Updates angepasst werden.

## Änderungen

- **Neu:** `src/routes/terms.tsx` — Seite im AppShell-Layout mit den Abschnitten oben, eigene SEO-Head-Metadaten (Titel „Terms of Use — VHF Call Builder" usw.).
- **`src/routes/privacy.tsx`:** Sektion „Sicherheitshinweis" entfernen, stattdessen kurzer Absatz mit Link auf `/terms`.
- **`src/components/AppShell.tsx`:** Footer um Link „Terms" (neben Privacy) erweitern.
- **i18n (alle 9 Sprachen: en, de, fr, nl, es, it, sv, nb, hr):**
  - Neue `terms.*`-Schlüssel (Titel, Untertitel, Abschnitts-Überschriften und -Texte), übersetzt in jede Sprache.
  - Bestehende Safety-Texte aus `privacy.*` nach `terms.*` verschieben.
  - Neuer Schlüssel `privacy.p.termsLink` (Verweis auf die Nutzungsbedingungen) und `nav.terms` für den Footer-Link.
- Settings-Seite (Datenschutz-Sektion) bleibt unverändert; der Footer-Link macht die Terms überall erreichbar.

## Technik

- TanStack-File-Route, `useT()` für alle Texte, gleiche `Section`-Optik wie auf `/privacy`.
- Typecheck (`tsgo`) zur Validierung der neuen Übersetzungsschlüssel.

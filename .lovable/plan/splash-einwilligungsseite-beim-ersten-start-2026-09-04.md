# Splash-/Einwilligungsseite beim ersten Start

## Ziel

Beim ersten Start der App (auch als installierte PWA) erscheint ein nicht wegklickbarer Splash-Screen mit den wichtigsten Punkten der Nutzungsbedingungen. Erst nach aktiver Bestätigung (Checkbox + Button) wird die App nutzbar. Die Einwilligung wird lokal gespeichert und nicht erneut abgefragt — außer der Nutzer löscht die App-Daten.

## Inhalt des Splash-Screens

1. App-Name + kurzer Einleitungssatz (Willkommen / Hinweis).
2. Kompakte Liste der Kernpunkte (aus den Nutzungsbedingungen):
   - Die App ersetzt **keine Funkausbildung und kein Funkbetriebszeugnis**.
   - Nutzung erfolgt **vollständig auf eigenes Risiko**; keine Haftung bei Schäden oder Fehlern.
   - Keine Garantie für Verfügbarkeit, GPS-Genauigkeit oder Richtigkeit der Texte.
   - Im Notfall: immer den Anweisungen der Rettungsleitstelle folgen; DSC-Notalarm hat Vorrang.
3. Deutlicher Link: „Vollständige Nutzungsbedingungen lesen" → öffnet `/terms` (der Splash bleibt nach Rückkehr bestehen, bis bestätigt wurde).
4. Checkbox: „Ich habe die Nutzungsbedingungen gelesen und stimme ihnen zu."
5. Button „Verstanden und fortfahren" — erst aktiv, wenn die Checkbox gesetzt ist.

## Umsetzung

- **Neu:** `src/components/TermsGate.tsx` — Vollbild-Overlay (wie der Read Mode: `fixed inset-0`, `100dvh`, Safe-Area-Padding, Nachtmodus-kompatibel), das die App blockiert, solange nicht eingewilligt wurde.
- **Einbindung:** in `src/routes/__root.tsx` (RootComponent) — gilt damit für alle Seiten gleichermaßen, egal mit welcher URL die App gestartet wird.
- **Speicherung:** über den bestehenden `useLocalState`-Hook, Key `vhf-terms-accepted` (Version/Stand der Bedingungen mitspeichern, z. B. `termsVersion: 1`, damit bei wesentlichen Änderungen der Bedingungen später erneut gefragt werden kann).
- **DSGVO-konform:** rein lokale Speicherung (localStorage), keine Übertragung; Hinweis im Datenschutztext (Privacy) wird um einen Satz ergänzt, dass die Einwilligung lokal gespeichert wird und über „Daten löschen" zurückgesetzt werden kann. Der bestehende ClearDataSection-Löschvorgang entfernt den Key automatisch mit, falls er alle localStorage-Keys löscht — sonst ergänzen.
- **SSR/PWA:** Overlay rendert erst clientseitig nach Hydration (bestehendes `hydrated`-Flag von `useLocalState`), um Flackern zu vermeiden.

## i18n (alle 9 Sprachen: en, de, fr, nl, es, it, sv, nb, hr)

- Neue Schlüssel `gate.*`: Titel, Intro, 4 Kernpunkte, Link-Text, Checkbox-Label, Button-Text.
- `privacy.*` um einen Satz zur lokalen Einwilligungsspeicherung ergänzt.

## Technik

- Styling analog zum Read Mode / AppShell (Design-Tokens, keine hartcodierten Farben), responsive und Safe-Area-sicher (iPhone Dynamic Island).
- Checkbox und deaktivierter Button über shadcn/ui-Komponenten bzw. native Elemente mit Tokens.
- Typecheck (`bunx tsgo --noEmit`) danach.

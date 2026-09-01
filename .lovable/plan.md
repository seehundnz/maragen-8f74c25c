# Schiffsdaten per Foto-Scan erfassen

Ziel: Beim Anlegen/Bearbeiten eines Schiffes ein Foto (z. B. Funklizenz, Schiffspapiere, Rumpfbeschriftung) aufnehmen oder hochladen und daraus Schiffsname, MMSI und Rufzeichen automatisch auslesen.

## Ablauf für Nutzer

1. Auf der Seite „Schiff hinzufügen/bearbeiten“ erscheint oben ein Button „Aus Foto scannen“ (Kamera-Icon).
2. Beim ersten Klick erscheint ein Hinweis-Dialog: Das Bild wird zur Texterkennung an den KI-Dienst gesendet, dort nicht gespeichert und nicht zum Training verwendet. Nutzer muss ausdrücklich zustimmen (Opt-in, wie beim KI-Vorlesen).
3. Danach öffnet sich die Kamera bzw. Dateiauswahl (auf dem iPhone direkt „Foto aufnehmen“).
4. Das Bild wird analysiert; ein Ergebnis-Dialog zeigt die erkannten Werte (Name, MMSI, Rufzeichen) mit Checkboxen zum Übernehmen.
5. Übernommene Werte füllen die Formularfelder, werden aber nicht automatisch gespeichert — Nutzer prüft und drückt „Speichern“.
6. Fehlgeschlagene oder unvollständige Erkennung: klare Meldung, Formular bleibt unverändert, manuelle Eingabe weiterhin möglich.

Sicherheitshinweis im Dialog: erkannte Daten immer gegen die Schiffspapiere prüfen — OCR kann Ziffern verwechseln.

## Datenschutz

- Reiner Opt-in: ohne Zustimmung wird kein Bild versendet; die Zustimmung wird lokal in den Einstellungen gespeichert und ist dort auch abschaltbar.
- Bild wird nur im Arbeitsspeicher verarbeitet, nirgends dauerhaft abgelegt (weder lokal noch serverseitig).
- Datenschutzseite (`src/routes/privacy.tsx`) erhält einen neuen Absatz zur Foto-Erkennung: welche Daten, wohin, wie lange, mögliche Drittlandübertragung — analog zum bestehenden TTS-Absatz.
- Ohne Internetverbindung ist die Funktion nicht verfügbar; Hinweis im UI.

## Technische Umsetzung

- Neue Server-Route `src/routes/api/vessel-scan.ts` (POST, JSON mit Base64-Bild, max. Größe begrenzt, nur Bild-MIME-Typen). Ruft `https://ai.gateway.lovable.dev/v1/chat/completions` mit einem Vision-fähigen Modell auf (Modell-ID zur Implementierungszeit aus dem Modell-Listing wählen) und fordert strukturiertes JSON `{ name, mmsi, callSign }` an; nicht erkannte Felder bleiben leer.
- Serverseitige Nachvalidierung mit Zod: MMSI auf 9 Ziffern normalisieren, Rufzeichen in Großbuchstaben, Name auf 80 Zeichen begrenzt.
- Fehlerbehandlung nach Gateway-Semantik: 429/5xx mit kurzer Wiederholung, 402/403 mit klarer Meldung an den Nutzer, keine Endlosschleifen.
- Neue Komponente `src/components/VesselScanPhotoDialog.tsx`: Datei-Input (`accept="image/*"`, `capture="environment"`), clientseitige Verkleinerung des Bildes über Canvas (max. ca. 1600 px, JPEG) vor dem Upload, Ladezustand, Ergebnisanzeige mit Übernahme-Auswahl.
- Einbindung in `src/routes/vessels.$id.tsx` über dem Namensfeld; bestehender QR-Scan bleibt unverändert.
- Neues Settings-Feld `usePhotoScan: boolean` (Standard `false`) in `src/lib/types.ts`, Schalter in `src/routes/settings.tsx`.
- Neue Übersetzungsschlüssel in allen sechs Sprachdateien (`en`, `de`, `fr`, `nl`, `es`, `it`).
- Abschluss: `bunx tsgo --noEmit` und ein Praxistest des Endpunkts mit einem Testbild.

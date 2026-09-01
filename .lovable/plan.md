# Schiffsdaten aus Foto lesen — reine On-Device-OCR

Ziel: Name, MMSI und Rufzeichen aus einem Foto (Funklizenz, Schiffspapiere, Rumpfbeschriftung) auslesen — vollständig auf dem Gerät, ohne Internetverbindung, ohne KI-Dienst, ohne Datenübertragung.

## Ablauf für Nutzer

1. Auf der Seite „Schiff hinzufügen/bearbeiten“ erscheint über dem Namensfeld ein Button „Aus Foto scannen“ (Kamera-Icon), im Stil der bestehenden Buttons.
2. Klick öffnet direkt Kamera bzw. Fotoauswahl des Geräts.
3. Das Bild wird lokal analysiert (Fortschrittsanzeige, da die Erkennung einige Sekunden dauert).
4. Ergebnis-Dialog zeigt die erkannten Werte für Schiffsname, MMSI und Rufzeichen, jeweils einzeln editierbar und mit Checkbox „übernehmen“. Zusätzlich der komplette erkannte Rohtext zum Nachschauen, falls ein Feld nicht getroffen wurde.
5. Übernahme füllt nur die Formularfelder — gespeichert wird erst mit „Speichern“, die bestehende MMSI-Prüfung (genau 9 Ziffern) greift weiterhin.
6. Hinweis im Dialog: Erkennung immer gegen die Schiffspapiere prüfen, OCR kann Ziffern und Buchstaben verwechseln.

## Erkennungslogik (lokal)

Aus dem erkannten Rohtext werden Kandidaten per Muster bestimmt:

- MMSI: 9 zusammenhängende Ziffern, bevorzugt in einer Zeile mit „MMSI“; typische OCR-Verwechslungen (O→0, I/l→1, S→5, B→8) werden in reinen Ziffernfeldern korrigiert.
- Rufzeichen: 3–7 Zeichen aus Buchstaben und Ziffern, bevorzugt in einer Zeile mit „Call Sign“ / „Rufzeichen“ / „Call“.
- Schiffsname: Zeile nach „Name of vessel“ / „Schiffsname“ / „Vessel“; sonst die auffälligste Großbuchstaben-Zeile ohne Ziffernblöcke.
- Nicht sicher erkannte Felder bleiben leer statt geraten zu werden.

## Datenschutz

- Kein Netzwerkaufruf: Bild und Text verlassen das Gerät nicht, nichts wird gespeichert, das Bild lebt nur im Arbeitsspeicher und wird nach dem Dialog verworfen.
- Funktioniert offline in der installierten PWA.
- Datenschutzseite erhält einen kurzen Absatz „Foto-Erkennung (lokal)“, der genau das festhält — kein Opt-in nötig, da keine Daten übertragen werden.

## Technische Umsetzung

- OCR-Engine: `tesseract.js` (WebAssembly, läuft im Worker im Browser). Worker-, WASM- und Sprachdatendateien werden lokal aus `public/` geladen (Pfade explizit gesetzt), nicht von einem CDN — sonst würde die Aussage „keine Inhalte von Dritten“ in den Datenschutzhinweisen verletzt. Sprachdaten: nur `eng` (Schiffspapiere/Rufzeichen sind lateinisch/englisch), ca. wenige MB.
- Laden strikt dynamisch per `import()` erst beim Klick auf den Scan-Button, damit Startzeit und Bundle der App unverändert bleiben; keine Ausführung während SSR.
- Service-Worker/Precaching so konfigurieren, dass die OCR-Dateien nicht ins PWA-Precache wandern (sonst wird jede Installation unnötig groß) — stattdessen Laufzeit-Caching beim ersten Gebrauch, damit die Funktion danach offline verfügbar ist.
- Neue Datei `src/lib/vesselOcr.ts`: Bildvorverarbeitung per Canvas (Verkleinerung auf max. ca. 1600 px, Graustufen, Kontrast), OCR-Aufruf, Feld-Extraktion mit den obigen Mustern, Rückgabe `{ name, mmsi, callSign, rawText }`.
- Neue Komponente `src/components/VesselPhotoScanDialog.tsx`: Datei-Input (`accept="image/*"`, `capture="environment"`), Fortschritt, editierbare Ergebnisfelder, Übernahme-Buttons.
- Einbindung in `src/routes/vessels.$id.tsx`; bestehender QR-Scan und Formularlogik bleiben unverändert.
- Neue Übersetzungsschlüssel in allen sechs Sprachdateien (`en`, `de`, `fr`, `nl`, `es`, `it`).
- Abschluss: `bunx tsgo --noEmit` und ein Praxistest mit einem Testbild im Browser.

## Ehrliche Einschätzung

Lokale OCR ist deutlich schwächer als Cloud-Erkennung: Bei gutem Licht, geradem Winkel und gedrucktem Text (Funklizenz) funktioniert sie gut; bei schrägen Fotos, Handschrift oder Rumpfbeschriftung mit Schatten liefert sie oft nur Teiltreffer. Deshalb sind alle Felder im Ergebnisdialog editierbar und der Rohtext wird mit angezeigt.

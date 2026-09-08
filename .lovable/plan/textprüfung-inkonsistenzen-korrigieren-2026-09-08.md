# Textprüfung: Inkonsistenzen korrigieren

Ich habe alle Texte der App (9 Sprachen, Seiten, Metadaten) verglichen. Struktur ist sauber: keine fehlenden oder überzähligen Textbausteine. Gefunden habe ich folgende Punkte.

## 1. Tippfehler im Funkspruch (wichtig)

Im Skript "Weitere Kommunikation im Notfall" steht der Platzhalter
`[CALL SIGN VESSEL IN DSITRESS]` — richtig ist `DISTRESS`.
Der Fehler steckt identisch in allen 9 Sprachdateien.

## 2. Falsche Standard-Funkphrase

Der Abschnitt "Ruhe im Funkverkehr fordern" zeigt aktuell `Silence mayday`.
Die international übliche Phrase lautet `SEELONCE MAYDAY` (Großschreibung wie
in den übrigen Skripten). Wird in allen 9 Sprachdateien korrigiert.

## 3. Formatierung in den Skripten

- Im Skript "Notfall beenden" steht ein überflüssiges Leerzeichen vor dem
  Zeilenumbruch nach `UTC`.
- Groß-/Kleinschreibung der Skriptzeilen wird an das Muster der übrigen
  Skripte angeglichen (Platzhalter und Standardphrasen durchgehend groß).

## 4. Ein deutscher Begriff fällt aus der Reihe

Die deutsche Fassung nutzt durchgehend "UKW" (UKW-Kanal, UKW-Seefunk), nur in
den Nutzungsbedingungen steht einmal "VHF-Funksprüche". Wird zu "UKW-Funksprüche"
vereinheitlicht.

## 5. App-Name uneinheitlich

Im Browser-Titel, in der Installations-Kachel und in den Suchmaschinen-Angaben
heißt die App "VHF Call Builder" / "VHF Call". In der Oberfläche heißt sie je
nach Sprache anders ("UKW-Funkruf", "Appel VHF", "VHF-anrop" …), und im
Anleitungstext taucht in den Fremdsprachen wieder "VHF Call Builder" auf.

Vorschlag: **"VHF Call Builder" bleibt der feste Produktname** (Titel,
Installation, Anleitungstexte in allen Sprachen), die kurze Kopfzeilen-
Bezeichnung darf weiterhin übersetzt bleiben. Im deutschen Anleitungstext wird
"UKW-Funkruf" durch "VHF Call Builder" ersetzt, damit alle Sprachen gleich sind.
Sag Bescheid, wenn du stattdessen einen anderen Namen möchtest.

## 6. Startseite wird beim installierten App-Symbol übersprungen

Die installierte App startet direkt auf der Mayday-Seite, obwohl es inzwischen
eine Startseite mit der Auswahl aller Ruftypen gibt. Startadresse wird auf die
Startseite geändert.

## Umfang

Betroffen: die 9 Sprachdateien, `src/lib/templates.ts` (nur falls dort Text
angeglichen werden muss) und die Installationsdatei der App. Danach Typprüfung
und ein kurzer Blick auf die Mayday-Seite im Browser. Version wird auf 1.1.1
angehoben und im Änderungsprotokoll (englisch) vermerkt.

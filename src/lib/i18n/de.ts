import type { Dictionary } from "./en";

export const de: Dictionary = {
  "app.name": "UKW-Funkruf",
  "nav.vessels": "Schiffe",
  "nav.settings": "Einstellungen",
  "nav.privacy": "Datenschutz & Impressum",
  "nav.install": "Installieren",
  "nav.guide": "Anleitung",

  "install.title": "App installieren",
  "install.intro":
    "Nach der Installation liegt die App auf dem Homescreen, startet im Vollbild und funktioniert offline.",
  "install.button": "Jetzt installieren",
  "install.close": "Schließen",
  "install.ios.step1": "Tippe auf das Teilen-Symbol in der Browserleiste.",
  "install.ios.step2": 'Scrolle nach unten und wähle "Zum Home-Bildschirm".',
  "install.ios.step3": 'Tippe oben rechts auf "Hinzufügen".',
  "install.iosOther.note":
    "Auf iPhone und iPad kann nur Safari Apps installieren. Öffne diese Seite zuerst in Safari und folge dann den Schritten.",
  "install.android.step1": "Öffne das Browser-Menü (drei Punkte).",
  "install.android.step2": 'Wähle "App installieren" oder "Zum Startbildschirm hinzufügen".',
  "install.android.step3": "Bestätige die Installation.",
  "install.desktop.step1": "Öffne das Browser-Menü oder das Installieren-Symbol in der Adressleiste.",
  "install.desktop.step2": 'Wähle "Installieren" und bestätige.',

  "home.title": "Welche Art von Funkspruch brauchst du?",
  "home.subtitle": "Wähle eine Spruchart — Schiffsdaten, Position und Uhrzeit werden automatisch eingefügt.",

  "call.mayday.short": "Seenot",
  "call.panpan.short": "Dringlichkeit",
  "call.securite.short": "Sicherheit",
  "call.standard.short": "Routine",
  "call.mayday.description":
    "Erzeugt einen gesprochenen Mayday-Notruf mit deinen Schiffsdaten, der aktuellen GPS-Position und der UTC-Zeit.",
  "call.panpan.description":
    "Erzeugt einen gesprochenen Pan-Pan-Dringlichkeitsruf mit Schiffsdaten, aktueller Position und UTC-Zeit.",
  "call.securite.description":
    "Erzeugt eine gesprochene Sécurité-Sicherheitsmeldung an alle Stationen mit deiner aktuellen Position.",
  "call.standard.description":
    "Erzeugt einen Routine-UKW-Anruf an eine Marina, Station oder ein anderes Schiff inklusive Arbeitskanal-Anfrage.",

  "call.utcTime": "UTC-Zeit",
  "call.position": "Position",
  "call.manualEntry": "Manuelle Eingabe",
  "call.waitingGps": "Warte auf GPS…",
  "call.refreshFix": "Position aktualisieren",
  "call.manualPosition": "Position manuell",
  "call.autoUpdateOn": "Automatisch alle {seconds}s",
  "call.autoUpdateOff": "Automatik aus",
  "call.latitude": "Breite (dezimal)",
  "call.longitude": "Länge (dezimal)",
  "call.usePosition": "Position übernehmen",
  "call.manualPositionSet": "Manuelle Position gesetzt",
  "call.invalidCoordinates": "Bitte gültige Dezimalkoordinaten eingeben",
  "call.vessel": "Schiff",
  "call.selectVessel": "Schiff auswählen",
  "call.noVessel": "Noch kein Schiff gespeichert.",
  "call.addYourVessel": "Schiff anlegen",
  "call.stationCalled": "Gerufene Station",
  "call.safetyMessage": "Sicherheitsmeldung",
  "call.natureOfSituation": "Art der Situation",
  "call.assistanceRequired": "Benötigte Hilfe",
  "call.pob": "Personen an Bord",
  "call.channel": "UKW-Kanal",
  "call.additionalMessage": "Zusätzliche Angaben",
  "call.additionalMessagePlaceholder": "Was die Küstenfunkstelle sonst noch wissen sollte",
  "call.additionalMessagePlaceholder.panpan": "Weitere Angaben zur Dringlichkeitsmeldung",
  "call.additionalMessagePlaceholder.securite": "Weitere Angaben zur Sicherheitsmeldung",
  "call.additionalMessagePlaceholder.standard": "Deine Nachricht oder Anfrage",
  "call.radioScript": "Funkspruch",
  "call.channel16Notice": "Auf UKW-Kanal 16 absetzen",
  "call.channel16NoticeHint":
    "Mayday, Pan-Pan und Sécurité werden auf dem internationalen Not- und Anrufrufkanal 16 gesprochen.",
  "call.scriptEnglishNote":
    "Der Funkspruch ist immer auf Englisch — der internationalen Sprache im UKW-Seefunk.",
  "call.copy": "Kopieren",
  "call.share": "Teilen",
  "call.read": "Lesen",
  "call.close": "Schließen",
  "call.speak": "Vorlesen",
  "call.stop": "Stopp",
  "call.copied": "Funkspruch kopiert",
  "call.copyFailed": "Kopieren nicht möglich — Text bitte manuell markieren",
  "call.speechUnavailable": "Sprachausgabe ist auf diesem Gerät nicht verfügbar",
  "call.offlineVoice": "Offline — es wird die Gerätestimme verwendet",
  "call.disclaimer":
    "Diese App ist nur eine Hilfe. Sie ersetzt weder eine ordentliche Funkausbildung noch einen DSC-Notalarm oder die Entscheidung des Skippers. Setze wenn möglich immer zuerst einen DSC-Alarm ab.",

  "dsc.title": "Zuerst DSC-Notalarm senden",
  "dsc.intro": "Wenn dein Funkgerät DSC hat (roter Notruf-Knopf), sende den DSC-Alarm vor dem Sprechfunkspruch:",
  "dsc.step1": "Wenn Zeit bleibt, die Art der Notlage im DSC-Menü des Funkgeräts wählen (z. B. sinkend, Feuer, Person über Bord).",
  "dsc.step2": "Danach die Klappe öffnen und die rote DISTRESS-Taste ca. 5 Sekunden gedrückt halten.",
  "dsc.step3": "Auf die Bestätigung warten; das Gerät schaltet automatisch auf Kanal 16.",
  "dsc.step4": "Danach den MAYDAY-Spruch unten auf Kanal 16 sprechen.",
  "dsc.note": "Prüfe, dass die MMSI im Funkgerät programmiert und eine GPS-Position angeschlossen ist. Ohne DSC direkt MAYDAY auf Kanal 16 rufen.",

  "comms.title": "Weitere Kommunikation",
  "comms.intro": "Standard-Funktexte für weitere Kommunikation, Funkstille anordnen, Rücknahme Fehlalarm und Beendigung eines Notrufs.",
  "comms.h.relay": "Weitere Kommunikation im Notfall",
  "comms.p.relay": "MAYDAY [VESSEL NAME IN DISTRESS], [CALL SIGN VESSEL IN DSITRESS]\nThis is [VESSEL NAME], [CALL SIGN]\n[MESSAGE]\nOVER\n",
  "comms.h.silence": "STILLE AUFFORDERN (NUR KÜSTENFUNKSTELLE ODER HAVARIST)",
  "comms.p.silence": "All stations\nSilence mayday\n",
  "comms.h.cancel": "FALSCH AUSGELÖSTEN NOTALARM ZURÜCKNEHMEN (NUR HAVARIST)",
  "comms.p.cancel":
    "All stations, all stations, all stations\nThis is [VESSEL NAME], [VESSEL NAME], [VESSEL NAME]\nCall sign [CALL SIGN], MMSI [MMSI]\nCancel my false distress alert of [TIME OF DISTRESS CALL] UTC\nOVER\n",
  "comms.h.end": "NOTRUF BEENDEN (NUR KÜSTENFUNKSTELLE ODER HAVARIST)",
  "comms.p.end":
    "MAYDAY\nAll stations, all stations, all stations\nThis is [COAST STATION NAME / VESSEL NAME IN DISTRESS] at [CURRENT UTC] UTC \n[VESSEL NAME IN DISTRESS], [CALL SIGN VESSEL IN DISTRESS], [MMSI VESSEL IN DISTRESS]\nSILENCE FINI\n",

  "nature.sinking": "Sinkend",
  "nature.takingOnWater": "Wassereinbruch",
  "nature.fire": "Feuer an Bord",
  "nature.pob": "Person über Bord",
  "nature.grounding": "Grundberührung",
  "nature.capsized": "Gekentert",
  "nature.collision": "Kollision",
  "nature.medical": "Medizinischer Notfall",
  "nature.engineFailure": "Maschinenausfall",
  "nature.steeringFailure": "Ruderausfall",
  "nature.dismasted": "Mastbruch",
  "nature.adrift": "Manövrierunfähig treibend",
  "nature.outOfFuel": "Kein Kraftstoff mehr",
  "nature.medicalAdvice": "Medizinische Beratung nötig",
  "nature.riggingDamage": "Riggschaden",
  "nature.navHazard": "Schifffahrtshindernis gesichtet",
  "nature.floatingObject": "Treibendes Objekt",
  "nature.unlitBuoy": "Unbefeuerte Tonne",
  "nature.restrictedManoeuvrability": "Eingeschränkt manövrierfähig",
  "nature.severeWeather": "Schweres Wetter beobachtet",

  "settings.title": "Einstellungen",
  "settings.language": "Sprache",
  "settings.languageHint": "Sprache der Oberfläche. Funksprüche bleiben immer auf Englisch.",
  "settings.language.auto": "Automatisch (Gerätesprache)",
  "settings.autoUpdate": "Position automatisch aktualisieren",
  "settings.autoUpdateHint":
    "Aktualisiert die GPS-Position laufend, solange eine Ruf-Seite geöffnet ist.",
  "settings.interval": "Aktualisierungsintervall (Sekunden)",
  "settings.intervalHint": "Standard 10 Sekunden. Zulässiger Bereich 2–300 Sekunden.",
  "settings.intervalError": "Der Wert muss zwischen 2 und 300 Sekunden liegen.",
  "settings.defaultChannel": "Standard-UKW-Kanal",
  "settings.positionFormat": "Positionsformat",
  "settings.positionFormat.ddm": "Grad und Dezimalminuten (54° 19.85' N)",
  "settings.positionFormat.dd": "Dezimalgrad (54.33083°)",
  "settings.aiVoice": "KI-Stimme für „Vorlesen“ verwenden",
  "settings.aiVoiceHint":
    "Standardmäßig aus. Nur wenn du dies aktivierst, wird der Text des Funkspruchs an unseren Sprachdienst gesendet, um eine klare Funkstimme zu erzeugen. Bleibt die Option aus, wird ausschließlich die eingebaute Stimme deines Geräts genutzt und es verlässt kein Text dein Gerät.",
  "settings.appHeading": "App & Updates",
  "settings.offlineHint":
    "Die App speichert sich auf deinem Gerät und lässt sich auch ohne Netzverbindung öffnen.",
  "settings.swStatus": "Service Worker",
  "settings.swStatus.active": "Aktiv",
  "settings.swStatus.waiting": "Update wartend",
  "settings.swStatus.installing": "Installiert",
  "settings.swStatus.notRegistered": "Nicht registriert",
  "settings.swStatus.unsupported": "Nicht unterstützt",
  "settings.connection": "Verbindung",
  "settings.online": "Online",
  "settings.offline": "Offline",
  "settings.installStatus": "App-Installation",
  "settings.installed": "Installiert",
  "settings.notInstalled": "Browser-Tab",
  "settings.buildDate": "Installierte Version",
  "settings.lastChecked": "Zuletzt geprüft",
  "settings.checkUpdate": "Nach Updates suchen",
  "settings.checking": "Suche…",
  "settings.updateAvailable": "Eine neue Version ist verfügbar.",
  "settings.updateNow": "Jetzt aktualisieren",
  "settings.upToDate": "Du nutzt die neueste Version.",
  "settings.updateHint":
    "Die App aktualisiert sich automatisch im Hintergrund; hier kannst du manuell prüfen.",
  "settings.clearHeading": "Cache & gespeicherte Daten löschen",
  "settings.clearHint":
    "Entfernt den Offline-Cache und alle auf diesem Gerät gespeicherten Daten: Schiffsprofile, Einstellungen und Sprachauswahl. Das lässt sich nicht rückgängig machen.",
  "settings.clearButton": "Cache und Daten löschen",
  "settings.clearConfirmTitle": "Wirklich alle Daten löschen?",
  "settings.clearConfirmBody":
    "Alle Schiffsprofile, Einstellungen und der Offline-Cache werden dauerhaft von diesem Gerät gelöscht. Die App startet mit den Werkseinstellungen neu. Diese Aktion kann nicht rückgängig gemacht werden.",
  "settings.clearCancel": "Abbrechen",
  "settings.clearConfirm": "Ja, alles löschen",
  "settings.clearing": "Wird gelöscht…",

  "settings.supportHeading": "Diese App unterstützen",
  "settings.supportBody":
    "Wenn dir die App gefällt, freue ich mich über eine kleine Spende. Sie hilft, Hosting- und Entwicklungskosten zu decken.",
  "settings.supportLink": "Buy me a coffee",

  "settings.sourceHeading": "Quellcode",
  "settings.sourceBody":
    "Diese App wird unter der AGPL-3.0-or-later veröffentlicht. Jeder, der die App öffentlich hostet, muss Nutzern den Quellcode der jeweils eingesetzten Version zugänglich machen.",
  "settings.sourceLink": "Quellcode auf GitHub",

  "settings.privacyHeading": "Datenschutz & Recht",
  "settings.privacyHint":
    "Alle Einstellungen und Schiffsprofile werden ausschließlich auf diesem Gerät gespeichert. Kein Konto, kein Tracking, keine Analyse.",
  "settings.privacyLink": "DSGVO-Informationen & Impressum",

  "vessels.title": "Schiffe",
  "vessels.add": "Schiff hinzufügen",
  "vessels.empty":
    "Noch keine Schiffe. Lege dein Boot an, damit jeder Funkspruch automatisch ausgefüllt wird.",
  "vessels.active": "Aktiv",
  "vessels.setActive": "Als aktiv setzen",
  "vessels.edit": "Schiff bearbeiten",
  "vessels.delete": "Schiff löschen",
  "vessels.deleteConfirmTitle": "Schiff löschen?",
  "vessels.deleteConfirmBody": "{name} und alle Details werden dauerhaft von diesem Gerät entfernt.",
  "vessels.deleteConfirm": "Löschen",
  "vessels.deleteCancel": "Abbrechen",
  "vessels.deleted": "{name} gelöscht",
  "vessels.saved": "{name} gespeichert",
  "vessels.editTitle": "Schiff bearbeiten",
  "vessels.addTitle": "Schiff hinzufügen",
  "vessels.name": "Schiffsname",
  "vessels.mmsi": "MMSI (9 Ziffern)",
  "vessels.callSign": "Rufzeichen",
  "vessels.type": "Schiffstyp",
  "vessels.typePlaceholder": "Sailing yacht",
  "vessels.length": "Länge",
  "vessels.lengthPlaceholder": "11 metre",
  "vessels.hull": "Rumpffarbe",
  "vessels.hullPlaceholder": "white",
  "vessels.defaultPob": "Standard-Personen an Bord",
  "vessels.defaultChannel": "Standard-UKW-Kanal",
  "vessels.save": "Schiff speichern",
  "vessels.cancel": "Abbrechen",
  "vessels.englishNotice": "Bitte Schiffstyp, Länge und Rumpffarbe auf Englisch eingeben — sie werden unverändert in den englischen Funkspruch übernommen.",
  "vessels.errName": "Schiffsname ist erforderlich",
  "vessels.errMmsi": "Die MMSI muss genau 9 Ziffern haben",
  "vessels.errMmsiShort": "MMSI ist zu kurz — noch {count} Ziffer(n) nötig (insgesamt 9)",
  "vessels.errCallSign": "Rufzeichen ist erforderlich",

  "privacy.title": "Datenschutz & Impressum",
  "privacy.subtitle": "Datenschutz & Impressum — zuletzt aktualisiert am 29. August 2026",
  "privacy.h.summary": "Kurz gesagt: Ist diese App DSGVO-konform?",
  "privacy.p.summary1":
    "Die App ist datensparsam aufgebaut: Sie funktioniert ohne Konto, ohne Tracking, ohne Werbung und ohne Analyse. Alles, was du eingibst — Schiffsprofile, MMSI, Rufzeichen, Personen an Bord, Einstellungen — wird ausschließlich im lokalen Speicher deines Browsers abgelegt. Es wird nie auf einen Server hochgeladen und nie weitergegeben.",
  "privacy.p.summary2":
    "Da für diese Funktionen keine personenbezogenen Daten von uns übertragen oder gespeichert werden, gibt es keine Verarbeitung, die eine gesonderte Rechtsgrundlage erfordern würde, und auf unserer Seite auch keine Daten zum Export oder zur Löschung. Du behältst die volle Kontrolle auf deinem eigenen Gerät.",
  "privacy.h.gps": "GPS-Position",
  "privacy.p.gps":
    "Deine Position wird erst nach deiner Freigabe im Browser vom Gerät ausgelesen. Sie dient ausschließlich dazu, die Positionszeile des Funkspruchs zu füllen, und wird nur im Arbeitsspeicher gehalten, solange die App geöffnet ist. Sie wird nicht gespeichert, nicht protokolliert und nicht übertragen. Du kannst die Freigabe jederzeit in den Browser- oder Systemeinstellungen widerrufen.",
  "privacy.h.tts": "Sprachausgabe (Vorlesen-Taste)",
  "privacy.p.tts1":
    "In den Einstellungen kannst du die KI-Stimme für die Vorlesen-Taste ein- oder ausschalten. Dieser Schalter bestimmt, ob überhaupt Text dein Gerät verlässt.",
  "privacy.s.ttsOn": "KI-Stimme ein (nur nach ausdrücklicher Aktivierung):",
  "privacy.p.ttsOn":
    "Beim Drücken von „Vorlesen“ wird der erzeugte Text des Funkspruchs — er kann Schiffsname, MMSI, Rufzeichen und Position enthalten — von unserem Server an den genutzten Sprachdienst (Lovable AI Gateway, betrieben vom Hosting-Anbieter Lovable Labs) gesendet, um die Audioausgabe zu erzeugen, und danach verworfen — er wird nicht gespeichert und nicht für Training verwendet. Die Verarbeitung kann auf Servern außerhalb der EU erfolgen, abgesichert durch die Standardvertragsklauseln des Anbieters. Ist kein Netz verfügbar, greift die App automatisch auf die eingebaute Stimme deines Geräts zurück.",
  "privacy.s.ttsOff": "KI-Stimme aus (Standard):",
  "privacy.p.ttsOff":
    "Es wird ausschließlich die eingebaute Sprachausgabe deines Geräts verwendet. Es werden weder Text noch Schiffsdaten übertragen; alles bleibt auf deinem Gerät.",
  "privacy.h.install": "App auf dem Handy installieren (PWA)",
  "privacy.p.install1":
    "Diese App kann zum Startbildschirm hinzugefügt werden und öffnet sich dann wie eine normale App im Vollbild, ohne Browserleiste. Auf iPhone/iPad in Safari öffnen, auf das Teilen-Symbol tippen und \"Zum Home-Bildschirm\" wählen. Auf Android in Chrome öffnen und im Menü \"App installieren\" bzw. \"Zum Startbildschirm hinzufügen\" wählen.",
  "privacy.p.install2":
    "Nach der Installation werden die App-Dateien (Code, Symbole, Styles) im Browser-Cache deines Geräts gespeichert, sodass die App auch ohne Netzverbindung startet — praktisch auf See. Dieser Cache bleibt auf deinem Gerät, enthält keine personenbezogenen Daten und wird nie hochgeladen. Löschst du das App-Symbol oder die Websitedaten im Browser, wird er zusammen mit deinen Schiffsprofilen und Einstellungen entfernt.",
  "privacy.p.install3":
    "Die App aktualisiert sich im Hintergrund, sobald eine Verbindung besteht; in den Einstellungen siehst du die installierte Version und kannst manuell nach Updates suchen. GPS-Position, aktuelle UTC-Zeit und die eingebaute Gerätestimme funktionieren offline, die KI-Stimme für „Vorlesen“ benötigt eine Verbindung.",

  "privacy.h.cookies": "Cookies, Tracking und Hosting",
  "privacy.p.cookies":
    "Es werden keine Cookies zu Tracking-Zwecken gesetzt, keine Analyse- oder Werbewerkzeuge eingesetzt und keine Nutzerprofile erstellt. Die App wird auf der Infrastruktur von Lovable Labs Incorporated gehostet; beim Laden verarbeitet der Hosting-Anbieter technische Verbindungsdaten (etwa die IP-Adresse) in Server-Logs, wie es zur Auslieferung jeder Website technisch erforderlich ist (Art. 6 Abs. 1 lit. f DSGVO). Dabei kann eine Verarbeitung auf Servern außerhalb der EU stattfinden; die Übermittlung ist durch Standardvertragsklauseln abgesichert.",
  "privacy.h.noExternal": "Keine Inhalte von Dritten",
  "privacy.p.noExternal":
    "Die App lädt keine Schriftarten, Symbole, Skripte, Karten oder sonstigen Inhalte von fremden Servern nach. Texte werden mit den ohnehin auf deinem Gerät vorhandenen Systemschriften dargestellt, alle Symbole und App-Icons sind Teil des App-Pakets, und QR-Codes werden vollständig in deinem Browser erzeugt und gelesen. Allein durch das Öffnen der App wird deine IP-Adresse daher an keinen Dritten (etwa einen Schriftarten- oder CDN-Anbieter) übermittelt.",
  "privacy.h.links": "Externe Links",
  "privacy.p.links":
    "Auf der Einstellungsseite befindet sich ein freiwilliger Spenden-Link zu Buy Me a Coffee (buymeacoffee.com). Von diesem Anbieter werden keine Inhalte geladen, und es werden keine Daten dorthin übertragen, solange du den Link nicht aktiv antippst. Tust du das, verlässt du diese App und es gelten die Datenschutzhinweise und Bedingungen des Anbieters.",
  "privacy.h.rights": "Deine Rechte",
  "privacy.p.rights":
    "Nach der DSGVO hast du das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch sowie das Recht auf Beschwerde bei einer Aufsichtsbehörde. Da deine Daten nur auf deinem Gerät liegen, kannst du die Löschung direkt vornehmen, indem du die Schiffsprofile in der App löschst oder die Daten dieser Website in den Browsereinstellungen entfernst.",
  "privacy.h.imprint": "Impressum (§ 5 DDG)",
  "privacy.imprint.responsible": "Inhaltlich verantwortlich (§ 18 Abs. 2 MStV): Sebastian Esch",
  "privacy.imprint.email": "E-Mail",
  "privacy.imprint.phone": "Telefon",
  "privacy.imprint.country": "Deutschland",
  "privacy.h.source": "Quellcode (AGPL)",
  "privacy.p.source":
    "Diese App steht unter der GNU Affero General Public License v3.0 oder später (AGPL-3.0-or-later). Weil es sich um eine Web-App handelt, gilt die Netzwerk-Klausel der AGPL: Wer diese Software öffentlich hostet, muss den Quellcode der eingesetzten Version den Nutzern zur Verfügung stellen. Der Quellcode ist auf GitHub verfügbar; der Link führt zur Version, auf der diese Installation basiert.",
  "privacy.sourceLink": "Quellcode auf GitHub ansehen",
  "privacy.h.safety": "Sicherheitshinweis",
  "privacy.p.safety1":
    "Diese App ist lediglich ein Hilfsmittel. Sie ersetzt weder eine ordentliche Funkausbildung noch ein gültiges Funkbetriebszeugnis oder offizielle Verfahren. Folge im Notfall immer den Anweisungen der koordinierenden Rettungsleitstelle.",
  "privacy.p.safety2":
    "Für die Nutzung dieser App wird keine Haftung übernommen. Betreiber und Entwickler können nicht für Vorfälle, Schäden oder Folgen verantwortlich gemacht werden, die aus der Nutzung entstehen. Die Nutzung erfolgt vollständig auf eigenes Risiko; für dein Handeln und deine Entscheidungen auf dem Wasser bist du allein verantwortlich.",
  "share.qrTitle": "Schiff teilen",
  "share.qrHint": "Ein Crewmitglied kann diesen Code in der App scannen, um das Schiffsprofil zu übernehmen.",
  "share.qrAlt": "QR-Code mit den Schiffsdaten von {name}",
  "share.copyCode": "Code kopieren",
  "share.copied": "Teilen-Code kopiert",
  "share.privacyNote": "Der Code enthält nur die Daten dieses Schiffs. Es wird nichts hochgeladen — teile ihn nur mit deiner eigenen Crew.",
  "share.share": "Teilen",
  "share.scan": "QR-Code scannen",
  "share.scanTitle": "Schiff importieren",
  "share.scanHint": "Richte die Kamera auf den QR-Code auf dem anderen Gerät.",
  "share.cameraError": "Kamera nicht verfügbar. Bitte Kamerazugriff erlauben oder den Teilen-Code unten einfügen.",
  "share.pasteLabel": "Oder Teilen-Code einfügen",
  "share.pasteAction": "Aus Code importieren",
  "share.invalidCode": "Dieser Code ist kein gültiger Schiffs-Teilen-Code",
  "share.confirmTitle": "Dieses Schiff importieren?",
  "share.imported": "{name} importiert",
  "share.updated": "{name} aktualisiert",
  "share.duplicate": "Ein Schiff mit der MMSI {mmsi} existiert bereits.",
  "share.updateExisting": "Vorhandenes aktualisieren",
  "share.addAsNew": "Als neues hinzufügen",
  "share.import": "Importieren",
  "share.cancel": "Abbrechen",

  "privacy.h.qr": "Schiff per QR-Code teilen",
  "privacy.p.qr":
    "Du kannst ein Schiffsprofil als QR-Code mit deiner Crew teilen. Der Code wird auf deinem Gerät erzeugt und enthält nur die Daten dieses Schiffs (Name, MMSI, Rufzeichen, Typ, Länge, Rumpffarbe, Personen an Bord, Kanal). Es werden keine Daten an einen Server gesendet. Beim Scannen wird die Kamera ausschließlich zum Dekodieren im Browser verwendet; es werden keine Bilder, Videos oder Scan-Ergebnisse gespeichert oder übertragen. Da MMSI und Rufzeichen ein Schiff und seine Eigner identifizieren können, teile den Code nur mit vertrauenswürdigen Personen.",

  "guide.title": "So nutzt du die App",
  "guide.subtitle": "Eine kurze Übersicht aller Funktionen — vom ersten Schiff bis zum fertigen Funkspruch.",
  "guide.h.intro": "Was diese App macht",
  "guide.p.intro1":
    "UKW-Funkruf erzeugt fertige Funksprüche zum Ablesen — Mayday, Pan-Pan, Sécurité und Routine-Anrufe — mit deinen Schiffsdaten, der aktuellen UTC-Zeit und deiner GPS-Position. Alles bleibt auf deinem Gerät: kein Konto, kein Server, keine Internetverbindung nach dem ersten Laden nötig.",
  "guide.p.intro2":
    "Die App ist nur eine Hilfe. Sie ersetzt weder eine ordentliche Funkausbildung noch ein gültiges Funkbetriebszeugnis oder einen DSC-Notalarm. Folge im Notfall immer den Anweisungen der koordinierenden Rettungsleitstelle.",
  "guide.h.gettingStarted": "1. Schiff anlegen",
  "guide.p.started1":
    "Gehe zur Schiffe-Seite und tippe auf „Schiff hinzufügen“. Gib mindestens Schiffsname, MMSI (genau 9 Ziffern) und Rufzeichen ein — diese sind Pflicht. Du kannst auch Schiffstyp, Länge und Rumpffarbe angeben. Bitte gib Typ, Länge und Rumpffarbe auf Englisch ein, da sie unverändert in den englischen Funkspruch übernommen werden.",
  "guide.p.started2":
    "Du kannst mehrere Schiffe speichern (z. B. eigenes Boot und Charteryacht). Tippe auf „Als aktiv setzen“, um auszuwählen, welches Schiff für den nächsten Ruf verwendet wird. Die Daten des aktiven Schiffs werden automatisch in jeden Funkspruch eingesetzt.",
  "guide.h.generate": "2. Funkspruch erzeugen",
  "guide.p.generate1":
    "Wähle auf der Ruf-Seite über die unteren Tabs zwischen den vier Ruftypen: MAYDAY (rot, Seenot), PAN-PAN (orange, Dringlichkeit), SÉCURITÉ (gelb, Sicherheit) und STANDARD (grün, Routine). Die ganze Seite färbt sich in der Farbe des Ruftyps. Alle eingegebenen Daten bleiben beim Wechseln der Tabs erhalten.",
  "guide.p.generate2":
    "Der Kopfbereich zeigt die aktuelle UTC-Zeit und deine GPS-Position. Erlaube den Standortzugriff, wenn du danach gefragt wirst. Die Position aktualisiert sich automatisch, wenn die Automatik eingeschaltet ist; tippe auf „Position aktualisieren“ für eine manuelle Aktualisierung oder auf „Position manuell“, um Koordinaten selbst einzugeben.",
  "guide.p.generate3":
    "Fülle die Felder über dem Funkspruch aus: Art der Situation (aus der Liste oder als Freitext), Personen an Bord, UKW-Kanal und ggf. zusätzliche Angaben. Je nach Ruftyp kannst du auch die gerufene Station oder eine Sicherheitsmeldung eingeben. Der Funkspruch aktualisiert sich sofort beim Tippen.",
  "guide.p.generate4":
    "Auf der Mayday-Seite erinnert eine aufklappbare Sektion „Zuerst DSC-Notalarm senden“ daran, den DSC-Alarm vor dem Sprechen auszulösen. Unter dem Funkspruch bietet die Sektion „Weitere Kommunikation“ Standardtexte für Relay, Funkstille, Rücknahme eines Fehlalarms und Beendigung eines Notrufs.",
  "guide.h.readSpeak": "3. Lesen und vorlesen",
  "guide.p.readSpeak1":
    "Tippe auf „Lesen“, um den Funkspruch im Vollbild mit großer Schrift anzuzeigen — ideal zum Ablesen am Funkgerät. Der Lesemodus beachtet die Safe-Area-Abstände und scrollt auf dem Handy reibungslos.",
  "guide.p.readSpeak2":
    "Tippe auf „Vorlesen“, um den Funkspruch gesprochen zu hören. In den Einstellungen kannst du zwischen einer KI-Funkstimme (benötigt Verbindung) und der eingebauten Gerätestimme (funktioniert offline, es verlässt kein Text dein Gerät) wählen.",
  "guide.p.readSpeak3":
    "„Kopieren“ legt den Funkspruch in die Zwischenablage; „Teilen“ öffnet die Teilen-Funktion des Systems.",
  "guide.h.shareVessel": "4. Schiffe teilen & importieren",
  "guide.p.shareVessel1":
    "Tippe in der Schiffsliste auf das Teilen-Symbol, um einen QR-Code mit den Daten dieses Schiffs anzuzeigen. Ein Crewmitglied kann ihn mit der Kamera scannen, um das Profil zu importieren — oder den Teilen-Code kopieren und einfügen. Wenn ein Schiff mit derselben MMSI bereits existiert, kannst du es aktualisieren oder als neues hinzufügen.",
  "guide.p.shareVessel2":
    "Der Code enthält nur die Daten dieses Schiffs. Es wird nichts hochgeladen — teile ihn nur mit deiner eigenen Crew.",
  "guide.h.settings": "5. Einstellungen",
  "guide.p.settings1":
    "In den Einstellungen kannst du: die Sprache der Oberfläche ändern (Funksprüche bleiben immer auf Englisch), die automatische GPS-Aktualisierung ein- oder ausschalten und das Aktualisierungsintervall einstellen (2–300 Sekunden, Standard 10), den Standard-UKW-Kanal und das Positionsformat (Dezimalgrad oder Grad/Dezimalminuten) wählen und die KI-Stimme ein- oder ausschalten.",
  "guide.p.settings2":
    "Du kannst auch nach App-Updates suchen, die installierte Version anzeigen und alle zwischengespeicherten Daten und Schiffsprofile vom Gerät löschen.",
  "guide.h.pwa": "6. Installation & Offline-Nutzung",
  "guide.p.pwa1": "Diese App ist eine Progressive Web App und lässt sich auf jedem Gerät installieren.",
  "guide.p.pwa.ios": "iPhone/iPad: In Safari öffnen, Teilen-Symbol antippen und „Zum Home-Bildschirm“ wählen.",
  "guide.p.pwa.android": "Android: Browser-Menü öffnen und „App installieren“ oder „Zum Startbildschirm hinzufügen“ wählen.",
  "guide.p.pwa.desktop": "Desktop: Installieren-Symbol in der Adressleiste verwenden.",
  "guide.p.pwa2":
    "Nach der Installation öffnet sich die App im Vollbild wie eine normale App und funktioniert offline — GPS, UTC-Zeit und die eingebaute Gerätestimme funktionieren ohne Verbindung. Die KI-Stimme für „Vorlesen“ benötigt eine Verbindung. Die App aktualisiert sich im Hintergrund; in den Einstellungen kannst du manuell nach Updates suchen.",
  "guide.h.privacy": "7. Datenschutz",
  "guide.p.privacy":
    "Alle Daten bleiben auf deinem Gerät. Kein Konto, kein Tracking, keine Analyse. Die vollständige DSGVO-Information und das Impressum findest du auf der Datenschutz-Seite.",
};

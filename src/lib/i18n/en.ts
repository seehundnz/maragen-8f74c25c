export const en = {
  "app.name": "VHF Call",
  "nav.vessels": "Vessels",
  "nav.settings": "Settings",
  "nav.privacy": "Privacy & Imprint",
  "nav.terms": "Terms",
  "nav.install": "Install",
  "nav.guide": "Guide",
  "nav.nightModeOn": "Turn on red-light mode",
  "nav.nightModeOff": "Turn off red-light mode",

  "install.title": "Install this app",
  "install.intro":
    "Installing adds the app to your home screen so it opens full screen and works offline.",
  "install.button": "Install now",
  "install.close": "Close",
  "install.ios.step1": "Tap the Share button in the browser toolbar.",
  "install.ios.step2": 'Scroll down and choose "Add to Home Screen".',
  "install.ios.step3": 'Tap "Add" in the top right corner.',
  "install.iosOther.note":
    "On iPhone and iPad only Safari can install apps. Open this page in Safari first, then follow the steps below.",
  "install.android.step1": "Open the browser menu (three dots).",
  "install.android.step2": 'Choose "Install app" or "Add to Home screen".',
  "install.android.step3": "Confirm the install.",
  "install.desktop.step1": "Open the browser menu or the install icon in the address bar.",
  "install.desktop.step2": 'Choose "Install" and confirm.',

  "home.title": "What kind of call do you need?",
  "home.subtitle": "Choose a call type — your vessel data, position and time are inserted automatically.",

  "call.mayday.short": "Distress",
  "call.panpan.short": "Urgency",
  "call.securite.short": "Safety",
  "call.standard.short": "Routine",
  "call.mayday.description":
    "Generate a spoken Mayday distress call with your vessel data, live GPS position and UTC time.",
  "call.panpan.description":
    "Generate a spoken Pan-Pan urgency call with vessel details, live position and UTC time.",
  "call.securite.description":
    "Generate a spoken Sécurité safety broadcast to all stations with your live position.",
  "call.standard.description":
    "Generate a routine VHF call to a marina, station or another vessel with a working channel request.",

  "call.utcTime": "UTC time",
  "call.position": "Position",
  "call.manualEntry": "Manual entry",
  "call.waitingGps": "Waiting for GPS…",
  "call.refreshFix": "Refresh fix",
  "call.manualPosition": "Manual position",
  "call.autoUpdateOn": "Auto-update every {seconds}s",
  "call.autoUpdateOff": "Auto-update off",
  "call.latitude": "Latitude (decimal)",
  "call.longitude": "Longitude (decimal)",
  "call.usePosition": "Use position",
  "call.manualPositionSet": "Manual position set",
  "call.invalidCoordinates": "Enter valid decimal coordinates",
  "call.vessel": "Vessel",
  "call.selectVessel": "Select vessel",
  "call.noVessel": "No vessel saved yet.",
  "call.addYourVessel": "Add your vessel",
  "call.stationCalled": "Station called",
  "call.safetyMessage": "Safety message",
  "call.natureOfSituation": "Nature of the situation",
  "call.assistanceRequired": "Assistance required",
  "call.pob": "Persons on board",
  "call.channel": "VHF channel",
  "call.additionalMessage": "Additional message",
  "call.additionalMessagePlaceholder": "Anything else the coast station should know",
  "call.additionalMessagePlaceholder.panpan": "Any further details about the urgency",
  "call.additionalMessagePlaceholder.securite": "Further details about the safety issue",
  "call.additionalMessagePlaceholder.standard": "Your message or request",
  "call.radioScript": "Radio script",
  "call.channel16Notice": "Transmit on VHF channel 16",
  "call.channel16NoticeHint":
    "Mayday, Pan-Pan and Sécurité are spoken on the international distress and calling channel 16.",
  "call.scriptEnglishNote":
    "The radio script is always in English — the international language for VHF communication.",
  "call.copy": "Copy",
  "call.share": "Share",
  "call.read": "Read",
  "call.close": "Close",
  "call.speak": "Speak",
  "call.stop": "Stop",
  "call.copied": "Radio script copied",
  "call.copyFailed": "Could not copy — select the text manually",
  "call.speechUnavailable": "Speech is not available on this device",
  "call.offlineVoice": "Offline — using the device voice",
  "call.disclaimer":
    "This app is an aid only. It does not replace proper radio training, a DSC distress alert, or the skipper's judgement. Always send a DSC alert first where available.",

  "dsc.title": "Send a DSC distress alert first",
  "dsc.intro": "If your radio has DSC (red distress button), send the DSC alert before speaking:",
  "dsc.step1": "If time allows, select the nature of distress in the radio's DSC menu (e.g. sinking, fire, man overboard).",
  "dsc.step2": "Then lift the cover and press and hold the red DISTRESS button for about 5 seconds.",
  "dsc.step3": "Wait for the acknowledgement; the radio switches to channel 16 automatically.",
  "dsc.step4": "Then speak the MAYDAY message below on channel 16.",
  "dsc.note": "Check that your MMSI is programmed into the radio and a GPS position is connected. Without DSC, call MAYDAY directly on channel 16.",

  "comms.title": "Further communication",
  "comms.intro": "Standard radio phrases for further communication, silence requests, false-alarm cancellation and ending a distress call.",
  "comms.h.relay": "Further communication during a distress case",
  "comms.p.relay": "MAYDAY [VESSEL NAME IN DISTRESS], [CALL SIGN VESSEL IN DSITRESS]\nThis is [VESSEL NAME], [CALL SIGN]\n[MESSAGE]\nOVER\n",
  "comms.h.silence": "Asking for silence (only coast radio station or vessel in distress)",
  "comms.p.silence": "All stations\nSilence mayday\n",
  "comms.h.cancel": "Revert a mistakenly issued distress alert (only vessel in distress)",
  "comms.p.cancel":
    "All stations, all stations, all stations\nThis is [VESSEL NAME], [VESSEL NAME], [VESSEL NAME]\nCall sign [CALL SIGN], MMSI [MMSI]\nCancel my false distress alert of [TIME OF DISTRESS CALL] UTC\nOVER\n",
  "comms.h.end": "End a distress call (only coast station or vessel in distress)",
  "comms.p.end":
    "MAYDAY\nAll stations, all stations, all stations\nThis is [COAST STATION NAME / VESSEL NAME IN DISTRESS] at [CURRENT UTC] UTC \n[VESSEL NAME IN DISTRESS], [CALL SIGN VESSEL IN DISTRESS], [MMSI VESSEL IN DISTRESS]\nSILENCE FINI\n",

  "nature.sinking": "Sinking",
  "nature.takingOnWater": "Taking on water",
  "nature.fire": "Fire on board",
  "nature.pob": "Person overboard",
  "nature.grounding": "Grounding",
  "nature.capsized": "Capsized",
  "nature.collision": "Collision",
  "nature.medical": "Medical emergency",
  "nature.engineFailure": "Engine failure",
  "nature.steeringFailure": "Steering failure",
  "nature.dismasted": "Dismasted",
  "nature.adrift": "Adrift",
  "nature.outOfFuel": "Out of fuel",
  "nature.medicalAdvice": "Medical advice required",
  "nature.riggingDamage": "Rigging damage",
  "nature.navHazard": "Navigation hazard sighted",
  "nature.floatingObject": "Floating object adrift",
  "nature.unlitBuoy": "Unlit buoy",
  "nature.restrictedManoeuvrability": "Restricted manoeuvrability",
  "nature.severeWeather": "Severe weather observed",

  "settings.title": "Settings",
  "settings.language": "Language",
  "settings.languageHint": "Interface language. Radio scripts always stay in English.",
  "settings.language.auto": "Automatic (device language)",
  "settings.autoUpdate": "Auto-update position",
  "settings.autoUpdateHint": "Refresh the GPS fix continuously while a call screen is open.",
  "settings.interval": "Refresh interval (seconds)",
  "settings.intervalHint": "Default 10 seconds. Allowed range 2–300 seconds.",
  "settings.intervalError": "Value must be between 2 and 300 seconds.",
  "settings.defaultChannel": "Default VHF channel",
  "settings.positionFormat": "Position format",
  "settings.positionFormat.ddm": "Degrees and decimal minutes (54° 19.85' N)",
  "settings.positionFormat.dd": "Decimal degrees (54.33083°)",
  "settings.nightMode": "Red-light mode (night vision)",
  "settings.nightModeHint":
    "Tints the whole app in dim red on a near-black background so your night vision on board is preserved.",
  "settings.aiVoice": 'Use AI voice for "Speak"',
  "settings.aiVoiceHint":
    "Off by default. Only if you turn this on is the script text sent to our speech service for a clear radio-operator voice. While it stays off, only your device's built-in voice is used and no text ever leaves this device.",
  "settings.appHeading": "App & updates",
  "settings.offlineHint":
    "The app stores itself on your device so it also opens without a network connection.",
  "settings.swStatus": "Service worker",
  "settings.swStatus.active": "Active",
  "settings.swStatus.waiting": "Update waiting",
  "settings.swStatus.installing": "Installing",
  "settings.swStatus.notRegistered": "Not registered",
  "settings.swStatus.unsupported": "Unsupported",
  "settings.connection": "Connection",
  "settings.online": "Online",
  "settings.offline": "Offline",
  "settings.installStatus": "App install",
  "settings.installed": "Installed",
  "settings.notInstalled": "Browser tab",
  "settings.buildDate": "Installed version",
  "settings.lastChecked": "Last checked",
  "settings.checkUpdate": "Check for updates",
  "settings.checking": "Checking…",
  "settings.updateAvailable": "A new version is available.",
  "settings.updateNow": "Update now",
  "settings.upToDate": "You are on the latest version.",
  "settings.updateHint":
    "The app updates itself automatically in the background; you can force a check here.",
  "settings.clearHeading": "Clear cache & stored data",
  "settings.clearHint":
    "Removes the offline cache and all data stored on this device: vessel profiles, settings and language choice. This cannot be undone.",
  "settings.clearButton": "Clear cache and data",
  "settings.clearConfirmTitle": "Clear all data?",
  "settings.clearConfirmBody":
    "All vessel profiles, settings and the offline cache will be permanently deleted from this device. The app will restart with factory defaults. This action cannot be undone.",
  "settings.clearCancel": "Cancel",
  "settings.clearConfirm": "Yes, delete everything",
  "settings.clearing": "Deleting…",

  "settings.supportHeading": "Support this app",
  "settings.supportBody":
    "If you like this app, I would appreciate a small donation. It helps cover hosting and development costs.",
  "settings.supportLink": "Buy me a coffee",

  "settings.sourceHeading": "Source code",
  "settings.sourceBody":
    "This app is released under the AGPL-3.0-or-later licence. Anyone hosting the app publicly must make the source code of the version in use available to users.",
  "settings.sourceLink": "View source on GitHub",

  "settings.privacyHeading": "Privacy & legal",
  "settings.privacyHint":
    "All settings and vessel profiles are stored on this device only. No account, no tracking, no analytics.",
  "settings.privacyLink": "GDPR/DSGVO information & imprint",

  "vessels.title": "Vessels",
  "vessels.add": "Add vessel",
  "vessels.empty": "No vessels yet. Add your boat so every radio call is filled in automatically.",
  "vessels.active": "Active",
  "vessels.setActive": "Set active",
  "vessels.edit": "Edit vessel",
  "vessels.delete": "Delete vessel",
  "vessels.deleteConfirmTitle": "Delete vessel?",
  "vessels.deleteConfirmBody": "{name} and all its details will be permanently removed from this device.",
  "vessels.deleteConfirm": "Delete",
  "vessels.deleteCancel": "Cancel",
  "vessels.deleted": "{name} deleted",
  "vessels.saved": "{name} saved",
  "vessels.editTitle": "Edit vessel",
  "vessels.addTitle": "Add vessel",
  "vessels.name": "Vessel name",
  "vessels.mmsi": "MMSI (9 digits)",
  "vessels.callSign": "Call sign",
  "vessels.type": "Vessel type",
  "vessels.typePlaceholder": "Sailing yacht",
  "vessels.length": "Length",
  "vessels.lengthPlaceholder": "11 metre",
  "vessels.hull": "Hull colour",
  "vessels.hullPlaceholder": "white",
  "vessels.defaultPob": "Default persons on board",
  "vessels.defaultChannel": "Default VHF channel",
  "vessels.save": "Save vessel",
  "vessels.cancel": "Cancel",
  "vessels.englishNotice": "Please enter vessel type, length and hull colour in English — they are inserted into the English radio script as typed.",
  "vessels.errName": "Vessel name is required",
  "vessels.errMmsi": "MMSI must be exactly 9 digits",
  "vessels.errMmsiShort": "MMSI is too short — {count} more digit(s) needed (9 in total)",
  "vessels.errCallSign": "Call sign is required",

  "privacy.title": "Privacy & Imprint",
  "privacy.subtitle": "Datenschutz & Impressum — last updated 29 August 2026",
  "privacy.h.summary": "Short answer: is this app GDPR/DSGVO compliant?",
  "privacy.p.summary1":
    "The app is built to be data-minimal: it works without an account, without tracking, without advertising and without analytics. Everything you enter — vessel profiles, MMSI, call sign, persons on board, settings — is stored only in your device's local browser storage. It is never uploaded to a server and never shared.",
  "privacy.p.summary2":
    "Because no personal data is transmitted or stored by us for these features, there is no processing that would require a separate legal basis, and no data to export or erase on our side. You stay in full control on your own device.",
  "privacy.h.gps": "GPS position",
  "privacy.p.gps":
    "Your position is read from your device only after you grant browser permission. It is used solely to fill in the position line of the radio script and is held in memory while the app is open. It is not stored, logged or transmitted. You can revoke the permission at any time in your browser or system settings.",
  "privacy.h.tts": "Text-to-speech (Speak button)",
  "privacy.p.tts1":
    "In Settings you can switch the AI voice for the Speak button on or off. This switch controls whether any text leaves your device.",
  "privacy.s.ttsOn": "AI voice on (only after you explicitly enable it):",
  "privacy.p.ttsOn":
    "when you press \u201cSpeak\u201d, the generated script text — which can contain vessel name, MMSI, call sign and position — is sent from our server to the speech service we use (Lovable AI Gateway, operated by our hosting provider Lovable Labs) to produce the spoken audio, and is then discarded — it is not stored and not used for training. Processing may take place on servers outside the EU, safeguarded by the provider's standard contractual clauses. If no network is available, the app automatically falls back to your device's built-in voice.",
  "privacy.s.ttsOff": "AI voice off (default):",
  "privacy.p.ttsOff":
    "only your device's built-in speech synthesis is used. No script text and no vessel data are transmitted; everything stays on your device.",
  "privacy.h.install": "Installing the app on your phone (PWA)",
  "privacy.p.install1":
    "This app can be added to your home screen so it opens like a normal app, full screen and without a browser bar. On iPhone/iPad open it in Safari, tap the share icon and choose \"Add to Home Screen\". On Android open it in Chrome and choose \"Install app\" or \"Add to Home screen\" from the menu.",
  "privacy.p.install2":
    "When installed, the app files (code, icons, styles) are stored in your device's browser cache so it also starts without a network connection — useful offshore. This cache stays on your device, contains no personal data and is never uploaded. Deleting the app icon or clearing the site data in your browser removes it, together with your vessel profiles and settings.",
  "privacy.p.install3":
    "The app updates itself in the background whenever it has a connection; in Settings you can see the installed version and check for updates manually. Note that GPS position, current UTC time and the built-in device voice all work offline, while the AI voice for the Speak button needs a connection.",

  "privacy.h.cookies": "Cookies, tracking and hosting",
  "privacy.p.cookies":
    "No cookies are set for tracking, no analytics or advertising tools are used, and no user profiles are created. The app is hosted on the infrastructure of Lovable Labs Incorporated; when the app is loaded, the hosting provider processes technical connection data (such as the IP address) in server logs, as is technically necessary to deliver any website (Art. 6 (1)(f) GDPR). This may involve servers outside the EU; the transfer is safeguarded by standard contractual clauses.",
  "privacy.h.noExternal": "No third-party content",
  "privacy.p.noExternal":
    "The app loads no fonts, icons, scripts, maps or other content from third-party servers. Text is rendered with the fonts already on your device, all symbols and app icons are part of the app package, and the QR code is generated and scanned entirely in your browser. Your IP address is therefore not passed to any third party (for example a font or CDN provider) simply by opening the app.",
  "privacy.h.links": "External links",
  "privacy.p.links":
    "The Settings page contains a voluntary donation link to Buy Me a Coffee (buymeacoffee.com). Nothing is loaded from that provider and no data is sent there unless you actively tap the link. Once you do, you leave this app and the privacy policy and terms of that provider apply.",
  "privacy.h.rights": "Your rights",
  "privacy.p.rights":
    "Under the GDPR you have the right to information, rectification, erasure, restriction, data portability and objection, and the right to lodge a complaint with a supervisory authority. As your data lives only on your device, you can exercise erasure directly by deleting the vessel profiles in the app or clearing this site's data in your browser settings.",
  "privacy.h.imprint": "Imprint / Impressum (§ 5 DDG)",
  "privacy.imprint.responsible": "Responsible for content (§ 18 (2) MStV): Sebastian Esch",
  "privacy.imprint.email": "Email",
  "privacy.imprint.phone": "Phone",
  "privacy.imprint.country": "Germany",
  "privacy.h.source": "Source code (AGPL)",
  "privacy.p.source":
    "This app is licensed under the GNU Affero General Public License v3.0 or later (AGPL-3.0-or-later). Because this is a web app, the AGPL network clause applies: anyone who hosts the software publicly must provide users with the source code of the version being run. The source is available on GitHub; the link points to the version this installation is based on.",
  "privacy.sourceLink": "View source on GitHub",
  "terms.h.safety": "Safety notice",
  "terms.p.safety1":
    "This app is a support tool only. It does not replace proper radio training, a valid radio operator certificate, or official procedures. In an emergency, always follow the instructions of the coordinating rescue authority.",
  "terms.p.safety2":
    "No liability is assumed for the use of this app. The operator and developers cannot be held responsible for any incidents, damages or consequences resulting from its use. You use the app entirely at your own risk and are solely responsible for your actions and decisions on the water.",
  "share.qrTitle": "Share vessel",
  "share.qrHint": "Let a crew member scan this code in the app to import this vessel profile.",
  "share.qrAlt": "QR code with the vessel data of {name}",
  "share.copyCode": "Copy code",
  "share.copied": "Share code copied",
  "share.privacyNote": "The code contains only this vessel's data. Nothing is uploaded — share it only with your own crew.",
  "share.share": "Share",
  "share.scan": "Scan QR code",
  "share.scanTitle": "Import vessel",
  "share.scanHint": "Point the camera at the QR code shown on the other device.",
  "share.cameraError": "Camera not available. Please allow camera access or paste the share code below.",
  "share.pasteLabel": "Or paste the share code",
  "share.pasteAction": "Import from code",
  "share.invalidCode": "This code is not a valid vessel share code",
  "share.confirmTitle": "Import this vessel?",
  "share.imported": "{name} imported",
  "share.updated": "{name} updated",
  "share.duplicate": "A vessel with MMSI {mmsi} already exists.",
  "share.updateExisting": "Update existing",
  "share.addAsNew": "Add as new",
  "share.import": "Import",
  "share.cancel": "Cancel",

  "privacy.h.qr": "Sharing a vessel by QR code",
  "privacy.p.qr":
    "You can share a vessel profile with your crew as a QR code. The code is generated on your device and contains only that vessel's data (name, MMSI, call sign, type, length, hull colour, persons on board, channel). Nothing is sent to a server. Scanning uses your device camera solely to decode the code in the browser; no image, video or scan result is stored or transmitted. Because MMSI and call sign can identify a vessel and its owner, only share the code with people you trust.",

  "guide.title": "How to use this app",
  "guide.subtitle": "A quick walkthrough of every feature — from your first vessel to a ready-to-read radio call.",
  "guide.h.intro": "What this app does",
  "guide.p.intro1":
    "VHF Call Builder generates ready-to-read VHF radio call scripts — Mayday, Pan-Pan, Sécurité and routine calls — using your vessel data, the current UTC time and your GPS position. Everything stays on your device: no account, no server, no internet needed after the first load.",
  "guide.p.intro2":
    "The app is an aid only. It does not replace proper radio training, a valid radio operator certificate, or a DSC distress alert. Always follow the instructions of the coordinating rescue authority.",
  "guide.h.gettingStarted": "1. Add your vessel",
  "guide.p.started1":
    "Go to the Vessels page and tap “Add vessel”. Enter at least the vessel name, MMSI (exactly 9 digits) and call sign — these are required. You can also add the vessel type, length and hull colour. Please enter type, length and hull colour in English, because they are inserted into the English radio script as typed.",
  "guide.p.started2":
    "You can save several vessels (e.g. your own boat and a chartered one). Tap “Set active” to choose which vessel is used for the next call. The active vessel's data fills into every script automatically.",
  "guide.h.generate": "2. Generate a radio call",
  "guide.p.generate1":
    "On the call screen, switch between the four call types using the bottom tabs: MAYDAY (red, distress), PAN-PAN (orange, urgency), SÉCURITÉ (yellow, safety) and STANDARD (green, routine). The whole screen re-themes to the call type's colour. All entered data carries over when you switch tabs.",
  "guide.p.generate2":
    "The header shows the current UTC time and your GPS position. Grant location permission when asked. The position updates automatically if auto-update is on; tap “Refresh fix” for a manual update, or “Manual position” to type coordinates yourself.",
  "guide.p.generate3":
    "Fill in the fields above the script: nature of the situation (from the preset list or free text), persons on board, VHF channel and any additional message. Depending on the call type you may also enter the station called or a safety message. The script updates instantly as you type.",
  "guide.p.generate4":
    "On the Mayday page, a collapsible “Send a DSC distress alert first” section reminds you to trigger the DSC alert before speaking. Below the script, a “Further communication” section offers standard phrases for relays, silence, cancelling a false alarm and ending a distress call.",
  "guide.h.readSpeak": "3. Read and speak",
  "guide.p.readSpeak1":
    "Tap “Read” to open the script full-screen in large type, ideal for reading aloud on the radio. The read mode respects safe-area padding and scrolls smoothly on mobile.",
  "guide.p.readSpeak2":
    "Tap “Speak” to hear the script read aloud. In Settings you can choose between an AI radio-operator voice (needs a connection) and your device's built-in voice (works offline, nothing leaves your device).",
  "guide.p.readSpeak3":
    "“Copy” puts the script on the clipboard; “Share” opens the system share sheet.",
  "guide.h.shareVessel": "4. Share & import vessels",
  "guide.p.shareVessel1":
    "In the vessel list, tap the share icon to show a QR code with that vessel's data. A crew member can scan it with their camera to import the profile — or copy and paste the share code. If a vessel with the same MMSI already exists, you choose whether to update it or add it as new.",
  "guide.p.shareVessel2":
    "The code contains only that vessel's data. Nothing is uploaded — share it only with your own crew.",
  "guide.h.settings": "5. Settings",
  "guide.p.settings1":
    "In Settings you can: change the interface language (scripts always stay in English), toggle auto-update of the GPS position and set the refresh interval (2–300 seconds, default 10), choose the default VHF channel and the position format (decimal degrees or degrees/decimal minutes), and switch the AI voice on or off.",
  "guide.p.settings2":
    "You can also check for app updates, see the installed version, and clear all cached data and vessel profiles from the device.",
  "guide.h.pwa": "6. Install & offline use",
  "guide.p.pwa1": "This app is a Progressive Web App and can be installed on any device.",
  "guide.p.pwa.ios": "iPhone/iPad: Open in Safari, tap the share icon and choose “Add to Home Screen”.",
  "guide.p.pwa.android": "Android: Open the browser menu and choose “Install app” or “Add to Home screen”.",
  "guide.p.pwa.desktop": "Desktop: Use the install icon in the address bar.",
  "guide.p.pwa2":
    "Once installed, the app opens full screen like a normal app and works offline — GPS, UTC time and the built-in voice all function without a connection. The AI voice for “Speak” needs a connection. The app updates itself in the background; you can force a check in Settings.",
  "guide.h.privacy": "7. Privacy",
  "guide.p.privacy":
    "All data stays on your device. No account, no tracking, no analytics. Read the full GDPR/DSGVO notice and imprint on the Privacy page.",
  "terms.title": "Terms of Use",
  "terms.subtitle": "The rules for using this app.",
  "terms.h.scope": "Scope & purpose",
  "terms.p.scope": "This app helps you compose VHF radio calls (Mayday, Pan-Pan, Sécurité and routine calls) from your vessel data, position and time. It is a support tool for private, non-commercial use.",
  "terms.h.liability": "No liability",
  "terms.p.liability": "The app is provided “as is” without any warranty. It does not replace a DSC distress alert, proper radio training or the skipper's judgement. Always send a DSC alert first where available. No liability is assumed for incidents, damages or consequences arising from the use or unavailability of this app; you use it entirely at your own risk.",
  "terms.h.availability": "Availability & accuracy",
  "terms.p.availability": "No guarantee is given for uninterrupted availability, offline functionality, GPS accuracy or the correctness of the generated scripts and speech output.",
  "terms.h.changes": "Changes to these terms",
  "terms.p.changes": "These terms may be updated with future versions of the app. The version shown in the app always applies.",
  "privacy.p.termsLink": "The safety notice and terms of use have moved to the Terms page.",
} as const;

export type TranslationKey = keyof typeof en;
export type Dictionary = Record<TranslationKey, string>;

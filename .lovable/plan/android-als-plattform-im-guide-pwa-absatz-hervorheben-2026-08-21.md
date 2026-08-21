# Android als Plattform im Guide-PWA-Absatz hervorheben

## Problem
Im PWA-Abschnitt der Anleitungsseite (`/guide`, Sektion 6) werden iPhone/iPad, Android und Desktop in einem einzigen Fließsatz genannt. Android geht dabei als eigenständige Plattform unter.

## Änderung
Die Installationshinweise werden als nummerierte/aufgezählte Plattform-Liste dargestellt, sodass jede Plattform (iPhone/iPad, Android, Desktop) klar als eigene Zeile erscheint.

### 1. i18n — neue Keys in `en.ts` und `de.ts`
- Neue Keys `guide.p.pwa.ios`, `guide.p.pwa.android`, `guide.p.pwa.desktop` mit den jeweiligen Installationsanweisungen.
- Den bestehenden `guide.p.pwa1`-Einleitungssatz beibehalten ("Diese App ist eine Progressive Web App…").
- `guide.p.pwa2` unverändert lassen.

**Deutsch:**
- `guide.p.pwa.ios`: "iPhone/iPad: In Safari öffnen, Teilen-Symbol antippen und „Zum Home-Bildschirm" wählen."
- `guide.p.pwa.android`: "Android: Browser-Menü öffnen und „App installieren" oder „Zum Startbildschirm hinzufügen" wählen."
- `guide.p.pwa.desktop`: "Desktop: Installieren-Symbol in der Adressleiste verwenden."

**Englisch (analog).**

### 2. `src/routes/guide.tsx` — PWA-Sektion als Liste rendern
- Einleitung `<p>{t("guide.p.pwa1")}</p>` behalten (nur der Einleitungssatz, ohne die plattformspezifischen Sätze).
- Darunter eine `<ul>` mit drei `<li>`-Einträgen für ios/android/desktop.
- `guide.p.pwa2` unverändert darunter.

## Technische Umsetzung
- Nur Textänderung in i18n + kleine Render-Anpassung in `guide.tsx`.
- Keine neue Logik, keine Abhängigkeiten.

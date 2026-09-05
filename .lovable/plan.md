# SEO-Optimierung der App

Der Schnell-Check zeigt: Titel, Beschreibungen, Favicon, Social-Preview, Viewport und Crawler-Regeln sind bereits in Ordnung. Es fehlen vor allem eine Sitemap, eindeutige Seiten-URLs (Canonical) und strukturierte Daten.

## Was gemacht wird

1. **Sitemap unter `/sitemap.xml`**
   - Alle öffentlichen Seiten: Start, Guide, Terms, Privacy sowie die vier Anruf-Seiten (`/call/mayday`, `/call/panpan`, `/call/securite`, `/call/standard`).
   - Nicht enthalten: persönliche Seiten (Schiffe, Einstellungen) und API-Routen.
   - Basis-URL: https://app.maragen.de
   - Hinweis auf die Sitemap in `public/robots.txt`.

2. **Eindeutige Seiten-URL je Seite (Canonical + og:url)**
   - Für jede öffentliche Seite die eigene Adresse hinterlegen, damit Suchmaschinen keine Duplikate vermuten.

3. **Persönliche Seiten aus der Suche nehmen**
   - Schiffs- und Einstellungsseiten bekommen ein „nicht indexieren“-Signal; sie enthalten nur Nutzerdaten und bringen keinen Suchwert.

4. **Bessere Beschreibungen für die vier Anruf-Seiten**
   - Eigener Titel und eigene Beschreibung je Anruf-Art (Mayday, Pan-Pan, Sécurité, Standard) statt einer gemeinsamen Formulierung, jeweils mit den Begriffen, nach denen Segler suchen.

5. **Strukturierte Daten**
   - Auf der Startseite Angaben zur App (Name, Zweck, kostenlos, Web-App), auf der Guide-Seite eine Artikel-Auszeichnung — hilft für erweiterte Suchergebnisse.

6. **Sprachsignal**
   - Die Seite meldet aktuell immer „Englisch“, auch wenn die Oberfläche auf Deutsch steht. Das wird an die gewählte Sprache angepasst.

## Technische Details

- Sitemap über `src/lib/sitemap.ts` (Router-Helfer) plus Server-Route `src/routes/sitemap[.]xml.ts`; jede Route erhält eine `staticData.sitemap`-Entscheidung. Kein `<lastmod>`, da keine belastbaren Änderungszeitpunkte vorliegen.
- Canonical nur in den Blatt-Routen (`links`), `og:url` per `meta`; `__root.tsx` bleibt ohne Canonical.
- `noindex` per `meta` in `settings.tsx`, `vessels.index.tsx`, `vessels.$id.tsx`.
- JSON-LD über `head().scripts` (`SoftwareApplication` auf `/`, `Article` auf `/guide`).
- `lang`-Attribut im SSR-Shell aus dem Sprachspeicher statt fest `"en"`.
- Kein `og:image` gesetzt: es existiert kein passendes Bild mit absoluter URL in Share-Größe.
- Prüfen mit Typecheck und Abruf von `/sitemap.xml`.

Änderungen an Titeln/Beschreibungen sind erst nach dem nächsten Veröffentlichen auf der Live-Adresse sichtbar.

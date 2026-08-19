Add a "Support me" section to the Settings page that links to the Buy Me a Coffee page at https://buymecoffee.com/maragen.

1. Add a new card section at the bottom of `src/routes/settings.tsx` with a short heading, explanation text, and an external link styled consistently with the rest of the page (e.g., same style as the privacy link). The link should open in a new tab with `rel="noopener noreferrer"` and use `target="_blank"`.

2. Add translation keys to `src/lib/i18n/en.ts` and `src/lib/i18n/de.ts`:
   - `settings.supportHeading`: "Support this app"
   - `settings.supportBody`: "If you like this app, I would appreciate a small donation. It helps cover hosting and development costs."
   - `settings.supportLink`: "Buy me a coffee"

3. German translations:
   - `settings.supportHeading`: "Diese App unterstützen"
   - `settings.supportBody`: "Wenn dir die App gefällt, freue ich mich über eine kleine Spende. Sie hilft, Hosting- und Entwicklungskosten zu decken."
   - `settings.supportLink`: "Buy me a coffee"

4. Use an external `<a>` element (not `<Link>`) because the URL is outside the app.

No other functionality changes.
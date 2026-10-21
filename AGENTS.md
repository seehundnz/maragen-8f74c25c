<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep `rolldown` pinned via `resolutions`/`overrides` in package.json (currently 1.2.0); newer versions emitted a server bundle that crashed in production (`__exportAll is not a function`). Verify with a production build before unpinning.
- Radio wording is always English and lives in code (`src/lib/templates.ts`, `src/lib/comms.ts`), never in the i18n dictionaries; only UI labels/headings are translated, so a wording fix is a single edit.
- The call page (`src/routes/call.$type.tsx`) only wires state; its sections live in `src/components/call/`. Keep components at module level (not defined inside render), because the UTC clock re-renders the page every second.
- Pure logic (script building, position parsing/formatting) is covered by Vitest tests next to the source (`*.test.ts`); run with `bun run test` (uses `vitest.config.ts`, separate from the app's Vite config).

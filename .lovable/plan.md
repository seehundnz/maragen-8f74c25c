# Share vessel data via QR code

Let crew members copy a vessel profile from one phone to another by scanning a QR code — fully offline, no server, no account.

## How it works for the user

Share (owner's phone)
- On a vessel's detail page: a new "Share vessel" button opens a dialog with a QR code plus the vessel name.
- The QR encodes the vessel data itself (not a link), so scanning works without internet.
- Fallback: a "Copy share link/code" button for sending via messenger.

Import (crew phone)
- New "Scan QR code" button on the vessels list page opens the camera and scans.
- After a successful scan, a confirmation card shows the vessel details before saving ("Import Sea Breeze, MMSI 211123456?").
- Duplicate handling: if the same MMSI already exists, the user chooses "Update existing" or "Add as new".
- Fallback for devices without camera permission: paste the copied code into a text field.

Only vessel fields are shared (name, MMSI, call sign, type, length, hull colour, POB, channel). App settings, language and position stay untouched.

## Privacy / GDPR

- Data stays on the two devices; nothing is uploaded. Camera stream is used only in-page for decoding and never stored or transmitted.
- Add a short paragraph to the privacy page (EN + DE) covering QR sharing and camera use, plus the note that a QR code containing MMSI/call sign is personal-ish data and should only be shared with own crew.

## Technical notes

- Dependencies: `qrcode` (generation, render to canvas/SVG) and a browser QR reader — `@zxing/browser` (works on iOS Safari/PWA via `getUserMedia`).
- Payload: JSON `{ v: 1, t: "vessel", d: {…vessel without id} }`, compact-encoded (base64url) to keep the QR small; new `id` generated on import via `createVesselId()`.
- Zod schema validates the decoded payload; unknown version or bad data → friendly error toast, nothing imported.
- New files: `src/lib/vesselShare.ts` (encode/decode + schema), `src/components/VesselQrDialog.tsx`, `src/components/VesselScanDialog.tsx`.
- Edits: `src/routes/vessels.$id.tsx` (share button), `src/routes/vessels.index.tsx` (scan/import button), `src/routes/privacy.tsx`, i18n keys in `src/lib/i18n/en.ts` and `de.ts`.
- Camera code is loaded lazily (client-only, dynamic import) so SSR/prerender is unaffected.
- Vessel scripts remain English-only; no changes to templates or call pages.

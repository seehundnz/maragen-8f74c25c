import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

const title = "Privacy & Imprint — VHF Call Builder";
const description =
  "How VHF Call Builder handles your data under GDPR/DSGVO: local-only storage, GPS use, text-to-speech, plus the legal imprint.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPage,
});

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2 rounded-xl border border-border bg-card p-4">
      <h2 className="text-base font-semibold">{heading}</h2>
      <div className="space-y-2 text-sm text-muted-foreground">{children}</div>
    </section>
  );
}

function PrivacyPage() {
  return (
    <AppShell>
      <h1 className="mb-1 text-2xl font-bold">Privacy &amp; Imprint</h1>
      <p className="mb-4 text-sm text-muted-foreground">
        Datenschutz &amp; Impressum — last updated 19 August 2026
      </p>

      <div className="space-y-4">
        <Section heading="Short answer: is this app GDPR/DSGVO compliant?">
          <p>
            The app is built to be data-minimal: it works without an account, without tracking,
            without advertising and without analytics. Everything you enter — vessel profiles,
            MMSI, call sign, persons on board, settings — is stored only in your device&apos;s
            local browser storage. It is never uploaded to a server and never shared.
          </p>
          <p>
            Because no personal data is transmitted or stored by us for these features, there is no
            processing that would require a separate legal basis, and no data to export or erase on
            our side. You stay in full control on your own device.
          </p>
        </Section>

        <Section heading="GPS position">
          <p>
            Your position is read from your device only after you grant browser permission. It is
            used solely to fill in the position line of the radio script and is held in memory
            while the app is open. It is not stored, logged or transmitted. You can revoke the
            permission at any time in your browser or system settings.
          </p>
        </Section>

        <Section heading="Text-to-speech (Speak button)">
          <p>
            If you press &quot;Speak&quot;, the generated script text is sent to our speech service
            to produce the spoken audio, and is then discarded — it is not stored or used for
            training. If no network is available, the app falls back to your device&apos;s built-in
            voice, and nothing leaves your device.
          </p>
          <p>
            If you prefer that no script text ever leaves the device, simply do not use the Speak
            button; every other function works fully offline.
          </p>
        </Section>

        <Section heading="Cookies, tracking and hosting">
          <p>
            No cookies are set for tracking, no analytics or advertising tools are used, and no
            user profiles are created. When the app is loaded, the hosting provider processes
            technical connection data (such as the IP address) in server logs, as is technically
            necessary to deliver any website (Art. 6 (1)(f) GDPR).
          </p>
        </Section>

        <Section heading="Your rights">
          <p>
            Under the GDPR you have the right to information, rectification, erasure, restriction,
            data portability and objection, and the right to lodge a complaint with a supervisory
            authority. As your data lives only on your device, you can exercise erasure directly by
            deleting the vessel profiles in the app or clearing this site&apos;s data in your
            browser settings.
          </p>
        </Section>

        <Section heading="Imprint / Impressum (§ 5 DDG)">
          <p>
            Please replace the placeholders below with your own details before publishing — legally
            required for a publicly available service in Germany/EU.
          </p>
          <address className="not-italic leading-relaxed text-foreground">
            [Name / Company]
            <br />
            [Street and number]
            <br />
            [Postal code and city]
            <br />
            [Country]
            <br />
            <br />
            Email: [email address]
            <br />
            Phone: [phone number]
            <br />
            Responsible for content (§ 18 (2) MStV): [Name]
            <br />
            VAT ID (if applicable): [DE…]
          </address>
        </Section>

        <Section heading="Safety notice">
          <p>
            This app is a support tool only. It does not replace proper radio training, a valid
            radio operator certificate, or official procedures. In an emergency, always follow the
            instructions of the coordinating rescue authority.
          </p>
        </Section>
      </div>
    </AppShell>
  );
}

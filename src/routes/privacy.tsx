import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useT } from "@/lib/i18n";

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
  const { t } = useT();
  return (
    <AppShell>
      <h1 className="mb-1 text-2xl font-bold">{t("privacy.title")}</h1>
      <p className="mb-4 text-sm text-muted-foreground">{t("privacy.subtitle")}</p>

      <div className="space-y-4">
        <Section heading={t("privacy.h.summary")}>
          <p>{t("privacy.p.summary1")}</p>
          <p>{t("privacy.p.summary2")}</p>
          <p>{t("privacy.p.gate")}</p>
        </Section>

        <Section heading={t("privacy.h.gps")}>
          <p>{t("privacy.p.gps")}</p>
        </Section>

        <Section heading={t("privacy.h.tts")}>
          <p>{t("privacy.p.tts1")}</p>
          <p>
            <strong className="text-foreground">{t("privacy.s.ttsOn")}</strong>{" "}
            {t("privacy.p.ttsOn")}
          </p>
          <p>
            <strong className="text-foreground">{t("privacy.s.ttsOff")}</strong>{" "}
            {t("privacy.p.ttsOff")}
          </p>
        </Section>

        <Section heading={t("privacy.h.qr")}>
          <p>{t("privacy.p.qr")}</p>
        </Section>

        <Section heading={t("privacy.h.install")}>
          <p>{t("privacy.p.install1")}</p>
          <p>{t("privacy.p.install2")}</p>
          <p>{t("privacy.p.install3")}</p>
        </Section>

        <Section heading={t("privacy.h.cookies")}>
          <p>{t("privacy.p.cookies")}</p>
        </Section>

        <Section heading={t("privacy.h.noExternal")}>
          <p>{t("privacy.p.noExternal")}</p>
        </Section>

        <Section heading={t("privacy.h.links")}>
          <p>{t("privacy.p.links")}</p>
        </Section>

        <Section heading={t("privacy.h.rights")}>
          <p>{t("privacy.p.rights")}</p>
        </Section>

        <Section heading={t("privacy.h.source")}>
          <p>{t("privacy.p.source")}</p>
          <a
            href="https://github.com/seehundnz/maragen-8f74c25c.git"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.089 2.91.833.091-.647.349-1.086.635-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.683-.103-.253-.447-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.029 1.592 1.029 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            {t("privacy.sourceLink")}
          </a>
        </Section>

        <Section heading={t("privacy.h.imprint")}>
          <address className="not-italic leading-relaxed text-foreground">
            Sebastian Esch
            <br />
            Rosental 25
            <br />
            41334 Nettetal
            <br />
            {t("privacy.imprint.country")}
            <br />
            <br />
            {t("privacy.imprint.email")}: info@maragen.de
            <br />
            {t("privacy.imprint.phone")}: 02153 9572722
            <br />
            {t("privacy.imprint.responsible")}
          </address>
        </Section>

        <Section heading={t("terms.h.safety")}>
          <p>{t("privacy.p.termsLink")}</p>
          <Link
            to="/terms"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            {t("nav.terms")}
          </Link>
        </Section>
      </div>
    </AppShell>
  );
}

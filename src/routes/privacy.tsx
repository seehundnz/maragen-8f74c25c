import { createFileRoute } from "@tanstack/react-router";
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

        <Section heading={t("privacy.h.rights")}>
          <p>{t("privacy.p.rights")}</p>
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

        <Section heading={t("privacy.h.safety")}>
          <p>{t("privacy.p.safety1")}</p>
          <p>{t("privacy.p.safety2")}</p>
        </Section>
      </div>
    </AppShell>
  );
}

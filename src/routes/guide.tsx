import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useT } from "@/lib/i18n";

const title = "Guide — VHF Call Builder";
const description =
  "How to use VHF Call Builder: add vessels, generate Mayday, Pan-Pan, Sécurité and routine VHF call scripts, use GPS and UTC, read aloud, share vessels, and install the app offline.";

export const Route = createFileRoute("/guide")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://app.maragen.de/guide" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://app.maragen.de/guide" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "How to use VHF Call Builder",
          description,
          mainEntityOfPage: "https://app.maragen.de/guide",
        }),
      },
    ],
  }),
  component: GuidePage,
});

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2 rounded-xl border border-border bg-card p-4">
      <h2 className="text-base font-semibold text-foreground">{heading}</h2>
      <div className="space-y-2 text-sm text-muted-foreground">{children}</div>
    </section>
  );
}

function GuidePage() {
  const { t } = useT();
  return (
    <AppShell>
      <h1 className="mb-1 text-2xl font-bold">{t("guide.title")}</h1>
      <p className="mb-4 text-sm text-muted-foreground">{t("guide.subtitle")}</p>

      <div className="space-y-4">
        <Section heading={t("guide.h.intro")}>
          <p>{t("guide.p.intro1")}</p>
          <p>{t("guide.p.intro2")}</p>
        </Section>

        <Section heading={t("guide.h.gettingStarted")}>
          <p>{t("guide.p.started1")}</p>
          <p>{t("guide.p.started2")}</p>
        </Section>

        <Section heading={t("guide.h.generate")}>
          <p>{t("guide.p.generate1")}</p>
          <p>{t("guide.p.generate2")}</p>
          <p>{t("guide.p.generate3")}</p>
          <p>{t("guide.p.generate4")}</p>
        </Section>

        <Section heading={t("guide.h.readSpeak")}>
          <p>{t("guide.p.readSpeak1")}</p>
          <p>{t("guide.p.readSpeak2")}</p>
          <p>{t("guide.p.readSpeak3")}</p>
        </Section>

        <Section heading={t("guide.h.shareVessel")}>
          <p>{t("guide.p.shareVessel1")}</p>
          <p>{t("guide.p.shareVessel2")}</p>
        </Section>

        <Section heading={t("guide.h.settings")}>
          <p>{t("guide.p.settings1")}</p>
          <p>{t("guide.p.settings2")}</p>
        </Section>

        <Section heading={t("guide.h.pwa")}>
          <p>{t("guide.p.pwa1")}</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>{t("guide.p.pwa.ios")}</li>
            <li>{t("guide.p.pwa.android")}</li>
            <li>{t("guide.p.pwa.desktop")}</li>
          </ul>
          <p>{t("guide.p.pwa2")}</p>
        </Section>

        <Section heading={t("guide.h.privacy")}>
          <p>{t("guide.p.privacy")}</p>
          <Link to="/privacy" className="font-medium text-primary underline-offset-4 hover:underline">
            {t("nav.privacy")}
          </Link>
        </Section>
      </div>
    </AppShell>
  );
}

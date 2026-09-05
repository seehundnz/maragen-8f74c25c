import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useT } from "@/lib/i18n";

const title = "Terms of Use — VHF Call Builder";
const description =
  "Terms of use for VHF Call Builder: scope, safety notice, liability, availability and changes.";

export const Route = createFileRoute("/terms")({
  staticData: { sitemap: true },
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
  component: TermsPage,
});

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2 rounded-xl border border-border bg-card p-4">
      <h2 className="text-base font-semibold">{heading}</h2>
      <div className="space-y-2 text-sm text-muted-foreground">{children}</div>
    </section>
  );
}

function TermsPage() {
  const { t } = useT();
  return (
    <AppShell>
      <h1 className="mb-1 text-2xl font-bold">{t("terms.title")}</h1>
      <p className="mb-4 text-sm text-muted-foreground">{t("terms.subtitle")}</p>

      <div className="space-y-4">
        <Section heading={t("terms.h.scope")}>
          <p>{t("terms.p.scope")}</p>
        </Section>

        <Section heading={t("terms.h.safety")}>
          <p>{t("terms.p.safety1")}</p>
          <p>{t("terms.p.safety2")}</p>
        </Section>

        <Section heading={t("terms.h.liability")}>
          <p>{t("terms.p.liability")}</p>
        </Section>

        <Section heading={t("terms.h.availability")}>
          <p>{t("terms.p.availability")}</p>
        </Section>

        <Section heading={t("terms.h.changes")}>
          <p>{t("terms.p.changes")}</p>
        </Section>
      </div>
    </AppShell>
  );
}

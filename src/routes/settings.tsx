import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Coffee, Github } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSettings } from "@/hooks/useFleet";
import { useT } from "@/lib/i18n";
import { setLanguagePreference } from "@/lib/i18n/languageStore";
import { UpdateSection } from "@/components/UpdateSection";
import { ClearDataSection } from "@/components/ClearDataSection";

const title = "Settings — VHF Call Builder";
const description =
  "Configure automatic GPS position updates, refresh interval, default VHF channel and position format.";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { settings, setSettings } = useSettings();
  const { t } = useT();
  const intervalValid = settings.intervalSeconds >= 2 && settings.intervalSeconds <= 300;

  return (
    <AppShell>
      <h1 className="mb-4 text-2xl font-bold">{t("settings.title")}</h1>
      <div className="space-y-4">
        <section className="space-y-4 rounded-xl border border-border bg-card p-4">
          <div>
            <Label htmlFor="language">{t("settings.language")}</Label>
            <Select
              value={settings.language ?? "auto"}
              onValueChange={(v) => {
                const pref = v as "auto" | "en" | "de";
                setSettings((s) => ({ ...s, language: pref }));
                setLanguagePreference(pref);
              }}
            >
              <SelectTrigger id="language" className="max-w-72">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">{t("settings.language.auto")}</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
            <p className="mt-1 text-xs text-muted-foreground">{t("settings.languageHint")}</p>
          </div>
        </section>

        <section className="space-y-4 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label htmlFor="auto">{t("settings.autoUpdate")}</Label>
              <p className="text-xs text-muted-foreground">{t("settings.autoUpdateHint")}</p>
            </div>
            <Switch
              id="auto"
              checked={settings.autoUpdate}
              onCheckedChange={(checked) => setSettings((s) => ({ ...s, autoUpdate: checked }))}
            />
          </div>

          <div>
            <Label htmlFor="interval">{t("settings.interval")}</Label>
            <Input
              id="interval"
              type="number"
              min={2}
              max={300}
              value={settings.intervalSeconds}
              onChange={(e) => setSettings((s) => ({ ...s, intervalSeconds: Number(e.target.value) }))}
              className="max-w-32"
            />
            <p className="mt-1 text-xs text-muted-foreground">{t("settings.intervalHint")}</p>
            {!intervalValid && <p className="mt-1 text-xs text-destructive">{t("settings.intervalError")}</p>}
          </div>
        </section>

        <section className="space-y-4 rounded-xl border border-border bg-card p-4">
          <div>
            <Label htmlFor="channel">{t("settings.defaultChannel")}</Label>
            <Input
              id="channel"
              inputMode="numeric"
              value={settings.defaultChannel}
              onChange={(e) => setSettings((s) => ({ ...s, defaultChannel: e.target.value }))}
              className="max-w-32"
            />
          </div>
          <div>
            <Label htmlFor="format">{t("settings.positionFormat")}</Label>
            <Select
              value={settings.positionFormat}
              onValueChange={(v) => setSettings((s) => ({ ...s, positionFormat: v as "ddm" | "dd" }))}
            >
              <SelectTrigger id="format" className="max-w-72">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ddm">{t("settings.positionFormat.ddm")}</SelectItem>
                <SelectItem value="dd">{t("settings.positionFormat.dd")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        <section className="space-y-4 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label htmlFor="aivoice">{t("settings.aiVoice")}</Label>
              <p className="text-xs text-muted-foreground">{t("settings.aiVoiceHint")}</p>
            </div>
            <Switch
              id="aivoice"
              checked={settings.useAiVoice !== false}
              onCheckedChange={(checked) => setSettings((s) => ({ ...s, useAiVoice: checked }))}
            />
          </div>
        </section>

        <UpdateSection />

        <ClearDataSection />

        <section className="space-y-2 rounded-xl border border-border bg-card p-4">
          <h2 className="text-sm font-semibold">{t("settings.privacyHeading")}</h2>
          <p className="text-xs text-muted-foreground">{t("settings.privacyHint")}</p>
          <Link
            to="/privacy"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            <ShieldCheck className="size-4" aria-hidden />
            {t("settings.privacyLink")}
          </Link>
        </section>

        <section className="space-y-2 rounded-xl border border-border bg-card p-4">
          <h2 className="text-sm font-semibold">{t("settings.supportHeading")}</h2>
          <p className="text-xs text-muted-foreground">{t("settings.supportBody")}</p>
          <a
            href="https://buymeacoffee.com/maragen"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            <Coffee className="size-4" aria-hidden />
            {t("settings.supportLink")}
          </a>
        </section>

        <section className="space-y-2 rounded-xl border border-border bg-card p-4">
          <h2 className="text-sm font-semibold">{t("settings.sourceHeading")}</h2>
          <p className="text-xs text-muted-foreground">{t("settings.sourceBody")}</p>
          <a
            href="https://github.com/seehundnz/maragen-8f74c25c.git"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            <Github className="size-4" aria-hidden />
            {t("settings.sourceLink")}
          </a>
        </section>
      </div>
    </AppShell>
  );
}

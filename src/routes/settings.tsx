import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSettings } from "@/hooks/useFleet";

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
  const intervalValid = settings.intervalSeconds >= 2 && settings.intervalSeconds <= 300;

  return (
    <AppShell>
      <h1 className="mb-4 text-2xl font-bold">Settings</h1>
      <div className="space-y-4">
        <section className="space-y-4 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label htmlFor="auto">Auto-update position</Label>
              <p className="text-xs text-muted-foreground">
                Refresh the GPS fix continuously while a call screen is open.
              </p>
            </div>
            <Switch
              id="auto"
              checked={settings.autoUpdate}
              onCheckedChange={(checked) => setSettings((s) => ({ ...s, autoUpdate: checked }))}
            />
          </div>

          <div>
            <Label htmlFor="interval">Refresh interval (seconds)</Label>
            <Input
              id="interval"
              type="number"
              min={2}
              max={300}
              value={settings.intervalSeconds}
              onChange={(e) =>
                setSettings((s) => ({ ...s, intervalSeconds: Number(e.target.value) }))
              }
              className="max-w-32"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Default 10 seconds. Allowed range 2–300 seconds.
            </p>
            {!intervalValid && (
              <p className="mt-1 text-xs text-destructive">
                Value must be between 2 and 300 seconds.
              </p>
            )}
          </div>
        </section>

        <section className="space-y-4 rounded-xl border border-border bg-card p-4">
          <div>
            <Label htmlFor="channel">Default VHF channel</Label>
            <Input
              id="channel"
              inputMode="numeric"
              value={settings.defaultChannel}
              onChange={(e) => setSettings((s) => ({ ...s, defaultChannel: e.target.value }))}
              className="max-w-32"
            />
          </div>
          <div>
            <Label htmlFor="format">Position format</Label>
            <Select
              value={settings.positionFormat}
              onValueChange={(v) =>
                setSettings((s) => ({ ...s, positionFormat: v as "ddm" | "dd" }))
              }
            >
              <SelectTrigger id="format" className="max-w-72">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ddm">Degrees and decimal minutes (54° 19.85' N)</SelectItem>
                <SelectItem value="dd">Decimal degrees (54.33083°)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        <section className="space-y-4 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label htmlFor="aivoice">Use AI voice for &quot;Speak&quot;</Label>
              <p className="text-xs text-muted-foreground">
                On: the script text is sent to our speech service for a clear radio-operator voice.
                Off: only your device&apos;s built-in voice is used and no text ever leaves this
                device.
              </p>
            </div>
            <Switch
              id="aivoice"
              checked={settings.useAiVoice !== false}
              onCheckedChange={(checked) => setSettings((s) => ({ ...s, useAiVoice: checked }))}
            />
          </div>
        </section>

        <section className="space-y-2 rounded-xl border border-border bg-card p-4">

          <h2 className="text-sm font-semibold">Privacy &amp; legal</h2>
          <p className="text-xs text-muted-foreground">
            All settings and vessel profiles are stored on this device only. No account, no
            tracking, no analytics.
          </p>
          <Link
            to="/privacy"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            <ShieldCheck className="size-4" aria-hidden />
            GDPR/DSGVO information &amp; imprint
          </Link>
        </section>
      </div>
    </AppShell>
  );
}

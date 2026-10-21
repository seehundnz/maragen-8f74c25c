import { Radio } from "lucide-react";

import { useT } from "@/lib/i18n";

/** "Use channel 16" reminder, shown on the call page and (larger) in read mode. */
export function Channel16Notice({ large = false }: { large?: boolean }) {
  const { t } = useT();
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border-2 border-primary bg-primary/10 p-4 ${large ? "mb-6" : ""}`}
    >
      <Radio className={`shrink-0 text-primary ${large ? "mt-1 size-6" : "mt-0.5 size-5"}`} />
      <div>
        <p
          className={`font-black tracking-widest text-primary uppercase ${large ? "text-base sm:text-lg" : "text-sm"}`}
        >
          {t("call.channel16Notice")}
        </p>
        <p className={`mt-1 text-muted-foreground ${large ? "text-sm" : "text-xs"}`}>
          {t("call.channel16NoticeHint")}
        </p>
      </div>
    </div>
  );
}

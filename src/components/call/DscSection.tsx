import { useState } from "react";
import { AlertTriangle, ChevronDown } from "lucide-react";

import { useT } from "@/lib/i18n";

export function DscSection() {
  const { t } = useT();
  const [open, setOpen] = useState(false);

  return (
    <section className="rounded-xl border-2 border-primary bg-primary/10 p-4">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="group flex w-full cursor-pointer items-center justify-between text-left text-sm font-black tracking-widest text-primary uppercase"
        aria-expanded={open}
      >
        <span className="flex min-w-0 flex-1 items-center gap-2 pr-2 leading-tight break-words">
          <AlertTriangle className="size-4 shrink-0" /> {t("dsc.title")}
        </span>
        <ChevronDown
          className={`size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <>
          <p className="mt-2 text-sm">{t("dsc.intro")}</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
            <li>{t("dsc.step1")}</li>
            <li>{t("dsc.step2")}</li>
            <li>{t("dsc.step3")}</li>
            <li>{t("dsc.step4")}</li>
          </ol>
          <p className="mt-2 text-xs text-muted-foreground">{t("dsc.note")}</p>
        </>
      )}
    </section>
  );
}

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { FURTHER_COMMS } from "@/lib/comms";
import { useT } from "@/lib/i18n";

export function FurtherComms() {
  const { t } = useT();
  const [open, setOpen] = useState(false);

  return (
    <section className="rounded-xl border border-border bg-card p-4">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="group flex w-full cursor-pointer items-center justify-between text-left text-sm font-black tracking-widest text-foreground uppercase"
        aria-expanded={open}
      >
        <span className="pr-2">{t("comms.title")}</span>
        <ChevronDown
          className={`size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="mt-3 space-y-4">
          <p className="text-sm text-muted-foreground">{t("comms.intro")}</p>
          {FURTHER_COMMS.map((item) => (
            <div key={item.heading}>
              <p className="text-sm font-bold tracking-widest text-foreground uppercase">
                {t(item.heading)}
              </p>
              <p className="font-mono text-base leading-relaxed break-words whitespace-pre-wrap">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

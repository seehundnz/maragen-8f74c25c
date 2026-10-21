import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Channel16Notice } from "@/components/call/Channel16Notice";
import { useT } from "@/lib/i18n";

interface ReadModeOverlayProps {
  label: string;
  script: string;
  showChannel16: boolean;
  speakButton: ReactNode;
  onClose: () => void;
}

/** Full-screen, large-print view of the script for reading it out on the radio. */
export function ReadModeOverlay({
  label,
  script,
  showChannel16,
  speakButton,
  onClose,
}: ReadModeOverlayProps) {
  const { t } = useT();

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex h-[100dvh] flex-col bg-background"
      style={{
        paddingTop: "max(1rem, env(safe-area-inset-top))",
        paddingLeft: "max(1rem, env(safe-area-inset-left))",
        paddingRight: "max(1rem, env(safe-area-inset-right))",
        paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
    >
      <div className="mx-auto w-full max-w-3xl shrink-0">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-lg font-black tracking-widest text-primary">{label}</span>
          <div className="flex gap-2">
            {speakButton}
            <Button variant="secondary" size="sm" onClick={onClose}>
              <X /> {t("call.close")}
            </Button>
          </div>
        </div>
      </div>
      <div
        className="min-h-0 w-full flex-1 overflow-y-auto overscroll-contain"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="mx-auto max-w-3xl pb-16">
          {showChannel16 && <Channel16Notice large />}
          <pre className="font-mono text-2xl leading-relaxed break-words whitespace-pre-wrap sm:text-3xl">
            {script}
          </pre>
        </div>
      </div>
    </div>
  );
}

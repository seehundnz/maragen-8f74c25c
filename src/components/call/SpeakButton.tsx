import { Loader2, Square, Volume2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";

/** Defined at module level so it is not re-created (and re-mounted) on every clock tick. */
export function SpeakButton({
  speaking,
  loading,
  onClick,
}: {
  speaking: boolean;
  loading: boolean;
  onClick: () => void;
}) {
  const { t } = useT();
  return (
    <Button size="sm" variant="secondary" onClick={onClick}>
      {loading ? <Loader2 className="animate-spin" /> : speaking ? <Square /> : <Volume2 />}
      {speaking ? t("call.stop") : t("call.speak")}
    </Button>
  );
}

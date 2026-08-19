import { Link } from "@tanstack/react-router";
import { CALL_META, CALL_TYPES, type CallType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

export function CallTabs({ active }: { active: CallType }) {
  const { t } = useT();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      <div className="mx-auto grid max-w-3xl grid-cols-4">
        {CALL_TYPES.map((type) => {
          const isActive = type === active;
          return (
            <Link
              key={type}
              to="/call/$type"
              params={{ type }}
              data-call={type}
              className={cn(
                "flex min-h-20 flex-col items-center justify-center gap-1 border-t-4 border-transparent px-1 py-2 text-center transition-colors sm:min-h-16",
                isActive
                  ? "call-surface border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="text-[0.7rem] leading-tight font-bold tracking-wider sm:text-xs">
                {CALL_META[type].label}
              </span>
              <span className="text-[0.6rem] opacity-70">{t(`call.${type}.short`)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      offset="calc(env(safe-area-inset-top, 0px) + 1rem)"
      mobileOffset={{
        top: "calc(env(safe-area-inset-top, 0px) + 0.75rem)",
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 0.75rem)",
        left: "calc(env(safe-area-inset-left, 0px) + 0.75rem)",
        right: "calc(env(safe-area-inset-right, 0px) + 0.75rem)",
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

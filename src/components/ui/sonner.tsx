import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success:
            "group toast group-[.toaster]:bg-success-foreground group-[.toaster]:text-success group-[.toaster]:border-success group-[.toaster]:shadow-lg",
          error:
            "group toast group-[.toaster]:bg-destructive-foreground group-[.toaster]:text-destructive group-[.toaster]:border-destructive group-[.toaster]:shadow-lg",
          info: "group toast group-[.toaster]:bg-info-foreground group-[.toaster]:text-info group-[.toaster]:border-info group-[.toaster]:shadow-lg",
          warning:
            "group toast group-[.toaster]:bg-warning-foreground group-[.toaster]:text-warning group-[.toaster]:border-warning group-[.toaster]:shadow-lg",
          default:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

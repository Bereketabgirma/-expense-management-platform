import { cn } from "@/lib/utils";

interface AlertProps {
  variant: "success" | "error";
  children: React.ReactNode;
}

export function Alert({ variant, children }: AlertProps) {
  return (
    <div
      className={cn(
        "rounded-lg border px-4 py-3 text-sm",
        variant === "success"
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-red-200 bg-red-50 text-red-800"
      )}
      role="alert"
    >
      {children}
    </div>
  );
}

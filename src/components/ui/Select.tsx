import { cn } from "@/lib/utils";
import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "block w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-indigo-600",
          error ? "border-red-400" : "border-slate-300",
          className
        )}
        {...props}
      />
    );
  }
);

Select.displayName = "Select";

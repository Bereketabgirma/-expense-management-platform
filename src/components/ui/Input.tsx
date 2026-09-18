import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "block w-full rounded-lg border px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-indigo-600",
          error ? "border-red-400" : "border-slate-300",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

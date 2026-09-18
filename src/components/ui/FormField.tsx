import { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  errors?: string[];
  children: ReactNode;
}

export function FormField({ label, htmlFor, errors, children }: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
      {errors?.map((error) => (
        <p key={error} className="text-sm text-red-600">
          {error}
        </p>
      ))}
    </div>
  );
}

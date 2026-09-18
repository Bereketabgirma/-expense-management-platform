"use client";

import { useActionState } from "react";
import { EXPENSE_CATEGORIES } from "@/lib/constants";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Alert } from "@/components/ui/Alert";
import type { ActionResult } from "@/actions/auth";

type ExpenseFormAction = (
  prevState: ActionResult | undefined,
  formData: FormData
) => Promise<ActionResult>;

interface ExpenseFormProps {
  action: ExpenseFormAction;
  submitLabel: string;
  defaultValues?: {
    amount?: number;
    date?: string;
    description?: string;
    category?: string;
  };
}

export function ExpenseForm({ action, submitLabel, defaultValues }: ExpenseFormProps) {
  const [state, formAction, isPending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="max-w-lg space-y-4">
      {state?.message && !state.success && <Alert variant="error">{state.message}</Alert>}

      <FormField label="Amount" htmlFor="amount" errors={state?.fieldErrors?.amount}>
        <Input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0.01"
          defaultValue={defaultValues?.amount}
          required
        />
      </FormField>

      <FormField label="Date" htmlFor="date" errors={state?.fieldErrors?.date}>
        <Input
          id="date"
          name="date"
          type="date"
          defaultValue={defaultValues?.date}
          required
        />
      </FormField>

      <FormField label="Description" htmlFor="description" errors={state?.fieldErrors?.description}>
        <Input
          id="description"
          name="description"
          type="text"
          maxLength={255}
          defaultValue={defaultValues?.description}
          required
        />
      </FormField>

      <FormField label="Category" htmlFor="category" errors={state?.fieldErrors?.category}>
        <Select id="category" name="category" defaultValue={defaultValues?.category ?? ""} required>
          <option value="" disabled>
            Select a category
          </option>
          {EXPENSE_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </FormField>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}

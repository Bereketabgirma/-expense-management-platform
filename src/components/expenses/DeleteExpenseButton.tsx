"use client";

import { useTransition } from "react";
import { deleteExpense } from "@/actions/expenses";

export function DeleteExpenseButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm("Delete this expense? This cannot be undone.")) return;
    startTransition(() => {
      deleteExpense(id);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}

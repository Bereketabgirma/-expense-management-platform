import { notFound } from "next/navigation";
import { getExpenseById, updateExpense } from "@/actions/expenses";
import { ExpenseForm } from "@/components/expenses/ExpenseForm";
import { Card } from "@/components/ui/Card";

export default async function EditExpensePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const expense = await getExpenseById(id);

  if (!expense) {
    notFound();
  }

  const boundUpdateExpense = updateExpense.bind(null, id);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-slate-900">Edit expense</h1>
      <Card>
        <ExpenseForm
          action={boundUpdateExpense}
          submitLabel="Save changes"
          defaultValues={{
            amount: expense.amount,
            date: expense.date.toISOString().split("T")[0],
            description: expense.description,
            category: expense.category,
          }}
        />
      </Card>
    </div>
  );
}

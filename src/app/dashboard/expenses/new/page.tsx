import { createExpense } from "@/actions/expenses";
import { ExpenseForm } from "@/components/expenses/ExpenseForm";
import { Card } from "@/components/ui/Card";

export default function NewExpensePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-slate-900">Add expense</h1>
      <Card>
        <ExpenseForm action={createExpense} submitLabel="Add expense" />
      </Card>
    </div>
  );
}

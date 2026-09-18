import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";
import { DeleteExpenseButton } from "@/components/expenses/DeleteExpenseButton";

interface ExpenseRow {
  id: string;
  amount: number;
  date: Date;
  description: string;
  category: string;
}

export function ExpenseTable({ expenses }: { expenses: ExpenseRow[] }) {
  if (expenses.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center text-sm text-slate-400">
        No expenses found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
            <th className="py-2 pr-4">Date</th>
            <th className="py-2 pr-4">Description</th>
            <th className="py-2 pr-4">Category</th>
            <th className="py-2 pr-4 text-right">Amount</th>
            <th className="py-2 pl-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td className="py-3 pr-4 whitespace-nowrap text-slate-600">
                {formatDate(expense.date)}
              </td>
              <td className="py-3 pr-4 text-slate-900">{expense.description}</td>
              <td className="py-3 pr-4">
                <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                  {expense.category}
                </span>
              </td>
              <td className="py-3 pr-4 text-right font-medium text-slate-900">
                {formatCurrency(expense.amount)}
              </td>
              <td className="py-3 pl-4 text-right whitespace-nowrap">
                <div className="flex items-center justify-end gap-3">
                  <Link
                    href={`/dashboard/expenses/${expense.id}/edit`}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    Edit
                  </Link>
                  <DeleteExpenseButton id={expense.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

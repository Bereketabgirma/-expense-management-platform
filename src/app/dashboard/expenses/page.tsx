import Link from "next/link";
import { getExpenses } from "@/actions/expenses";
import { ExpenseFilters } from "@/components/expenses/ExpenseFilters";
import { ExpenseTable } from "@/components/expenses/ExpenseTable";
import { Pagination } from "@/components/expenses/Pagination";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type SearchParams = Record<string, string | undefined>;

export default async function ExpensesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { expenses, total, page, totalPages } = await getExpenses(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Expenses</h1>
          <p className="text-sm text-slate-500">{total} total</p>
        </div>
        <Link href="/dashboard/expenses/new">
          <Button>Add expense</Button>
        </Link>
      </div>

      <Card>
        <ExpenseFilters {...params} />
      </Card>

      <Card className="space-y-4">
        <ExpenseTable expenses={expenses} />
        <Pagination page={page} totalPages={totalPages} searchParams={params} />
      </Card>
    </div>
  );
}

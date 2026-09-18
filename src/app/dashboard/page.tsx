import Link from "next/link";
import { getDashboardStats } from "@/actions/expenses";
import { StatCard } from "@/components/dashboard/StatCard";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900">Overview</h1>
        <Link href="/dashboard/expenses/new">
          <Button>Add expense</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total expenses" value={formatCurrency(stats.totalAmount)} />
        <StatCard label="This month" value={formatCurrency(stats.monthlyAmount)} />
        <StatCard label="Number of expenses" value={String(stats.expenseCount)} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-sm font-medium text-slate-700">Spending by category</h2>
          <CategoryChart data={stats.categoryBreakdown} />
        </Card>
        <Card>
          <h2 className="mb-4 text-sm font-medium text-slate-700">Last 6 months</h2>
          <TrendChart data={stats.monthlyTrend} />
        </Card>
      </div>
    </div>
  );
}

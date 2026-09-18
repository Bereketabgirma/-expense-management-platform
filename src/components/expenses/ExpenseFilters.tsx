import { EXPENSE_CATEGORIES } from "@/lib/constants";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

interface ExpenseFiltersProps {
  search?: string;
  category?: string;
  from?: string;
  to?: string;
  sortBy?: string;
  sortOrder?: string;
}

export function ExpenseFilters({
  search,
  category,
  from,
  to,
  sortBy,
  sortOrder,
}: ExpenseFiltersProps) {
  return (
    <form method="GET" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
      <div className="sm:col-span-2">
        <label htmlFor="search" className="mb-1 block text-xs font-medium text-slate-500">
          Search
        </label>
        <Input
          id="search"
          name="search"
          type="search"
          placeholder="Search description..."
          defaultValue={search}
        />
      </div>

      <div>
        <label htmlFor="category" className="mb-1 block text-xs font-medium text-slate-500">
          Category
        </label>
        <Select id="category" name="category" defaultValue={category ?? ""}>
          <option value="">All categories</option>
          {EXPENSE_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <label htmlFor="from" className="mb-1 block text-xs font-medium text-slate-500">
          From
        </label>
        <Input id="from" name="from" type="date" defaultValue={from} />
      </div>

      <div>
        <label htmlFor="to" className="mb-1 block text-xs font-medium text-slate-500">
          To
        </label>
        <Input id="to" name="to" type="date" defaultValue={to} />
      </div>

      <div>
        <label htmlFor="sortBy" className="mb-1 block text-xs font-medium text-slate-500">
          Sort by
        </label>
        <Select id="sortBy" name="sortBy" defaultValue={sortBy ?? "date"}>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </Select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="sortOrder" className="mb-1 block text-xs font-medium text-slate-500">
          Order
        </label>
        <Select id="sortOrder" name="sortOrder" defaultValue={sortOrder ?? "desc"}>
          <option value="desc">Newest / highest first</option>
          <option value="asc">Oldest / lowest first</option>
        </Select>
      </div>

      <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-2">
        <Button type="submit" className="w-full sm:w-auto">
          Apply filters
        </Button>
        <a
          href="/dashboard/expenses"
          className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          Clear
        </a>
      </div>
    </form>
  );
}

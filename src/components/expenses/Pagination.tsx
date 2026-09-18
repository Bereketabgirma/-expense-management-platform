interface PaginationProps {
  page: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
}

function buildHref(searchParams: Record<string, string | undefined>, page: number): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (value && key !== "page") params.set(key, value);
  }
  params.set("page", String(page));
  return `/dashboard/expenses?${params.toString()}`;
}

export function Pagination({ page, totalPages, searchParams }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
      <span className="text-slate-500">
        Page {page} of {totalPages}
      </span>
      <div className="flex gap-2">
        {page > 1 ? (
          <a
            href={buildHref(searchParams, page - 1)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50"
          >
            Previous
          </a>
        ) : (
          <span className="rounded-lg border border-slate-200 px-3 py-1.5 font-medium text-slate-400">
            Previous
          </span>
        )}
        {page < totalPages ? (
          <a
            href={buildHref(searchParams, page + 1)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50"
          >
            Next
          </a>
        ) : (
          <span className="rounded-lg border border-slate-200 px-3 py-1.5 font-medium text-slate-400">
            Next
          </span>
        )}
      </div>
    </div>
  );
}

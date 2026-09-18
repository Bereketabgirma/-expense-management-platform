export const EXPENSE_CATEGORIES = [
  "Food",
  "Travel",
  "Bills",
  "Shopping",
  "Entertainment",
  "Health",
  "Education",
  "Other",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  Food: "#f59e0b",
  Travel: "#3b82f6",
  Bills: "#ef4444",
  Shopping: "#a855f7",
  Entertainment: "#ec4899",
  Health: "#10b981",
  Education: "#06b6d4",
  Other: "#6b7280",
};

export const PAGE_SIZE = 10;

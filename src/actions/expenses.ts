"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { expenseSchema, expenseFilterSchema } from "@/lib/validations";
import { PAGE_SIZE, EXPENSE_CATEGORIES } from "@/lib/constants";
import type { ActionResult } from "./auth";

async function requireUserId(): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session.user.id;
}

export async function createExpense(
  _prevState: ActionResult | undefined,
  formData: FormData
): Promise<ActionResult> {
  const userId = await requireUserId();

  const parsed = expenseSchema.safeParse({
    amount: formData.get("amount"),
    date: formData.get("date"),
    description: formData.get("description"),
    category: formData.get("category"),
  });

  if (!parsed.success) {
    return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const { amount, date, description, category } = parsed.data;

  await prisma.expense.create({
    data: {
      amount,
      date: new Date(date),
      description,
      category,
      userId,
    },
  });

  revalidatePath("/dashboard/expenses");
  revalidatePath("/dashboard");
  redirect("/dashboard/expenses");
}

export async function updateExpense(
  id: string,
  _prevState: ActionResult | undefined,
  formData: FormData
): Promise<ActionResult> {
  const userId = await requireUserId();

  const parsed = expenseSchema.safeParse({
    amount: formData.get("amount"),
    date: formData.get("date"),
    description: formData.get("description"),
    category: formData.get("category"),
  });

  if (!parsed.success) {
    return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const { amount, date, description, category } = parsed.data;

  // updateMany scoped to the current user prevents editing another user's expense
  // even if a malicious request supplies a valid expense id belonging to someone else.
  const result = await prisma.expense.updateMany({
    where: { id, userId },
    data: { amount, date: new Date(date), description, category },
  });

  if (result.count === 0) {
    return { success: false, message: "Expense not found." };
  }

  revalidatePath("/dashboard/expenses");
  revalidatePath("/dashboard");
  redirect("/dashboard/expenses");
}

export async function deleteExpense(id: string): Promise<void> {
  const userId = await requireUserId();

  await prisma.expense.deleteMany({
    where: { id, userId },
  });

  revalidatePath("/dashboard/expenses");
  revalidatePath("/dashboard");
}

export async function getExpenseById(id: string) {
  const userId = await requireUserId();

  return prisma.expense.findFirst({
    where: { id, userId },
  });
}

export type ExpenseListFilters = {
  search?: string;
  category?: string;
  from?: string;
  to?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: string;
};

export async function getExpenses(rawFilters: ExpenseListFilters) {
  const userId = await requireUserId();

  const filters = expenseFilterSchema.parse({
    search: rawFilters.search,
    category: (EXPENSE_CATEGORIES as readonly string[]).includes(rawFilters.category ?? "")
      ? rawFilters.category
      : undefined,
    from: rawFilters.from,
    to: rawFilters.to,
    sortBy: rawFilters.sortBy,
    sortOrder: rawFilters.sortOrder,
    page: rawFilters.page,
  });

  const where = {
    userId,
    ...(filters.search
      ? { description: { contains: filters.search } }
      : {}),
    ...(filters.category ? { category: filters.category } : {}),
    ...(filters.from || filters.to
      ? {
          date: {
            ...(filters.from ? { gte: new Date(filters.from) } : {}),
            ...(filters.to ? { lte: new Date(filters.to) } : {}),
          },
        }
      : {}),
  };

  const [expenses, total] = await Promise.all([
    prisma.expense.findMany({
      where,
      orderBy: { [filters.sortBy]: filters.sortOrder },
      skip: (filters.page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.expense.count({ where }),
  ]);

  return {
    expenses,
    total,
    page: filters.page,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  };
}

export async function getDashboardStats() {
  const userId = await requireUserId();

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const [totalAgg, monthAgg, count, categoryGroups, allForTrend] = await Promise.all([
    prisma.expense.aggregate({ where: { userId }, _sum: { amount: true } }),
    prisma.expense.aggregate({
      where: { userId, date: { gte: startOfMonth, lt: startOfNextMonth } },
      _sum: { amount: true },
    }),
    prisma.expense.count({ where: { userId } }),
    prisma.expense.groupBy({
      by: ["category"],
      where: { userId },
      _sum: { amount: true },
    }),
    prisma.expense.findMany({
      where: {
        userId,
        date: { gte: new Date(now.getFullYear(), now.getMonth() - 5, 1) },
      },
      select: { amount: true, date: true },
    }),
  ]);

  const categoryBreakdown = categoryGroups
    .map((g) => ({ category: g.category, total: g._sum.amount ?? 0 }))
    .sort((a, b) => b.total - a.total);

  const monthlyTrend: { month: string; total: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = monthDate.toLocaleDateString("en-US", { month: "short" });
    const total = allForTrend
      .filter(
        (e) =>
          e.date.getFullYear() === monthDate.getFullYear() &&
          e.date.getMonth() === monthDate.getMonth()
      )
      .reduce((sum, e) => sum + e.amount, 0);
    monthlyTrend.push({ month: label, total });
  }

  return {
    totalAmount: totalAgg._sum.amount ?? 0,
    monthlyAmount: monthAgg._sum.amount ?? 0,
    expenseCount: count,
    categoryBreakdown,
    monthlyTrend,
  };
}

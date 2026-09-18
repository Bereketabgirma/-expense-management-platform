import { z } from "zod";
import { EXPENSE_CATEGORIES } from "./constants";

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
    email: z.string().trim().toLowerCase().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters").max(72),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters").max(72),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export const expenseSchema = z.object({
  amount: z.coerce
    .number({ message: "Amount must be a number" })
    .positive("Amount must be greater than 0")
    .max(1_000_000_000, "Amount is too large"),
  date: z.string().min(1, "Date is required"),
  description: z.string().trim().min(1, "Description is required").max(255),
  category: z.enum(EXPENSE_CATEGORIES, { message: "Select a valid category" }),
});

export type ExpenseInput = z.infer<typeof expenseSchema>;

export const expenseFilterSchema = z.object({
  search: z.string().trim().optional(),
  category: z.enum(EXPENSE_CATEGORIES).optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  sortBy: z.enum(["date", "amount"]).optional().default("date"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
  page: z.coerce.number().int().positive().optional().default(1),
});

export type ExpenseFilterInput = z.infer<typeof expenseFilterSchema>;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/expenses", label: "Expenses" },
  { href: "/dashboard/settings", label: "Settings" },
];

export function Sidebar({ orientation = "vertical" }: { orientation?: "vertical" | "horizontal" }) {
  const pathname = usePathname();

  return (
    <nav className={cn(orientation === "vertical" ? "space-y-1" : "flex gap-1")}>
      {links.map((link) => {
        const isActive =
          link.href === "/dashboard" ? pathname === link.href : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors",
              orientation === "vertical" ? "block" : "shrink-0",
              isActive
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

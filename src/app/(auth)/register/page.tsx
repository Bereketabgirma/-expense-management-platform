import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Card } from "@/components/ui/Card";

export default function RegisterPage() {
  return (
    <Card>
      <h1 className="mb-1 text-xl font-semibold text-slate-900">Create your account</h1>
      <p className="mb-6 text-sm text-slate-500">Start tracking your expenses in minutes.</p>

      <RegisterForm />

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
          Sign in
        </Link>
      </p>
    </Card>
  );
}

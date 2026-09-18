import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { Card } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string }>;
}) {
  const { registered } = await searchParams;

  return (
    <Card>
      <h1 className="mb-1 text-xl font-semibold text-slate-900">Welcome back</h1>
      <p className="mb-6 text-sm text-slate-500">Sign in to manage your expenses.</p>

      {registered && (
        <div className="mb-4">
          <Alert variant="success">Account created. You can now sign in.</Alert>
        </div>
      )}

      <LoginForm />

      <p className="mt-6 text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
          Sign up
        </Link>
      </p>
    </Card>
  );
}

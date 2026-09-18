import { auth } from "@/auth";
import { ChangePasswordForm } from "@/components/auth/ChangePasswordForm";
import { Card } from "@/components/ui/Card";

export default async function SettingsPage() {
  const session = await auth();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-slate-900">Settings</h1>

      <Card className="max-w-lg">
        <h2 className="mb-1 text-sm font-medium text-slate-700">Account</h2>
        <p className="mb-4 text-sm text-slate-500">
          {session?.user?.name} &middot; {session?.user?.email}
        </p>
      </Card>

      <Card className="max-w-lg">
        <h2 className="mb-4 text-sm font-medium text-slate-700">Change password</h2>
        <ChangePasswordForm />
      </Card>
    </div>
  );
}

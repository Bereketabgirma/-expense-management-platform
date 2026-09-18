"use client";

import { useActionState } from "react";
import { changePassword } from "@/actions/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Alert } from "@/components/ui/Alert";

export function ChangePasswordForm() {
  const [state, formAction, isPending] = useActionState(changePassword, undefined);

  return (
    <form action={formAction} className="max-w-sm space-y-4">
      {state?.message && (
        <Alert variant={state.success ? "success" : "error"}>{state.message}</Alert>
      )}

      <FormField
        label="Current password"
        htmlFor="currentPassword"
        errors={state?.fieldErrors?.currentPassword}
      >
        <Input
          id="currentPassword"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
        />
      </FormField>

      <FormField
        label="New password"
        htmlFor="newPassword"
        errors={state?.fieldErrors?.newPassword}
      >
        <Input
          id="newPassword"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          required
        />
      </FormField>

      <FormField
        label="Confirm new password"
        htmlFor="confirmNewPassword"
        errors={state?.fieldErrors?.confirmNewPassword}
      >
        <Input
          id="confirmNewPassword"
          name="confirmNewPassword"
          type="password"
          autoComplete="new-password"
          required
        />
      </FormField>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Updating..." : "Update password"}
      </Button>
    </form>
  );
}

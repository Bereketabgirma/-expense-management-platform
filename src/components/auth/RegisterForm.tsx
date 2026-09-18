"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/actions/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FormField } from "@/components/ui/FormField";
import { Alert } from "@/components/ui/Alert";

export function RegisterForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(registerUser, undefined);

  useEffect(() => {
    if (state?.success) {
      router.push("/login?registered=1");
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-4">
      {state?.message && !state.success && <Alert variant="error">{state.message}</Alert>}

      <FormField label="Full name" htmlFor="name" errors={state?.fieldErrors?.name}>
        <Input id="name" name="name" type="text" autoComplete="name" required />
      </FormField>

      <FormField label="Email" htmlFor="email" errors={state?.fieldErrors?.email}>
        <Input id="email" name="email" type="email" autoComplete="email" required />
      </FormField>

      <FormField label="Password" htmlFor="password" errors={state?.fieldErrors?.password}>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
        />
      </FormField>

      <FormField
        label="Confirm password"
        htmlFor="confirmPassword"
        errors={state?.fieldErrors?.confirmPassword}
      >
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
        />
      </FormField>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}

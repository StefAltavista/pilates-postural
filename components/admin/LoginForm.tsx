"use client";

import { useActionState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { AppButton } from "@/components/common/AppButton";
import { AppTextField } from "@/components/common/AppTextField";
import { loginAction } from "@/lib/auth/actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, {});

  return (
    <Stack component="form" action={formAction} spacing={2}>
      {state.errors?.form ? (
        <Alert severity="error">{state.errors.form[0]}</Alert>
      ) : null}

      <AppTextField
        label="Username"
        type="text"
        name="email"
        autoComplete="username"
        error={Boolean(state.errors?.email)}
        helperText={state.errors?.email?.[0]}
      />

      <AppTextField
        label="Password"
        type="password"
        name="password"
        autoComplete="current-password"
        error={Boolean(state.errors?.password)}
        helperText={state.errors?.password?.[0]}
      />

      <AppButton
        type="submit"
        disabled={pending}
      >
        {pending ? "Signing in..." : "Sign in"}
      </AppButton>
    </Stack>
  );
}

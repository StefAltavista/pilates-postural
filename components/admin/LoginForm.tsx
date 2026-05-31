"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/auth/actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, {});

  return (
    <form action={formAction} className="grid gap-4">
      {state.errors?.form ? (
        <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.errors.form[0]}
        </p>
      ) : null}

      <label className="grid gap-1 text-sm font-medium">
        Username
        <input
          type="text"
          name="email"
          autoComplete="username"
          className="rounded border px-3 py-2 font-normal"
        />
        <FieldError message={state.errors?.email?.[0]} />
      </label>

      <label className="grid gap-1 text-sm font-medium">
        Password
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          className="rounded border px-3 py-2 font-normal"
        />
        <FieldError message={state.errors?.password?.[0]} />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="rounded bg-zinc-950 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-sm font-normal text-red-600">{message}</p>;
}

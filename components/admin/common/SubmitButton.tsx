"use client";

import { AppButton } from "@/components/common/AppButton";

type SubmitButtonProps = {
  children: React.ReactNode;
  pending?: boolean;
};

export function SubmitButton({ children, pending = false }: SubmitButtonProps) {
  return (
    <AppButton
      type="submit"
      disabled={pending}
    >
      {pending ? "Saving..." : children}
    </AppButton>
  );
}

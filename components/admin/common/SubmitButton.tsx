"use client";

type SubmitButtonProps = {
  children: React.ReactNode;
  pending?: boolean;
};

export function SubmitButton({ children, pending = false }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded bg-zinc-950 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Saving..." : children}
    </button>
  );
}

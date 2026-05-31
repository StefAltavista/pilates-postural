import { AdminHeader } from "@/components/admin/AdminHeader";

export function AdminPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <AdminHeader />
      <main className="mx-auto w-full max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}

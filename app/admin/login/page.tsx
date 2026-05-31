import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { getAdminSession } from "@/lib/auth/session";

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin/posts");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <section className="w-full max-w-sm rounded border bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-semibold">Admin login</h1>
        <LoginForm />
      </section>
    </main>
  );
}

import Link from "next/link";
import { logoutAction } from "@/lib/auth/actions";

export function AdminHeader() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link href="/admin/posts">Posts</Link>
          <Link href="/admin/categories">Categories</Link>
          <Link href="/" target="_blank">
            View site
          </Link>
        </nav>
        <form action={logoutAction}>
          <button type="submit" className="text-sm font-medium text-zinc-600 hover:text-zinc-950">
            Logout
          </button>
        </form>
      </div>
    </header>
  );
}

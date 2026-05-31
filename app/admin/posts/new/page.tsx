import Link from "next/link";
import { AdminPage } from "@/components/admin/AdminPage";
import { PostForm } from "@/components/admin/posts/PostForm";
import { requireAdmin } from "@/lib/auth/session";
import { getCategories } from "@/lib/data/categories";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  await requireAdmin();
  const categories = await getCategories();

  return (
    <AdminPage>
      <Link href="/admin/posts" className="text-sm font-medium underline">
        Posts
      </Link>
      <h1 className="mt-4 text-2xl font-semibold">New post</h1>
      {categories.length === 0 ? (
        <p className="mt-6 rounded border bg-white p-4 text-sm text-zinc-700">
          Create a category before writing posts.
        </p>
      ) : (
        <section className="mt-6 rounded border bg-white p-5">
          <PostForm categories={categories} />
        </section>
      )}
    </AdminPage>
  );
}

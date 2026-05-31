import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminPage } from "@/components/admin/AdminPage";
import { PostForm } from "@/components/admin/posts/PostForm";
import { requireAdmin } from "@/lib/auth/session";
import { getCategories } from "@/lib/data/categories";
import { getPostForEdit } from "@/lib/data/posts";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const [post, categories] = await Promise.all([getPostForEdit(id), getCategories()]);

  if (!post) {
    notFound();
  }

  return (
    <AdminPage>
      <Link href="/admin/posts" className="text-sm font-medium underline">
        Posts
      </Link>
      <h1 className="mt-4 text-2xl font-semibold">Edit post</h1>
      <section className="mt-6 rounded border bg-white p-5">
        <PostForm categories={categories} post={post} />
      </section>
    </AdminPage>
  );
}

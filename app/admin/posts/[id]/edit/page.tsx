import Link from "next/link";
import { notFound } from "next/navigation";
import Typography from "@mui/material/Typography";
import { AdminPage } from "@/components/admin/AdminPage";
import { PostForm } from "@/components/admin/posts/PostForm";
import { AppCard } from "@/components/common/AppCard";
import { createAdminCsrfToken } from "@/lib/auth/csrf";
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
  const [post, categories, csrfToken] = await Promise.all([
    getPostForEdit(id),
    getCategories(),
    createAdminCsrfToken(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <AdminPage>
      <Link href="/admin/posts" className="text-sm font-medium underline">
        Posts
      </Link>
      <Typography component="h1" variant="h4" sx={{ mt: 2 }}>Edit post</Typography>
      <AppCard component="section" sx={{ mt: 3, p: { xs: 2, sm: 3 } }}>
        <PostForm categories={categories} csrfToken={csrfToken} post={post} />
      </AppCard>
    </AdminPage>
  );
}

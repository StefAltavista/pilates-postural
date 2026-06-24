import Link from "next/link";
import { notFound } from "next/navigation";
import Typography from "@mui/material/Typography";
import { AdminPage } from "@/components/admin/AdminPage";
import { PostForm } from "@/components/admin/posts/PostForm";
import { AppCard } from "@/components/common/AppCard";
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
      <Typography component="h1" variant="h4" sx={{ mt: 2 }}>Edit post</Typography>
      <AppCard component="section" sx={{ mt: 3, p: { xs: 2, sm: 3 } }}>
        <PostForm categories={categories} post={post} />
      </AppCard>
    </AdminPage>
  );
}

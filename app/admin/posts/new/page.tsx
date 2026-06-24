import Link from "next/link";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { AdminPage } from "@/components/admin/AdminPage";
import { PostForm } from "@/components/admin/posts/PostForm";
import { AppCard } from "@/components/common/AppCard";
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
      <Typography component="h1" variant="h4" sx={{ mt: 2 }}>New post</Typography>
      {categories.length === 0 ? (
        <Alert severity="info" sx={{ mt: 3 }}>Create a category before writing posts.</Alert>
      ) : (
        <AppCard component="section" sx={{ mt: 3, p: { xs: 2, sm: 3 } }}>
          <PostForm categories={categories} />
        </AppCard>
      )}
    </AdminPage>
  );
}

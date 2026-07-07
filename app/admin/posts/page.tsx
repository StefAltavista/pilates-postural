import Link from "next/link";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { AdminPage } from "@/components/admin/AdminPage";
import { AppButton } from "@/components/common/AppButton";
import { deletePostAction } from "@/lib/actions/posts";
import { createAdminCsrfToken } from "@/lib/auth/csrf";
import { requireAdmin } from "@/lib/auth/session";
import { getAdminPosts } from "@/lib/data/posts";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  await requireAdmin();
  const [posts, csrfToken] = await Promise.all([getAdminPosts(), createAdminCsrfToken()]);

  return (
    <AdminPage>
      <Box sx={{ mb: 3, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
        <Typography component="h1" variant="h4">Posts</Typography>
        <AppButton href="/admin/posts/new">New post</AppButton>
      </Box>

      <TableContainer component={Paper} variant="outlined">
        <Table sx={{ minWidth: 720 }}>
          <TableHead sx={{ bgcolor: "surfaceAlt.main" }}>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell sx={{ fontWeight: 600 }}>{post.title}</TableCell>
                <TableCell>{post.category.name}</TableCell>
                <TableCell>{post.published ? "Published" : "Draft"}</TableCell>
                <TableCell>{formatDate(post.postDate)}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <Link href={`/admin/posts/${post.id}/edit`} className="font-medium underline">
                      Edit
                    </Link>
                    <form action={deletePostAction}>
                      <input type="hidden" name="id" value={post.id} />
                      <input type="hidden" name="csrfToken" value={csrfToken} />
                      <AppButton type="submit" color="error" variant="text" size="small">
                        Delete
                      </AppButton>
                    </form>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ color: "text.secondary", py: 5 }}>
                  No posts yet.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </AdminPage>
  );
}

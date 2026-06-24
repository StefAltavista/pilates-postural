import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { AdminPage } from "@/components/admin/AdminPage";
import { AppButton } from "@/components/common/AppButton";
import { CategoryForm } from "@/components/admin/categories/CategoryForm";
import { deleteCategoryAction } from "@/lib/actions/categories";
import { requireAdmin } from "@/lib/auth/session";
import { getCategoriesWithPostCount } from "@/lib/data/categories";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  await requireAdmin();
  const categories = await getCategoriesWithPostCount();

  return (
    <AdminPage>
      <Typography component="h1" variant="h4" sx={{ mb: 3 }}>Categories</Typography>
      <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { lg: "1fr 320px" } }}>
        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: 620 }}>
            <TableHead sx={{ bgcolor: "surfaceAlt.main" }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Slug</TableCell>
                <TableCell>Posts</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell sx={{ fontWeight: 600 }}>{category.name}</TableCell>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell>{category._count.posts}</TableCell>
                  <TableCell>{formatDate(category.createdAt)}</TableCell>
                  <TableCell>
                    {category._count.posts > 0 ? (
                      <Typography color="text.secondary" variant="body2">
                        Remove posts first
                      </Typography>
                    ) : (
                      <form action={deleteCategoryAction}>
                        <input type="hidden" name="id" value={category.id} />
                        <AppButton type="submit" color="error" variant="text" size="small">
                          Delete
                        </AppButton>
                      </form>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ color: "text.secondary", py: 5 }}>
                    No categories yet.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>
        <CategoryForm />
      </Box>
    </AdminPage>
  );
}

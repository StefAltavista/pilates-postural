import { AdminPage } from "@/components/admin/AdminPage";
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
      <h1 className="mb-6 text-2xl font-semibold">Categories</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="overflow-x-auto rounded border bg-white">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="border-b bg-zinc-50 text-zinc-600">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Posts</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{category.name}</td>
                  <td className="px-4 py-3">{category.slug}</td>
                  <td className="px-4 py-3">{category._count.posts}</td>
                  <td className="px-4 py-3">{formatDate(category.createdAt)}</td>
                  <td className="px-4 py-3">
                    {category._count.posts > 0 ? (
                      <span className="text-zinc-500">Remove posts first</span>
                    ) : (
                      <form action={deleteCategoryAction}>
                        <input type="hidden" name="id" value={category.id} />
                        <button type="submit" className="font-medium text-red-700 underline">
                          Delete
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-zinc-500">
                    No categories yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <CategoryForm />
      </div>
    </AdminPage>
  );
}

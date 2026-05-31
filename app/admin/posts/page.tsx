import Link from "next/link";
import { AdminPage } from "@/components/admin/AdminPage";
import { deletePostAction } from "@/lib/actions/posts";
import { requireAdmin } from "@/lib/auth/session";
import { getAdminPosts } from "@/lib/data/posts";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  await requireAdmin();
  const posts = await getAdminPosts();

  return (
    <AdminPage>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Posts</h1>
        <Link href="/admin/posts/new" className="rounded bg-zinc-950 px-4 py-2 text-sm font-medium text-white">
          New post
        </Link>
      </div>

      <div className="overflow-x-auto rounded border bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b bg-zinc-50 text-zinc-600">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Created</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b last:border-0">
                <td className="px-4 py-3 font-medium">{post.title}</td>
                <td className="px-4 py-3">{post.category.name}</td>
                <td className="px-4 py-3">{post.published ? "Published" : "Draft"}</td>
                <td className="px-4 py-3">{formatDate(post.createdAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/posts/${post.id}/edit`} className="font-medium underline">
                      Edit
                    </Link>
                    <form action={deletePostAction}>
                      <input type="hidden" name="id" value={post.id} />
                      <button type="submit" className="font-medium text-red-700 underline">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-zinc-500">
                  No posts yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </AdminPage>
  );
}

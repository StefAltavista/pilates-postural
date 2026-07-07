"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { verifyAdminMutation } from "@/lib/auth/csrf";
import { requireAdmin } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { categorySchema, type CategoryFormInput } from "@/lib/validation/schemas";

export type CategoryActionState = {
  ok?: boolean;
  message?: string;
  errors?: Partial<Record<keyof CategoryFormInput | "form", string[]>>;
};

function revalidateCategoryPaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/news");
  revalidatePath("/admin/categories");
  revalidatePath("/admin/posts");

  if (slug) {
    revalidatePath(`/category/${slug}`);
  }
}

function getCategoryError(error: unknown): CategoryActionState {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    return { errors: { slug: ["That slug is already in use."] } };
  }

  return { errors: { form: ["Something went wrong. Please try again."] } };
}

export async function createCategoryAction(
  input: CategoryFormInput,
): Promise<CategoryActionState> {
  await requireAdmin();

  if (!(await verifyAdminMutation(input.csrfToken))) {
    return { errors: { form: ["The category request could not be verified. Refresh and try again."] } };
  }

  const parsed = categorySchema.safeParse(input);

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  try {
    const category = await prisma.category.create({ data: parsed.data });
    revalidateCategoryPaths(category.slug);
  } catch (error) {
    return getCategoryError(error);
  }

  return { ok: true, message: "Category created." };
}

export async function deleteCategoryAction(formData: FormData) {
  await requireAdmin();

  if (!(await verifyAdminMutation(formData.get("csrfToken")))) {
    return;
  }

  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  const category = await prisma.category.findUnique({
    where: { id },
    include: { _count: { select: { posts: true } } },
  });

  if (!category) {
    return;
  }

  if (category._count.posts > 0) {
    revalidatePath("/admin/categories");
    return;
  }

  await prisma.category.delete({ where: { id } });
  revalidateCategoryPaths(category.slug);
}

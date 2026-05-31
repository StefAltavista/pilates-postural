"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { postSchema, type PostFormInput } from "@/lib/validation/schemas";

export type PostActionState = {
  ok?: boolean;
  message?: string;
  errors?: Partial<Record<keyof PostFormInput | "form", string[]>>;
};

function revalidatePostPaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/posts");
  revalidatePath("/admin/posts");

  if (slug) {
    revalidatePath(`/posts/${slug}`);
  }
}

function getPostError(error: unknown): PostActionState {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    return { errors: { slug: ["That slug is already in use."] } };
  }

  return { errors: { form: ["Something went wrong. Please try again."] } };
}

export async function createPostAction(input: PostFormInput): Promise<PostActionState> {
  await requireAdmin();

  const parsed = postSchema.safeParse(input);

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  try {
    const post = await prisma.post.create({ data: parsed.data });
    revalidatePostPaths(post.slug);
  } catch (error) {
    return getPostError(error);
  }

  redirect("/admin/posts");
}

export async function updatePostAction(
  id: string,
  input: PostFormInput,
): Promise<PostActionState> {
  await requireAdmin();

  const parsed = postSchema.safeParse(input);

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  try {
    const previous = await prisma.post.findUnique({ where: { id }, select: { slug: true } });

    if (!previous) {
      return { errors: { form: ["Post not found."] } };
    }

    const post = await prisma.post.update({
      where: { id },
      data: parsed.data,
    });

    revalidatePostPaths(previous.slug);
    revalidatePostPaths(post.slug);
  } catch (error) {
    return getPostError(error);
  }

  redirect("/admin/posts");
}

export async function deletePostAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  const post = await prisma.post.delete({
    where: { id },
    select: { slug: true },
  });

  revalidatePostPaths(post.slug);
}

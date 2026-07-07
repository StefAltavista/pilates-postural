"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { verifyAdminMutation } from "@/lib/auth/csrf";
import { requireAdmin } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { deleteMediaIfUnreferenced } from "@/lib/media/service";
import { postSchema, type PostFormInput } from "@/lib/validation/schemas";

export type PostActionState = {
  ok?: boolean;
  message?: string;
  errors?: Partial<Record<keyof PostFormInput | "form", string[]>>;
};

function revalidatePostPaths(categorySlug?: string, slug?: string) {
  revalidatePath("/");
  revalidatePath("/news");
  revalidatePath("/admin/posts");

  if (categorySlug) {
    revalidatePath(`/category/${categorySlug}`);
  }
  if (categorySlug && slug) {
    revalidatePath(`/${categorySlug}/${slug}`);
  }
}

async function cleanUpMedia(mediaIds: Array<string | null | undefined>) {
  await Promise.all(
    [...new Set(mediaIds.filter((id): id is string => Boolean(id)))].map(async (mediaId) => {
      try {
        await deleteMediaIfUnreferenced(mediaId);
      } catch (error) {
        console.error(`Failed to clean up media ${mediaId}.`, error);
      }
    }),
  );
}

function getPostError(error: unknown): PostActionState {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    return { errors: { slug: ["That slug is already in use."] } };
  }

  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2003"
  ) {
    return { errors: { images: ["One of the selected images no longer exists."] } };
  }

  return { errors: { form: ["Something went wrong. Please try again."] } };
}

export async function createPostAction(input: PostFormInput): Promise<PostActionState> {
  await requireAdmin();

  if (!(await verifyAdminMutation(input.csrfToken))) {
    return { errors: { form: ["The post request could not be verified. Refresh and try again."] } };
  }

  const parsed = postSchema.safeParse(input);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { images, ...postData } = parsed.data;
  const duplicate = await prisma.post.findUnique({
    where: { slug: postData.slug },
    select: { id: true },
  });
  if (duplicate) {
    return { errors: { slug: ["That slug is already in use."] } };
  }

  try {
    const post = await prisma.post.create({
      data: {
        ...postData,
        images: {
          create: images.map((image, position) => ({ ...image, position })),
        },
      },
      include: { category: { select: { slug: true } } },
    });
    revalidatePostPaths(post.category.slug, post.slug);
  } catch (error) {
    await cleanUpMedia(images.map((image) => image.mediaId));
    return getPostError(error);
  }

  redirect("/admin/posts");
}

export async function updatePostAction(
  id: string,
  input: PostFormInput,
): Promise<PostActionState> {
  await requireAdmin();

  if (!(await verifyAdminMutation(input.csrfToken))) {
    return { errors: { form: ["The post request could not be verified. Refresh and try again."] } };
  }

  const parsed = postSchema.safeParse(input);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { images, ...postData } = parsed.data;
  const duplicate = await prisma.post.findFirst({
    where: { slug: postData.slug, NOT: { id } },
    select: { id: true },
  });
  if (duplicate) {
    return { errors: { slug: ["That slug is already in use."] } };
  }

  const previous = await prisma.post.findUnique({
    where: { id },
    select: {
      slug: true,
      category: { select: { slug: true } },
      images: { select: { mediaId: true } },
    },
  });

  if (!previous) {
    await cleanUpMedia(images.map((image) => image.mediaId));
    return { errors: { form: ["Post not found."] } };
  }

  try {
    const post = await prisma.$transaction(async (tx) => {
      await tx.postImage.deleteMany({ where: { postId: id } });
      const updated = await tx.post.update({
        where: { id },
        data: postData,
        include: { category: { select: { slug: true } } },
      });
      if (images.length) {
        await tx.postImage.createMany({
          data: images.map((image, position) => ({
            postId: id,
            mediaId: image.mediaId,
            title: image.title,
            position,
          })),
        });
      }
      return updated;
    });

    const currentIds = new Set(images.map((image) => image.mediaId));
    await cleanUpMedia(
      previous.images
        .map((image) => image.mediaId)
        .filter((mediaId) => !currentIds.has(mediaId)),
    );

    revalidatePostPaths(previous.category.slug, previous.slug);
    revalidatePostPaths(post.category.slug, post.slug);
  } catch (error) {
    await cleanUpMedia(images.map((image) => image.mediaId));
    return getPostError(error);
  }

  redirect("/admin/posts");
}

export async function deletePostAction(formData: FormData) {
  await requireAdmin();
  if (!(await verifyAdminMutation(formData.get("csrfToken")))) {
    return;
  }

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const post = await prisma.post.delete({
    where: { id },
    select: {
      slug: true,
      category: { select: { slug: true } },
      images: { select: { mediaId: true } },
    },
  });

  await cleanUpMedia(post.images.map((image) => image.mediaId));
  revalidatePostPaths(post.category.slug, post.slug);
}

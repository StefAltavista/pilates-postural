import "server-only";

import { cache } from "react";
import { prisma } from "@/lib/prisma";

export function getPublishedPosts() {
  return prisma.post.findMany({
    where: { published: true },
    include: {
      category: true,
      images: { include: { media: true }, orderBy: { position: "asc" } },
    },
    orderBy: { postDate: "desc" },
  });
}

export const getPublishedPostByPath = cache(function getPublishedPostByPath(
  categorySlug: string,
  postSlug: string,
) {
  return prisma.post.findFirst({
    where: { slug: postSlug, published: true, category: { slug: categorySlug } },
    include: {
      category: true,
      images: { include: { media: true }, orderBy: { position: "asc" } },
    },
  });
});

export function getAdminPosts() {
  return prisma.post.findMany({
    include: {
      category: true,
      images: { include: { media: true }, orderBy: { position: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export function getPostForEdit(id: string) {
  return prisma.post.findUnique({
    where: { id },
    include: {
      images: { include: { media: true }, orderBy: { position: "asc" } },
    },
  });
}

export const getPublishedPostsByCategorySlug = cache(function getPublishedPostsByCategorySlug(
  slug: string,
) {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      posts: {
        where: { published: true },
        include: {
          category: true,
          images: { include: { media: true }, orderBy: { position: "asc" } },
        },
        orderBy: { postDate: "desc" },
      },
    },
  });
});

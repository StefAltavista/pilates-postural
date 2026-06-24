import "server-only";

import { cache } from "react";
import { prisma } from "@/lib/prisma";

export function getPublishedPosts() {
  return prisma.post.findMany({
    where: { published: true },
    include: { category: true, media: true },
    orderBy: { createdAt: "desc" },
  });
}

export const getPublishedPostBySlug = cache(function getPublishedPostBySlug(slug: string) {
  return prisma.post.findFirst({
    where: { slug, published: true },
    include: { category: true, media: true },
  });
});

export function getAdminPosts() {
  return prisma.post.findMany({
    include: { category: true, media: true },
    orderBy: { createdAt: "desc" },
  });
}

export function getPostForEdit(id: string) {
  return prisma.post.findUnique({
    where: { id },
    include: { media: true },
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
        include: { category: true, media: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });
});

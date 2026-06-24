import "server-only";

import { prisma } from "@/lib/prisma";

export function getPublishedPosts() {
  return prisma.post.findMany({
    where: { published: true },
    include: { category: true, media: true },
    orderBy: { createdAt: "desc" },
  });
}

export function getLatestPublishedPosts(take = 5) {
  return prisma.post.findMany({
    where: { published: true },
    include: { category: true, media: true },
    orderBy: { createdAt: "desc" },
    take,
  });
}

export function getPublishedPostBySlug(slug: string) {
  return prisma.post.findFirst({
    where: { slug, published: true },
    include: { category: true, media: true },
  });
}

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

export function getPublishedPostsByCategorySlug(slug: string) {
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
}

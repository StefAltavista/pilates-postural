import "server-only";

import { prisma } from "@/lib/prisma";

export function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

export function getCategoriesWithPostCount() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });
}

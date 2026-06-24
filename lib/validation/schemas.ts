import { z } from "zod";
import { normalizeSlug } from "./slug";

const slugSchema = z
  .string()
  .trim()
  .min(1, "Slug is required")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only");

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const postFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  slug: z.string().trim().optional(),
  excerpt: z.string().trim().optional(),
  content: z.string().trim().min(1, "Content is required"),
  coverImage: z.string().trim().optional(),
  mediaId: z.string().trim().optional(),
  published: z.boolean().default(false),
  categoryId: z.string().trim().min(1, "Category is required"),
});

export const postSchema = postFormSchema
  .transform((value) => ({
    ...value,
    slug: normalizeSlug(value.slug ?? "", value.title),
    excerpt: value.excerpt || null,
    coverImage: value.coverImage || null,
    mediaId: value.mediaId || null,
  }))
  .pipe(
    z.object({
      title: z.string().min(1),
      slug: slugSchema,
      excerpt: z.string().nullable(),
      content: z.string().min(1),
      coverImage: z.string().nullable(),
      mediaId: z.string().uuid("The selected image is invalid.").nullable(),
      published: z.boolean(),
      categoryId: z.string().min(1),
    }),
  );

export const categoryFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  slug: z.string().trim().optional(),
});

export const categorySchema = categoryFormSchema
  .transform((value) => ({
    name: value.name,
    slug: normalizeSlug(value.slug ?? "", value.name),
  }))
  .pipe(
    z.object({
      name: z.string().min(1),
      slug: slugSchema,
    }),
  );

export type LoginInput = z.input<typeof loginSchema>;
export type PostFormInput = z.input<typeof postFormSchema>;
export type CategoryFormInput = z.input<typeof categoryFormSchema>;

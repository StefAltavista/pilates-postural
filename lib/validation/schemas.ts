import { z } from "zod";
import { normalizeSlug } from "./slug";

const slugSchema = z
  .string()
  .trim()
  .min(1, "Slug is required")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only");

const postDateSchema = z
  .string()
  .min(1, "Date is required")
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid date");

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const postFormSchema = z.object({
  csrfToken: z.string().min(1, "Security token is required"),
  title: z.string().trim().min(1, "Title is required"),
  slug: z.string().trim().optional(),
  excerpt: z.string().trim().optional(),
  content: z.string().trim().min(1, "Content is required"),
  postDate: postDateSchema,
  images: z
    .array(
      z.object({
        mediaId: z.string().uuid("The selected image is invalid."),
        title: z.string().trim().min(1, "Image title is required").max(160),
      }),
    )
    .max(5, "A post can have at most 5 images")
    .refine(
      (images) => new Set(images.map((image) => image.mediaId)).size === images.length,
      "The same image cannot be added more than once",
    ),
  published: z.boolean().default(false),
  categoryId: z.string().trim().min(1, "Category is required"),
});

export const postSchema = postFormSchema
  .transform((value) => ({
    slug: normalizeSlug(value.slug ?? "", value.title),
    title: value.title,
    excerpt: value.excerpt || null,
    content: value.content,
    postDate: new Date(`${value.postDate}T12:00:00.000Z`),
    images: value.images,
    published: value.published,
    categoryId: value.categoryId,
  }))
  .pipe(
    z.object({
      title: z.string().min(1),
      slug: slugSchema,
      excerpt: z.string().nullable(),
      content: z.string().min(1),
      postDate: z.date(),
      images: z.array(
        z.object({
          mediaId: z.string().uuid(),
          title: z.string().min(1).max(160),
        }),
      ).max(5),
      published: z.boolean(),
      categoryId: z.string().min(1),
    }),
  );

export const categoryFormSchema = z.object({
  csrfToken: z.string().min(1, "Security token is required"),
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

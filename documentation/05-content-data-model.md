# Content Data Model

## Concept

The content model centers on posts and categories, with a separate media library
and ordered post-image join records. Posts are routed by their category slug plus
their own slug.

## Prisma Models

### Category

Short description: Categories group posts and provide archive slugs.

Specific implementation:

- Path: `prisma/schema.prisma`.
- Fields:
  - `id`: `String @id @default(cuid())`.
  - `name`: display name.
  - `slug`: unique URL slug.
  - `createdAt`, `updatedAt`: timestamps.
  - `posts`: relation to `Post[]`.
- Interactions:
  - `Post.categoryId` references `Category.id`.
  - `onDelete: Restrict` prevents deleting categories that still have posts.
  - `getPublishedPostsByCategorySlug` finds categories by slug.
  - `createCategoryAction` and `deleteCategoryAction` mutate categories.

### Post

Short description: Posts hold the editorial text, publishing status, URL slug,
date, category, and related ordered images.

Specific implementation:

- Path: `prisma/schema.prisma`.
- Fields:
  - `id`: `String @id @default(cuid())`.
  - `title`: post title.
  - `slug`: unique post slug.
  - `excerpt`: optional summary.
  - `content`: full body text.
  - `postDate`: public date used for sorting and display.
  - `published`: boolean, default `false`.
  - `categoryId`: relation foreign key.
  - `createdAt`, `updatedAt`: timestamps.
  - `images`: relation to `PostImage[]`.
- Indexes:
  - `@@index([categoryId])`.
  - `@@index([published, postDate])`.
- Interactions:
  - Public reads filter by `published: true`.
  - Admin reads include drafts.
  - Public detail route requires both `Post.slug` and `Category.slug`.
  - Images are represented through `PostImage` and `Media`; the legacy `coverImage` column has been removed.

### Media

Short description: Media records describe one uploaded image and the generated
WebP renditions on disk.

Specific implementation:

- Path: `prisma/schema.prisma`.
- Fields:
  - `id`: UUID string used as both database ID and media folder name.
  - `originalUrl`, `largeUrl`, `mediumUrl`, `thumbnailUrl`: public paths under `/uploads/media/[id]`.
  - `width`, `height`: dimensions of the processed original WebP.
  - `mimeType`: currently stored as `image/webp`.
  - `sizeBytes`: size of the processed original WebP.
  - `createdAt`: timestamp.
  - `postImages`: relation to `PostImage[]`.
- Interactions:
  - Created by `createMediaFromFile`.
  - Deleted by `deleteMediaIfUnreferenced` only when no `PostImage` rows reference it.

### PostImage

Short description: PostImage links a post to a media asset with a display title
and explicit ordering.

Specific implementation:

- Path: `prisma/schema.prisma`.
- Fields:
  - `id`: `String @id @default(cuid())`.
  - `postId`: references `Post.id`, cascade delete.
  - `mediaId`: references `Media.id`, restrict delete.
  - `title`: public alt/title text.
  - `position`: order within a post.
  - `createdAt`: timestamp.
- Constraints:
  - `@@unique([postId, mediaId])` prevents attaching the same media twice to one post.
  - `@@unique([postId, position])` prevents duplicate positions.
  - `@@index([mediaId])`.
- Interactions:
  - Created nested in `createPostAction`.
  - Recreated in `updatePostAction` after deleting prior image rows.
  - Cascades away when `deletePostAction` deletes a post.

## Data Readers

Short description: Data readers are server-only Prisma queries used by pages and
metadata generators.

Specific implementation:

- `getPublishedPosts` in `lib/data/posts.ts`
  - Returns all published posts.
  - Includes category and ordered image/media data.
  - Orders by `postDate` descending.
  - Used by `app/(public)/news/page.tsx`.
- `getPublishedPostByPath(categorySlug, postSlug)` in `lib/data/posts.ts`
  - Cached with `react.cache`.
  - Finds a published post by post slug and category slug.
  - Includes category and ordered image/media data.
  - Used by the post detail page and its `generateMetadata`.
- `getAdminPosts` in `lib/data/posts.ts`
  - Returns all posts including drafts.
  - Includes category and ordered image/media data.
  - Orders by `createdAt` descending.
  - Used by `app/admin/posts/page.tsx`.
- `getPostForEdit(id)` in `lib/data/posts.ts`
  - Finds a post by ID.
  - Includes ordered images/media.
  - Used by `app/admin/posts/[id]/edit/page.tsx`.
- `getPublishedPostsByCategorySlug(slug)` in `lib/data/posts.ts`
  - Cached with `react.cache`.
  - Finds a category by slug.
  - Includes only published posts, each with category and ordered images/media.
  - Used by the category page and its `generateMetadata`.
- `getCategories` in `lib/data/categories.ts`
  - Returns all categories ordered by name.
  - Used by post creation/edit forms.
- `getCategoriesWithPostCount` in `lib/data/categories.ts`
  - Returns categories with `_count.posts`.
  - Used by the admin categories page.

## Validation And Normalization

Short description: Zod schemas define browser form validation and stricter server
mutation validation/transforms.

Specific implementation:

- `slugify` in `lib/validation/slug.ts`
  - Lowercases text.
  - Trims spaces.
  - Removes quotes.
  - Replaces non-alphanumeric runs with hyphens.
  - Trims leading/trailing hyphens.
- `normalizeSlug` in `lib/validation/slug.ts`
  - Slugifies the explicit slug or falls back to slugifying another value.
- `loginSchema` in `lib/validation/schemas.ts`
  - Requires username and password.
- `postFormSchema` in `lib/validation/schemas.ts`
  - Validates the client-facing post form.
  - Requires title, content, date, category.
  - Allows optional slug and excerpt.
  - Requires each image to have UUID `mediaId` and title.
  - Limits images to 5 and prevents duplicate media IDs.
- `postSchema` in `lib/validation/schemas.ts`
  - Transforms `postFormSchema`.
  - Normalizes slug.
  - Converts blank excerpt to `null`.
  - Converts `YYYY-MM-DD` into a noon UTC `Date`.
  - Pipes into the final persistence shape.
- `categoryFormSchema` in `lib/validation/schemas.ts`
  - Validates name and optional slug.
- `categorySchema` in `lib/validation/schemas.ts`
  - Normalizes slug from explicit slug or name.

## Cache Revalidation

Short description: Mutations revalidate public and admin routes that could show
changed data.

Specific implementation:

- `revalidatePostPaths` in `lib/actions/posts.ts`
  - Revalidates `/`, `/news`, `/admin/posts`.
  - Revalidates `/category/[categorySlug]` when category slug is known.
  - Revalidates `/[categorySlug]/[slug]` when both category and post slug are known.
  - Called after create, update, and delete post actions.
- `revalidateCategoryPaths` in `lib/actions/categories.ts`
  - Revalidates `/`, `/news`, `/admin/categories`, and `/admin/posts`.
  - Revalidates `/category/[slug]` when slug is known.
  - Called after category creation/deletion.

## Formatting

Short description: Dates are formatted in a single utility.

Specific implementation:

- `formatDate` in `lib/format.ts`
  - Accepts a `Date`.
  - Used by public post pages, public lists, admin posts, and admin categories.

# Media Pipeline

## Concept

The media pipeline lets an admin upload images while editing a post. Each upload
is validated, converted to WebP, resized into multiple versions, stored under
`public/uploads/media/[mediaId]`, inserted into the `Media` table, and later
attached to a post through `PostImage` rows.

## Upload API

Short description: `/admin/api/upload` is an authenticated route handler for
temporary media creation and best-effort deletion of unused media.

Specific implementation:

- File: `app/admin/api/upload/route.ts`.
- `export const runtime = "nodejs"`
  - Required because image processing uses Node APIs and Sharp.
- `POST(request)`
  - Calls `requireAdmin`.
  - Parses `request.formData()`.
  - Requires a non-empty `File` under the `file` key.
  - Calls `createMediaFromFile(file)`.
  - Returns the created media JSON with status `201`.
  - Converts `MediaError` into JSON error responses.
- `DELETE(request)`
  - Calls `requireAdmin`.
  - Parses JSON `{ id }`.
  - Calls `deleteMediaIfUnreferenced(id)`.
  - Returns `{ deleted: boolean }`.
  - Rejects invalid media IDs with status `400`.

## Image Processing

Short description: Uploaded images are normalized to WebP and resized into a
fixed set of renditions.

Specific implementation:

- File: `lib/media/service.ts`.
- Constants:
  - `MEDIA_ROOT`: `public/uploads/media`.
  - `MEDIA_URL_ROOT`: `/uploads/media`.
  - `MAX_FILE_SIZE`: 5 MB.
  - `ALLOWED_TYPES`: JPEG, PNG, WebP, AVIF.
  - `versions`: `large` at 1600px, `medium` at 960px, `thumbnail` at 320px.
- `createMediaFromFile(file)`
  - Rejects missing, unsupported, or oversized files with `MediaError`.
  - Generates a UUID media ID.
  - Creates a temporary folder named `.tmp-[mediaId]-[uuid]`.
  - Converts the uploaded file to `original.webp` with Sharp.
  - Creates `large.webp`, `medium.webp`, and `thumbnail.webp`.
  - Reads dimensions and file size from `original.webp`.
  - Renames the temporary folder to the final media folder.
  - Creates a `Media` database row through `prisma.media.create`.
  - Removes written files when database insertion fails.
  - Removes the temporary folder when processing fails.
- `MediaError`
  - Encodes known error codes such as `MISSING_IMAGE`, `UNSUPPORTED_FILE_TYPE`, `FILE_TOO_LARGE`, `PROCESSING_FAILED`, and `WRITE_FAILED`.

## Admin Form Integration

Short description: The post form uploads files before the post is saved, then
stores returned media IDs in the form state.

Specific implementation:

- File: `components/admin/posts/PostForm.tsx`.
- `MAX_POST_IMAGES`
  - Limits each post to 5 images.
- `mediaById` state
  - Stores returned `NormalizedMedia` objects by ID for thumbnails and dimensions.
  - Initializes from existing post images when editing.
- `uploadOne(file)`
  - Sends the file to `POST /admin/api/upload`.
  - Converts returned `createdAt` string back to a `Date`.
  - Throws a user-facing error on failure.
- `uploadImages(selectedFiles)`
  - Slices selected files to the remaining image slots.
  - Uploads files sequentially.
  - Adds returned media to `mediaById`.
  - Appends `{ mediaId, title }` to the `images` field array.
- `removeImage(index, mediaId)`
  - Removes the field array item.
  - Removes the media from local `mediaById`.
  - Calls `removeUnreferencedMedia(mediaId)` best-effort.
- `removeUnreferencedMedia(id)`
  - Calls `DELETE /admin/api/upload`.
  - If the media is already attached to a saved post, deletion is skipped by the server and cleanup happens after the post update.

## Persistence And Attachment

Short description: Uploading creates a standalone media record; saving a post
attaches selected media to that post in order.

Specific implementation:

- `createPostAction` in `lib/actions/posts.ts`
  - Receives `images` from `postSchema`.
  - Creates nested `PostImage` rows with `position` based on array order.
- `updatePostAction` in `lib/actions/posts.ts`
  - Reads previous media IDs.
  - Deletes all current `PostImage` rows in a transaction.
  - Updates the `Post`.
  - Recreates `PostImage` rows with new titles and positions.
  - Deletes previous media records only if those media IDs are no longer used.
- `deletePostAction` in `lib/actions/posts.ts`
  - Deletes the post.
  - `PostImage` rows are cascade-deleted by Prisma relation.
  - Calls cleanup for the deleted post's media IDs.

## Cleanup Rules

Short description: Media files are deleted only when their database media record
can be deleted without breaking post image references.

Specific implementation:

- `assertSafeMediaId(mediaId)` in `lib/media/service.ts`
  - Allows only letters, numbers, underscores, and hyphens.
  - Protects filesystem cleanup paths from unsafe IDs.
- `deleteMediaIfUnreferenced(mediaId)` in `lib/media/service.ts`
  - Returns `false` for empty media IDs.
  - Deletes from `Media` only where `postImages: { none: {} }`.
  - If no row was deleted, leaves files untouched and returns `false`.
  - If the row was deleted, calls `deleteMediaFolder(mediaId)` and returns `true`.
- `deleteMediaFolder(mediaId)` in `lib/media/service.ts`
  - Validates ID.
  - Removes `public/uploads/media/[mediaId]` recursively with force.
- `cleanupPath(target, mediaId)` in `lib/media/service.ts`
  - Logs cleanup failures but does not throw.

## Public Rendering

Short description: Public pages choose the smallest useful rendition for each
display context.

Specific implementation:

- `PostList` in `components/public/PostList.tsx`
  - Uses the first post image thumbnail for archive/list previews.
  - Shows a placeholder when no post image exists.
- `NewsFeed` in `components/public/news/NewsFeed.tsx`
  - Uses `ImageDotCarousel` with medium images when post images exist.
  - Shows a placeholder when no post image exists.
- `PostPage` in `app/(public)/[category]/[slug]/page.tsx`
  - Uses `PostModalImage` for the first image.
  - Uses `ImageDotCarousel` for remaining images.
  - Renders no image area when a post has no attached images.
- `PostModalImage` in `components/public/posts/PostModalImage.tsx`
  - Shows medium image inline.
  - Shows large image in the modal dialog.

## Media Type Definitions

Short description: Shared media shapes keep admin form data aligned with API
responses and Prisma includes.

Specific implementation:

- File: `lib/media/types.ts`.
- `NormalizedMedia`
  - Mirrors the fields returned by the `Media` model.
- `PostImage`
  - Contains `id`, `title`, `position`, and nested `media`.
  - Used by `PostForm` when editing existing posts.

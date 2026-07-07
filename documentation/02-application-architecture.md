# Application Architecture

## Concept

The app uses Next.js App Router route groups to separate public pages from admin
pages. Server components fetch data and enforce authentication; client components
handle forms, uploads, consent state, carousels, and dialogs. Shared libraries
contain Prisma access, server actions, validation, media handling, auth, SEO, and
policy loading.

## Top-Level Structure

Short description: Source is grouped by runtime purpose rather than by feature
alone.

Specific paths:

- `app/`: Next.js App Router pages, layouts, loading/error boundaries, and route handlers.
- `components/`: UI components split into `admin`, `common`, `consent`, `cookie`, `layout`, and `public`.
- `lib/`: server and client support libraries for data, actions, auth, media, validation, consent, policies, Prisma, and formatting.
- `seo/`: metadata input types, site configuration, and metadata builders.
- `theme/`: Material UI palette, typography, component overrides, and theme module declarations.
- `prisma/`: Prisma schema and migrations.
- `public/`: public assets, policy Markdown files, and uploaded media files.
- `scripts/`: operational helpers such as password hashing.

## App Router Layout Flow

Short description: The root layout installs global providers. The public route
group adds public navigation, footer, and cookie controls around public pages.
Admin pages use their own page wrapper component instead of a route-group layout.

Specific implementation:

- `app/layout.tsx` exports `RootLayout`.
  - Sets `metadataBase`, default title, and default description using `siteConfig`.
  - Imports `app/globals.css`.
  - Wraps all children in `AppProviders`.
- `app/providers.tsx` exports `AppProviders`.
  - Uses `AppRouterCacheProvider` from `@mui/material-nextjs/v16-appRouter`.
  - Installs the MUI `ThemeProvider` with `theme`.
  - Adds `CssBaseline`.
- `app/(public)/layout.tsx` exports `PublicLayout`.
  - Wraps public content with `PublicHeader`, a `main#main-content`, `PublicFooter`, and `CookieBanner`.
- `components/admin/AdminPage.tsx` exports `AdminPage`.
  - Admin pages compose this manually to add `AdminHeader` and a constrained main container.

## Server And Client Boundaries

Short description: Server-only data and mutation code stays in `lib`, while
browser state and interaction lives in client components.

Specific implementation:

- Server-only modules:
  - `lib/data/posts.ts` and `lib/data/categories.ts` import `server-only` and read from Prisma.
  - `lib/auth/session.ts` imports `server-only`, reads/writes cookies, and redirects unauthenticated users.
  - `lib/media/service.ts` imports `server-only`, uses Sharp and the filesystem.
  - `lib/policies/getPolicyContent.ts` imports `server-only` and reads files.
- Server actions:
  - `lib/actions/posts.ts` starts with `"use server"` and handles authenticated post mutations.
  - `lib/actions/categories.ts` starts with `"use server"` and handles authenticated category mutations.
  - `lib/auth/actions.ts` starts with `"use server"` and handles login/logout.
- Client components:
  - `components/admin/posts/PostForm.tsx` handles React Hook Form state and media upload UI.
  - `components/admin/categories/CategoryForm.tsx` handles category form state.
  - `components/admin/LoginForm.tsx` uses `useActionState`.
  - `components/public/ImageDotCarousel.tsx` handles scroll state.
  - `components/public/posts/PostModalImage.tsx` handles modal state.
  - `components/cookie/CookieBanner.tsx` and `components/consent/GoogleMapsEmbed.tsx` use browser consent state.

## Shared Data Flow

Short description: Page modules fetch data, pass plain objects into components,
and server actions mutate data then revalidate affected routes.

Specific interactions:

1. Public list request:
   - `app/(public)/news/page.tsx` calls `getPublishedPosts`.
   - `getPublishedPosts` in `lib/data/posts.ts` queries `prisma.post.findMany` where `published: true`.
   - The result includes `category` and ordered `images.media`.
   - `NewsPage` passes posts to `NewsFeed`.

2. Public detail request:
   - `app/(public)/[category]/[slug]/page.tsx` calls `getPublishedPostByPath(category, slug)`.
   - `getPublishedPostByPath` uses `react.cache` to memoize within the render.
   - The page maps Prisma `PostImage` records into `PostDisplayImage` objects for `PostModalImage` and `ImageDotCarousel`.

3. Admin write request:
   - `PostForm` submits values to `createPostAction` or `updatePostAction`.
   - The server action calls `requireAdmin`.
   - It validates with `postSchema`.
   - It writes through Prisma.
   - It calls `revalidatePostPaths` to refresh public and admin pages.
   - It redirects to `/admin/posts` on success.

4. Media upload request:
   - `PostForm.uploadOne` sends a `FormData` file to `POST /admin/api/upload`.
   - The route handler calls `requireAdmin`, then `createMediaFromFile`.
   - `createMediaFromFile` writes processed files and creates a `Media` row.
   - `PostForm` stores the returned media by ID and appends an `images` form field.

## Routing And Dynamic Behavior

Short description: Database-backed routes opt into dynamic rendering so public
and admin pages reflect current database state.

Specific implementation:

- `export const dynamic = "force-dynamic"` is set in:
  - `app/(public)/news/page.tsx`
  - `app/(public)/category/[slug]/page.tsx`
  - `app/(public)/[category]/[slug]/page.tsx`
  - `app/admin/posts/page.tsx`
  - `app/admin/posts/new/page.tsx`
  - `app/admin/posts/[id]/edit/page.tsx`
  - `app/admin/categories/page.tsx`
- Server actions still call `revalidatePath` so cached paths are refreshed if caching behavior changes.

## Error, Loading, And Empty States

Short description: The public route group has simple loading/error screens, and
shared components handle empty/error/loading UI inside pages.

Specific implementation:

- `app/(public)/loading.tsx` renders `LoadingState`.
- `app/(public)/error.tsx` renders a client error boundary UI.
- `components/common/EmptyState.tsx` renders reusable empty-list messages.
- `components/common/ErrorState.tsx` renders reusable MUI alert errors.
- `components/common/LoadingState.tsx` renders a spinner with an accessible busy state.


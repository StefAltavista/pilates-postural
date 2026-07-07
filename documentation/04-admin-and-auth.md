# Admin And Auth

## Concept

The admin section is a simple single-admin CMS. It authenticates against
environment variables, signs a short JSON payload with HMAC, stores it in an
HTTP-only cookie, and protects every admin page/action with `requireAdmin`.

## Authentication Flow

Short description: Login validates submitted fields, checks the configured admin
username and bcrypt password hash, then creates a signed cookie session.

Specific implementation:

- Login UI: `components/admin/LoginForm.tsx`.
  - Uses `useActionState(loginAction, {})`.
  - Posts `email` and `password` fields to `loginAction`.
  - Displays field and form errors returned by the action.
- Login page: `app/admin/login/page.tsx`.
  - Calls `getAdminSession`.
  - Redirects authenticated users to `/admin/posts`.
  - Renders `LoginForm` inside `AppCard`.
- Login action: `loginAction` in `lib/auth/actions.ts`.
  - Verifies the request origin with `verifySameOriginRequest`.
  - Validates input with `loginSchema` from `lib/validation/schemas.ts`.
  - Applies in-memory rate limiting through `lib/auth/rateLimit.ts`.
  - Reads `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH`.
  - Confirms the hash matches `BCRYPT_HASH_PATTERN`.
  - Compares username case-insensitively.
  - Uses `bcrypt.compare` for the password.
  - Calls `createAdminSession(adminEmail)`.
  - Redirects to `/admin/posts`.
- Logout action: `logoutAction` in `lib/auth/actions.ts`.
  - Verifies the admin CSRF token with `verifyAdminMutation`.
  - Calls `clearAdminSession`.
  - Redirects to `/admin/login`.

## Session Handling

Short description: Sessions are self-contained signed tokens in an HTTP-only
cookie named `admin_session`.

Specific implementation:

- File: `lib/auth/session.ts`.
- `getSessionSecret`
  - Reads `SESSION_SECRET`.
  - Throws if missing or shorter than 32 characters.
- `createAdminSession(email)`
  - Builds a payload with `email`, `expiresAt`, and random `nonce`.
  - Base64url-encodes the JSON payload.
  - Signs the encoded payload with HMAC SHA-256.
  - Stores `payload.signature` in `admin_session`.
  - Cookie settings: `httpOnly`, `sameSite: "lax"`, path `/`, 7-day max age, secure in production.
- `getAdminSession`
  - Reads the cookie.
  - Verifies the HMAC signature.
  - Rejects expired sessions.
  - Rejects sessions whose email no longer matches `ADMIN_EMAIL`.
- `requireAdmin`
  - Calls `getAdminSession`.
  - Redirects to `/admin/login` when no valid session exists.
  - Returns the session for authenticated requests.

## CSRF And Rate Limiting

Short description: Admin mutations require same-origin requests and signed
per-session CSRF tokens. Login attempts are throttled in memory.

Specific implementation:

- `lib/auth/csrf.ts`
  - `verifySameOriginRequest` compares the request `Origin` with the current host.
  - `createAdminCsrfToken` signs a nonce and expiry against the current admin session cookie.
  - `verifyAdminCsrfToken` checks token structure, expiry, signature, and current session.
  - `verifyAdminMutation` combines same-origin and token validation.
- `lib/auth/rateLimit.ts`
  - Tracks failed login attempts by client IP and submitted username.
  - Allows 5 failed attempts per 15-minute window.
  - Resets the counter after a successful login.

## Admin Shell

Short description: Admin pages reuse a header and container wrapper instead of a
dedicated App Router admin layout.

Specific implementation:

- `components/admin/AdminPage.tsx`
  - Renders a full-height background.
  - Renders `AdminHeader`.
  - Places children in `AppContainer maxWidth="md"`.
- `components/admin/AdminHeader.tsx`
  - Links to `/admin/posts`, `/admin/categories`, and `/`.
  - Renders a logout form with `logoutAction`.
- `app/admin/page.tsx`
  - Redirects `/admin` to `/admin/posts`.

## Post Management

Short description: The admin can list, create, edit, publish/draft, upload images
for, and delete posts.

Specific implementation:

- Posts list: `app/admin/posts/page.tsx`.
  - Calls `requireAdmin`.
  - Calls `getAdminPosts` from `lib/data/posts.ts`.
  - Renders a table with title, category, status, date, edit link, and delete form.
  - Delete form posts to `deletePostAction`.
- New post page: `app/admin/posts/new/page.tsx`.
  - Calls `requireAdmin`.
  - Calls `getCategories`.
  - If no categories exist, displays an info alert.
  - Otherwise renders `PostForm`.
- Edit post page: `app/admin/posts/[id]/edit/page.tsx`.
  - Calls `requireAdmin`.
  - Reads `params.id`.
  - Calls `getPostForEdit(id)` and `getCategories()` in parallel.
  - Calls `notFound()` when the post does not exist.
  - Renders `PostForm` with the existing post.
- Post form: `components/admin/posts/PostForm.tsx`.
  - Uses `react-hook-form` with `zodResolver(postFormSchema)`.
  - Sets default values from the optional existing post.
  - Auto-generates the slug from the title until the slug field is manually edited.
  - Sends the CSRF token with server action input and upload route headers.
  - Uploads images through `/admin/api/upload`.
  - Stores uploaded media metadata in local `mediaById` state.
  - Uses `useFieldArray` for up to 5 post images.
  - Submits to `createPostAction` for new posts or `updatePostAction` for edits.

## Category Management

Short description: The admin can create categories and delete only categories
that have no posts.

Specific implementation:

- Categories page: `app/admin/categories/page.tsx`.
  - Calls `requireAdmin`.
  - Calls `getCategoriesWithPostCount`.
  - Renders category rows with name, slug, post count, created date, and action.
  - Shows "Remove posts first" when a category has posts.
  - Delete forms post to `deleteCategoryAction`.
- Category form: `components/admin/categories/CategoryForm.tsx`.
  - Uses `react-hook-form` with `zodResolver(categoryFormSchema)`.
  - Auto-generates slug from name until manually edited.
  - Sends the CSRF token with category creation input.
  - Calls `createCategoryAction`.
  - Resets the form on success.

## Admin Server Actions

Short description: Server actions repeat validation and authorization even when
client forms already validate.

Specific implementation:

- `createPostAction` in `lib/actions/posts.ts`
  - Calls `requireAdmin`.
  - Verifies CSRF with `verifyAdminMutation`.
  - Validates with `postSchema`.
  - Checks duplicate slug with `prisma.post.findUnique`.
  - Creates the `Post` and nested `PostImage` rows.
  - Revalidates affected paths.
  - Redirects to `/admin/posts`.
- `updatePostAction` in `lib/actions/posts.ts`
  - Calls `requireAdmin`.
  - Verifies CSRF with `verifyAdminMutation`.
  - Validates with `postSchema`.
  - Checks for duplicate slug excluding the current post.
  - Reads the previous slug/category/images.
  - In a transaction, deletes existing `PostImage` rows, updates the post, and recreates ordered `PostImage` rows.
  - Cleans up previously attached media that is no longer referenced.
  - Revalidates both old and new public paths.
  - Redirects to `/admin/posts`.
- `deletePostAction` in `lib/actions/posts.ts`
  - Calls `requireAdmin`.
  - Verifies CSRF with `verifyAdminMutation`.
  - Deletes the post.
  - Relies on `PostImage` cascade delete.
  - Cleans up deleted post media when unreferenced.
  - Revalidates affected paths.
- `createCategoryAction` in `lib/actions/categories.ts`
  - Calls `requireAdmin`.
  - Verifies CSRF with `verifyAdminMutation`.
  - Validates with `categorySchema`.
  - Creates the category.
  - Revalidates public/admin category-related paths.
  - Returns success state for the client form.
- `deleteCategoryAction` in `lib/actions/categories.ts`
  - Calls `requireAdmin`.
  - Verifies CSRF with `verifyAdminMutation`.
  - Reads the category with post count.
  - Does nothing if missing.
  - Refuses deletion when posts exist.
  - Deletes only empty categories.

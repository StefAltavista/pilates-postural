# Project Overview

## Concept

My CMS is a lightweight website plus admin CMS. Visitors see a public showcase,
news feed, category archives, post detail pages, contact content, and legal pages.
The administrator logs into a protected area to manage categories, posts, and post
images.

## Main Capabilities

### Public Content Site

Short description: The public site combines hand-authored marketing/showcase pages
with published database content.

Specific implementation:

- Home page: `app/(public)/page.tsx` exports `Home`, which renders `components/public/home/HomePage.tsx`.
- Featured page: `app/(public)/featured/page.tsx` renders `components/public/featured/FeaturedPage.tsx`.
- Contact page: `app/(public)/contact/page.tsx` renders `components/public/contact/ContactPage.tsx`.
- News index: `app/(public)/news/page.tsx` calls `getPublishedPosts` from `lib/data/posts.ts`, then renders `components/public/news/NewsPage.tsx`.
- Category archive: `app/(public)/category/[slug]/page.tsx` calls `getPublishedPostsByCategorySlug` from `lib/data/posts.ts`, then renders `components/public/PostList.tsx`.
- Post detail: `app/(public)/[category]/[slug]/page.tsx` calls `getPublishedPostByPath` from `lib/data/posts.ts`, then renders post content and images.
- Public layout: `app/(public)/layout.tsx` wraps all public routes with `PublicHeader`, `PublicFooter`, and `CookieBanner`.

### Admin CMS

Short description: The admin area protects content operations behind a signed
HTTP-only cookie session.

Specific implementation:

- Login page: `app/admin/login/page.tsx` renders `components/admin/LoginForm.tsx`.
- Login action: `loginAction` in `lib/auth/actions.ts` validates credentials and calls `createAdminSession`.
- Session protection: `requireAdmin` in `lib/auth/session.ts` redirects unauthenticated users to `/admin/login`.
- Admin redirect: `app/admin/page.tsx` redirects `/admin` to `/admin/posts`.
- Posts table: `app/admin/posts/page.tsx` calls `getAdminPosts` and renders edit/delete controls.
- New post: `app/admin/posts/new/page.tsx` calls `getCategories` and renders `PostForm`.
- Edit post: `app/admin/posts/[id]/edit/page.tsx` calls `getPostForEdit` and `getCategories`, then renders `PostForm`.
- Categories: `app/admin/categories/page.tsx` calls `getCategoriesWithPostCount`, renders the category table, and includes `CategoryForm`.

### Content Modeling

Short description: Content is stored in PostgreSQL through Prisma models for
posts, categories, media assets, and ordered post images.

Specific implementation:

- Prisma schema: `prisma/schema.prisma`.
- Database client: `prisma` in `lib/prisma.ts`.
- Public post reads: `getPublishedPosts`, `getPublishedPostByPath`, and `getPublishedPostsByCategorySlug` in `lib/data/posts.ts`.
- Admin post reads: `getAdminPosts` and `getPostForEdit` in `lib/data/posts.ts`.
- Category reads: `getCategories` and `getCategoriesWithPostCount` in `lib/data/categories.ts`.
- Post writes: `createPostAction`, `updatePostAction`, and `deletePostAction` in `lib/actions/posts.ts`.
- Category writes: `createCategoryAction` and `deleteCategoryAction` in `lib/actions/categories.ts`.
- Validation and transforms: `postSchema`, `postFormSchema`, `categorySchema`, and `categoryFormSchema` in `lib/validation/schemas.ts`.

### Media Uploads

Short description: Admin-uploaded images are validated, converted to WebP,
resized into multiple renditions, saved on disk, and recorded in the database.

Specific implementation:

- Upload API: `POST` in `app/admin/api/upload/route.ts`.
- Delete-unused-media API: `DELETE` in `app/admin/api/upload/route.ts`.
- Processing: `createMediaFromFile` in `lib/media/service.ts`.
- Cleanup: `deleteMediaIfUnreferenced` and `deleteMediaFolder` in `lib/media/service.ts`.
- Admin upload UI: `uploadImages`, `uploadOne`, `removeImage`, and `removeUnreferencedMedia` inside `components/admin/posts/PostForm.tsx`.
- Public rendering: `ImageDotCarousel`, `PostModalImage`, `PostList`, and `NewsFeed`.

### SEO, Legal, And Consent

Short description: Pages use shared metadata helpers, legal pages render simple
Markdown-like policy files, and Google Maps is blocked until the visitor consents.

Specific implementation:

- Site config: `seo/site.config.ts`.
- Metadata helpers: `createSeoMetadata` and `createPostSeoMetadata` in `seo/createSeoMetadata.ts`.
- Policy file loading: `getPolicyContent` in `lib/policies/getPolicyContent.ts`.
- Policy rendering: `components/public/policies/PolicyDocument.tsx`.
- Consent storage: `lib/consent/consentStorage.ts`.
- Consent hook: `useConsent` in `lib/consent/useConsent.ts`.
- Cookie UI: `components/cookie/CookieBanner.tsx`.
- Google Maps gate: `components/consent/GoogleMapsEmbed.tsx`.

## Route Map

| Route | Purpose | Main implementation |
| --- | --- | --- |
| `/` | Home/showcase landing page | `app/(public)/page.tsx`, `HomePage` |
| `/featured` | Static featured-work page | `app/(public)/featured/page.tsx`, `FeaturedPage` |
| `/contact` | Contact details and consent-gated map | `app/(public)/contact/page.tsx`, `ContactPage`, `GoogleMapsEmbed` |
| `/news` | All published posts | `app/(public)/news/page.tsx`, `getPublishedPosts`, `NewsPage` |
| `/category/[slug]` | Published posts in one category | `app/(public)/category/[slug]/page.tsx`, `getPublishedPostsByCategorySlug` |
| `/[category]/[slug]` | Published post detail | `app/(public)/[category]/[slug]/page.tsx`, `getPublishedPostByPath` |
| `/privacy-policy` | Privacy policy | `getPolicyContent`, `PolicyDocument` |
| `/cookie-policy` | Cookie policy | `getPolicyContent`, `PolicyDocument` |
| `/impressum` | Publisher/business information | `getPolicyContent`, `PolicyDocument` |
| `/admin` | Admin redirect | `app/admin/page.tsx` |
| `/admin/login` | Login form | `AdminLoginPage`, `LoginForm`, `loginAction` |
| `/admin/posts` | Post list and delete controls | `AdminPostsPage`, `getAdminPosts`, `deletePostAction` |
| `/admin/posts/new` | New post form | `NewPostPage`, `PostForm`, `createPostAction` |
| `/admin/posts/[id]/edit` | Edit post form | `EditPostPage`, `PostForm`, `updatePostAction` |
| `/admin/categories` | Category table and create form | `AdminCategoriesPage`, `CategoryForm` |
| `/admin/api/upload` | Authenticated image upload/delete API | `app/admin/api/upload/route.ts` |


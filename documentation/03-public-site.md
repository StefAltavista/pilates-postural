# Public Site

## Concept

The public site presents static showcase sections and published CMS content.
Published posts are available in three views: the complete news feed, category
archives, and individual post pages under a category slug.

## Public Layout

Short description: All public pages share the same header, footer, and cookie
controls.

Specific implementation:

- `app/(public)/layout.tsx` exports `PublicLayout`.
  - Renders `components/layout/public/PublicHeader.tsx`.
  - Renders a `main` element containing the current route.
  - Renders `components/layout/public/PublicFooter.tsx`.
  - Renders `components/cookie/CookieBanner.tsx`.
- `PublicHeader` uses `siteConfig.siteName` from `seo/site.config.ts`.
  - Navigation currently links to `/`, `/featured`, and `/contact`.
- `PublicFooter` uses `siteConfig.siteName`, current year, and legal links to `/privacy-policy`, `/cookie-policy`, and `/impressum`.

## Home Page

Short description: The home page is a static showcase-oriented landing page with
intro copy, calls to action, and placeholder highlight cards.

Specific implementation:

- Route: `app/(public)/page.tsx`.
- Metadata: `createSeoMetadata` with title, subtitle, description, excerpt, and path `/`.
- Component: `HomePage` in `components/public/home/HomePage.tsx`.
- Interactions:
  - `HomePage` uses `AppSection`, `AppContainer`, `AppButton`, and `AppCard`.
  - CTA buttons link to `/featured` and `/news`.
  - Static `highlights` data drives the three lower cards.

## Featured Page

Short description: The featured page is a static case-study style page with a
list of highlighted project blocks.

Specific implementation:

- Route: `app/(public)/featured/page.tsx`.
- Metadata: `createSeoMetadata` with path `/featured`.
- Component: `FeaturedPage` in `components/public/featured/FeaturedPage.tsx`.
- Interactions:
  - Static `featuredItems` drives repeated `AppCard` sections.
  - Layout alternates the visual placeholder order based on the item index.

## Contact Page

Short description: The contact page shows static contact details, a placeholder
for future form integration, and a consent-gated Google Maps embed.

Specific implementation:

- Route: `app/(public)/contact/page.tsx`.
- Metadata: `createSeoMetadata` with path `/contact`.
- Component: `ContactPage` in `components/public/contact/ContactPage.tsx`.
- Interactions:
  - Static email, phone, and studio address are rendered in an `AppCard`.
  - No active form submission exists; a placeholder card explains that form handling is not configured.
  - `GoogleMapsEmbed` receives a Google Maps embed URL for Rome, Italy.
  - `GoogleMapsEmbed` loads the iframe only when `useConsent` reports Google Maps consent.

## News Feed

Short description: The news feed lists all published posts in newest-first order.

Specific implementation:

- Route: `app/(public)/news/page.tsx`.
- Data function: `getPublishedPosts` in `lib/data/posts.ts`.
  - Queries `Post` where `published: true`.
  - Includes `category`.
  - Includes `images` ordered by `position` with nested `media`.
  - Orders by `postDate: "desc"`.
- Page component: `NewsPage` in `components/public/news/NewsPage.tsx`.
- Feed component: `NewsFeed` in `components/public/news/NewsFeed.tsx`.
- Interactions:
  - `NewsPage` displays page heading copy and passes posts to `NewsFeed`.
  - `NewsFeed` returns `EmptyState` when there are no posts.
  - Each post link is built as `/${post.category.slug}/${post.slug}`.
  - If a post has new `images`, `ImageDotCarousel` displays the medium renditions.
  - If no image exists, a visual placeholder is rendered.

## Category Archive

Short description: Category archives show published posts for a single category.

Specific implementation:

- Route: `app/(public)/category/[slug]/page.tsx`.
- Metadata: `generateMetadata` calls `getPublishedPostsByCategorySlug`.
  - Missing categories get `createSeoMetadata({ title: "Category not found", noIndex: true })`.
  - Existing categories get canonical path `/category/[slug]`.
- Page function: `CategoryPage`.
- Data function: `getPublishedPostsByCategorySlug` in `lib/data/posts.ts`.
  - Uses `prisma.category.findUnique`.
  - Includes only `published` posts.
  - Includes each post category and ordered post images/media.
  - Orders posts by `postDate: "desc"`.
- Render component: `PostList` in `components/public/PostList.tsx`.
- Interactions:
  - `CategoryPage` calls `notFound()` if the category slug does not exist.
  - `PostList` links each category label back to `/category/[slug]`.
  - `PostList` links each post title to `/${category.slug}/${post.slug}`.

## Post Detail

Short description: Post detail pages render one published post under the category
slug path and expose SEO article metadata.

Specific implementation:

- Route: `app/(public)/[category]/[slug]/page.tsx`.
- Metadata: `generateMetadata` calls `getPublishedPostByPath`.
  - Missing posts get noindex metadata.
  - Found posts use `createPostSeoMetadata`.
- Data function: `getPublishedPostByPath` in `lib/data/posts.ts`.
  - Uses `prisma.post.findFirst`.
  - Requires `slug`, `published: true`, and matching `category.slug`.
  - Includes category and ordered images/media.
- Render function: `PostPage`.
- Interactions:
  - `PostPage` calls `notFound()` when no published post matches the category/post slug pair.
  - Post date is formatted by `formatDate` in `lib/format.ts`.
  - New image records are mapped into `PostDisplayImage` objects.
  - The first attached image is rendered through `PostModalImage`.
  - Remaining attached images are rendered through `ImageDotCarousel` with `showActiveTitle`.
  - No image area is rendered when a post has no attached images.
  - Post content is rendered as plain text with `whiteSpace: "pre-wrap"`.

## Public Image Components

Short description: Public image components adapt the same media data to feed,
archive, carousel, and modal contexts.

Specific implementation:

- `components/common/OptimizedImage.tsx`
  - Thin wrapper over `next/image`.
  - Sets default `quality` and `sizes`.
- `components/public/ImageDotCarousel.tsx`
  - Client component with `activeIndex` and `trackRef`.
  - `showSlide` scrolls the selected slide into view.
  - `onScroll` updates the active dot.
  - With `href`, images link to the post page.
  - Without `href` and with `largeUrl`, slides use `PostModalImage`.
- `components/public/posts/PostModalImage.tsx`
  - Client component with `open` dialog state.
  - Shows the medium image inline.
  - Opens a MUI `Dialog` with the large image and title.

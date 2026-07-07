# SEO, Policies, And Consent

## Concept

The app centralizes metadata generation, renders legal pages from public Markdown
files, and prevents Google Maps from loading until a visitor grants optional
consent stored in local storage.

## SEO Configuration

Short description: Site-wide SEO defaults live in one config object.

Specific implementation:

- File: `seo/site.config.ts`.
- `siteConfig`
  - `siteName`: used by headers, footers, and metadata.
  - `siteUrl`: uses `process.env.SITE_URL` or `http://localhost:3000`.
  - `defaultTitle`: used by the root layout.
  - `defaultDescription`: used as metadata fallback.
  - `defaultImage`: fallback Open Graph/Twitter image.
  - `locale`: Open Graph locale.
- Root metadata:
  - `app/layout.tsx` sets `metadataBase`, `title`, and `description` from `siteConfig`.

## Metadata Helpers

Short description: Pages call shared helpers so canonical URLs, Open Graph, and
Twitter metadata stay consistent.

Specific implementation:

- File: `seo/createSeoMetadata.ts`.
- `absoluteUrl(pathOrUrl)`
  - Resolves relative paths against `siteConfig.siteUrl`.
- `createSeoMetadata(input)`
  - Accepts `title`, optional subtitles/descriptions/images/path/noIndex.
  - Resolves description priority as `description`, then `excerpt`, then `subtitle`, then default description.
  - Resolves image to the provided image or default image.
  - Adds canonical URL when `path` is provided.
  - Sets `robots.index` and `robots.follow` based on `noIndex`.
  - Builds Open Graph website metadata.
  - Builds Twitter summary large image metadata.
- `createPostSeoMetadata(post)`
  - Uses the first attached post image large URL before falling back to the site default image.
  - Uses the first image title as alt text when available.
  - Sets canonical path to `/${post.category.slug}/${post.slug}`.
  - Changes Open Graph type to `article`.
- Types:
  - `SeoMetadataInput` and `PostSeoInput` are defined in `seo/seo.types.ts`.

## Page Metadata Interactions

Short description: Static pages provide metadata directly; database pages build
metadata from the same query shape used to render the page.

Specific implementation:

- Static metadata:
  - `app/(public)/page.tsx`
  - `app/(public)/featured/page.tsx`
  - `app/(public)/contact/page.tsx`
  - `app/(public)/news/page.tsx`
  - policy pages under `app/(public)/*/page.tsx`
- Dynamic metadata:
  - `app/(public)/category/[slug]/page.tsx`
    - `generateMetadata` calls `getPublishedPostsByCategorySlug`.
    - Missing category returns noindex "Category not found" metadata.
  - `app/(public)/[category]/[slug]/page.tsx`
    - `generateMetadata` calls `getPublishedPostByPath`.
    - Missing post returns noindex "Post not found" metadata.
    - Found post returns `createPostSeoMetadata(post)`.

## Legal Policy Pages

Short description: Legal pages read Markdown files from `public/policies` and
render a limited Markdown-like subset.

Specific implementation:

- Policy files:
  - `public/policies/privacy-policy.md`
  - `public/policies/cookie-policy.md`
  - `public/policies/impressum.md`
- Loader: `getPolicyContent(fileName)` in `lib/policies/getPolicyContent.ts`.
  - Reads from `public/policies/[fileName]`.
  - Allowed file names are typed by `PolicyFile`.
- Renderer: `PolicyDocument` in `components/public/policies/PolicyDocument.tsx`.
  - Splits content on blank lines.
  - Blocks starting with `> ` render as warning alerts.
  - Blocks starting with `## ` render as section headings.
  - Blocks made entirely of `- ` lines render as unordered lists.
  - Other blocks render as text with preserved line breaks.
- Pages:
  - `app/(public)/privacy-policy/page.tsx`
  - `app/(public)/cookie-policy/page.tsx`
  - `app/(public)/impressum/page.tsx`

## Consent Storage

Short description: Consent is stored client-side in local storage and exposed
through `useSyncExternalStore` so multiple components stay in sync.

Specific implementation:

- Types: `lib/consent/consent.types.ts`.
  - `ConsentState` includes `necessary`, `googleMaps`, `acceptedAt`, and `version`.
  - `ConsentSelection` currently includes only `googleMaps`.
- Storage: `lib/consent/consentStorage.ts`.
  - `STORAGE_KEY`: `mycms-consent`.
  - `CONSENT_VERSION`: `1.0`.
  - `getConsent`
    - Reads local storage when available.
    - Parses and validates the current version.
    - Caches parsed consent by raw value.
  - `setConsent(selection)`
    - Writes `necessary: true`, selected Google Maps value, timestamp, and version.
    - Uses an in-memory fallback if local storage fails.
    - Dispatches a custom consent-change event.
  - `acceptAllConsent`
    - Calls `setConsent({ googleMaps: true })`.
  - `rejectOptionalConsent`
    - Calls `setConsent({ googleMaps: false })`.
  - `clearConsent`
    - Removes stored consent and notifies subscribers.
  - `subscribeToConsent(onChange)`
    - Subscribes to the custom event and browser `storage` events.
- Hook: `useConsent` in `lib/consent/useConsent.ts`.
  - Uses `useSyncExternalStore`.
  - Returns `consent`, `isReady`, `hasDecision`, `hasGoogleMapsConsent`, and mutation helpers.

## Cookie Banner

Short description: The banner prompts visitors until they make a consent choice,
then leaves a settings button available.

Specific implementation:

- File: `components/cookie/CookieBanner.tsx`.
- Interactions:
  - Reads state and helpers from `useConsent`.
  - Shows nothing until `isReady` is true.
  - If no decision exists, shows a fixed banner with:
    - `Accept all` -> `acceptAllConsent`.
    - `Reject optional` -> `rejectOptionalConsent`.
    - `Manage settings` -> opens the dialog.
  - If a decision exists, shows a fixed icon button for preferences.
  - Dialog lets users toggle Google Maps and save with `setConsent`.
  - Development mode shows a clear-consent button.

## Google Maps Gate

Short description: Google Maps is replaced by a consent prompt until optional
Google Maps consent is true.

Specific implementation:

- File: `components/consent/GoogleMapsEmbed.tsx`.
- Used by: `components/public/contact/ContactPage.tsx`.
- Interactions:
  - Calls `useConsent`.
  - If `hasGoogleMapsConsent` is true, renders an iframe with `embedUrl`.
  - Otherwise renders an `AppCard` explaining the block and a button that calls `acceptAllConsent`.

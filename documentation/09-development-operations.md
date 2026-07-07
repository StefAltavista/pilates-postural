# Development Operations

## Concept

The project runs as a Next.js application backed by PostgreSQL and Prisma. Local
development needs environment variables for the database, admin credentials, and
session signing. Image upload support depends on Node runtime APIs and Sharp.

## Package Scripts

Short description: Standard scripts are defined in `package.json`.

Specific implementation:

- `npm run dev`
  - Runs `next dev`.
- `npm run build`
  - Runs `next build`.
- `npm run start`
  - Runs `next start`.
- `npm run lint`
  - Runs `eslint`.

## Main Dependencies

Short description: Runtime dependencies define the major architectural choices.

Specific packages:

- `next` `16.2.6`: App Router framework.
- `react` and `react-dom` `19.2.4`: UI runtime.
- `@mui/material`, `@emotion/*`, `@mui/material-nextjs`: design system and App Router styling integration.
- `@prisma/client`, `prisma`, `@prisma/adapter-pg`, `pg`: PostgreSQL ORM and adapter.
- `zod`: validation and transforms.
- `react-hook-form` and `@hookform/resolvers`: client form state and Zod integration.
- `bcryptjs`: admin password verification.
- `sharp`: image conversion and resizing.
- `tailwindcss` and `@tailwindcss/postcss`: global CSS import support.

## Environment Variables

Short description: The app reads credentials and runtime URLs from environment
variables.

Specific variables:

- `DATABASE_URL`
  - Used by `lib/prisma.ts` and `prisma.config.ts`.
  - Example: `postgresql://mycms_user:password@localhost:5432/mycms?schema=public`.
- `ADMIN_EMAIL`
  - Used by `loginAction` and `getAdminSession`.
  - Acts as the admin login identifier.
- `ADMIN_PASSWORD_HASH`
  - Used by `loginAction`.
  - Must be a valid bcrypt hash matching `BCRYPT_HASH_PATTERN`.
- `SESSION_SECRET`
  - Used by `lib/auth/session.ts`.
  - Must be at least 32 characters.
- `SITE_URL`
  - Used by `seo/site.config.ts`.
  - Defaults to `http://localhost:3000`.

## Password Hashing

Short description: A helper script generates `.env`-ready bcrypt hashes for the
admin password.

Specific implementation:

- Script: `scripts/hash-password.mjs`.
- README usage:
  - `node scripts/hash-password.mjs "your-admin-password"`.
  - Copy the printed hash into `ADMIN_PASSWORD_HASH`.
  - Keep escaped dollar signs when placing the value in `.env`.

## Prisma Setup

Short description: Prisma uses a PostgreSQL datasource and the Prisma PG adapter.

Specific implementation:

- Schema path: `prisma/schema.prisma`.
- Prisma config: `prisma.config.ts`.
  - Imports `dotenv/config`.
  - Uses `defineConfig`.
  - Points to `prisma/schema.prisma`.
  - Reads `DATABASE_URL`.
- Runtime client: `lib/prisma.ts`.
  - Creates `PrismaPg` with the connection string.
  - Creates `PrismaClient({ adapter })`.
  - Stores the client on `globalThis` outside production to avoid hot-reload client churn.

## Migrations

Short description: Migrations show how the data model evolved.

Specific paths:

- `prisma/migrations/20260530114938_init/migration.sql`
  - Initial schema.
- `prisma/migrations/20260624120000_add_media_pipeline/migration.sql`
  - Adds media pipeline-related tables/fields.
- `prisma/migrations/20260624150000_add_post_image_carousel/migration.sql`
  - Adds ordered post image carousel support.
- `prisma/migrations/20260624190000_add_post_date/migration.sql`
  - Adds post date support.
- `prisma/migrations/migration_lock.toml`
  - Locks provider to PostgreSQL.

## Runtime File Storage

Short description: Uploaded media is stored in the local public folder.

Specific implementation:

- Root: `public/uploads/media`.
- Each uploaded media asset gets one UUID folder.
- Generated files:
  - `original.webp`
  - `large.webp`
  - `medium.webp`
  - `thumbnail.webp`
- Public URLs:
  - `/uploads/media/[mediaId]/original.webp`
  - `/uploads/media/[mediaId]/large.webp`
  - `/uploads/media/[mediaId]/medium.webp`
  - `/uploads/media/[mediaId]/thumbnail.webp`
- Operational implication:
  - On platforms with ephemeral filesystems, this storage strategy needs replacement with persistent object storage.

## Current Operational Caveats

Short description: These are implementation details worth knowing before
deploying or extending the app.

Specific notes:

- `seo/site.config.ts` default image points to `/images/default_img.jpg`.
- The legacy `coverImage` field has been removed from `Post`; current upload UI creates `Media` plus `PostImage` records.
- Public header navigation does not link directly to `/news`; the home page CTA does.
- `ContactPage` contains placeholder contact details and a placeholder for future form handling.
- `HomePage` and `FeaturedPage` contain placeholder copy and visual blocks intended to be replaced for a real client/site.
- Admin is single-user and environment-variable based; there is no users table, roles table, password reset flow, or audit trail.
- Local uploads are not automatically backed up outside the application filesystem.

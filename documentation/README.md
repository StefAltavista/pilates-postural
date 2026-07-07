# Project Documentation

This folder documents the current My CMS codebase as it exists in the workspace.
Each file starts with the feature concept, then names the concrete functions,
components, routes, and data interactions that implement it.

## Documentation Map

- [01 Project Overview](./01-project-overview.md): product capabilities, route map, and major feature areas.
- [02 Application Architecture](./02-application-architecture.md): Next.js App Router structure, providers, shared layers, and request flow.
- [03 Public Site](./03-public-site.md): public pages, post/category rendering, news feed, image presentation, and layouts.
- [04 Admin And Auth](./04-admin-and-auth.md): login/session handling, admin pages, server actions, and form flows.
- [05 Content Data Model](./05-content-data-model.md): Prisma models, read queries, write actions, validation, and cache revalidation.
- [06 Media Pipeline](./06-media-pipeline.md): image upload, processing, storage, attachment, rendering, and cleanup.
- [07 SEO Policies Consent](./07-seo-policies-consent.md): metadata helpers, legal document rendering, cookie preferences, and Google Maps gating.
- [08 Design System](./08-design-system.md): MUI theme, local wrapper components, layout primitives, and UI state helpers.
- [09 Development Operations](./09-development-operations.md): environment variables, scripts, migrations, runtime assumptions, and operational notes.

## High-Level System

My CMS is a small custom content site and admin panel built on Next.js App Router,
React, TypeScript, Material UI, Prisma, PostgreSQL, Zod, React Hook Form, Sharp,
and an HTTP-only cookie admin session.

The public side shows static showcase pages plus database-backed published posts.
The admin side lets an authenticated administrator create categories, write posts,
upload images, publish or draft posts, and delete content. Uploaded images are
normalized into WebP renditions, stored under `public/uploads/media`, and linked
to posts through a `PostImage` join model.


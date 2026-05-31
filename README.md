# My CMS

A small custom CMS built with Next.js App Router, TypeScript, Prisma, PostgreSQL, Zod, React Hook Form, and an HTTP-only cookie admin session.

## PostgreSQL Setup

These commands create a dedicated PostgreSQL user and database for the app, then grant the permissions Prisma needs for local development.

Replace `change_this_password` with a strong password before running the commands.

```bash
psql -d postgres
```

Then run this inside the `psql` prompt:

```sql
CREATE USER mycms_user WITH PASSWORD 'change_this_password';
CREATE DATABASE mycms OWNER mycms_user;
GRANT ALL PRIVILEGES ON DATABASE mycms TO mycms_user;

-- Prisma migrate dev uses a shadow database, so the app user needs this in local dev.
ALTER ROLE mycms_user CREATEDB;

\connect mycms

ALTER SCHEMA public OWNER TO mycms_user;
GRANT USAGE, CREATE ON SCHEMA public TO mycms_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO mycms_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO mycms_user;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO mycms_user;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO mycms_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO mycms_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO mycms_user;
```

Exit `psql`:

```sql
\q
```

Your local database URL should then look like this:

```env
DATABASE_URL="postgresql://mycms_user:change_this_password@localhost:5432/mycms?schema=public"
```

If your PostgreSQL server requires a different host, port, or SSL setting, update the URL accordingly.

## Environment Variables

Create `.env` from the example:

```bash
cp .env.example .env
```

Required values:

```env
DATABASE_URL="postgresql://mycms_user:change_this_password@localhost:5432/mycms?schema=public"
ADMIN_EMAIL="admin"
ADMIN_PASSWORD_HASH="\$2b\$12\$replace-with-a-bcrypt-hash"
SESSION_SECRET="replace-with-at-least-32-random-characters"
```

Generate the admin password hash with:

```bash
node scripts/hash-password.mjs "your-admin-password"
```

Put the printed hash into `ADMIN_PASSWORD_HASH`. Do not put the plain password in `.env`.
The helper prints an `.env`-ready value with escaped dollar signs, such as `\$2b\$12\$...`.
Keep those backslashes: Next.js expands unescaped `$` sequences inside `.env`. After loading,
the bcrypt hash starts with `$2b$12$` and is 60 characters long.

`ADMIN_EMAIL` is the admin login identifier. It can be a username such as `admin`; it does not need to be an email address.

### Local Starter Login

The local `.env` included in this workspace is configured with:

```text
Username: admin
Password: admin
```

This is only a starter credential for local development. Change it before deploying or sharing the app.

To set a new admin password:

```bash
node scripts/hash-password.mjs "your-new-password"
```

Copy the complete printed hash into `.env`:

```env
ADMIN_PASSWORD_HASH="\$2b\$12\$paste-the-complete-generated-hash-here"
```

Restart the development server after changing `.env`.

Generate a session secret with:

```bash
openssl rand -base64 32
```

## Install And Migrate

Install dependencies:

```bash
npm install
```

Generate Prisma Client:

```bash
npx prisma generate
```

Create and apply the first migration:

```bash
npx prisma migrate dev --name init
```

## Run Locally

Start the development server:

```bash
npm run dev
```

Open:

- Public site: [http://localhost:3000](http://localhost:3000)
- Admin login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Useful Commands

Run lint:

```bash
npm run lint
```

Run a production build:

```bash
npm run build
```

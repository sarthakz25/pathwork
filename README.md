# Pathwork

A web application that allows users to browse and apply for job listings, and employers to post job openings.

## Features

- Owner authentication
- Job listings (browse, search, and apply)
- Employer can add job postings
- Admin dashboard for job listing management

## Tech Stack

- Next.js
- Prisma ORM
- PostgreSQL
- Clerk (Authentication)
- Shadcn (UI Components)
- Zod (Data Validation)
- Tailwind CSS
- Vercel Blob Storage

## Setup

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Set up environment variables.
   ```env
   POSTGRES_URL=
   POSTGRES_PRISMA_URL=
   POSTGRES_URL_NO_SSL=
   POSTGRES_URL_NON_POOLING=
   POSTGRES_USER=
   POSTGRES_HOST=
   POSTGRES_PASSWORD=
   POSTGRES_DATABASE=
   BLOB_READ_WRITE_TOKEN=
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   ```

4. Run database migrations with `npx prisma migrate dev`.
5. Start the development server with `npm run dev`.

Contributions are welcome!
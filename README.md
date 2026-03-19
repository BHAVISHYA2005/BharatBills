# BharatBills

A GST invoicing app for Indian small businesses. Built with Next.js, TypeScript, and PostgreSQL.

## Quick Start

```bash
npm install
npx prisma migrate dev --name init
npm run dev
```

Open http://localhost:3000

## Setup

1. Copy `.env.local.example` to `.env.local` and add your database URL
2. For local development, use any PostgreSQL database (Neon, Supabase, or local)
3. Run `npx prisma migrate dev` to create tables

## Features

- Create invoices with automatic GST calculation
- CGST + SGST for intrastate, IGST for interstate
- Customer and product management
- PDF export for invoices
- Dashboard with revenue metrics

## Tech

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL

## Deploy

Deployed on Vercel. Set `DATABASE_URL` environment variable in Vercel project settings.

```bash
# For production database migrations
npx prisma migrate deploy
```

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run db:push      # Push schema changes to database
npm run db:migrate   # Run migrations
```

## Project Structure

```
src/
├── app/              # Next.js pages and API routes
│   ├── api/          # REST API endpoints
│   ├── auth/         # Login/signup pages
│   └── dashboard/   # Main app pages
├── lib/              # Utilities (GST calc, auth, prisma)
└── types/            # TypeScript types
```

## Notes

- GST rates: 5%, 12%, 18%, 28%
- GSTIN validation included
- JWT-based authentication with httpOnly cookies

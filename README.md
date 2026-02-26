# BharatBills - GST Invoicing Software

A simple, learning-focused GST invoicing application built with Next.js, TypeScript, and PostgreSQL.

## 🎯 Project Overview

This is a portfolio project designed to learn modern web development while building a practical GST invoicing tool for Indian small businesses.

### Tech Stack

- **Frontend:** Next.js 14, React 19, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL + Prisma ORM
- **Deployment:** Vercel

## 📂 Project Structure

```
bharatbills/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── api/         # API routes
│   │   ├── dashboard/   # Dashboard pages
│   │   ├── auth/        # Authentication pages
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Home page
│   ├── components/      # Reusable UI components
│   ├── lib/             # Utility functions
│   │   └── gst.ts       # GST calculation logic
│   ├── types/           # TypeScript type definitions
│   └── styles/          # Global styles
├── prisma/
│   └── schema.prisma    # Database schema
├── public/              # Static assets
├── .env.local           # Environment variables (local)
├── package.json
├── tsconfig.json
└── next.config.ts
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

First, ensure PostgreSQL is running locally. Then:

```bash
# Update .env.local with your PostgreSQL connection string
# Default: postgresql://postgres:password@localhost:5432/bharatbills

# Create the database and tables
npx prisma migrate dev --name init
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Learning Path (Recommended)

### Week 1: Setup & Auth
- [ ] Understand Next.js App Router
- [ ] TypeScript basics
- [ ] Create login/signup forms
- [ ] Implement simple authentication

### Week 2: GST Logic
- [ ] Learn GST calculation rules
- [ ] Build GST calculation utility functions
- [ ] Test with different scenarios

### Week 3: Invoice Form
- [ ] Build invoice creation form
- [ ] Real-time GST calculations
- [ ] Form validation and error handling

### Week 4: Database
- [ ] Understand Prisma ORM
- [ ] Connect frontend to database
- [ ] Build API routes

### Week 5: Invoice Display
- [ ] Show saved invoices
- [ ] Edit/delete functionality
- [ ] Search and filtering

### Week 6: PDF Export
- [ ] Generate PDF invoices
- [ ] Polish UI/UX

### Week 7-8: Deploy & Polish
- [ ] Deploy to Vercel
- [ ] Final bug fixes
- [ ] README and documentation

## 🧮 GST Calculation Logic

The app handles:
- **Intrastate transactions:** CGST + SGST (equal amounts)
- **Interstate transactions:** IGST (combined rate)
- **Different GST slabs:** 5%, 12%, 18%, 28%
- **GSTIN validation:** Basic format checking

## 📝 Features (MVP)

- ✅ User authentication
- ✅ Create invoices with real-time GST calculation
- ✅ Customer management
- ✅ Product/HSN catalog
- ✅ View and edit invoices
- ✅ Export to PDF
- ✅ Basic dashboard metrics

## 🔄 Git Workflow

```bash
# Before starting work
git pull origin main

# Create a feature branch
git checkout -b feature/invoice-form

# Make changes and commit
git add .
git commit -m "Add invoice form component"

# Push and create PR
git push origin feature/invoice-form
```

## 📚 Resources to Learn

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Prisma ORM](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [GST in India](https://www.cbic.gov.in)

## 🐛 Common Issues

### Database Connection Error
- Ensure PostgreSQL is running: `sudo service postgresql status`
- Check `.env.local` DATABASE_URL is correct
- Try: `npx prisma migrate reset`

### Port Already in Use
```bash
# Kill process on port 3000
sudo lsof -ti:3000 | xargs kill -9
```

### Prisma Client Generation
```bash
npx prisma generate
npx prisma migrate dev
```

## 📊 Next Steps

1. Run `npm run dev` to start development
2. Open [http://localhost:3000](http://localhost:3000)
3. Begin with Week 1 tasks in the learning path
4. Commit frequently with clear commit messages
5. Document what you learn!

## 🎓 Learning Tips

- Read code comments and understand why things are structured a certain way
- Test small features before moving to larger ones
- Use TypeScript errors as learning opportunities
- Commit after each small feature works
- Deploy early and often

---

**Happy coding! Remember: the goal is to learn and build something you're proud of.** 🚀

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

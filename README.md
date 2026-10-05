# Terre d'Oliva

A modern, responsive e-commerce storefront for a boutique extra virgin olive oil brand, built with React, TypeScript and a modern frontend toolchain.

**Live demo:** https://terre-doliva-ecommerce.vercel.app

**Companion project:** [Management Software](https://github.com/federicomariacalato/management-software), an admin dashboard for managing e-commerce orders ([live demo](https://management-software-three.vercel.app)). The two projects are currently independent; connecting them through a shared Supabase backend is on the Roadmap.

## Features

- **Global shopping cart:** add/remove items, update quantities and see the subtotal in real time, managed with Redux Toolkit. Cart contents persist across reloads via `localStorage`.
- **Product catalog with TanStack Query:** products are loaded through a query hook with caching and loading/error states.
- **Quick view modal:** preview product details without leaving the shop page.
- **Full checkout flow:** shipping details and payment method selection (card / PayPal / cash on delivery), validated with React Hook Form and Zod.
- **Payment error handling:** the simulated payment randomly fails; a dedicated error toast is shown and the cart is preserved so the user can retry.
- **Authentication with Supabase Auth:** a single `/accedi` page toggles between login and signup forms. The Navbar shows the logged-in user's email, linking to their account page.
- **Protected routes:** `/account` and `/checkout` require login. Unauthenticated users are redirected to `/accedi` and sent back to the page they came from after logging in.
- **Orders stored in Supabase:** orders and their line items are saved to Postgres tables protected by Row Level Security, so each user can only read and create their own orders. Product name and price are stored with each line item, so past orders stay accurate if the catalog changes.
- **Account page with order history:** profile data and a list of past orders (newest first) in an accordion, with status badges, line items and totals formatted in euros.
- **Contact form:** validated with React Hook Form and Zod, submitted to [Formspree](https://formspree.io/), with a honeypot field against spam and accessible submitting/success/error states.
- **Client-side routing:** Home, Shop, Stories, Checkout, Login and Account, with an active route indicator.
- **Responsive UI:** dynamic navbar (glass effect on scroll), cart drawer and toast notifications.

## Tech Stack

- React 19 + Vite
- TypeScript
- Redux Toolkit (cart state)
- TanStack Query v5 (data fetching and caching)
- Supabase (Auth and Postgres with Row Level Security, typed client generated from the database schema)
- React Router
- React Hook Form + Zod
- Tailwind CSS + shadcn/ui
- Lucide React (icons)

## Project Structure

```text
supabase/
└── schema.sql      # Database tables and RLS policies
src/
├── components/     # Reusable UI components (incl. shadcn/ui primitives)
├── pages/          # Route views (Home, Shop, Stories, Checkout, Auth, Account)
├── store/          # Redux store and slices
├── services/       # Data access: Supabase orders, simulated products and payment
├── hooks/          # Custom React hooks (auth, products, orders)
├── lib/            # Supabase client and utilities
├── utils/          # localStorage helpers (cart)
├── types/          # TypeScript types, incl. generated Supabase database types
└── main.tsx        # Entry point
```

## Getting Started

```bash
git clone https://github.com/federicomariacalato/terre-doliva-ecommerce
cd terre-doliva-ecommerce
npm install
cp .env.example .env.local
npm run dev
```

The app runs at `http://localhost:5173`. To create a production build, run `npm run build`.

### Supabase setup

Authentication and orders need a Supabase project:

1. Create a project at [supabase.com](https://supabase.com/).
2. In the SQL Editor, run [`supabase/schema.sql`](supabase/schema.sql) to create the `orders` and `order_items` tables and their RLS policies.
3. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in `.env.local` (see `.env.example`), using the values from the project's API settings.
4. Optionally, disable email confirmation in Authentication settings, so new users are logged in right after signing up.

After changing the database schema, regenerate the TypeScript types:

```bash
npx supabase gen types typescript --project-id <your-project-id> > src/types/database.types.ts
```

### Contact form

The contact form needs a Formspree endpoint to actually send messages. Create a form at [formspree.io](https://formspree.io/) and set its endpoint as `VITE_FORMSPREE_ENDPOINT` in `.env.local` (see `.env.example`). Without it, the form shows a generic error instead of submitting.

## Note on Payment, Products and Orders

Payment is **simulated**: no real gateway is connected, and it randomly succeeds or fails to demonstrate success and error handling in the UI. Products still come from a local JSON file served through a simulated async call.

Orders are stored in Supabase. The order total is currently calculated in the browser and the order and its line items are saved with two separate requests. Once products move to the database, order creation will move to a single database function that recalculates the total from real prices and saves everything in one transaction.

## Roadmap

- Move the product catalog to Supabase.
- Create orders through a database function: one transaction, total recalculated server-side.
- Share the Supabase backend with the Management Software dashboard.
- Responsive review of the whole site, including a mobile menu with access to login and account.

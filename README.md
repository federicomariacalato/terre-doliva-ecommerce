# Terre d'Oliva

A modern, responsive e-commerce storefront for a boutique extra virgin olive oil brand, built with React, TypeScript and a modern frontend toolchain.

**Live demo:** https://terre-doliva-ecommerce.vercel.app

**Companion project:** [Management Software](https://github.com/federicomariacalato/management-software), the admin dashboard for this store ([live demo](https://management-software-three.vercel.app), with a one-click read-only demo). Both apps share the same Supabase backend: orders placed here show up in the dashboard, and products added or marked as out of stock there are reflected in the shop.

> The live demos run on Supabase's free plan, which pauses projects after a period of inactivity. If the shop shows no products, the database is waking up: try again in a minute.

## Features

- **Global shopping cart:** add/remove items, update quantities and see the subtotal in real time, managed with Redux Toolkit. Cart contents persist across reloads via `localStorage`.
- **Product catalog from Supabase:** products are read from a Postgres table that anyone can browse, loaded through a TanStack Query hook with caching and loading/error states.
- **Quick view modal:** preview product details without leaving the shop page.
- **Out-of-stock products:** unavailable products stay visible in the catalog with an "Esaurito" badge and can still be opened for details, but cannot be added to the cart. The `create_order` database function also rejects them, so an item that runs out while it sits in the cart is caught at checkout with a clear message.
- **Full checkout flow:** shipping details and payment method selection (card / PayPal / cash on delivery), validated with React Hook Form and Zod.
- **Payment error handling:** the simulated payment randomly fails; a dedicated error toast is shown and the cart is preserved so the user can retry.
- **Authentication with Supabase Auth:** a single `/accedi` page toggles between login and signup forms. The Navbar shows the logged-in user's email, linking to their account page.
- **Protected routes:** `/account` and `/checkout` require login. Unauthenticated users are redirected to `/accedi` and sent back to the page they came from after logging in.
- **Orders stored in Supabase:** orders are created by a Postgres function in a single transaction. The browser only sends customer details and, for each item, product id and quantity: user, prices and total (shipping included) are taken from the database, so they cannot be tampered with. Tables are protected by Row Level Security, so each user can only read and create their own orders. Product name and price are stored with each line item, so past orders stay accurate if the catalog changes.
- **Account page with order history:** profile data and a list of past orders (newest first) in an accordion, with status badges, line items and totals formatted in euros.
- **Contact form:** validated with React Hook Form and Zod, submitted to [Formspree](https://formspree.io/), with a honeypot field against spam and accessible submitting/success/error states.
- **Client-side routing:** Home, Shop, Stories, Checkout, Login and Account, with an active route indicator.
- **Responsive UI:** dynamic navbar (glass effect on scroll), a mobile menu with every link and the account entry, animated cart drawer and quick view, touch-friendly controls and toast notifications.

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
├── schema.sql      # Tables, RLS policies and the create_order function
└── seed.sql        # Initial product catalog
src/
├── components/     # Reusable UI components (incl. shadcn/ui primitives)
├── pages/          # Route views (Home, Shop, Stories, Checkout, Auth, Account)
├── store/          # Redux store and slices
├── services/       # Data access: Supabase products and orders, simulated payment
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
2. In the SQL Editor, run the first part of [`supabase/schema.sql`](supabase/schema.sql) up to the `products` table and its policy, then [`supabase/seed.sql`](supabase/seed.sql) to load the catalog, then the rest of `schema.sql` (the foreign key to `products`, the database functions, the admin and demo roles and the `product-images` Storage bucket).
3. Upload the images in `public/products/` to the `product-images` bucket and run the `update` at the end of `seed.sql`, so product images are served from Supabase Storage.
4. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in `.env.local` (see `.env.example`), using the values from the project's API settings.
5. Optionally, disable email confirmation in Authentication settings, so new users are logged in right after signing up.
6. Optionally, run [`supabase/demo-data.sql`](supabase/demo-data.sql) to load ~150 sample orders for the dashboard; its header explains how to set up the read-only demo user.

After changing the database schema, regenerate the TypeScript types:

```bash
npx supabase gen types typescript --project-id <your-project-id> > src/types/database.types.ts
```

### Contact form

The contact form needs a Formspree endpoint to actually send messages. Create a form at [formspree.io](https://formspree.io/) and set its endpoint as `VITE_FORMSPREE_ENDPOINT` in `.env.local` (see `.env.example`). Without it, the form shows a generic error instead of submitting.

## Note on Payment, Products and Orders

Payment is **simulated**: no real gateway is connected, and it randomly succeeds or fails to demonstrate success and error handling in the UI. Products and orders are stored in Supabase.

The shipping rule (free from 50 €, otherwise 6.90 €) exists in two places: the Checkout page uses it to show the order summary, and the `create_order` database function uses it to calculate the total that is actually saved. Keep them in sync when changing it.

## Database roles

The schema in [`supabase/schema.sql`](supabase/schema.sql) is shared with the Management Software dashboard and defines three kinds of users, all enforced with Row Level Security:

- **Customers** can read and create only their own orders.
- **Admin** (`app_metadata.role = "admin"`) can see every order, update order status and manage products and their images.
- **Demo** (`app_metadata.role = "demo"`) is the public demo login of the dashboard. It owns the sample orders, so it never sees real customers' orders. Its password is public by design, so restrictive policies stop it from placing orders and a trigger stops it from changing its own password or email.

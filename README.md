# Terre d'Oliva

A modern, responsive e-commerce storefront for a boutique extra virgin olive oil brand, built with React, TypeScript and a modern frontend toolchain.

**Live demo:** https://terre-doliva-ecommerce.vercel.app

**Companion project:** [Management Software](https://github.com/federicomariacalato/management-software), an admin dashboard for managing e-commerce orders ([live demo](https://management-software-three.vercel.app)). The two projects are currently independent and use mock data; connecting them through a shared backend is the next step (see Roadmap).

## Features

- **Global shopping cart:** add/remove items, update quantities and see the subtotal in real time, managed with Redux Toolkit. Cart contents persist across reloads via `localStorage`.
- **Product catalog with TanStack Query:** products are loaded through a query hook with caching and loading/error states.
- **Quick view modal:** preview product details without leaving the shop page.
- **Full checkout flow:** shipping details and payment method selection (card / PayPal / cash on delivery), validated with React Hook Form and Zod.
- **Payment error handling:** the simulated payment randomly fails; a dedicated error toast is shown and the cart is preserved so the user can retry.
- **Order history:** completed orders are saved to `localStorage`.
- **Client-side routing:** Home, Shop, Stories and Checkout, with an active route indicator.
- **Responsive UI:** dynamic navbar (glass effect on scroll), cart drawer and toast notifications.

## Tech Stack

- React 19 + Vite
- TypeScript
- Redux Toolkit (cart state)
- TanStack Query v5 (data fetching and caching)
- React Router
- React Hook Form + Zod
- Tailwind CSS + shadcn/ui
- Lucide React (icons)

## Project Structure

```text
src/
├── components/     # Reusable UI components (incl. shadcn/ui primitives)
├── pages/          # Route views (Home, Shop, Stories, Checkout)
├── store/          # Redux store and slices
├── services/       # Simulated API calls (products, payment)
├── hooks/          # Custom React hooks
├── utils/          # localStorage helpers (cart and orders)
├── types/          # TypeScript types
└── main.tsx        # Entry point
```

## Getting Started

```bash
git clone https://github.com/federicomariacalato/terre-doliva-ecommerce
cd terre-doliva-ecommerce
npm install
npm run dev
```

The app runs at `http://localhost:5173`. To create a production build, run `npm run build`.

## Note on Payment and Orders

Payment is **simulated**: no real gateway is connected, and it randomly succeeds or fails to demonstrate success and error handling in the UI. Products come from a local JSON file served through a simulated async call, and orders are stored in the browser's `localStorage`. There is no backend or database yet.

## Roadmap

- Build a shared backend/API used by both this storefront and the Management Software dashboard.
- Replace `localStorage` with a real database for products and orders.

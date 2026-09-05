# 🫒 Terre d'Oliva — Modern E-Commerce Application

A modern, elegant, and fully responsive e-commerce application built for a boutique Extra Virgin Olive Oil brand. Developed with **React**, **TypeScript**, and modern web tools focused on performance and user experience.

---

## 🚀 Tech Stack

- **Frontend Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** TypeScript
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) (Global Cart state, persisted to `localStorage`)
- **Data Fetching & Caching:** [TanStack Query v5](https://tanstack.com/query/latest)
- **Routing:** [React Router](https://reactrouter.com/)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## ✨ Key Features

- 🛒 **Global Shopping Cart:** Add/remove items, update quantities, and calculate subtotal in real-time managed via Redux. Cart contents persist across page reloads via `localStorage`.
- 💳 **Full Checkout Flow:** Shipping details and payment method selection (Card / PayPal / Cash on Delivery), fully validated with Zod.
- ⚠️ **Payment Error Handling:** Simulated payment processing with realistic failure handling — failed payments show a dedicated error toast without losing cart contents, so the user can retry.
- 📦 **Order History:** Successfully completed orders are saved to `localStorage` as a persistent order history, laying the groundwork for a future management dashboard.
- 🧭 **Client-Side Routing:** Multi-page navigation (Home, Shop, Stories, Checkout) with active route indicator using `NavLink`.
- 🔍 **Quick View Modal:** Fast product detail preview without leaving the current page view.
- 🎨 **Refined UI/UX:** Responsive layout with dynamic theme adaptations, glassmorphism scroll effects on the Navbar, and toast notifications for order feedback.

---

## 📁 Project Structure

```text
src/
├── components/     # Reusable UI components (incl. shadcn/ui primitives)
├── pages/          # Main route views (Home, Shop, Stories, Checkout)
├── store/          # Redux Store configuration & slices
├── services/       # Simulated API calls (products, payment)
├── hooks/          # Custom React hooks
├── utils/          # Persistence helpers (cart & order localStorage)
├── types/          # TypeScript interfaces & types
└── main.tsx        # Application entry point
```

---

## 🏁 Getting Started

Clone the repository and install the dependencies:

```bash
git clone https://github.com/federicomariacalato/terre-doliva-ecommerce
cd terre-doliva-ecommerce
npm install
```

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

To create a production build:

```bash
npm run build
```

---

## 🛠️ Note on Payment & Orders

Payment processing is currently **simulated** (no real payment gateway is connected) and randomly succeeds or fails, to demonstrate proper success/error handling in the UI. Orders are stored locally in the browser via `localStorage` — no backend or real database is involved at this stage.

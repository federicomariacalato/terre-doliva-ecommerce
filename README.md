# 🫒 Terre d'Oliva — Modern E-Commerce Application

A modern, elegant, and fully responsive e-commerce application built for a boutique Extra Virgin Olive Oil brand. Developed with **React**, **TypeScript**, and modern web tools focused on performance and user experience.

---

## 🚀 Tech Stack

- **Frontend Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** TypeScript
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) (Global Cart & Wishlist state)
- **Data Fetching & Caching:** [TanStack Query v5](https://tanstack.com/query/latest)
- **Routing:** [React Router](https://reactrouter.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## ✨ Key Features

- 🛒 **Global Shopping Cart:** Add/remove items, update quantities, and calculate subtotal in real-time managed via Redux.
- ❤️ **Wishlist Integration:** Toggle favorite items dynamically with live status updates reflected in the Navbar counter.
- 🧭 **Client-Side Routing:** Multi-page navigation (Home, Shop, Stories) with active route indicator using `NavLink`.
- 🔍 **Quick View Modal:** Fast product detail preview without leaving the current page view.
- 🎨 **Refined UI/UX:** Responsive layout with dynamic theme adaptations and glassmorphism scroll effects on the Navbar.

---

## 🏛️ Project Structure

  src/
  ├── components/ # Reusable UI components (Navbar, CartDrawer, ProductCard, etc.)
  ├── pages/ # Main route views (Home, Shop, Stories)
  ├── store/ # Redux Store configuration & slices (cartSlice, wishlistSlice)
  ├── types/ # TypeScript interfaces & types
  └── main.tsx # Application entry point with providers setup

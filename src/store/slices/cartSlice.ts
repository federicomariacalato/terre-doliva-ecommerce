import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Product } from "../../types/store.types";
import { loadCartFromStorage } from "../../utils/cartStorage";

type CartState = {
  items: CartItem[];
  isCartOpen: boolean; // 1. Stato per visibilità del drawer
};

const initialState: CartState = {
  items: loadCartFromStorage(),
  isCartOpen: false,
};

// Tipo per gestire sia l'aggiunta con quantità personalizzata che senza
type AddToCartPayload = Product & { quantity?: number };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const addedQuantity = action.payload.quantity || 1;
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += addedQuantity;
      } else {
        state.items.push({
          ...action.payload,
          quantity: addedQuantity,
        });
      }

      // Apre automaticamente il drawer al momento dell'aggiunta!
      state.isCartOpen = true;
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },

    // --- Reducers per lo Slide-over Drawer ---
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  openCart,
  closeCart,
  toggleCart,
} = cartSlice.actions;

// --- Selettori Redux ---
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectIsCartOpen = (state: { cart: CartState }) =>
  state.cart.isCartOpen;

export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;

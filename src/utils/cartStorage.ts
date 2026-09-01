import type { CartItem } from "@/types/store.types";

export function loadCartFromStorage(): CartItem[] {
  const saved = localStorage.getItem("cart");

  if (!saved) return [];
  else return JSON.parse(saved);
}

export function saveCartToStorage(cart: CartItem[]) {
  localStorage.setItem("cart", JSON.stringify(cart));
}


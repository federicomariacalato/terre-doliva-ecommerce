import type { CartItem } from "@/types/store.types";

export function loadCartFromStorage(): CartItem[] {
  const saved = localStorage.getItem("cart");
  if (!saved) return [];

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function saveCartToStorage(cart: CartItem[]) {
  localStorage.setItem("cart", JSON.stringify(cart));
}


import type { Order } from "@/types/order.types";

export function loadOrdersFromStorage(): Order[] {
  const saved = localStorage.getItem("orders");
  if (!saved) return [];

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function saveOrdersToStorage(orders: Order[]) {
  localStorage.setItem("orders", JSON.stringify(orders));
}

export function addOrderToStorage(newOrder: Order) {
  const orders = loadOrdersFromStorage();
  const updatedOrders = [...orders, newOrder];
  saveOrdersToStorage(updatedOrders);
}

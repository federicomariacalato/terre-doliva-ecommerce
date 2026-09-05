import type { CartItem } from "./store.types";

export type OrderStatus =
  | "in lavorazione"
  | "spedito"
  | "consegnato"
  | "annullato";

export type PaymentMethod = "card" | "paypal" | "cod";

export type CustomerInfo = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
};

export type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  customer: CustomerInfo;
  items: CartItem[];
  totalAmount: number;
  paymentMethod: PaymentMethod;
};

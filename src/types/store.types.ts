import type { Tables } from "./database.types";

export type Product = Tables<"products">;

export type CartItem = Product & {
  quantity: number;
};

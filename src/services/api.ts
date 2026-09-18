import type { Product } from "../types/store.types";
import productsData from "../data/products.json";

export type ApiService = {
  getProducts: () => Promise<Product[]>;
};

export const apiService: ApiService = {
  getProducts: () =>
    new Promise<Product[]>((resolve) => {
      setTimeout(() => resolve(productsData as Product[]), 400);
    }),
};

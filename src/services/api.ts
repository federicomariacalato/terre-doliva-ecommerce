import type { Product } from "../types/store.types";

export type ApiService = {
  getProducts: () => Promise<Product[]>;
};

export const apiService: ApiService = {
  getProducts: async (): Promise<Product[]> => {
    const response = await fetch("/data/products.json");

    if (!response.ok) {
      throw new Error("Errore nel caricamento dei prodotti");
    }

    return response.json();
  },
};

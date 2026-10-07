import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/store.types";
import { getProducts } from "../services/products";

type UseProductsResult = {
  products: Product[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

export const useProducts = (): UseProductsResult => {
  const { data, isLoading, isError, error } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
  });
  return { products: data, isLoading, isError, error };
};

import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/store.tipes";
import { apiService } from "../services/api";

type UseProductsResult = {
  products: Product[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

export const useProduct = (): UseProductsResult => {
  const { data, isLoading, isError, error } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: apiService.getProducts,
    staleTime: 1000 * 60 * 5,
  });
  return { products: data, isLoading, isError, error };
};

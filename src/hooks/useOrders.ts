import { getOrders } from "@/services/orders";
import { useQuery } from "@tanstack/react-query";

export function useOrders(userId: string | undefined) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["orders", userId],
    queryFn: getOrders,
    enabled: !!userId,
  });
  return { orders: data, isLoading, isError, error };
}

import { supabase } from "@/lib/supabaseClient";
import type { CheckoutFormValues } from "@/pages/Checkout";
import type { CartItem } from "@/types/store.types";

type CreateOrderInput = {
  userId: string;
  customer: CheckoutFormValues;
  items: CartItem[];
  total: number;
};

export async function createOrder(input: CreateOrderInput) {
  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      user_id: input.userId,
      full_name: input.customer.fullName,
      email: input.customer.email,
      phone: input.customer.phone,
      address: input.customer.address,
      city: input.customer.city,
      postal_code: input.customer.postalCode,
      total_amount: input.total,
      payment_method: input.customer.paymentMethod,
    })
    .select("id")
    .single();

  if (error) throw new Error("Impossibile effettuare l'ordine");

  const orderItems = input.items.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) throw new Error("Impossibile effettuare l'ordine");

  return order.id;
}

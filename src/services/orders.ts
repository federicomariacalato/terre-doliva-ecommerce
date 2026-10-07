import { supabase } from "@/lib/supabaseClient";
import type { CheckoutFormValues } from "@/pages/Checkout";
import type { CartItem } from "@/types/store.types";

type CreateOrderInput = {
  customer: CheckoutFormValues;
  items: CartItem[];
};

export async function createOrder(input: CreateOrderInput) {
  const { data: orderId, error } = await supabase.rpc("create_order", {
    p_full_name: input.customer.fullName,
    p_email: input.customer.email,
    p_address: input.customer.address,
    p_city: input.customer.city,
    p_phone: input.customer.phone,
    p_postal_code: input.customer.postalCode,
    p_payment_method: input.customer.paymentMethod,
    p_items: input.items.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    })),
  });

  if (error) {
    if (error.message === "PRODUCT_UNAVAILABLE") {
      throw new Error(
        `Non più disponibili: ${error.details ?? "alcuni prodotti"}. Rimuovili dal carrello per completare l'ordine.`,
      );
    }

    throw new Error(
      "Si è verificato un problema durante la creazione dell'ordine, riprova",
    );
  }

  return orderId;
}

export async function getOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });

  if (error)
    throw new Error(
      "Si è verificato un problema nel recupero degli ordini, riprova",
    );

  return data;
}

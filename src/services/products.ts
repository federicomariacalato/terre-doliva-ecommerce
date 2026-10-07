import { supabase } from "@/lib/supabaseClient";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error)
    throw new Error(
      "Si è verificato un problema nel recupero del catalogo, riprova",
    );

  return data;
}

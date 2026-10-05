import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
import { useOrders } from "@/hooks/useOrders";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const statusStyles: Record<string, string> = {
  "in lavorazione": "bg-[#f6ead9] text-[#8a5a2b]",
  spedito: "bg-[#e4ebe0] text-[#3d5a3a]",
  consegnato: "bg-[#2c3e2b] text-[#fbf9f4]",
  annullato: "bg-[#efe9e4] text-[#7c7c7c]",
};

const euro = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
});

export function Account() {
  const { isLoading, session } = useAuth();
  const {
    error,
    isError,
    orders,
    isLoading: isOrdersLoading,
  } = useOrders(session?.user.id);

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#fbf9f4] flex items-center justify-center font-sans text-xs uppercase tracking-widest text-[#7c7c7c]">
        Caricamento...
      </div>
    );

  if (!session) return <Navigate to="/accedi" replace />;
  return (
    <div className="min-h-screen bg-[#fbf9f4] font-sans text-[#1a1a1a]">
      <Navbar theme="light" />
      <main className="max-w-2xl mx-auto px-6 pt-40 pb-24">
        <p className="text-xs uppercase tracking-widest font-semibold text-[#b87d4b] mb-3">
          Il tuo account
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-light text-[#2c3e2b] mb-10">
          Area personale
        </h1>

        <Card className="bg-[#fbf9f4] border-[#e8e4d9] shadow-sm">
          <CardHeader>
            <CardTitle className="font-serif text-xl text-[#2c3e2b]">
              Dati del profilo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-t border-[#e8e4d9] pt-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#7c7c7c]">
                Email
              </span>
              <span className="text-sm text-[#2c3e2b] break-all">
                {session.user.email}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-[#fbf9f4] border-[#e8e4d9] shadow-sm">
          <CardHeader>
            <CardTitle className="font-serif text-xl text-[#2c3e2b]">
              I miei ordini
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isOrdersLoading ? (
              <p className="border-t border-[#e8e4d9] pt-4 text-xs uppercase tracking-widest text-[#7c7c7c]">
                Caricamento ordini...
              </p>
            ) : isError ? (
              <p className="border-t border-[#e8e4d9] pt-4 text-sm text-[#d97757]">
                {error?.message}
              </p>
            ) : orders?.length === 0 ? (
              <p className="border-t border-[#e8e4d9] pt-4 text-sm text-[#7c7c7c]">
                Non hai ancora effettuato nessun ordine
              </p>
            ) : (
              <Accordion className="gap-3 border-t border-[#e8e4d9] pt-4">
                {orders?.map((order) => (
                  <AccordionItem
                    key={order.id}
                    value={order.id}
                    className="rounded-lg border border-[#e8e4d9] bg-white px-4"
                  >
                    <AccordionTrigger className="items-center py-4 hover:no-underline cursor-pointer">
                      <div className="flex flex-1 flex-wrap items-center justify-between gap-x-4 gap-y-2 pr-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs uppercase tracking-widest font-semibold text-[#7c7c7c]">
                            {new Date(order.created_at).toLocaleDateString(
                              "it-IT",
                            )}
                          </span>
                          <span className="font-serif text-base text-[#2c3e2b]">
                            #{order.id.slice(0, 8).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-widest font-semibold ${statusStyles[order.status] ?? "bg-[#efe9e4] text-[#7c7c7c]"}`}
                          >
                            {order.status}
                          </span>
                          <span className="text-sm font-semibold text-[#2c3e2b]">
                            {euro.format(order.total_amount)}
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div className="border-t border-[#e8e4d9]">
                        {order.order_items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-start justify-between gap-4 py-3 border-b border-[#f1ede4] last:border-b-0"
                          >
                            <span className="text-[#1a1a1a]">
                              {item.name}{" "}
                              <span className="text-[#7c7c7c]">
                                × {item.quantity}
                              </span>
                            </span>
                            <span className="shrink-0 text-[#2c3e2b]">
                              {euro.format(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-end">
          <button
            onClick={() => supabase.auth.signOut()}
            className="border border-[#2c3e2b] text-[#2c3e2b] hover:bg-[#2c3e2b] hover:text-[#fbf9f4] px-8 py-3 rounded-lg font-sans text-xs uppercase tracking-widest font-semibold transition-colors duration-300 cursor-pointer"
          >
            Esci
          </button>
        </div>
      </main>
    </div>
  );
}

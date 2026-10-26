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
import type { Enums } from "@/types/database.types";

const statusStyles: Record<Enums<"order_status">, string> = {
  processing: "bg-glow/30 text-oil",
  shipped: "bg-deep/10 text-deep",
  delivered: "bg-deep text-ground",
  cancelled: "bg-line/60 text-mute",
};

const statusLabels: Record<Enums<"order_status">, string> = {
  processing: "in lavorazione",
  shipped: "spedito",
  delivered: "consegnato",
  cancelled: "annullato",
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
      <div className="min-h-screen bg-ground flex items-center justify-center font-sans text-xs uppercase tracking-widest text-mute">
        Caricamento...
      </div>
    );

  if (!session) return <Navigate to="/accedi" replace />;
  return (
    <div className="min-h-screen bg-ground font-sans text-ink">
      <Navbar theme="light" />
      <main className="max-w-3xl mx-auto px-6 pt-48 pb-32">
        <p className="font-serif italic text-xl text-oil mb-3">
          Il tuo account
        </p>
        <h1 className="font-serif text-[clamp(2.75rem,6vw,5rem)] font-normal tracking-[-0.02em] leading-none text-ink mb-12">
          Area personale
        </h1>

        <Card className="bg-ground shadow-none">
          <CardHeader>
            <CardTitle className="font-serif text-2xl font-normal text-ink">
              Dati del profilo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-t border-line pt-4">
              <span className="text-[13px] uppercase tracking-[0.14em] font-medium text-mute">
                Email
              </span>
              <span className="text-sm text-deep break-all">
                {session.user.email}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-ground shadow-none">
          <CardHeader>
            <CardTitle className="font-serif text-2xl font-normal text-ink">
              I miei ordini
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isOrdersLoading ? (
              <p className="border-t border-line pt-4 text-xs uppercase tracking-widest text-mute">
                Caricamento ordini...
              </p>
            ) : isError ? (
              <p className="border-t border-line pt-4 text-sm text-[#d97757]">
                {error?.message}
              </p>
            ) : orders?.length === 0 ? (
              <p className="border-t border-line pt-4 text-sm text-mute">
                Non hai ancora effettuato nessun ordine
              </p>
            ) : (
              <Accordion className="gap-3 border-t border-line pt-4">
                {orders?.map((order) => (
                  <AccordionItem
                    key={order.id}
                    value={order.id}
                    className="rounded-md border border-line bg-white px-4"
                  >
                    <AccordionTrigger className="items-center py-4 hover:no-underline cursor-pointer">
                      <div className="flex flex-1 flex-wrap items-center justify-between gap-x-4 gap-y-2 pr-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-[13px] uppercase tracking-[0.14em] font-medium text-mute">
                            {new Date(order.created_at).toLocaleDateString(
                              "it-IT",
                            )}
                          </span>
                          <span className="font-serif text-base text-deep">
                            #{order.id.slice(0, 8).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-widest font-semibold ${statusStyles[order.status]}`}
                          >
                            {statusLabels[order.status]}
                          </span>
                          <span className="text-sm font-semibold text-deep">
                            {euro.format(order.total_amount)}
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div className="border-t border-line">
                        {order.order_items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-start justify-between gap-4 py-3 border-b border-line/50 last:border-b-0"
                          >
                            <span className="text-ink">
                              {item.name}{" "}
                              <span className="text-mute">
                                × {item.quantity}
                              </span>
                            </span>
                            <span className="shrink-0 text-deep">
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
            className="border border-deep text-deep hover:bg-deep hover:text-ground px-8 py-3 rounded-md font-sans text-[13px] uppercase tracking-[0.14em] font-medium transition-colors duration-300 cursor-pointer"
          >
            Esci
          </button>
        </div>
      </main>
    </div>
  );
}

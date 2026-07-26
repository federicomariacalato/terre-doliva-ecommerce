import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { CtaButton } from "./CtaButton";
// Importa le azioni e i selettori dalla tua cartSlice / store:
import {
  selectCartItems,
  selectCartTotal,
  updateQuantity,
  removeFromCart,
  closeCart, // Action per chiudere il drawer
  selectIsCartOpen,
} from "../store/slices/cartSlice";

export function CartDrawer() {
  const dispatch = useDispatch();

  // Leggiamo lo stato da Redux (adatta i selettori al tuo store)
  const isOpen = useSelector(selectIsCartOpen);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* 1. Backdrop Scuro e Sfocato */}
      <div
        onClick={() => dispatch(closeCart())}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        {/* 2. Pannello Drawer che Scivola da Destra */}
        <div className="w-screen max-w-md bg-[#fbf9f4] shadow-2xl flex flex-col border-l border-[#e8e4d9] animate-slideLeft">
          {/* Header Drawer */}
          <div className="p-6 border-b border-[#e8e4d9] flex items-center justify-between bg-[#f4f1ea]">
            <div className="flex items-center gap-3">
              <ShoppingBag size={20} className="text-[#2c3e2b]" />
              <h2 className="font-serif text-xl text-[#1a1a1a]">
                Il tuo Carrello
              </h2>
              <span className="font-sans text-xs bg-[#2c3e2b] text-[#fbf9f4] px-2 py-0.5 rounded-full font-semibold">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => dispatch(closeCart())}
              className="p-2 rounded-full hover:bg-white/80 text-[#2c3e2b] transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Lista Prodotti o Stato Vuoto */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="p-4 bg-[#f4f1ea] rounded-full text-[#7c7c7c]">
                  <ShoppingBag size={32} />
                </div>
                <p className="font-serif text-lg text-[#1a1a1a]">
                  Il tuo carrello è vuoto
                </p>
                <p className="font-sans text-xs text-[#7c7c7c] max-w-xs">
                  Esplora la nostra collezione e scopri le eccellenze della
                  nostra terra.
                </p>
                <button
                  onClick={() => dispatch(closeCart())}
                  className="font-sans text-xs font-semibold uppercase tracking-wider text-[#b87d4b] hover:underline pt-2 cursor-pointer"
                >
                  Continua lo Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-6 border-b border-[#e8e4d9] last:border-b-0"
                >
                  {/* Immagine Prodotto */}
                  <div className="w-20 h-24 bg-[#f4f1ea] rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Dettagli & Controlli */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-serif text-sm text-[#1a1a1a] leading-tight">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-[#999] hover:text-[#b87d4b] transition-colors cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <span className="font-sans text-[10px] text-[#7c7c7c] uppercase tracking-wider block mt-1">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Selettore Quantità Compatto */}
                      <div className="flex items-center gap-2 bg-white border border-[#e8e4d9] rounded-md px-2 py-1">
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: Math.max(1, item.quantity - 1),
                              }),
                            )
                          }
                          className="text-[#2c3e2b] hover:text-[#b87d4b] transition-colors cursor-pointer"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-sans text-xs font-semibold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity + 1,
                              }),
                            )
                          }
                          className="text-[#2c3e2b] hover:text-[#b87d4b] transition-colors cursor-pointer"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Prezzo Totale della Voce */}
                      <span className="font-sans text-sm font-semibold text-[#b87d4b]">
                        {(item.price * item.quantity).toFixed(2)}€
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer con Totale e Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-[#f4f1ea] border-t border-[#e8e4d9] space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-[#7c7c7c]">
                  <span>Spedizione</span>
                  <span>Calcolata al checkout</span>
                </div>
                <div className="flex justify-between font-serif text-lg text-[#1a1a1a] font-medium pt-2 border-t border-[#e8e4d9]/60">
                  <span>Totale provvisorio</span>
                  <span className="font-sans text-base font-semibold text-[#b87d4b]">
                    {cartTotal.toFixed(2)}€
                  </span>
                </div>
              </div>

              <CtaButton
                btnText="Procedi al Checkout"
                variant="light"
                onClick={() => {
                  console.log("Reindirizzamento al checkout...");
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

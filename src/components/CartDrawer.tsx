import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { CtaButton } from "./CtaButton";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { CollapseOut } from "@/components/animations/CollapseOut";
import { EASE_OUT } from "@/lib/motion";
import {
  selectCartItems,
  selectCartTotal,
  updateQuantity,
  removeFromCart,
  closeCart,
  selectIsCartOpen,
} from "../store/slices/cartSlice";

export function CartDrawer() {
  const dispatch = useDispatch();

  const isOpen = useSelector(selectIsCartOpen);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            onClick={() => dispatch(closeCart())}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="w-screen max-w-md bg-ground shadow-2xl flex flex-col border-l border-line"
            >
              <div className="p-6 border-b border-line flex items-center justify-between bg-panel">
                <div className="flex items-center gap-3">
                  <ShoppingBag size={20} className="text-deep" />
                  <h2 className="font-serif text-xl text-ink">
                    Il tuo Carrello
                  </h2>
                  <span className="font-sans text-xs bg-deep text-ground px-2 py-0.5 rounded-full font-semibold">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                </div>
                <button
                  onClick={() => dispatch(closeCart())}
                  aria-label="Chiudi carrello"
                  className="p-2 rounded-full hover:bg-white/80 text-deep transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="relative flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4 p-6"
                  >
                    <div className="p-4 bg-panel rounded-full text-mute">
                      <ShoppingBag size={32} />
                    </div>
                    <p className="font-serif text-lg text-ink">
                      Il tuo carrello è vuoto
                    </p>
                    <p className="font-sans text-[15px] text-mute max-w-xs">
                      Esplora la nostra collezione e scopri le eccellenze della
                      nostra terra.
                    </p>
                    <Link
                      to="/shop"
                      onClick={() => dispatch(closeCart())}
                      className="font-sans text-[15px] font-medium text-oil underline underline-offset-4 pt-2 cursor-pointer"
                    >
                      Continua lo Shopping
                    </Link>
                  </motion.div>
                )}

                <AnimatePresence initial={false}>
                  {cartItems.map((item) => (
                    <CollapseOut
                      key={item.id}
                      className="flex gap-4 pt-6 first:pt-0 pb-6 border-b border-line last:border-b-0 overflow-hidden"
                    >
                        <div className="w-20 h-24 bg-panel rounded-md overflow-hidden shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <h3 className="font-serif text-lg text-ink leading-[1.15]">
                                {item.name}
                              </h3>
                              <button
                                onClick={() => dispatch(removeFromCart(item.id))}
                                aria-label={`Rimuovi ${item.name}`}
                                className="-m-3 p-3 text-mute hover:text-oil transition-colors cursor-pointer"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <span className="font-serif italic text-[15px] text-oil block mt-1">
                              {item.category}
                            </span>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center bg-white border border-line rounded-sm">
                              <button
                                onClick={() =>
                                  dispatch(
                                    updateQuantity({
                                      id: item.id,
                                      quantity: Math.max(1, item.quantity - 1),
                                    }),
                                  )
                                }
                                aria-label="Diminuisci quantità"
                                className="p-3 text-deep hover:text-oil transition-colors cursor-pointer"
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
                                aria-label="Aumenta quantità"
                                className="p-3 text-deep hover:text-oil transition-colors cursor-pointer"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <span className="font-sans text-base font-medium text-ink tabular-nums">
                              {(item.price * item.quantity).toFixed(2)}€
                            </span>
                          </div>
                        </div>
                    </CollapseOut>
                  ))}
                </AnimatePresence>
              </div>

              {cartItems.length > 0 && (
                <div className="p-6 bg-panel border-t border-line space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm text-mute">
                      <span>Spedizione</span>
                      <span>Calcolata al checkout</span>
                    </div>
                    <div className="flex justify-between font-serif text-lg text-ink font-medium pt-2 border-t border-line/60">
                      <span>Totale provvisorio</span>
                      <span className="font-sans text-base font-semibold text-oil">
                        {cartTotal.toFixed(2)}€
                      </span>
                    </div>
                  </div>

                  <CtaButton
                    btnText="Procedi al Checkout"
                    variant="light"
                    href="/checkout"
                    onClick={() => dispatch(closeCart())}
                  />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

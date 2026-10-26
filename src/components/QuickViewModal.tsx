import { X, Plus, Minus } from "lucide-react";
import { useState } from "react";
import type { Product } from "../types/store.types";
import { CtaButton } from "./CtaButton";

type QuickViewModalProps = {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
};

export function QuickViewModal({
  product,
  onClose,
  onAddToCart,
}: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-3xl max-h-full overflow-y-auto bg-ground rounded-xl shadow-2xl animate-in fade-in zoom-in-95 duration-300 flex flex-col md:flex-row border border-line">
        <button
          onClick={onClose}
          aria-label="Chiudi"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-deep transition-colors cursor-pointer shadow-sm"
        >
          <X size={18} />
        </button>

        <div className="w-full md:w-1/2 bg-panel flex items-center justify-center p-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-56 sm:h-72 md:h-96 object-cover rounded-lg"
          />
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <span className="font-serif italic text-lg text-oil block mb-1">
              {product.category}
            </span>
            <h2 className="font-serif text-[2rem] text-ink leading-[1.08] tracking-[-0.01em] mb-3">
              {product.name}
            </h2>
            <p className="font-sans text-xl font-medium text-ink mb-5 tabular-nums">
              {product.price.toFixed(2)}€
            </p>
            <p className="font-sans text-[15px] text-ink/75 leading-[1.7] mb-6">
              {product.description}
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-line">
            {product.is_available ? (
              <>
                <div className="flex items-center justify-between bg-white px-4 py-2 rounded-md border border-line">
                  <span className="font-sans text-[15px] text-ink">
                    Quantità
                  </span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Diminuisci quantità"
                      className="-m-2 p-3 text-deep hover:text-oil transition-colors cursor-pointer"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-sans text-sm font-semibold text-ink w-4 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Aumenta quantità"
                      className="-m-2 p-3 text-deep hover:text-oil transition-colors cursor-pointer"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <CtaButton
                  btnText={`Aggiungi al carrello • ${(
                    product.price * quantity
                  ).toFixed(2)}€`}
                  variant="light"
                  onClick={() => {
                    onAddToCart(product, quantity);
                    onClose();
                  }}
                />
              </>
            ) : (
              <>
                <p className="font-sans text-[15px] text-mute leading-relaxed">
                  Questo prodotto è momentaneamente esaurito.
                </p>
                <CtaButton btnText="Esaurito" variant="light" disabled />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

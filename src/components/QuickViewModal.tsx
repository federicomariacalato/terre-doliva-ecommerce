import { X, Plus, Minus } from "lucide-react";
import { useState } from "react";
import type { Product } from "../types/store.tipes";
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

  // Se nessun prodotto è selezionato, non renderizziamo nulla
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
      {/* Sfondo cliccabile per chiudere la modale */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Contenitore Modale */}
      <div className="relative z-10 w-full max-w-3xl bg-[#fbf9f4] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-[#e8e4d9]">
        {/* Tasto Chiusura (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#2c3e2b] transition-colors cursor-pointer shadow-sm"
        >
          <X size={18} />
        </button>

        {/* Colonna Immagine */}
        <div className="w-full md:w-1/2 bg-[#f4f1ea] flex items-center justify-center p-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 md:h-96 object-cover rounded-xl shadow-sm"
          />
        </div>

        {/* Colonna Info e Dettagli */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-widest text-[#7c7c7c] font-semibold block mb-1">
              {product.category}
            </span>
            <h2 className="font-serif text-2xl text-[#1a1a1a] leading-tight mb-2">
              {product.name}
            </h2>
            <p className="font-sans text-lg font-semibold text-[#b87d4b] mb-4">
              {product.price.toFixed(2)}€
            </p>
            <p className="font-sans text-xs text-[#555] leading-relaxed mb-6">
              {product.description}
            </p>
          </div>

          {/* Selettore Quantità e Bottone */}
          <div className="space-y-4 pt-4 border-t border-[#e8e4d9]">
            <div className="flex items-center justify-between bg-white px-4 py-2 rounded-lg border border-[#e8e4d9]">
              <span className="font-sans text-xs uppercase tracking-wider text-[#2c3e2b] font-medium">
                Quantità
              </span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1 text-[#2c3e2b] hover:text-[#b87d4b] transition-colors cursor-pointer"
                >
                  <Minus size={14} />
                </button>
                <span className="font-sans text-sm font-semibold text-[#1a1a1a] w-4 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1 text-[#2c3e2b] hover:text-[#b87d4b] transition-colors cursor-pointer"
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
          </div>
        </div>
      </div>
    </div>
  );
}

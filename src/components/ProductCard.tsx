import type { Product } from "../types/store.tipes";
import { CtaButton } from "./CtaButton";

type ProductCardProps = {
  product: Product;
  categoryBgClass: string;
  onOpenQuickView: (product: Product) => void;
};

export function ProductCard({
  product,
  categoryBgClass,
  onOpenQuickView,
}: ProductCardProps) {
  return (
    <div className="w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)] px-4 mx-4 flex flex-col justify-between group">
      {/* Box Immagine con Sfondo Dinamico ed Effetto Zoom */}
      <div
        onClick={() => onOpenQuickView(product)}
        className={`w-full aspect-4/5 ${categoryBgClass} mb-6 flex items-center justify-center overflow-hidden relative cursor-pointer rounded-xl`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 rounded-xl"
        />
      </div>

      {/* Info prodotto */}
      <div className="space-y-1">
        <span className="font-sans text-[10px] uppercase tracking-wider text-[#7c7c7c]">
          {product.category}
        </span>
        <h3
          onClick={() => onOpenQuickView(product)}
          className="font-serif text-lg text-[#1a1a1a] leading-snug group-hover:text-[#2c3e2b] transition-colors duration-300 cursor-pointer"
        >
          {product.name}
        </h3>
        <p className="font-sans text-sm font-medium text-[#b87d4b] pt-1">
          {product.price.toFixed(2)}€
        </p>
      </div>

      {/* Pulsante di Acquisto Rapido (Apre la QuickView) */}
      <div className="pt-4 mt-auto">
        <CtaButton
          btnText="Aggiungi al carrello"
          variant="light"
          onClick={() => onOpenQuickView(product)}
        />
      </div>
    </div>
  );
}

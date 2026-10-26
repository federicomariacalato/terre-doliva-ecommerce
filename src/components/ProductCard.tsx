import type { Product } from "../types/store.types";
import { motion } from "motion/react";
import { CtaButton } from "./CtaButton";
import { EASE_OUT } from "@/lib/motion";

type ProductCardProps = {
  product: Product;
  categoryBgClass: string;
  onOpenQuickView: (product: Product) => void;
  index: number;
};

export function ProductCard({
  product,
  categoryBgClass,
  onOpenQuickView,
  index,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 1.5, ease: EASE_OUT, delay: (index % 3) * 0.2 }}
      className="w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)] px-4 mx-4 flex flex-col justify-between group"
    >
      <div
        onClick={() => onOpenQuickView(product)}
        className={`w-full aspect-4/5 ${categoryBgClass} mb-6 flex items-center justify-center overflow-hidden relative cursor-pointer rounded-lg`}
      >
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 rounded-lg ${product.is_available ? "" : "opacity-70 grayscale-[40%]"}`}
        />
        {!product.is_available && (
          <span className="absolute top-3 left-3 rounded-full bg-ground px-3.5 py-1 font-serif italic text-base text-deep">
            Esaurito
          </span>
        )}
      </div>

      <div className="space-y-1">
        <span className="font-serif italic text-base text-oil">
          {product.category}
        </span>
        <h3
          onClick={() => onOpenQuickView(product)}
          className="font-serif text-[1.5rem] text-ink leading-[1.15] tracking-[-0.01em] group-hover:text-oil transition-colors duration-300 cursor-pointer"
        >
          {product.name}
        </h3>
        <p className="font-sans text-base font-medium text-ink pt-2 tabular-nums">
          {product.price.toFixed(2)}€
        </p>
      </div>

      <div className="pt-4 mt-auto">
        <CtaButton
          btnText={
            product.is_available ? "Aggiungi al carrello" : "Scopri il prodotto"
          }
          variant="light"
          onClick={() => onOpenQuickView(product)}
        />
      </div>
    </motion.div>
  );
}

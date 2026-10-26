import type { Product } from "../types/store.types";
import { Navbar } from "../components/Navbar";
import { ProductCard } from "../components/ProductCard";
import { QuickViewModal } from "../components/QuickViewModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { useProducts } from "../hooks/useProducts";

export function Shop() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const dispatch = useDispatch();
  const { products, isLoading, isError } = useProducts();

  const categoryColors: Record<string, string> = {
    "Olio EVOO": "bg-panel",
    Conserve: "bg-line/50",
    "Oli Aromatizzati": "bg-glow/20",
    Specialità: "bg-deep/10",
    default: "bg-panel",
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    dispatch(
      addToCart({ ...product, quantity } as Product & { quantity: number }),
    );
  };

  return (
    <>
      <Navbar theme="light" />
      <div className="w-full min-h-screen bg-ground pt-44 px-6 md:px-12 lg:px-20 pb-32">
        <div className="max-w-[1400px] mx-auto">
          <header className="mb-20 space-y-4">
            <span className="font-serif italic text-xl text-oil block">
              La Dispensa Autentica
            </span>
            <h1 className="font-serif text-[clamp(2.75rem,7vw,6.5rem)] font-normal text-ink tracking-[-0.02em] leading-[0.98]">
              Collezione Terra
            </h1>
          </header>

          {isLoading && (
            <p className="font-sans text-sm text-mute">
              Caricamento prodotti...
            </p>
          )}

          {isError && (
            <p className="font-sans text-sm text-red-600">
              Impossibile caricare i prodotti. Riprova più tardi.
            </p>
          )}

          <div className="flex flex-wrap -mx-4 gap-y-16">
            {products?.map((product, index) => (
              <ProductCard
                key={product.id}
                index={index}
                product={product}
                categoryBgClass={
                  categoryColors[product.category] || categoryColors["default"]
                }
                onOpenQuickView={setSelectedProduct}
              />
            ))}
          </div>
        </div>
      </div>

      <QuickViewModal
        key={selectedProduct?.id}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}

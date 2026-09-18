import type { Product } from "../../types/store.types";
import { Navbar } from "../../components/Navbar";
import { ProductCard } from "../../pages/shop/components/ProductCard";
import { QuickViewModal } from "../../pages/shop/components/QuickViewModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { useProducts } from "../../hooks/useProducts";

export function Shop() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const dispatch = useDispatch();
  const { products, isLoading, isError } = useProducts();

  const categoryColors: Record<string, string> = {
    "Olio EVOO": "bg-[#f2efe9]",
    Conserve: "bg-[#ebf0ec]",
    "Oli Aromatizzati": "bg-[#f5e6db]",
    Specialità: "bg-[#f7f4eb]",
    default: "bg-[#f4f4f4]",
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    dispatch(
      addToCart({ ...product, quantity } as Product & { quantity: number }),
    );
  };

  return (
    <>
      <Navbar theme="light" />
      <div className="w-full min-h-screen bg-[#fbf9f4] pt-32 px-6 md:px-12 lg:px-20 mb-16">
        <div className="max-w-7xl mx-auto">
          <header className="mb-16 space-y-2">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#2c3e2b] font-semibold block">
              La Dispensa Autentica
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#1a1a1a] tracking-wide">
              Collezione Terra
            </h1>
          </header>

          {isLoading && (
            <p className="font-sans text-sm text-[#7c7c7c]">
              Caricamento prodotti...
            </p>
          )}

          {isError && (
            <p className="font-sans text-sm text-red-600">
              Impossibile caricare i prodotti. Riprova più tardi.
            </p>
          )}

          <div className="flex flex-wrap -mx-4 gap-y-16">
            {products?.map((product) => (
              <ProductCard
                key={product.id}
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

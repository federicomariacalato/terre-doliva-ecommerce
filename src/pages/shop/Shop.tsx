import productsData from "../../data/products.json";
import type { Product } from "../../types/store.tipes";
import rawProductData from "../../data/products.json";

const productData: Product[] = rawProductData;

export function Shop() {
  return (
    <div className="w-full min-h-screen bg-[#fbf9f4] pt-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Intestazione minimale */}
        <header className="mb-16 space-y-2">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#2c3e2b] font-semibold block">
            La Dispensa Autentica
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#1a1a1a] tracking-wide">
            Collezione Terra
          </h1>
        </header>

        {/* Griglia dei prodotti */}
        <div className="flex flex-wrap -mx-4 gap-y-16">
          {productsData.map((product) => {
            return (
              <div
                key={product.id}
                className="w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)] px-4 mx-4 flex flex-col justify-between group"
              >
                <p className="font-serif text-lg text-[#1a1a1a]">
                  {product.name}
                </p>
                <p className="font-sans text-sm text-[#b87d4b]">
                  {product.price.toFixed(2)}€
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

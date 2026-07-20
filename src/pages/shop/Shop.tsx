import type { Product } from "../../types/store.tipes";
import rawProductData from "../../data/products.json";
import { CtaButton } from "../../components/CtaButton";

const productsData: Product[] = rawProductData;

export function Shop() {
  // Dizionario colori per ogni categoria del prodotto
  const categoryColors: Record<string, string> = {
    "Olio EVOO": "bg-[#f2efe9]", // Grigio oliva caldissimo
    Conserve: "bg-[#ebf0ec]", // Verde salvia chiarissimo
    "Oli Aromatizzati": "bg-[#f5e6db]", // Beige terra cotta leggero
    Specialità: "bg-[#f7f4eb]", // Crema/miele morbido
    default: "bg-[#f4f4f4]",
  };
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
            const bgClass =
              categoryColors[product.category] || categoryColors["default"];
            return (
              <div
                key={product.id}
                className="w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)] px-4 mx-4 flex flex-col justify-between group"
              >
                {/* Box Immagine con Sfondo Dinamico ed Effetto Zoom */}
                <div
                  className={`w-full aspect-4/5 ${bgClass} mb-6 flex items-center justify-center overflow-hidden relative cursor-pointer rounded-xl`}
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
                  <h3 className="font-serif text-lg text-[#1a1a1a] leading-snug group-hover:text-[#2c3e2b] transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="font-sans text-sm font-medium text-[#b87d4b] pt-1">
                    {product.price.toFixed(2)}€
                  </p>
                </div>

                {/* Spazio e Pulsante di Acquisto */}
                <div className="pt-4 mt-auto">
                  {/* Nota: Se il CtaButton ha i colori invertiti rispetto allo sfondo dello shop, */}
                  {/* possiamo racchiuderlo o passargli stili dedicati. Per ora lo montiamo pulito: */}
                  <CtaButton
                    btnText="Aggiungi al carrello"
                    variant="light"
                    onClick={() =>
                      console.log(`Aggiunto al carrello: ${product.name}`)
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { CtaButton } from "../components/CtaButton";
import imgUlivetoHomePage from "../assets/uliveto-homepage.jpeg";

export const HomeShopCTA = () => {
  return (
    <section className="relative w-full py-32 bg-[#2c3e2b] text-[#fbf9f4] px-8 text-center overflow-hidden">
      {/* Immagine di sfondo in trasparenza leggera per dare profondità */}
      <div className="absolute inset-0 w-full h-full opacity-10">
        <img
          src={imgUlivetoHomePage}
          alt="Dettaglio uliveto"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto space-y-6">
        <span className="font-sans text-xs uppercase tracking-widest text-[#fbf9f4]/60 font-medium">
          Esplora la Dispensa
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-wide leading-tight">
          Porta l'autenticità sulla tua tavola.
        </h2>
        <p className="font-sans text-sm text-[#fbf9f4]/80 font-light leading-relaxed pb-4">
          Dal nostro Olio Extravergine di Oliva fino alle conserve artigianali
          sott'olio e ai prodotti della tradizione. Ogni pezzo è unico, in
          edizione limitata per raccolta.
        </p>
        <CtaButton href="/shop" btnText="Vai allo shop" />
      </div>
    </section>
  );
};

export function StoriesShopCTA() {
  return (
    <section className="bg-[#2c3e2b] text-[#fbf9f4] py-20 px-6 text-center">
      <div className="max-w-2xl mx-auto space-y-6">
        <h2 className="font-serif text-3xl sm:text-4xl font-light">
          Assapora il frutto del nostro lavoro
        </h2>
        <p className="font-sans text-sm text-[#fbf9f4]/80 font-light">
          Scopri gli oli e le specialità siciliane realizzate con cura e
          dedizione.
        </p>
        <div className="pt-4 flex justify-center">
          <a href="/shop">
            <CtaButton btnText="Scopri lo Shop" variant="dark" href="/shop" />
          </a>
        </div>
      </div>
    </section>
  );
}

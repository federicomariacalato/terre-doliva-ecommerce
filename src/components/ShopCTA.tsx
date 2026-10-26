import { CtaButton } from "../components/CtaButton";
import imgUlivetoHomePage from "../assets/uliveto-homepage.jpeg";

export const HomeShopCTA = () => {
  return (
    <section className="relative w-full py-36 lg:py-44 bg-deep text-ground px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 w-full h-full opacity-10">
        <img
          src={imgUlivetoHomePage}
          alt="Dettaglio uliveto"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto space-y-8">
        <span className="font-serif italic text-xl text-glow block">
          Esplora la Dispensa
        </span>
        <h2 className="font-serif text-[clamp(2.5rem,6vw,6rem)] font-normal tracking-[-0.02em] leading-[0.98] max-w-[16ch]">
          Porta l'autenticità sulla tua tavola.
        </h2>
        <p className="font-sans text-[17px] text-ground/80 leading-[1.75] max-w-[34rem] pb-4">
          Dal nostro Olio Extravergine di Oliva fino alle conserve artigianali
          sott'olio e ai prodotti della tradizione. Ogni pezzo è unico, in
          edizione limitata per raccolta.
        </p>
        <CtaButton href="/shop" btnText="Vai allo shop" variant="dark" />
      </div>
    </section>
  );
};

export function StoriesShopCTA() {
  return (
    <section className="bg-deep text-ground py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto space-y-8">
        <h2 className="font-serif text-[clamp(2.25rem,5vw,4.75rem)] font-normal tracking-[-0.02em] leading-[1] max-w-[18ch]">
          Assapora il frutto del nostro lavoro
        </h2>
        <p className="font-sans text-[17px] text-ground/80 leading-[1.75] max-w-[34rem]">
          Scopri gli oli e le specialità siciliane realizzate con cura e
          dedizione.
        </p>
        <div className="pt-4 flex">
          <CtaButton btnText="Scopri lo Shop" variant="dark" href="/shop" />
        </div>
      </div>
    </section>
  );
}

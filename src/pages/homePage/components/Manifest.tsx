import imgUliveto from "../../public/assets/raccolta-olive-a-mano.jpeg";

export const Manifest = () => {
  return (
    <section className="w-full bg-[#fbf9f4] py-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Sinistra: Testo narrativo (6 colonne su desktop) */}
        <div className="lg:col-span-7 space-y-8 pr-0 lg:pr-12">
          <span className="font-sans text-xs uppercase tracking-widest text-[#2c3e2b]/60 font-medium block">
            La Nostra Filosofia
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1a1a1a] tracking-wide leading-tight">
            Coltiviamo con la pazienza dei secoli, <br />
            <span className="italic">raccogliendo ogni oliva a mano</span>.
          </h2>
          <p className="font-sans text-sm text-[#1a1a1a]/80 font-light leading-relaxed max-w-xl">
            Nelle nostre terre, il tempo si misura in stagioni e il lavoro in
            gesti antichi. Non cerchiamo la fretta della produzione di massa, ma
            la perfezione di un cerchio che si chiude: dalla cura dell'albero
            alla frangitura immediata, per portare in tavola un olio che
            racconta la terra, il sole e la nostra ossessione per la qualità.
          </p>
          <div className="pt-4">
            <a
              href="#storia"
              className="inline-block font-sans text-xs uppercase tracking-widest font-semibold text-[#2c3e2b] relative group py-1"
            >
              Scopri la nostra storia
              <span className="absolute bottom-0 left-0 w-full h-px bg-[#2c3e2b] transition-transform duration-300 scale-x-100 group-hover:scale-x-0 origin-right"></span>
              <span className="absolute bottom-0 left-0 w-full h-px bg-[#b87d4b] transition-transform duration-300 scale-x-0 group-hover:scale-x-100 origin-left"></span>
            </a>
          </div>
        </div>

        {/* Destra: Immagine con cornice e layout asimmetrico (5 colonne su desktop) */}
        <div className="lg:col-span-5 lg:col-start-8">
          <div className="relative p-4 border border-[#e8e4d9] bg-white shadow-sm group">
            <div className="overflow-hidden aspect-3/4">
              {/* Placeholder per foto dettagliata (es. olive sulla pianta o mani contadine) */}
              <img
                src={imgUliveto}
                alt="Uliveto secolare Terre d'Oliva in Sicilia"
                className="w-full h-full object-cover grayscale-10 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#2c3e2b] text-[#fbf9f4] p-4 hidden sm:block">
              <p className="font-serif italic text-sm font-light">
                Raccolta manuale all'alba.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

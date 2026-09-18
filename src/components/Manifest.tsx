import { Link } from "react-router";
import imgUliveto from "../assets/raccolta-olive-a-mano.jpeg";

export const HomeManifest = () => {
  return (
    <section className="w-full bg-[#fbf9f4] py-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
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
            <Link
              to="/storie"
              className="inline-block font-sans text-xs uppercase tracking-widest font-semibold text-[#2c3e2b] relative group py-1"
            >
              Scopri la nostra storia
              <span className="absolute bottom-0 left-0 w-full h-px bg-[#2c3e2b] transition-transform duration-300 scale-x-100 group-hover:scale-x-0 origin-right"></span>
              <span className="absolute bottom-0 left-0 w-full h-px bg-[#b87d4b] transition-transform duration-300 scale-x-0 group-hover:scale-x-100 origin-left"></span>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <div className="relative p-4 border border-[#e8e4d9] bg-white shadow-sm group">
            <div className="overflow-hidden aspect-3/4">
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

export function StoriesManifest() {
  return (
    <div className="py-20 space-y-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-5 space-y-6">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#b87d4b] font-bold block">
            Capitolo I — La Scelta di Rimanere
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1a1a1a] leading-snug font-light">
            Sotto il sole della nostra terra, controcorrente.
          </h2>
          <p className="font-sans text-sm text-[#555] leading-relaxed font-light">
            Mentre molti dei nostri coetanei cercavano il proprio futuro
            altrove, noi due abbiamo guardato gli uliveti di famiglia sotto il
            sole cocente della Sicilia e abbiamo visto un patrimonio
            inestimabile che rischiava di andare perduto.
          </p>
          <p className="font-sans text-sm text-[#555] leading-relaxed font-light pt-2">
            Ci siamo rimboccati le maniche. Con mani giovani ma determinate,
            abbiamo unito il rispetto per il sapere antico con uno sguardo
            fresco e rigoroso, dedicando ogni singola giornata a prenderci cura
            di ciascuna pianta.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-[#f4f1ea] aspect-4/3">
            <img
              src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=1200"
              alt="Uliveti in Sicilia"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7 order-2 lg:order-1">
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-[#f4f1ea] aspect-4/3">
            <img
              src="https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?auto=format&fit=crop&q=80&w=1200"
              alt="Raccolta a mano delle olive"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#b87d4b] font-bold block">
            Capitolo II — Il Ritmo della Terra
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1a1a1a] leading-snug font-light">
            Nelle nostre mani, la cura di ogni singolo frutto.
          </h2>
          <p className="font-sans text-sm text-[#555] leading-relaxed font-light">
            Non usiamo scorciatoie industriali. Durante i mesi autunnali, la
            raccolta per noi è un rito quotidiano che si svolge a mano, sfidando
            la fatica con la soddisfazione di chi sa che ogni oliva scelta
            porterà con sé un profilo organolettico perfetto.
          </p>
          <p className="font-sans text-sm text-[#555] leading-relaxed font-light pt-2">
            Selezioniamo solo i frutti integri al giusto grado di maturazione,
            per garantire un olio dal fruttato intenso e ricco di polifenoli
            naturali.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-5 space-y-6">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#b87d4b] font-bold block">
            Capitolo III — Dalla Frangitura alla Tavola
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1a1a1a] leading-snug font-light">
            Entro poche ore, l'estrazione dell'oro verde.
          </h2>
          <p className="font-sans text-sm text-[#555] leading-relaxed font-light">
            La distanza tra il campo e il frantoio è questione di minuti.
            Spremiamo a freddo rigorosamente sotto i 27°C entro 4 ore dalla
            raccolta per conservare intatti profumi, sfumature di carciofo ed
            erba tagliata e le proprietà nutritive.
          </p>
          <p className="font-sans text-sm text-[#555] leading-relaxed font-light pt-2">
            Terre d'Oliva è la dimostrazione che quando due giovani uniscono la
            propria visione al rispetto della tradizione, nasce un prodotto
            autentico capace di raccontare una terra unica.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-[#f4f1ea] aspect-4/3">
            <img
              src="https://images.unsplash.com/photo-1541480601022-2308c0f0a487?auto=format&fit=crop&q=80&w=1200"
              alt="Olio estratto a freddo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

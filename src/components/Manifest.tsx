import { Link } from "react-router";
import { Reveal } from "@/components/animations/Reveal";
import imgUliveto from "../assets/raccolta-olive-a-mano.jpeg";

export const HomeManifest = () => {
  return (
    <section className="w-full bg-ground py-28 lg:py-36 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <Reveal from="left" className="lg:col-span-7 space-y-8 pr-0 lg:pr-16">
          <span className="font-serif italic text-xl text-oil block">
            La Nostra Filosofia
          </span>
          <h2 className="font-serif text-[clamp(2.25rem,4.6vw,4.5rem)] font-normal text-ink tracking-[-0.02em] leading-[1.02]">
            Coltiviamo con la pazienza dei secoli, <br />
            <span className="italic">raccogliendo ogni oliva a mano</span>.
          </h2>
          <p className="font-sans text-[17px] text-ink/80 font-normal leading-[1.75] max-w-[34rem]">
            Nelle nostre terre, il tempo si misura in stagioni e il lavoro in
            gesti antichi. Non cerchiamo la fretta della produzione di massa, ma
            la perfezione di un cerchio che si chiude: dalla cura dell'albero
            alla frangitura immediata, per portare in tavola un olio che
            racconta la terra, il sole e la nostra ossessione per la qualità.
          </p>
          <div className="pt-4">
            <Link
              to="/storie"
              className="inline-block font-sans text-[15px] font-medium text-deep relative group py-1.5"
            >
              Scopri la nostra storia
              <span className="absolute bottom-0 left-0 w-full h-px bg-deep transition-transform duration-300 scale-x-100 group-hover:scale-x-0 origin-right"></span>
              <span className="absolute bottom-0 left-0 w-full h-px bg-oil transition-transform duration-300 scale-x-0 group-hover:scale-x-100 origin-left"></span>
            </Link>
          </div>
        </Reveal>

        <div className="lg:col-span-5 lg:col-start-8">
          <div className="relative group">
            <div className="overflow-hidden aspect-4/5">
              <img
                src={imgUliveto}
                alt="Uliveto secolare Terre d'Oliva in Sicilia"
                className="w-full h-full object-cover grayscale-10 contrast-105 group-hover:scale-105 transition-transform duration-[1400ms] ease-out"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-deep text-ground px-6 py-5 hidden sm:block">
              <p className="font-serif italic text-lg">
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
    <div className="py-28 space-y-32 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 overflow-x-clip">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-5 space-y-6">
          <span className="font-serif italic text-xl text-oil block">
            Capitolo I — La Scelta di Rimanere
          </span>
          <h2 className="font-serif text-[clamp(2rem,3.6vw,3.25rem)] text-ink leading-[1.05] tracking-[-0.02em] font-normal">
            Sotto il sole della nostra terra, controcorrente.
          </h2>
          <p className="font-sans text-[17px] text-ink/80 leading-[1.75]">
            Mentre molti dei nostri coetanei cercavano il proprio futuro
            altrove, noi due abbiamo guardato gli uliveti di famiglia sotto il
            sole cocente della Sicilia e abbiamo visto un patrimonio
            inestimabile che rischiava di andare perduto.
          </p>
          <p className="font-sans text-[17px] text-ink/80 leading-[1.75] pt-2">
            Ci siamo rimboccati le maniche. Con mani giovani ma determinate,
            abbiamo unito il rispetto per il sapere antico con uno sguardo
            fresco e rigoroso, dedicando ogni singola giornata a prenderci cura
            di ciascuna pianta.
          </p>
        </div>

        <div className="lg:col-span-7">
          <Reveal
            className="relative overflow-hidden bg-panel rounded-xl aspect-4/3"
          >
            <img
              src="https://images.unsplash.com/photo-1728940823516-ff387be88638?auto=format&fit=crop&q=80&w=1200"
              alt="Ulivi secolari sotto il sole della Sicilia"
              className="w-full h-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7 order-2 lg:order-1">
          <Reveal
            from="left"
            className="relative overflow-hidden bg-panel rounded-xl aspect-4/3"
          >
            <img
              src="https://images.unsplash.com/photo-1635097087993-1dbe24dbc2f9?auto=format&fit=crop&q=80&w=1200"
              alt="Raccolta a mano delle olive"
              className="w-full h-full object-cover"
            />
          </Reveal>
        </div>

        <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
          <span className="font-serif italic text-xl text-oil block">
            Capitolo II — Il Ritmo della Terra
          </span>
          <h2 className="font-serif text-[clamp(2rem,3.6vw,3.25rem)] text-ink leading-[1.05] tracking-[-0.02em] font-normal">
            Nelle nostre mani, la cura di ogni singolo frutto.
          </h2>
          <p className="font-sans text-[17px] text-ink/80 leading-[1.75]">
            Non usiamo scorciatoie industriali. Durante i mesi autunnali, la
            raccolta per noi è un rito quotidiano che si svolge a mano, sfidando
            la fatica con la soddisfazione di chi sa che ogni oliva scelta
            porterà con sé un profilo organolettico perfetto.
          </p>
          <p className="font-sans text-[17px] text-ink/80 leading-[1.75] pt-2">
            Selezioniamo solo i frutti integri al giusto grado di maturazione,
            per garantire un olio dal fruttato intenso e ricco di polifenoli
            naturali.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-5 space-y-6">
          <span className="font-serif italic text-xl text-oil block">
            Capitolo III — Dalla Frangitura alla Tavola
          </span>
          <h2 className="font-serif text-[clamp(2rem,3.6vw,3.25rem)] text-ink leading-[1.05] tracking-[-0.02em] font-normal">
            Entro poche ore, l'estrazione dell'oro verde.
          </h2>
          <p className="font-sans text-[17px] text-ink/80 leading-[1.75]">
            La distanza tra il campo e il frantoio è questione di minuti.
            Spremiamo a freddo rigorosamente sotto i 27°C entro 4 ore dalla
            raccolta per conservare intatti profumi, sfumature di carciofo ed
            erba tagliata e le proprietà nutritive.
          </p>
          <p className="font-sans text-[17px] text-ink/80 leading-[1.75] pt-2">
            Terre d'Oliva è la dimostrazione che quando due giovani uniscono la
            propria visione al rispetto della tradizione, nasce un prodotto
            autentico capace di raccontare una terra unica.
          </p>
        </div>

        <div className="lg:col-span-7">
          <Reveal
            className="relative overflow-hidden bg-panel rounded-xl aspect-4/3"
          >
            <img
              src="https://images.unsplash.com/photo-1768689033119-c3ac1e437d20?auto=format&fit=crop&q=80&w=1200"
              alt="Olio appena estratto che scorre dal frantoio"
              className="w-full h-full object-cover"
            />
          </Reveal>
        </div>
      </section>
    </div>
  );
}

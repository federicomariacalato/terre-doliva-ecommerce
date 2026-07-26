import { Navbar } from "../../components/Navbar";
import { Hero } from "../../components//Hero";
import { CtaButton } from "../../components/CtaButton";
import { Heart, Sparkles, ShieldCheck } from "lucide-react";
import imgFrantoio from "../../../public/assets/lavorazione-in-frantoio.jpg";

export function Stories() {
  return (
    <div className="bg-[#fbf9f4] min-h-screen text-[#1a1a1a]">
      <Navbar theme="dark" />

      {/* HERO REUTILIZZATA */}
      <Hero
        subtitle="La Nostra Storia"
        title="Due sogni, quattro mani e il cuore in Sicilia"
        bgImage={imgFrantoio}
        showCta={false}
      />

      {/* SEZIONE CAPITOLI EDITORIALI */}
      <div className="py-20 space-y-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* CAPITOLO I: TESTO -> IMMAGINE */}
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
              fresco e rigoroso, dedicando ogni singola giornata a prenderci
              cura di ciascuna pianta.
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

        {/* CAPITOLO II: IMMAGINE -> TESTO */}
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
              raccolta per noi è un rito quotidiano che si svolge a mano,
              sfidando la fatica con la soddisfazione di chi sa che ogni oliva
              scelta porterà con sé un profilo organolettico perfetto.
            </p>
            <p className="font-sans text-sm text-[#555] leading-relaxed font-light pt-2">
              Selezioniamo solo i frutti integri al giusto grado di maturazione,
              per garantire un olio dal fruttato intenso e ricco di polifenoli
              naturali.
            </p>
          </div>
        </section>

        {/* CAPITOLO III: TESTO -> IMMAGINE */}
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
              Terre d'Oliva è la dimostrazione che quando due giovani uniscono
              la propria visione al rispetto della tradizione, nasce un prodotto
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

      {/* I PILASTRI */}
      <section className="bg-[#f4f1ea] py-24 px-6 md:px-12 lg:px-24 border-y border-[#e8e4d9]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#2c3e2b] font-semibold block">
              Il Nostro Impegno
            </span>
            <h2 className="font-serif text-3xl text-[#1a1a1a] font-light">
              Cosa ci guida ogni giorno
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#fbf9f4] p-8 rounded-xl space-y-4 border border-[#e8e4d9] shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#ebf0ec] flex items-center justify-center text-[#2c3e2b]">
                <Heart size={22} />
              </div>
              <h3 className="font-serif text-xl text-[#1a1a1a]">
                Passione Incondizionata
              </h3>
              <p className="font-sans text-xs text-[#666] leading-relaxed font-light">
                Dall'alba al tramonto seguiamo ogni fase della produzione in
                prima persona. Per noi non è solo lavoro, è il nostro motivo di
                orgoglio quotidiano.
              </p>
            </div>

            <div className="bg-[#fbf9f4] p-8 rounded-xl space-y-4 border border-[#e8e4d9] shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#f5e6db] flex items-center justify-center text-[#b87d4b]">
                <Sparkles size={22} />
              </div>
              <h3 className="font-serif text-xl text-[#1a1a1a]">
                Visione Giovane & Sostenibile
              </h3>
              <p className="font-sans text-xs text-[#666] leading-relaxed font-light">
                Applichiamo pratiche agricole sostenibili e innovative per
                proteggere il terreno e garantire che ogni goccia rispetti
                l'ecosistema siciliano.
              </p>
            </div>

            <div className="bg-[#fbf9f4] p-8 rounded-xl space-y-4 border border-[#e8e4d9] shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#f7f4eb] flex items-center justify-center text-[#2c3e2b]">
                <ShieldCheck size={22} />
              </div>
              <h3 className="font-serif text-xl text-[#1a1a1a]">
                Qualità Senza Compromessi
              </h3>
              <p className="font-sans text-xs text-[#666] leading-relaxed font-light">
                Mettiamo la firma e la faccia su ogni singola bottiglia.
                Spremiamo a freddo pochissime ore dopo la raccolta per offrire
                solo il meglio della Sicilia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CITAZIONE EDITORIALE */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto space-y-6">
        <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2c3e2b] font-light italic leading-relaxed">
          “La Sicilia non è soltanto la terra dove siamo nati. È la promessa che
          ci siamo fatti: fare le cose con il cuore, per davvero.”
        </blockquote>
        <cite className="font-sans text-xs uppercase tracking-widest text-[#7c7c7c] block not-italic">
          — I Fondatori di Terre d'Oliva
        </cite>
      </section>

      {/* CTA FINALE */}
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
              <CtaButton btnText="Scopri lo Shop" variant="dark" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

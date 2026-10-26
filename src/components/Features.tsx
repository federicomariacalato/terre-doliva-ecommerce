import { Heart, Sparkles, ShieldCheck } from "lucide-react";
import { RevealUp } from "@/components/animations/RevealUp";

export const HomeFeatures = () => {
  const pilastri = [
    {
      titolo: "Estratto a Freddo",
      desc: "Lavorato rigorosamente entro 4 ore dalla raccolta per preservare polifenoli e aromi vivi.",
    },
    {
      titolo: "Monocultivar",
      desc: "Selezioniamo solo le varietà più nobili della nostra terra, senza blend industriali.",
    },
    {
      titolo: "Bio Certificato",
      desc: "Rispettiamo il suolo bandendo la chimica, lasciando che la natura faccia il suo corso.",
    },
    {
      titolo: "Oltre l'Olio",
      desc: "Dalle conserve artigianali ai condimenti rari: la dispensa della nostra passione.",
    },
  ];

  return (
    <section className="w-full bg-panel py-28 lg:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
        {pilastri.map((p, index) => (
          <RevealUp
            key={index}
            index={index}
            className="border-t border-ink/30 pt-6"
          >
            <h3 className="font-serif text-[1.75rem] leading-tight font-normal text-ink mb-4">
              {p.titolo}
            </h3>
            <p className="font-sans text-base text-ink/75 leading-[1.7] max-w-[30ch]">
              {p.desc}
            </p>
          </RevealUp>
        ))}
      </div>
    </section>
  );
};

export function StoriesFeatures() {
  return (
    <section className="bg-panel py-28 lg:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto space-y-20">
        <div className="max-w-2xl space-y-3">
          <span className="font-serif italic text-xl text-oil block">
            Il Nostro Impegno
          </span>
          <h2 className="font-serif text-[clamp(2rem,3.6vw,3.25rem)] text-ink font-normal leading-[1.05] tracking-[-0.02em]">
            Cosa ci guida ogni giorno
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
          <RevealUp
            index={0}
            className="bg-ground p-8 rounded-lg space-y-4 border border-line shadow-sm"
          >
            <div className="text-oil">
              <Heart size={26} strokeWidth={1.25} />
            </div>
            <h3 className="font-serif text-[1.75rem] leading-tight font-normal text-ink">
              Passione Incondizionata
            </h3>
            <p className="font-sans text-base text-ink/75 leading-[1.7] max-w-[34ch]">
              Dall'alba al tramonto seguiamo ogni fase della produzione in prima
              persona. Per noi non è solo lavoro, è il nostro motivo di orgoglio
              quotidiano.
            </p>
          </RevealUp>

          <RevealUp
            index={1}
            className="bg-ground p-8 rounded-lg space-y-4 border border-line shadow-sm"
          >
            <div className="text-oil">
              <Sparkles size={26} strokeWidth={1.25} />
            </div>
            <h3 className="font-serif text-[1.75rem] leading-tight font-normal text-ink">
              Visione Giovane & Sostenibile
            </h3>
            <p className="font-sans text-base text-ink/75 leading-[1.7] max-w-[34ch]">
              Applichiamo pratiche agricole sostenibili e innovative per
              proteggere il terreno e garantire che ogni goccia rispetti
              l'ecosistema siciliano.
            </p>
          </RevealUp>

          <RevealUp
            index={2}
            className="bg-ground p-8 rounded-lg space-y-4 border border-line shadow-sm"
          >
            <div className="text-oil">
              <ShieldCheck size={26} strokeWidth={1.25} />
            </div>
            <h3 className="font-serif text-[1.75rem] leading-tight font-normal text-ink">
              Qualità Senza Compromessi
            </h3>
            <p className="font-sans text-base text-ink/75 leading-[1.7] max-w-[34ch]">
              Mettiamo la firma e la faccia su ogni singola bottiglia. Spremiamo
              a freddo pochissime ore dopo la raccolta per offrire solo il
              meglio della Sicilia.
            </p>
          </RevealUp>
        </div>
      </div>
    </section>
  );
}

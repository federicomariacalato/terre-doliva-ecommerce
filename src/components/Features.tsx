import { Heart, Sparkles, ShieldCheck } from "lucide-react";

export const HomeFeatures = () => {
  const pilastri = [
    {
      numero: "01",
      titolo: "Estratto a Freddo",
      desc: "Lavorato rigorosamente entro 4 ore dalla raccolta per preservare polifenoli e aromi vivi.",
    },
    {
      numero: "02",
      titolo: "Monocultivar",
      desc: "Selezioniamo solo le varietà più nobili della nostra terra, senza blend industriali.",
    },
    {
      numero: "03",
      titolo: "Bio Certificato",
      desc: "Rispettiamo il suolo bandendo la chimica, lasciando che la natura faccia il suo corso.",
    },
    {
      numero: "04",
      titolo: "Oltre l'Olio",
      desc: "Dalle conserve artigianali ai condimenti rari: la dispensa della nostra passione.",
    },
  ];

  return (
    <section className="w-full bg-[#fbf9f4] border-t border-b border-[#e8e4d9]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {pilastri.map((p, index) => (
          <div
            key={index}
            className="p-12 flex flex-col justify-between min-h-75 border-b md:border-b-0 border-[#e8e4d9] last:border-b-0 md:even:border-l lg:even:border-l-0 lg:not-first:border-l transition-all duration-500 hover:bg-[#2c3e2b]/5 group"
          >
            <span className="font-serif text-4xl font-light text-[#b87d4b] tracking-wide transition-transform duration-300 group-hover:-translate-y-1 block">
              {p.numero}
            </span>
            <div className="mt-8">
              <h3 className="font-serif text-lg font-normal text-[#1a1a1a] mb-3 group-hover:text-[#2c3e2b] transition-colors duration-300">
                {p.titolo}
              </h3>
              <p className="font-sans text-xs text-[#1a1a1a]/70 font-light leading-relaxed">
                {p.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};



export function StoriesFeatures() {
  return (
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
              Dall'alba al tramonto seguiamo ogni fase della produzione in prima
              persona. Per noi non è solo lavoro, è il nostro motivo di orgoglio
              quotidiano.
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
              Mettiamo la firma e la faccia su ogni singola bottiglia. Spremiamo
              a freddo pochissime ore dopo la raccolta per offrire solo il
              meglio della Sicilia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

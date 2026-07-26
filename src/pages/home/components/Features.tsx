export const Features = () => {
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

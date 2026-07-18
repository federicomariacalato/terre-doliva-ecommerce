export const Hero = () => {
  return (
    <section className="relative w-full h-screen bg-[#1a1a1a] flex items-center justify-between justify-center overflow-hidden">
      {/* Immagine di Sfondo Cinematografica */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1800" 
          alt="Uliveti secolari al tramonto" 
          className="w-full h-full object-cover opacity-60 scale-105 animate-[pulse_8s_infinite_alternate]"
        />
        {/* Overlay scuro per migliorare la leggibilità del testo */}
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/40"></div>
      </div>

      {/* Contenuto Testuale - Stile Editoriale */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <span className="font-sans text-xs uppercase tracking-widest text-[#fbf9f4]/80 mb-4 block font-medium">
          Raccolta 2026 • Edizione Limitata
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#fbf9f4] font-light tracking-wide leading-tight mb-8">
          L'oro liquido della nostra terra, <br />
          <span className="italic">estratto a freddo</span>.
        </h1>
        
        {/* Bottone con transizione fluida */}
        <a 
          href="#shop" 
          className="inline-block font-sans text-xs uppercase tracking-widest font-semibold bg-[#fbf9f4] text-[#2c3e2b] px-8 py-4 border border-[#fbf9f4] hover:bg-transparent hover:text-[#fbf9f4] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 shadow-lg"
        >
          Esplora la Raccolta
        </a>
      </div>

      {/* Indicatore di Scroll in basso */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-[#fbf9f4]/60 flex flex-col items-center gap-2 animate-bounce">
        <span className="font-sans text-[10px] uppercase tracking-widest">Scorri</span>
        <div className="w-px h-8 bg-[#fbf9f4]/40"></div>
      </div>
    </section>
  );
};
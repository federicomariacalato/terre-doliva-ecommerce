export const ShopCTA = () => {
  return (
    <section className="relative w-full py-32 bg-[#2c3e2b] text-[#fbf9f4] px-8 text-center overflow-hidden">
      {/* Immagine di sfondo in trasparenza leggera per dare profondità */}
      <div className="absolute inset-0 w-full h-full opacity-10">
        <img
          src="https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=1200"
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
        <a
          href="/shop"
          className="inline-block font-sans text-xs uppercase tracking-widest font-semibold bg-[#fbf9f4] text-[#2c3e2b] px-10 py-4 border border-[#fbf9f4] hover:bg-transparent hover:text-[#fbf9f4] transition-all duration-300 transform hover:-translate-y-1 shadow-md cursor-pointer"
        >
          Vai allo Shop Completo
        </a>
      </div>
    </section>
  );
};

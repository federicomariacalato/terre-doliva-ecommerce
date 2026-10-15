import { Link } from "react-router";
import { Navbar } from "@/components/Navbar";
import { CtaButton } from "@/components/CtaButton";

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#fbf9f4] font-sans text-[#1a1a1a]">
      <Navbar theme="light" />
      <main className="max-w-xl mx-auto px-6 pt-48 pb-24 text-center">
        <p className="text-xs uppercase tracking-widest font-semibold text-[#b87d4b] mb-3">
          Errore 404
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-light text-[#2c3e2b] mb-6">
          Questa pagina non esiste
        </h1>
        <p className="text-sm text-[#555] leading-relaxed font-light mb-10">
          Forse il link è sbagliato o la pagina è stata spostata. Puoi tornare
          alla collezione e scegliere il tuo olio.
        </p>
        <div className="max-w-xs mx-auto space-y-5">
          <CtaButton btnText="Vai allo shop" variant="light" href="/shop" />
          <Link
            to="/"
            className="inline-block text-xs uppercase tracking-widest font-semibold text-[#2c3e2b] border-b border-[#2c3e2b] pb-1 hover:text-[#b87d4b] hover:border-[#b87d4b] transition-colors"
          >
            Torna alla home
          </Link>
        </div>
      </main>
    </div>
  );
}

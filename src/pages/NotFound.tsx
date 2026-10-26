import { Link } from "react-router";
import { Navbar } from "@/components/Navbar";
import { CtaButton } from "@/components/CtaButton";

export function NotFound() {
  return (
    <div className="min-h-screen bg-ground font-sans text-ink">
      <Navbar theme="light" />
      <main className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-56 pb-32">
        <p className="font-serif italic text-xl text-oil mb-4">Errore 404</p>
        <h1 className="font-serif text-[clamp(3rem,8vw,7.5rem)] font-normal tracking-[-0.02em] leading-[0.98] max-w-[12ch] mb-10">
          Questa pagina non esiste
        </h1>
        <p className="text-[17px] text-ink/75 leading-[1.75] max-w-[34rem] mb-12">
          Forse il link è sbagliato o la pagina è stata spostata. Puoi tornare
          alla collezione e scegliere il tuo olio.
        </p>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
          <div className="w-64">
            <CtaButton btnText="Vai allo shop" variant="light" href="/shop" />
          </div>
          <Link
            to="/"
            className="inline-block text-[15px] font-medium text-deep underline underline-offset-4 hover:text-oil transition-colors"
          >
            Torna alla home
          </Link>
        </div>
      </main>
    </div>
  );
}

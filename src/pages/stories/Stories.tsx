import { Navbar } from "../../components/Navbar";
import { Hero } from "../../components/Hero";
import imgFrantoio from "../../assets/lavorazione-in-frantoio.jpg";
import { StoriesManifest } from "../../components/Manifest";
import { StoriesFeatures } from "../../components/Features";
import { StoriesShopCTA } from "../../components/ShopCTA";

export function Stories() {
  return (
    <div className="bg-[#fbf9f4] min-h-screen text-[#1a1a1a]">
      <Navbar theme="dark" />

      <Hero
        subtitle="La Nostra Storia"
        title="Due sogni, quattro mani e il cuore in Sicilia"
        bgImage={imgFrantoio}
        showCta={false}
      />

      <StoriesManifest />

      <StoriesFeatures />

      <section className="py-24 px-6 text-center max-w-4xl mx-auto space-y-6">
        <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2c3e2b] font-light italic leading-relaxed">
          “La Sicilia non è soltanto la terra dove siamo nati. È la promessa che
          ci siamo fatti: fare le cose con il cuore, per davvero.”
        </blockquote>
        <cite className="font-sans text-xs uppercase tracking-widest text-[#7c7c7c] block not-italic">
          — I Fondatori di Terre d'Oliva
        </cite>
      </section>

      <StoriesShopCTA />
    </div>
  );
}

import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import imgFrantoio from "../assets/lavorazione-in-frantoio.jpg";
import { StoriesManifest } from "../components/Manifest";
import { StoriesFeatures } from "../components/Features";
import { StoriesShopCTA } from "../components/ShopCTA";

export function Stories() {
  return (
    <div className="bg-ground min-h-screen text-ink">
      <Navbar theme="dark" />

      <Hero
        subtitle="La Nostra Storia"
        title="Due sogni, quattro mani e il cuore in Sicilia"
        bgImage={imgFrantoio}
        showCta={false}
      />

      <StoriesManifest />

      <StoriesFeatures />

      <section className="py-32 px-6 md:px-12 lg:px-20 max-w-[1100px] mx-auto space-y-8">
        <blockquote className="font-serif text-[clamp(1.75rem,3.6vw,3.25rem)] text-deep font-normal italic leading-[1.2] tracking-[-0.01em]">
          “La Sicilia non è soltanto la terra dove siamo nati. È la promessa che
          ci siamo fatti: fare le cose con il cuore, per davvero.”
        </blockquote>
        <cite className="font-sans text-[15px] text-mute block not-italic">
          — I Fondatori di Terre d'Oliva
        </cite>
      </section>

      <StoriesShopCTA />
    </div>
  );
}

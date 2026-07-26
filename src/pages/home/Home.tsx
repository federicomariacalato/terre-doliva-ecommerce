import { Navbar } from "../../components/Navbar";
import { Features } from "./components/Features";
import { Hero } from "../../components/Hero";
import { Manifest } from "./components/Manifest";
import { ShopCTA } from "./components/ShopCTA";

export function Home() {
  return (
    <>
      <Navbar theme="dark" />
      <Hero
        subtitle="Raccolta 2026 • Edizione Limitata"
        title="L'oro liquido della nostra terra,estratto a freddo"
        bgImage="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1800"
        ctaText="Esplora la raccolta"
      />
      <Manifest />
      <Features />
      <ShopCTA />
    </>
  );
}

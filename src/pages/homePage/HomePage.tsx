import { Features } from "./components/Features";
import { Hero } from "./components/Hero";
import { Manifest } from "./components/Manifest";
import { ShopCTA } from "./components/ShopCTA";

export function HomePage() {
  return (
    <>
      <Hero />
      <Manifest />
      <Features />
      <ShopCTA />
    </>
  );
}

import { Navbar } from "../../components/Navbar";
import { Features } from "./components/Features";
import { Hero } from "./components/Hero";
import { Manifest } from "./components/Manifest";
import { ShopCTA } from "./components/ShopCTA";

export function HomePage() {
  return (
    <>
      <Navbar theme="dark" />
      <Hero />
      <Manifest />
      <Features />
      <ShopCTA />
    </>
  );
}

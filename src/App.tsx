import "./App.css";
import { Features } from "./components/Features";
import { Hero } from "./components/Hero";
import { Manifest } from "./components/Manifest";
import { Navbar } from "./components/Navbar";
import { ShopCTA } from "./components/ShopCTA";

export function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Manifest />
        <Features />
        <ShopCTA />
      </main>
    </>
  );
}

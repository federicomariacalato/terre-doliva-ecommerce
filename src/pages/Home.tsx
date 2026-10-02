import { Navbar } from "../components/Navbar";
import { HomeFeatures } from "../components/Features";
import { Hero } from "../components/Hero";
import { HomeManifest } from "../components/Manifest";
import { HomeShopCTA } from "../components/ShopCTA";
import { OrderSuccessToast } from "../components/OrderSuccessToast";
import { HomeContactForm } from "@/components/ContactForm";
import { useEffect } from "react";
import { useLocation } from "react-router";

export function Home() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash === "#contatti") {
      document
        .getElementById("contatti")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash]);
  return (
    <>
      <OrderSuccessToast />
      <Navbar theme="dark" />
      <Hero
        subtitle="Raccolta 2026 • Edizione Limitata"
        title="L'oro liquido della nostra terra,estratto a freddo"
        bgImage="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1800"
        ctaText="Esplora la raccolta"
        ctaHref="/storie"
      />
      <HomeManifest />
      <HomeFeatures />
      <HomeShopCTA />
      <HomeContactForm />
    </>
  );
}

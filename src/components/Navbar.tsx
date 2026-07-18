import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ShoppingBag, Heart } from "lucide-react";
import type { RootState } from "../store/store";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Recuperiamo i dati in tempo reale da Redux
  const wishlistCount = useSelector(
    (state: RootState) => state.wishlist.items.length,
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Controlla lo scroll della pagina per attivare l'effetto "vetro/opaco"
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500">
      {/* Announcement Bar - Stile Graza (Banner promozionale in alto) */}
      <div className="bg-[#2c3e2b] text-[#fbf9f4] text-xs uppercase tracking-widest py-2 text-center overflow-hidden whitespace-nowrap font-sans">
        <div className="inline-block animate-marquee">
          Spedizione gratuita in tutta Italia per ordini superiori a 50€ •
          Estratto a freddo 2026 •
        </div>
      </div>

      {/* Main Navbar - Stile Flamingo Estate (Colori caldi, font Serif) */}
      <nav
        className={`w-full px-8 py-6 flex justify-between items-center transition-all duration-500 border-b ${
          isScrolled
            ? "bg-[#fbf9f4] border-[#e8e4d9] shadow-sm py-4"
            : "bg-transparent border-transparent text-[#fbf9f4]"
        }`}
      >
        {/* Sinistra: Navigazione con animazione underline stile Graza */}
        <div
          className={`flex gap-8 font-sans text-xs uppercase tracking-widest font-medium ${
            isScrolled ? "text-[#1a1a1a]" : "text-[#fbf9f4]"
          }`}
        >
          <a href="#shop" className="relative py-1 group">
            Shop
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2c3e2b] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="#storie"
            className="relative py-1 group hidden md:inline-block"
          >
            Le Storie
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2c3e2b] transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        {/* Centro: Logo Serif ed elegante stile Flamingo Estate */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <a
            href="/"
            className={`font-serif text-2xl lg:text-3xl tracking-wide font-light transition-colors duration-500 ${
              isScrolled ? "text-[#2c3e2b]" : "text-[#fbf9f4]"
            }`}
          >
            Terre d'Oliva
          </a>
        </div>

        {/* Destra: Azioni Utente con micro-animazioni sui click e contatori */}
        <div
          className={`flex items-center gap-6 ${
            isScrolled ? "text-[#1a1a1a]" : "text-[#fbf9f4]"
          }`}
        >
          {/* Wishlist Icon */}
          <button className="relative p-1 hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer">
            <Heart
              size={20}
              strokeWidth={1.5}
              className={
                wishlistCount > 0 ? "fill-[#2c3e2b] stroke-[#2c3e2b]" : ""
              }
            />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#2c3e2b] text-[#fbf9f4] font-sans text-[10px] w-4 h-4 rounded-full flex items-center justify-between justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button className="relative p-1 hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#b87d4b] text-[#fbf9f4] font-sans text-[10px] w-4 h-4 rounded-full flex items-center justify-between justify-center font-bold animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingBag } from "lucide-react";
import type { RootState } from "../store/store";
import { openCart } from "../store/slices/cartSlice";
import { Link, NavLink } from "react-router";

type NavbarProps = {
  theme?: "dark" | "light";
};

export const Navbar = ({ theme = "dark" }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

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

  const isDarkText = isScrolled || theme === "light";

  const textColorClass = isDarkText ? "text-[#1a1a1a]" : "text-[#fbf9f4]";
  const logoColorClass = isDarkText ? "text-[#2c3e2b]" : "text-[#fbf9f4]";

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500">
      <div className="bg-[#2c3e2b] text-[#fbf9f4] text-xs uppercase tracking-widest py-2 text-center overflow-hidden whitespace-nowrap font-sans">
        <div className="inline-block animate-marquee">
          Spedizione gratuita in tutta Italia per ordini superiori a 50€ •
          Estratto a freddo 2026 •
        </div>
      </div>

      <nav
        className={`w-full px-8 py-6 flex justify-between items-center transition-all duration-500 border-b ${
          isScrolled
            ? "bg-[#fbf9f4] border-[#e8e4d9] shadow-sm py-4"
            : "bg-transparent border-transparent"
        }`}
      >
        <div
          className={`flex gap-8 font-sans text-xs uppercase tracking-widest font-medium transition-colors duration-500 ${textColorClass}`}
        >
          <NavLink to="/shop" className="relative py-1 group">
            Shop
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2c3e2b] transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
          <NavLink
            to="/storie"
            className="relative py-1 group hidden md:inline-block"
          >
            Le Storie
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2c3e2b] transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <Link
            to="/"
            className={`font-serif text-2xl lg:text-3xl tracking-wide font-light transition-colors duration-500 ${logoColorClass}`}
          >
            Terre d'Oliva
          </Link>
        </div>

        <div
          className={`flex items-center gap-6 transition-colors duration-500 ${textColorClass}`}
        >
          <button
            onClick={() => dispatch(openCart())}
            aria-label="Apri carrello"
            className="relative p-1 hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#b87d4b] text-[#fbf9f4] font-sans text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

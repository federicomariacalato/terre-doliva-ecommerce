import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, ShoppingBag, X } from "lucide-react";
import type { RootState } from "../store/store";
import { openCart } from "../store/slices/cartSlice";
import { Link, NavLink } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { AnimatePresence, motion } from "motion/react";

type NavbarProps = {
  theme?: "dark" | "light";
};

export const Navbar = ({ theme = "dark" }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn, session } = useAuth();

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

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

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
          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Apri menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="md:hidden -m-2 p-2 cursor-pointer"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
          <NavLink
            to="/shop"
            className="relative py-1 group hidden md:inline-block"
          >
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
          <NavLink
            to="/#contatti"
            className="relative py-1 group hidden md:inline-block"
          >
            Contattaci
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
          className={`flex items-center gap-6 font-sans text-xs uppercase tracking-widest font-medium transition-colors duration-500 ${textColorClass}`}
        >
          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-4">
              <NavLink
                to="/account"
                className="relative py-1 group max-w-[140px] truncate normal-case tracking-normal font-normal [&.active>span]:w-full"
                title={session?.user.email}
              >
                {session?.user.email}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2c3e2b] transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            </div>
          ) : (
            <NavLink
              to="/accedi"
              className="relative py-1 group hidden md:inline-block"
            >
              Accedi
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2c3e2b] transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          )}
          <button
            onClick={() => dispatch(openCart())}
            aria-label="Apri carrello"
            className="relative -m-2 p-2 hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute top-0 -right-1 bg-[#b87d4b] text-[#fbf9f4] font-sans text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[60] md:hidden">
            <motion.div
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 left-0 w-4/5 max-w-xs bg-[#fbf9f4] text-[#1a1a1a] shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#e8e4d9] bg-[#f4f1ea]">
                <span className="font-serif text-2xl font-light text-[#2c3e2b]">
                  Terre d'Oliva
                </span>
                <button
                  onClick={closeMenu}
                  aria-label="Chiudi menu"
                  className="-m-2 p-2 rounded-full text-[#2c3e2b] hover:bg-white/80 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col px-6 py-4 font-serif text-2xl font-light">
                <NavLink
                  to="/shop"
                  onClick={closeMenu}
                  className="py-4 border-b border-[#e8e4d9] [&.active]:text-[#b87d4b]"
                >
                  Shop
                </NavLink>
                <NavLink
                  to="/storie"
                  onClick={closeMenu}
                  className="py-4 border-b border-[#e8e4d9] [&.active]:text-[#b87d4b]"
                >
                  Le Storie
                </NavLink>
                <Link
                  to="/#contatti"
                  onClick={closeMenu}
                  className="py-4 border-b border-[#e8e4d9]"
                >
                  Contattaci
                </Link>
              </nav>

              <div className="mt-auto px-6 py-6 border-t border-[#e8e4d9] bg-[#f4f1ea] font-sans">
                {isLoggedIn ? (
                  <NavLink
                    to="/account"
                    onClick={closeMenu}
                    className="flex flex-col gap-1"
                  >
                    <span className="text-xs uppercase tracking-widest font-semibold text-[#2c3e2b]">
                      Il mio account
                    </span>
                    <span className="text-sm text-[#7c7c7c] truncate">
                      {session?.user.email}
                    </span>
                  </NavLink>
                ) : (
                  <NavLink
                    to="/accedi"
                    onClick={closeMenu}
                    className="block w-full text-center py-3 rounded-md bg-[#2c3e2b] text-[#fbf9f4] text-xs uppercase tracking-widest font-semibold"
                  >
                    Accedi
                  </NavLink>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

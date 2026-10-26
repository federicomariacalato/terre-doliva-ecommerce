import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, ShoppingBag, X } from "lucide-react";
import type { RootState } from "../store/store";
import { openCart } from "../store/slices/cartSlice";
import { Link, NavLink } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { AnimatePresence, motion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

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

  const textColorClass = isDarkText ? "text-ink" : "text-ground";
  const logoColorClass = isDarkText ? "text-deep" : "text-ground";

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500">
      <div className="bg-deep-2 text-ground/75 text-[12px] tracking-[0.1em] py-2 text-center overflow-hidden whitespace-nowrap font-sans">
        <div className="inline-block animate-marquee">
          Spedizione gratuita in tutta Italia per ordini superiori a 50€ •
          Estratto a freddo 2026 •
        </div>
      </div>

      <nav
        className={`w-full px-8 py-6 flex justify-between items-center transition-all duration-500 border-b ${
          isScrolled
            ? "bg-ground border-line shadow-sm py-4"
            : "bg-transparent border-transparent"
        }`}
      >
        <div
          className={`flex gap-8 font-sans text-[15px] font-normal transition-colors duration-500 ${textColorClass}`}
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
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
          <NavLink
            to="/storie"
            className="relative py-1 group hidden md:inline-block"
          >
            Le Storie
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
          <NavLink
            to="/#contatti"
            className="relative py-1 group hidden md:inline-block"
          >
            Contattaci
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <Link
            to="/"
            className={`font-serif italic text-2xl lg:text-[1.75rem] tracking-[-0.01em] font-normal transition-colors duration-500 ${logoColorClass}`}
          >
            Terre d'Oliva
          </Link>
        </div>

        <div
          className={`flex items-center gap-6 font-sans text-[15px] font-normal transition-colors duration-500 ${textColorClass}`}
        >
          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-4">
              <NavLink
                to="/account"
                className="relative py-1 group max-w-[140px] truncate normal-case tracking-normal font-normal [&.active>span]:w-full"
                title={session?.user.email}
              >
                {session?.user.email}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            </div>
          ) : (
            <NavLink
              to="/accedi"
              className="relative py-1 group hidden md:inline-block"
            >
              Accedi
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          )}
          <button
            onClick={() => dispatch(openCart())}
            aria-label="Apri carrello"
            className="relative -m-2 p-2 hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute top-0 -right-1 bg-oil text-ground font-sans text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
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
              transition={{ duration: 0.5 }}
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
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="absolute inset-y-0 left-0 w-4/5 max-w-xs bg-ground text-ink shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-line bg-panel">
                <span className="font-serif text-2xl font-light text-deep">
                  Terre d'Oliva
                </span>
                <button
                  onClick={closeMenu}
                  aria-label="Chiudi menu"
                  className="-m-2 p-2 rounded-full text-deep hover:bg-white/80 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col px-6 py-4 font-serif text-2xl font-light">
                <NavLink
                  to="/shop"
                  onClick={closeMenu}
                  className="py-4 border-b border-line [&.active]:text-oil"
                >
                  Shop
                </NavLink>
                <NavLink
                  to="/storie"
                  onClick={closeMenu}
                  className="py-4 border-b border-line [&.active]:text-oil"
                >
                  Le Storie
                </NavLink>
                <Link
                  to="/#contatti"
                  onClick={closeMenu}
                  className="py-4 border-b border-line"
                >
                  Contattaci
                </Link>
              </nav>

              <div className="mt-auto px-6 py-6 border-t border-line bg-panel font-sans">
                {isLoggedIn ? (
                  <NavLink
                    to="/account"
                    onClick={closeMenu}
                    className="flex flex-col gap-1"
                  >
                    <span className="text-xs uppercase tracking-widest font-semibold text-deep">
                      Il mio account
                    </span>
                    <span className="text-sm text-mute truncate">
                      {session?.user.email}
                    </span>
                  </NavLink>
                ) : (
                  <NavLink
                    to="/accedi"
                    onClick={closeMenu}
                    className="block w-full text-center py-3 rounded-md bg-deep text-ground text-xs uppercase tracking-widest font-semibold"
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

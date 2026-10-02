import "./App.css";
import { Routes, Route } from "react-router";
import { CartDrawer } from "./components/CartDrawer";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { Stories } from "./pages/Stories";
import { Checkout } from "./pages/Checkout";
import { Auth } from "./pages/Auth";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "./store/slices/cartSlice";
import { saveCartToStorage } from "./utils/cartStorage";

export function App() {
  const items = useSelector(selectCartItems);

  useEffect(() => {
    saveCartToStorage(items);
  }, [items]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/storie" element={<Stories />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/accedi" element={<Auth />} />
      </Routes>

      <CartDrawer />
    </>
  );
}

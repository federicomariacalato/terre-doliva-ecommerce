import "./App.css";
import { Routes, Route } from "react-router";
import { CartDrawer } from "./components/CartDrawer";
import { Home } from "./pages/home/Home";
import { Shop } from "./pages/shop/Shop";
import { Stories } from "./pages/stories/Stories";
import { Checkout } from "./pages/checkout/Checkout";
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
      </Routes>

      <CartDrawer />
    </>
  );
}

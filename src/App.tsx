import "./App.css";
import { Routes, Route } from "react-router";
import { CartDrawer } from "./components/CartDrawer";
import { Home } from "./pages/home/Home";
import { Shop } from "./pages/shop/Shop";
import { Stories } from "./pages/stories/Stories";
import { Checkout } from "./pages/checkout/Checkout";

export function App() {
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

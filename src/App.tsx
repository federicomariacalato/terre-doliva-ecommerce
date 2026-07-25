import "./App.css";
import { CartDrawer } from "./components/CartDrawer";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/homePage/HomePage";
import { Shop } from "./pages/shop/Shop";

export function App() {
  return (
    <>
      {/* <HomePage /> */}

      <Shop />
      <CartDrawer />
    </>
  );
}

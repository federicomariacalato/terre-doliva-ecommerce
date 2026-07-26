import "./App.css";
import { CartDrawer } from "./components/CartDrawer";
import { Home } from "./pages/home/Home";
import { Shop } from "./pages/shop/Shop";
import { Stories } from "./pages/stories/Stories";

export function App() {
  return (
    <>
      {/* <Home />

      <Shop /> */}

      <Stories />
      <CartDrawer />
    </>
  );
}

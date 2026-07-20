import "./App.css";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/homePage/HomePage";

export function App() {
  return (
    <>
      <Navbar />
      <main>
        <HomePage />
      </main>
    </>
  );
}

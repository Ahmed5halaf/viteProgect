import { Route, Routes } from "react-router-dom";
import Home from "./pages";
import About from "./pages/About";
import ProductPages from "./pages/ProductPages";
import InfoCard from "./pages/InfoCard";
import Login from "./layout/Login";
import AppLayout from "./layout/AppLayout";
import CookieServies from "../services/CookieServies";
function App() {
  const token = CookieServies.get("jwt");
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<ProductPages />} />
          <Route path="/about" element={<About />} />
          <Route path="/products/:id" element={<InfoCard />} />
        </Route>

        <Route path="/login" element={<Login isAuthenticated={token} />} />
      </Routes>
    </>
  );
}

export default App;

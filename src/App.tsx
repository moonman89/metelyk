import { Route, Routes } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SideRail } from "@/components/SideRail";
import { HomePage } from "@/pages/HomePage";
import { CatalogPage } from "@/pages/CatalogPage";
import { ProductPage } from "@/pages/ProductPage";
import { TeawarePage } from "@/pages/TeawarePage";
import { GiftsPage } from "@/pages/GiftsPage";
import { AboutPage } from "@/pages/AboutPage";

export default function App() {
  return (
    <div className="app">
      <SideRail />
      <div className="app-main">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/tea/:slug" element={<ProductPage />} />
            <Route path="/teaware" element={<TeawarePage />} />
            <Route path="/gifts" element={<GiftsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

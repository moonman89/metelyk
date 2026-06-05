import { Route, Routes } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SideRail } from "@/components/SideRail";
import { HomePage } from "@/pages/HomePage";
import { CatalogPage } from "@/pages/CatalogPage";
import { ProductPage } from "@/pages/ProductPage";
import { TeawarePage } from "@/pages/TeawarePage";
import { ArchivePage } from "@/pages/ArchivePage";
import { AboutPage } from "@/pages/AboutPage";
import { CartPage } from "@/pages/CartPage";
import { CheckoutPage } from "@/pages/CheckoutPage";
import { OrderConfirmationPage } from "@/pages/OrderConfirmationPage";

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
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order/:orderId" element={<OrderConfirmationPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

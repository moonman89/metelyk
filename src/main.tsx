import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "@/context/CartContext";
import "./styles/index.css";
import "./styles/checkout.css";
import "./styles/assistant.css";
import "./styles/luxury-overrides.css";
import "./styles/product-image-treatment.css";
import "./styles/hs68-closer.css";
import "./styles/logo-overrides.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);

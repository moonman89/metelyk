import { catalog } from "@/data/catalog";

export function Footer() {
  const { delivery_en } = catalog.pages;
  return (
    <footer className="site-footer">
      <div className="container grid">
        <div>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--text)" }}>
            {catalog.brand.name}
          </p>
          <p>{catalog.brand.tagline_en}</p>
          <p style={{ marginTop: "1rem" }}>{catalog.brand.address_en}</p>
        </div>
        <div>
          <p><strong style={{ color: "var(--text)" }}>Delivery</strong></p>
          <p>{delivery_en.nova_poshta}</p>
          <p>{delivery_en.pickup}</p>
        </div>
        <div>
          <p><strong style={{ color: "var(--text)" }}>Payment</strong></p>
          <p>{delivery_en.card}</p>
          <p>{delivery_en.cash}</p>
        </div>
      </div>
    </footer>
  );
}

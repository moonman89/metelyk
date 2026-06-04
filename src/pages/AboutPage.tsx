import { catalog } from "@/data/catalog";

export function AboutPage() {
  const { delivery_en } = catalog.pages;
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <h2 style={{ fontSize: "2.75rem", marginBottom: "1.5rem" }}>About Metelyk</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem", fontSize: "1.05rem" }}>
          {catalog.pages.about_en}
        </p>
        <div className="info-grid">
          <div className="info-card">
            <h3>Delivery</h3>
            <p>{delivery_en.nova_poshta}</p>
            <p>{delivery_en.pickup}</p>
          </div>
          <div className="info-card">
            <h3>Payment</h3>
            <p>{delivery_en.card}</p>
            <p>{delivery_en.cash}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

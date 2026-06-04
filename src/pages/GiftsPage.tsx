import { catalog, formatPrice } from "@/data/catalog";

export function GiftsPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>Gift certificates</h2>
        </div>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem", maxWidth: "48ch" }}>
          The finest gift for any occasion — redeemable for any tea in our collection.
        </p>
        <div className="product-grid">
          {catalog.certificates.map((cert) => (
            <article key={cert.slug} className="product-card">
              <figure style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
                <img src={cert.image_local} alt="" style={{ maxHeight: 120, objectFit: "contain" }} />
              </figure>
              <div className="body">
                <h3>{cert.title_en}</h3>
                <p className="price-from">{formatPrice(cert.variants[0].price_uah)}</p>
              </div>
            </article>
          ))}
        </div>
        {catalog.sets[0] && (
          <div className="info-card" style={{ marginTop: "3rem" }}>
            <h3>{catalog.sets[0].title_en}</h3>
            <p style={{ color: "var(--text-muted)" }}>{catalog.sets[0].description_en}</p>
            <p style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--accent)" }}>
              Currently unavailable on the original site — slot reserved for the new shop.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

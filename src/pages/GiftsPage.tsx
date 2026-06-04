import { catalog } from "@/data/catalog";

export function GiftsPage() {
  return (
    <section className="page-pad">
      <p className="section-label">
        <span>3</span> Gifts
      </p>
      <p className="body-small manifesto-text" style={{ maxWidth: "48ch", marginBottom: "2.5rem" }}>
        Gift certificates redeemable for any tea in our collection.
      </p>
      <div className="product-grid product-grid--editorial product-grid--gifts">
        {catalog.certificates.map((cert, i) => (
          <article key={cert.slug} className="product-card product-card--static">
            <figure className="gift-figure">
              <img src={cert.image_local} alt="" />
            </figure>
            <div className="product-card-meta">
              <span className="product-index">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{cert.title_en}</h3>
              </div>
            </div>
          </article>
        ))}
      </div>
      {catalog.sets[0] && (
        <div className="cta-block cta-block--muted" style={{ marginTop: "3rem" }}>
          {catalog.sets[0].title_en} — {catalog.sets[0].status.replace(/_/g, " ")}
        </div>
      )}
    </section>
  );
}

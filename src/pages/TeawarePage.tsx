import { catalog, formatPrice } from "@/data/catalog";

export function TeawarePage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>Teaware</h2>
        </div>
        <div className="product-grid">
          {catalog.teaware.map((item) => (
            <article key={item.slug} className="product-card">
              <figure>
                <img src={item.image_local} alt={item.title_en} />
              </figure>
              <div className="body">
                <h3>{item.title_en}</h3>
                <p className="price-from">{formatPrice(item.variants[0].price_uah)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

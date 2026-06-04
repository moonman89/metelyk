import { catalog, formatPrice } from "@/data/catalog";

export function TeawarePage() {
  return (
    <section className="page-pad">
      <p className="section-label">
        <span>2</span> Teaware
      </p>
      <div className="product-grid product-grid--editorial">
        {catalog.teaware.map((item, i) => (
          <div key={item.slug} className="product-card product-card--static">
            <figure>
              <img src={item.image_local} alt={item.title_en} />
            </figure>
            <div className="product-card-meta">
              <span className="product-index">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.title_en}</h3>
                <p className="label-xs">{formatPrice(item.variants[0].price_uah)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

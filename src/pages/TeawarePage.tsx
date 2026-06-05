import { useState } from "react";
import { catalog, formatPrice } from "@/data/catalog";
import { useCart } from "@/context/CartContext";

export function TeawarePage() {
  const { addItem } = useCart();
  const [addedSlug, setAddedSlug] = useState<string | null>(null);
  return (
    <section className="page-pad">
      <p className="section-label">
        <span>2</span> Teaware
      </p>
      <div className="product-grid product-grid--editorial">
        {catalog.teaware.map((item, i) => {
          const variant = item.variants[0];
          return (
            <article key={item.slug} className="product-card product-card--static">
              <figure>
                <img src={item.image_local} alt={item.title_en} />
              </figure>
              <div className="product-card-meta">
                <span className="product-index">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title_en}</h3>
                  <p className="label-xs">{formatPrice(variant.price_uah)}</p>
                  <button
                    type="button"
                    className="cta-block cta-block--muted teaware-add-btn"
                    onClick={() => {
                      addItem({
                        kind: "teaware",
                        slug: item.slug,
                        variantId: variant.id,
                        title: item.title_en,
                        price_uah: variant.price_uah,
                        image: item.image_local,
                      });
                      setAddedSlug(item.slug);
                      window.setTimeout(() => setAddedSlug(null), 2000);
                    }}
                  >
                    {addedSlug === item.slug ? "[ Added ]" : "[ Add to bag ]"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

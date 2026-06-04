import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { catalog, formatPrice, productImage } from "@/data/catalog";

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = catalog.products.find((p) => p.slug === slug);
  const [variantIdx, setVariantIdx] = useState(0);

  if (!product) {
    return (
      <div className="container product-page">
        <p>Tea not found.</p>
        <Link to="/catalog">← Back to catalog</Link>
      </div>
    );
  }

  const category = catalog.categories.find((c) => c.slug === product.category);
  const variant = product.variants[variantIdx];

  return (
    <div className="container product-page">
      <Link to="/catalog" style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
        ← Tea catalog
      </Link>
      <div className="product-layout" style={{ marginTop: "2rem" }}>
        <div className="product-gallery">
          <img src={productImage(product)} alt={product.title_en} />
        </div>
        <div className="product-info">
          {category && (
            <p style={{ color: "var(--accent)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {category.name_en}
            </p>
          )}
          <h1>{product.title_en}</h1>
          <p className="subtitle">{product.subtitle_en}</p>
          <div className="variant-list">
            {product.variants.map((v, i) => (
              <button
                key={v.id}
                type="button"
                className={`variant-btn ${i === variantIdx ? "selected" : ""}`}
                onClick={() => setVariantIdx(i)}
              >
                <span>{v.weight}</span>
                <span>{formatPrice(v.price_uah)}</span>
              </button>
            ))}
          </div>
          <button type="button" className="btn-primary" disabled title="Checkout in next phase">
            Add to cart — {formatPrice(variant.price_uah)}
          </button>
          <div className="description">
            <p>
              <strong style={{ color: "var(--text)" }}>Tasting notes (source)</strong>
            </p>
            <p>{product.description_ua}</p>
            <p style={{ marginTop: "1rem", fontSize: "0.8rem" }}>
              Full English copy will live in Firestore after CMS seed. Ukrainian descriptions preserved from the source catalog.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

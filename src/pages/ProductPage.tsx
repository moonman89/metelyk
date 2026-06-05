import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { catalog, formatPrice, productImage } from "@/data/catalog";
import { useCart } from "@/context/CartContext";
import { ProductDescription } from "@/components/ProductDescription";
import { TeaVisual } from "@/components/TeaVisual";

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = catalog.products.find((p) => p.slug === slug);
  const [variantIdx, setVariantIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="page-pad">
        <p className="label-xs">Not found</p>
        <Link to="/catalog" className="link-underline label-xs">
          ← Collection
        </Link>
      </div>
    );
  }

  const category = catalog.categories.find((c) => c.slug === product.category);
  const variant = product.variants[variantIdx];
  const index = catalog.products.findIndex((p) => p.slug === product.slug);

  return (
    <article className="page-product page-pad">
      <Link to="/catalog" className="link-underline label-xs">
        ← 1 Collection
      </Link>

      <div className="product-editorial">
        <div className="product-editorial-media">
          <TeaVisual product={product} imageSrc={productImage(product)} index={index} />
        </div>
        <div className="product-editorial-info">
          {category && <p className="label-xs">{category.name_en}</p>}
          <h1 className="product-title">{product.title_en}</h1>
          <p className="product-subtitle">{product.subtitle_en}</p>

          <div className="variant-stack">
            {product.variants.map((v, i) => (
              <button
                key={v.id}
                type="button"
                className={`variant-row ${i === variantIdx ? "selected" : ""}`}
                onClick={() => setVariantIdx(i)}
              >
                <span>{v.weight}</span>
                <span>{formatPrice(v.price_usd)}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            className="cta-block cta-block--full"
            onClick={() => {
              addItem({
                kind: "tea",
                slug: product.slug,
                variantId: variant.id,
                title: product.title_en,
                subtitle: product.subtitle_en,
                weight: variant.weight,
                price_usd: variant.price_usd,
                image: productImage(product),
              });
              setAdded(true);
              window.setTimeout(() => setAdded(false), 2000);
            }}
          >
            {added ? "[ Added to bag ]" : `[ Add to bag — ${formatPrice(variant.price_usd)} ]`}
          </button>

          <ProductDescription slug={product.slug} />
        </div>
      </div>
    </article>
  );
}

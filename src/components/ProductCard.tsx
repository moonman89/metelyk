import { Link } from "react-router-dom";
import type { TeaProduct } from "@/types/catalog";
import { catalog } from "@/data/catalog";
import { formatPrice, lowestPrice, productImage } from "@/data/catalog";

type Props = { product: TeaProduct; index?: number };

export function ProductCard({ product, index }: Props) {
  const category = catalog.categories.find((c) => c.slug === product.category);
  const from = lowestPrice(product.variants);
  const num = index !== undefined ? String(index + 1).padStart(2, "0") : null;

  return (
    <Link to={`/tea/${product.slug}`} className="product-card">
      <figure>
        <img src={productImage(product)} alt={product.title_en} loading="lazy" />
      </figure>
      <div className="product-card-meta">
        {num && <span className="product-index">{num}</span>}
        <div>
          {category && <p className="label-xs">{category.name_en}</p>}
          <h3>{product.title_en}</h3>
          <p className="product-sub">{product.subtitle_en}</p>
          <p className="label-xs">From {formatPrice(from)}</p>
        </div>
      </div>
    </Link>
  );
}

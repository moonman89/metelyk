import { Link } from "react-router-dom";
import type { TeaProduct } from "@/types/catalog";
import { catalog } from "@/data/catalog";
import { formatPrice, lowestPrice, productImage } from "@/data/catalog";

type Props = { product: TeaProduct };

export function ProductCard({ product }: Props) {
  const category = catalog.categories.find((c) => c.slug === product.category);
  const from = lowestPrice(product.variants);

  return (
    <Link to={`/tea/${product.slug}`} className="product-card">
      <figure>
        <img src={productImage(product)} alt={product.title_en} loading="lazy" />
      </figure>
      <div className="body">
        {category && <p className="category">{category.name_en}</p>}
        <h3>{product.title_en}</h3>
        <p className="subtitle">{product.subtitle_en}</p>
        <p className="price-from">From {formatPrice(from)}</p>
      </div>
    </Link>
  );
}

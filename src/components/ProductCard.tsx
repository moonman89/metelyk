import { Link } from "react-router-dom";
import type { TeaProduct } from "@/types/catalog";
import { catalog } from "@/data/catalog";
import { formatPrice, lowestPrice, productImage } from "@/data/catalog";
import { TeaVisual } from "@/components/TeaVisual";

type Props = { product: TeaProduct; index?: number };

export function ProductCard({ product, index = 0 }: Props) {
  const category = catalog.categories.find((c) => c.slug === product.category);
  const from = lowestPrice(product.variants);
  const num = String(index + 1).padStart(2, "0");

  return (
    <Link to={`/tea/${product.slug}`} className="product-card">
      <figure>
        <TeaVisual product={product} imageSrc={productImage(product)} index={index} />
      </figure>
      <div className="product-card-meta">
        <span className="product-index">{num}</span>
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

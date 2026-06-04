import { useMemo, useState } from "react";
import { catalog } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";

export function CatalogPage() {
  const [category, setCategory] = useState<string | "all">("all");

  const filtered = useMemo(() => {
    if (category === "all") return catalog.products;
    return catalog.products.filter((p) => p.category === category);
  }, [category]);

  return (
    <section className="page-catalog page-pad">
      <div className="section-row">
        <p className="section-label">
          <span>1</span> Collection
        </p>
        <p className="label-xs">{filtered.length} teas · UAH</p>
      </div>

      <div className="filter-row">
        <button
          type="button"
          className={`filter-btn ${category === "all" ? "active" : ""}`}
          onClick={() => setCategory("all")}
        >
          All
        </button>
        {catalog.categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            className={`filter-btn ${category === c.slug ? "active" : ""}`}
            onClick={() => setCategory(c.slug)}
          >
            {c.name_en}
          </button>
        ))}
      </div>

      <div className="product-grid product-grid--editorial">
        {filtered.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

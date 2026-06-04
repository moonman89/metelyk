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
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>Tea catalog</h2>
          <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
            {filtered.length} teas · prices in UAH
          </span>
        </div>
        <div className="category-pills">
          <button
            type="button"
            className={`pill ${category === "all" ? "active" : ""}`}
            onClick={() => setCategory("all")}
          >
            All
          </button>
          {catalog.categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              className={`pill ${category === c.slug ? "active" : ""}`}
              onClick={() => setCategory(c.slug)}
            >
              {c.name_en}
            </button>
          ))}
        </div>
        <div className="product-grid">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

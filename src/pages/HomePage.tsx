import { Link } from "react-router-dom";
import { catalog } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";

export function HomePage() {
  const featured = catalog.products.slice(0, 6);

  return (
    <>
      <section className="hero">
        <img className="hero-bg" src="/assets/original/brand/hero.png" alt="" />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <h1>{catalog.brand.tagline_en}</h1>
          <p>
            Curated Chinese tea from small family farms — oolong, pu-er, white, green, and red.
            Sourced personally, shipped from Kyiv.
          </p>
          <Link to="/catalog" className="btn-primary">
            Explore the collection
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Featured teas</h2>
            <Link to="/catalog">View all →</Link>
          </div>
          <div className="product-grid">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-elevated)" }}>
        <div className="container">
          <div className="section-head">
            <h2>Our sources</h2>
          </div>
          <p style={{ maxWidth: "56ch", color: "var(--text-muted)", marginBottom: "2rem" }}>
            {catalog.pages.sources_en}
          </p>
          <img
            src="/assets/original/brand/sources.png"
            alt="Tea sourcing"
            style={{ maxWidth: 480, borderRadius: "var(--radius)", opacity: 0.9 }}
          />
        </div>
      </section>

      <section className="section">
        <div className="container assistant-banner">
          <strong>Tea guide — coming next</strong>
          An AI assistant will help you choose teas by mood, experience level, and brewing style.
          Built on Firebase with cart, checkout, and your full catalog.
        </div>
      </section>
    </>
  );
}

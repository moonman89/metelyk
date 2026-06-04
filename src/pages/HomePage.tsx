import { Link } from "react-router-dom";
import { catalog } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";

export function HomePage() {
  const featured = catalog.products.slice(0, 4);

  return (
    <>
      <section className="hero-editorial">
        <div className="hero-media">
          <img src="/assets/original/brand/hero.png" alt="" />
        </div>
        <div className="hero-bar">
          <p className="label-xs">Old traditions / New details</p>
          <p className="label-xs hero-loc">Kyiv UA</p>
        </div>
      </section>

      <section className="block-manifesto page-pad">
        <p className="body-small manifesto-text">{catalog.pages.about_en}</p>
        <Link to="/catalog" className="cta-block">
          [ Enter collection ]
        </Link>
      </section>

      <section className="block-split page-pad">
        <div className="split-cell split-cell--image">
          <img src="/assets/original/brand/sources.png" alt="Tea sourcing" />
        </div>
        <div className="split-cell split-cell--text">
          <p className="section-label">
            <span>1</span> Sources
          </p>
          <p className="body-small">{catalog.pages.sources_en}</p>
          <Link to="/about" className="link-underline label-xs">
            Read more →
          </Link>
        </div>
      </section>

      <section className="block-featured page-pad">
        <div className="section-row">
          <p className="section-label">
            <span>2</span> Collection
          </p>
          <Link to="/catalog" className="link-underline label-xs">
            {catalog.products.length} See all
          </Link>
        </div>
        <div className="product-grid product-grid--editorial">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      <section className="block-duo page-pad">
        <Link to="/teaware" className="duo-link">
          <span className="label-xs">Teaware</span>
          <span className="duo-title">Vessels</span>
        </Link>
        <Link to="/gifts" className="duo-link">
          <span className="label-xs">Gifts</span>
          <span className="duo-title">Certificates</span>
        </Link>
      </section>
    </>
  );
}

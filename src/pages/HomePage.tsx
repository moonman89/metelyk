import { Link } from "react-router-dom";
import { catalog } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";

export function HomePage() {
  const featured = catalog.products.slice(0, 4);

  return (
    <>
      <section className="entry-screen" id="entry">
        <div className="entry-wordmark">M E T E L Y K</div>
        <div className="entry-center">
          <p className="label-xs">Old Traditions / New Details</p>
          <h1>Tea House</h1>
          <p className="label-xs">International</p>
          <a href="#world" className="enter-link">[Enter]</a>
        </div>
        <div className="entry-foot">
          <span>Loose Leaf</span>
          <span>Objects</span>
          <span>Archive</span>
        </div>
      </section>

      <section className="hero-editorial" id="world">
        <div className="hero-media hero-media--generated">
          <div className="hero-still">
            <span>Oolong</span>
            <span>Pu-er</span>
            <span>White Tea</span>
          </div>
        </div>
        <div className="hero-bar">
          <p className="label-xs">Old traditions / New details</p>
          <p className="label-xs hero-loc">International Tea House</p>
        </div>
      </section>

      <section className="block-manifesto page-pad">
        <p className="body-small manifesto-text">
          Metelyk is an international tea house working with Chinese leaves, ritual objects, and slow attention. The collection moves through oolong, pu-er, white, green, and red teas with the restraint of a fashion house and the precision of a tea room.
        </p>
        <Link to="/catalog" className="cta-block">
          [ Enter collection ]
        </Link>
      </section>

      <section className="block-split page-pad">
        <div className="split-cell split-cell--image split-cell--generated">
          <div className="source-still">
            <span>Source</span>
            <span>Leaf</span>
            <span>Water</span>
          </div>
        </div>
        <div className="split-cell split-cell--text">
          <p className="section-label">
            <span>1</span> Atelier
          </p>
          <p className="body-small">
            The house is built around quiet ceremony: selected leaves, restrained packaging, clean objects, and a visual language that treats tea like a cultural object rather than a grocery product.
          </p>
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
          <span className="label-xs">Objects</span>
          <span className="duo-title">Vessels</span>
        </Link>
        <Link to="/archive" className="duo-link">
          <span className="label-xs">Archive</span>
          <span className="duo-title">Field Notes</span>
        </Link>
      </section>
    </>
  );
}

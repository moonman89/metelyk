import { useState } from "react";
import { Link } from "react-router-dom";
import { catalog, productImage } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";

const homeHeroImage = "/assets/generated/about-tea-wide.svg";

function EntryScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <section className="entry-screen entry-screen--motion entry-screen--standalone" id="entry">
      <div className="entry-atmosphere" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div className="entry-corner entry-corner--tl">M</div>
      <div className="entry-corner entry-corner--tr">K</div>
      <div className="entry-corner entry-corner--bl">T</div>
      <div className="entry-corner entry-corner--br">Y</div>
      <div className="entry-copy">
        <p>METELYK</p>
        <p>OLD TRADITIONS / NEW DETAILS</p>
        <p>INTERNATIONAL TEA HOUSE</p>
      </div>
      <button type="button" className="entry-enter" onClick={onEnter}>
        [ENTER]
      </button>
    </section>
  );
}

export function HomePage() {
  const [entered, setEntered] = useState(false);
  const editorialLeft = catalog.products[8] ?? catalog.products[0];
  const editorialRight = catalog.products[10] ?? catalog.products[1];
  const featured = catalog.products.slice(0, 4);

  if (!entered) {
    return <EntryScreen onEnter={() => setEntered(true)} />;
  }

  return (
    <section className="hs-home" id="world">
      <figure className="hs-hero-media">
        <img src={homeHeroImage} alt="Metelyk tea ceremony" />
        <figcaption>UNMUTE</figcaption>
      </figure>

      <section className="hs-manifesto">
        <p>
          METELYK is an international tea house with a precise approach to Chinese leaf, vessels, ceremony, and modern ritual. Alongside traditional tea practice, Metelyk presents oolong, pu-er, white, green, and red teas through an editorial lens: direct, restrained, sensory, and built for slow attention. Objects, tastings, archives, and selected leaves become an invitation further into the house.
        </p>
      </section>

      <section className="hs-two-up" aria-label="Tea house editorial images">
        <Link to="/catalog" className="hs-image-tile">
          <img src={productImage(editorialLeft)} alt={editorialLeft.title_en} />
          <span>COLLECTION</span>
        </Link>
        <Link to="/about" className="hs-image-tile">
          <img src={productImage(editorialRight)} alt={editorialRight.title_en} />
          <span>ATELIER</span>
        </Link>
      </section>

      <section className="hs-appointment">
        <Link to="/about">BOOK A TASTING</Link>
      </section>

      <section className="hs-collection-strip">
        <div className="hs-section-head">
          <p>METELYK COLLECTION</p>
          <Link to="/catalog">{catalog.products.length} SEE ALL</Link>
        </div>
        <div className="product-grid product-grid--editorial">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      <section className="hs-archive-preview">
        <div className="hs-section-head">
          <p>METELYK TEA ARCHIVES</p>
          <Link to="/archive">SEE ALL</Link>
        </div>
        <div className="hs-archive-grid">
          {featured.map((p, i) => (
            <Link to={`/tea/${p.slug}`} key={p.slug} className="hs-archive-card">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <img src={productImage(p)} alt={p.title_en} />
              <p>{p.title_en}</p>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}

import { Link } from "react-router-dom";
import { catalog } from "@/data/catalog";

export function ArchivePage() {
  return (
    <section className="page-archive page-pad">
      <p className="section-label">
        <span>3</span> Archive
      </p>
      <h1 className="page-heading">Tea index / objects</h1>
      <p className="body-small manifesto-text">
        A working archive of leaves, vessels, origins, tastings, and brewing notes from the Metelyk house.
      </p>

      <div className="archive-table">
        {catalog.products.map((product, index) => {
          const category = catalog.categories.find((item) => item.slug === product.category);
          const num = String(index + 1).padStart(2, "0");

          return (
            <Link key={product.slug} to={`/tea/${product.slug}`} className="archive-row archive-row--link">
              <span>{num}</span>
              <h2>{product.title_en}</h2>
              <p>{category?.name_en ?? "Tea"} / {product.subtitle_en}</p>
            </Link>
          );
        })}

        <Link to="/teaware" className="archive-row archive-row--link">
          <span>{String(catalog.products.length + 1).padStart(2, "0")}</span>
          <h2>Teaware Objects</h2>
          <p>Vessels for focused ritual</p>
        </Link>
      </div>

      <div className="archive-note">
        <p className="label-xs">Current collection</p>
        <p className="body-small">{catalog.products.length} teas / {catalog.categories.length} families / international inquiries open.</p>
      </div>
    </section>
  );
}

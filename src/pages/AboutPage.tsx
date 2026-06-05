import { catalog } from "@/data/catalog";

export function AboutPage() {
  return (
    <section className="page-about page-pad">
      <p className="section-label">
        <span>4</span> Atelier
      </p>
      <h1 className="page-heading">About Metelyk</h1>
      <p className="body-small manifesto-text">
        Metelyk is an international tea house for Chinese leaves, ritual objects, and quiet ceremony. The house language is restrained, archival, and focused.
      </p>

      <div className="about-grid">
        <div className="about-cell">
          <p className="label-xs">Collection</p>
          <p className="body-small">{catalog.products.length} teas across oolong, pu-er, white, green, and red tea families.</p>
        </div>
        <div className="about-cell">
          <p className="label-xs">Inquiries</p>
          <p className="body-small">International tasting and collaboration inquiries are open.</p>
        </div>
      </div>
    </section>
  );
}

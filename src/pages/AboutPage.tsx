import { catalog } from "@/data/catalog";

export function AboutPage() {
  const { delivery_en } = catalog.pages;
  return (
    <section className="page-about page-pad">
      <p className="section-label">
        <span>4</span> Atelier
      </p>
      <h1 className="page-heading">About Metelyk</h1>
      <p className="body-small manifesto-text">{catalog.pages.about_en}</p>

      <div className="about-grid">
        <div className="about-cell">
          <p className="label-xs">Delivery</p>
          <p className="body-small">{delivery_en.nova_poshta}</p>
          <p className="body-small">{delivery_en.pickup}</p>
        </div>
        <div className="about-cell">
          <p className="label-xs">Payment</p>
          <p className="body-small">{delivery_en.card}</p>
          <p className="body-small">{delivery_en.cash}</p>
        </div>
      </div>
    </section>
  );
}

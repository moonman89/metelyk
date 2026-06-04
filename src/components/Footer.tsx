import { Link } from "react-router-dom";
import { catalog } from "@/data/catalog";

export function Footer() {
  const { delivery_en } = catalog.pages;
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-manifesto">
          <p className="label-xs">Metelyk / Kyiv</p>
          <p className="body-small">{catalog.pages.about_en}</p>
        </div>
        <div className="footer-links">
          <Link to="/catalog" className="footer-link">
            <span>1</span> Collection
          </Link>
          <Link to="/about" className="footer-link">
            <span>2</span> Contact
          </Link>
          <p className="footer-link static">
            <span>3</span> {delivery_en.nova_poshta}
          </p>
          <p className="footer-link static">
            <span>4</span> {delivery_en.pickup}
          </p>
          <p className="footer-meta">{catalog.brand.address_en}</p>
        </div>
      </div>
    </footer>
  );
}

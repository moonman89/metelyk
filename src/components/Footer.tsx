import { Link } from "react-router-dom";
import { catalog } from "@/data/catalog";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-manifesto">
          <p className="label-xs">Metelyk / International Tea House</p>
          <p className="body-small">
            Metelyk works with Chinese leaves, ritual objects, and a restrained visual world built for slow attention.
          </p>
        </div>
        <div className="footer-links">
          <Link to="/catalog" className="footer-link">
            <span>1</span> Collection
          </Link>
          <Link to="/teaware" className="footer-link">
            <span>2</span> Objects
          </Link>
          <Link to="/archive" className="footer-link">
            <span>3</span> Archive
          </Link>
          <Link to="/about" className="footer-link">
            <span>4</span> Atelier
          </Link>
          <p className="footer-meta">{catalog.brand.name.toUpperCase()} / International inquiries open</p>
        </div>
      </div>
    </footer>
  );
}

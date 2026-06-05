import { Link, NavLink } from "react-router-dom";
import { catalog } from "@/data/catalog";
import { useCart } from "@/context/CartContext";

const nav = [
  { to: "/catalog", num: "1", label: "Collection" },
  { to: "/teaware", num: "2", label: "Teaware" },
  { to: "/archive", num: "3", label: "Archive" },
  { to: "/about", num: "4", label: "About" },
] as const;

export function Header() {
  const { itemCount } = useCart();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="wordmark wordmark--with-logo" aria-label="Metelyk home">
          <img src="/assets/brand/metelyk-mark.svg" alt="" className="wordmark-logo" width={32} height={32} />
          <span>{catalog.brand.name.toUpperCase()}</span>
        </Link>
        <nav className="nav-main">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} className="nav-link">
              <span className="nav-num">{item.num}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <Link to="/cart" className="btn-bracket btn-bracket--active" title="View bag">
            Bag [{itemCount}]
          </Link>
        </div>
      </div>
    </header>
  );
}

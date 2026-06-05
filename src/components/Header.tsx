import { Link, NavLink } from "react-router-dom";
import { catalog } from "@/data/catalog";

const nav = [
  { to: "/catalog", num: "1", label: "Collection" },
  { to: "/teaware", num: "2", label: "Teaware" },
  { to: "/archive", num: "3", label: "Archive" },
  { to: "/about", num: "4", label: "About" },
] as const;

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="wordmark">
          {catalog.brand.name.toUpperCase()}
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
          <button type="button" className="btn-bracket" disabled title="Bag coming soon">
            Bag [0]
          </button>
        </div>
      </div>
    </header>
  );
}

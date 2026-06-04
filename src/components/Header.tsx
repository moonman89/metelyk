import { Link, NavLink } from "react-router-dom";
import { catalog } from "@/data/catalog";

export function Header() {
  return (
    <header className="site-header">
      <div className="container inner">
        <Link to="/" className="logo">
          <img src="/assets/original/brand/logo.png" alt="" width={36} height={36} />
          <span>{catalog.brand.name}</span>
        </Link>
        <nav className="nav">
          <NavLink to="/catalog">Tea</NavLink>
          <NavLink to="/teaware">Teaware</NavLink>
          <NavLink to="/gifts">Gifts</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
        <button type="button" className="cart-btn" disabled title="Cart — coming in shop phase">
          Cart (soon)
        </button>
      </div>
    </header>
  );
}

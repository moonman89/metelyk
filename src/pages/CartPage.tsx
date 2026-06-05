import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/catalog";

export function CartPage() {
  const { lines, subtotal, itemCount, removeLine, setLineQty } = useCart();

  if (lines.length === 0) {
    return (
      <section className="page-cart page-pad">
        <p className="section-label">
          <span>·</span> Bag
        </p>
        <h1 className="page-heading">Your bag is empty</h1>
        <p className="body-small manifesto-text">
          Add leaves or teaware from the collection. Checkout saves your order — card is not charged yet.
        </p>
        <Link to="/catalog" className="cta-block">
          [ Browse collection ]
        </Link>
      </section>
    );
  }

  return (
    <section className="page-cart page-pad">
      <p className="section-label">
        <span>·</span> Bag
      </p>
      <h1 className="page-heading">
        Bag / {itemCount} {itemCount === 1 ? "item" : "items"}
      </h1>

      <div className="cart-lines">
        {lines.map((line) => (
          <article key={line.lineId} className="cart-line">
            <div className="cart-line-main">
              <h2>{line.title}</h2>
              {line.subtitle && <p className="label-xs">{line.subtitle}</p>}
              {line.weight && <p className="label-xs">{line.weight}</p>}
            </div>
            <div className="cart-line-actions">
              <label className="cart-qty">
                <span className="label-xs">Qty</span>
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={line.qty}
                  onChange={(e) => setLineQty(line.lineId, Number(e.target.value))}
                />
              </label>
              <p className="cart-line-price">{formatPrice(line.price_usd * line.qty)}</p>
              <button type="button" className="link-underline label-xs" onClick={() => removeLine(line.lineId)}>
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="cart-summary">
        <p className="label-xs">Subtotal</p>
        <p className="cart-total">{formatPrice(subtotal)}</p>
        <Link to="/checkout" className="cta-block cta-block--full">
          [ Proceed to checkout ]
        </Link>
        <Link to="/catalog" className="link-underline label-xs">
          ← Continue browsing
        </Link>
      </div>
    </section>
  );
}

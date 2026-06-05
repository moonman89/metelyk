import { Link, useLocation, useParams } from "react-router-dom";
import { formatPrice } from "@/data/catalog";
import { loadOrderFromSession } from "@/lib/orders";
import type { MockOrder } from "@/types/cart";

export function OrderConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const location = useLocation();
  const stateOrder = (location.state as { order?: MockOrder } | null)?.order;
  const order = stateOrder ?? (orderId ? loadOrderFromSession(orderId) : null);

  if (!order || !orderId) {
    return (
      <section className="page-receipt page-pad">
        <h1 className="page-heading">Receipt not found</h1>
        <Link to="/catalog" className="link-underline label-xs">
          ← Collection
        </Link>
      </section>
    );
  }

  return (
    <section className="page-receipt page-pad">
      <p className="section-label">
        <span>✓</span> Receipt
      </p>
      <h1 className="page-heading">Order {order.orderId}</h1>
      <p className="body-small manifesto-text">{order.receiptNote}</p>
      <p className="body-small">
        Receipt sent to <strong>{order.email}</strong>. Card ending {order.payment.last4} (not charged).
      </p>

      <div className="receipt-card">
        <div className="receipt-meta">
          <p>
            <span className="label-xs">Guest</span>
            <br />
            {order.name}
          </p>
          {order.address && (
            <p>
              <span className="label-xs">Address</span>
              <br />
              {order.address}
            </p>
          )}
          <p>
            <span className="label-xs">Placed</span>
            <br />
            {new Date(order.createdAt).toLocaleString("en-GB")}
          </p>
        </div>

        <ul className="checkout-summary-list">
          {order.items.map((item) => (
            <li key={`${item.slug}-${item.variantId}`}>
              <span>
                {item.title}
                {item.weight ? ` · ${item.weight}` : ""} × {item.qty}
              </span>
              <span>{formatPrice(item.price_usd * item.qty)}</span>
            </li>
          ))}
        </ul>

        <p className="cart-total">Total {formatPrice(order.total)}</p>
      </div>

      <Link to="/catalog" className="cta-block">
        [ Return to collection ]
      </Link>
    </section>
  );
}

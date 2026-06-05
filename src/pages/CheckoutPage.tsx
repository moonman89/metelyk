import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/catalog";
import { placeMockOrder } from "@/lib/orders";
import type { CheckoutDetails } from "@/types/cart";

const emptyForm: CheckoutDetails = {
  email: "",
  name: "",
  address: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
};

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

function isValidDemoCard(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, "");
  return digits.length >= 13;
}

export function CheckoutPage() {
  const navigate = useNavigate();
  const { lines, subtotal, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutDetails>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (lines.length === 0) {
    return (
      <section className="page-checkout page-pad">
        <h1 className="page-heading">Nothing to check out</h1>
        <Link to="/cart" className="link-underline label-xs">
          ← Back to bag
        </Link>
      </section>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.email.includes("@")) {
      setError("Enter a valid email for your demo receipt.");
      return;
    }
    if (!form.name.trim()) {
      setError("Enter your name.");
      return;
    }
    if (!isValidDemoCard(form.cardNumber)) {
      setError("Enter a demo card number (any 13–16 digits — not charged).");
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry.trim())) {
      setError("Expiry should be MM/YY.");
      return;
    }
    if (form.cardCvc.replace(/\D/g, "").length < 3) {
      setError("Enter a 3- or 4-digit demo CVC.");
      return;
    }

    setSubmitting(true);
    try {
      const order = await placeMockOrder(lines, form);
      clearCart();
      navigate(`/order/${order.orderId}`, { state: { order } });
    } catch {
      setError("Could not complete demo order. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function updateField<K extends keyof CheckoutDetails>(key: K, value: CheckoutDetails[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <section className="page-checkout page-pad">
      <p className="section-label">
        <span>·</span> Checkout
      </p>
      <h1 className="page-heading">Demo checkout</h1>
      <p className="checkout-demo-banner body-small">
        No real payment. Card fields are cosmetic only. You will receive an on-screen receipt; email
        delivery can be wired later via Firebase Functions.
      </p>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend className="label-xs">Contact</legend>
            <label>
              <span className="label-xs">Email</span>
              <input
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </label>
            <label>
              <span className="label-xs">Name</span>
              <input
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
            </label>
            <label>
              <span className="label-xs">Address (optional)</span>
              <input
                type="text"
                autoComplete="street-address"
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
              />
            </label>
          </fieldset>

          <fieldset>
            <legend className="label-xs">Demo card (not charged)</legend>
            <label>
              <span className="label-xs">Card number</span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="4242 4242 4242 4242"
                value={form.cardNumber}
                onChange={(e) => updateField("cardNumber", formatCardNumber(e.target.value))}
              />
            </label>
            <div className="checkout-form-row">
              <label>
                <span className="label-xs">Expiry</span>
                <input
                  type="text"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={form.cardExpiry}
                  onChange={(e) => updateField("cardExpiry", e.target.value)}
                />
              </label>
              <label>
                <span className="label-xs">CVC</span>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={form.cardCvc}
                  onChange={(e) => updateField("cardCvc", e.target.value.replace(/\D/g, ""))}
                />
              </label>
            </div>
          </fieldset>

          {error && <p className="checkout-error">{error}</p>}

          <button type="submit" className="cta-block cta-block--full" disabled={submitting}>
            {submitting ? "[ Processing demo… ]" : `[ Place demo order — ${formatPrice(subtotal)} ]`}
          </button>
        </form>

        <aside className="checkout-summary">
          <p className="label-xs">Order preview</p>
          <ul className="checkout-summary-list">
            {lines.map((line) => (
              <li key={line.lineId}>
                <span>
                  {line.title}
                  {line.weight ? ` · ${line.weight}` : ""} × {line.qty}
                </span>
                <span>{formatPrice(line.price_uah * line.qty)}</span>
              </li>
            ))}
          </ul>
          <p className="cart-total">{formatPrice(subtotal)}</p>
          <Link to="/cart" className="link-underline label-xs">
            ← Edit bag
          </Link>
        </aside>
      </div>
    </section>
  );
}

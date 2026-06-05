import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import type { CartLine, CheckoutDetails, MockOrder, OrderItem } from "@/types/cart";
import { getDb, isFirebaseConfigured } from "@/lib/firebase";

const RECEIPT_SESSION_KEY = "metelyk:last-order";

function makeOrderId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MET-${date}-${suffix}`;
}

function cardLast4(cardNumber: string): string {
  const digits = cardNumber.replace(/\D/g, "");
  return digits.slice(-4) || "0000";
}

function toOrderItems(lines: CartLine[]): OrderItem[] {
  return lines.map((line) => ({
    kind: line.kind,
    slug: line.slug,
    variantId: line.variantId,
    title: line.title,
    weight: line.weight,
    price_usd: line.price_usd,
    qty: line.qty,
  }));
}

export function cartSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.price_usd * line.qty, 0);
}

export function saveOrderToSession(order: MockOrder): void {
  sessionStorage.setItem(RECEIPT_SESSION_KEY, JSON.stringify(order));
}

export function loadOrderFromSession(orderId: string): MockOrder | null {
  const raw = sessionStorage.getItem(RECEIPT_SESSION_KEY);
  if (!raw) return null;
  try {
    const order = JSON.parse(raw) as MockOrder;
    return order.orderId === orderId ? order : null;
  } catch {
    return null;
  }
}

export async function placeMockOrder(
  lines: CartLine[],
  checkout: CheckoutDetails,
): Promise<MockOrder> {
  const total = cartSubtotal(lines);
  const orderId = makeOrderId();
  const items = toOrderItems(lines);
  const last4 = cardLast4(checkout.cardNumber);

  const order: MockOrder = {
    orderId,
    items,
    total,
    currency: "USD",
    status: "mock_paid",
    email: checkout.email.trim(),
    name: checkout.name.trim(),
    address: checkout.address.trim(),
    payment: { provider: "mock", last4 },
    createdAt: new Date().toISOString(),
    receiptNote:
      "Demo checkout — no payment was processed. This receipt is for preview only.",
  };

  if (isFirebaseConfigured()) {
    try {
      await addDoc(collection(getDb(), "orders"), {
        orderId,
        items,
        total,
        currency: "USD",
        status: "mock_paid",
        email: order.email,
        name: order.name,
        address: order.address,
        payment: order.payment,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.warn("Firestore order save failed; receipt still shown locally.", err);
    }
  }

  saveOrderToSession(order);
  return order;
}

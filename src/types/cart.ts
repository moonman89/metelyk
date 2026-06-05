export type CartLineKind = "tea" | "teaware";

export type CartLine = {
  lineId: string;
  kind: CartLineKind;
  slug: string;
  variantId: string;
  title: string;
  subtitle?: string;
  weight?: string;
  price_uah: number;
  qty: number;
  image?: string;
};

export type CheckoutDetails = {
  email: string;
  name: string;
  address: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
};

export type OrderItem = {
  kind: CartLineKind;
  slug: string;
  variantId: string;
  title: string;
  weight?: string;
  price_uah: number;
  qty: number;
};

export type MockOrder = {
  orderId: string;
  items: OrderItem[];
  total: number;
  currency: string;
  status: string;
  email: string;
  name: string;
  address: string;
  payment: { provider: string; last4: string };
  createdAt: string;
  receiptNote: string;
};

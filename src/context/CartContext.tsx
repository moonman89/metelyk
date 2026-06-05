import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, CartLineKind } from "@/types/cart";
import { cartSubtotal } from "@/lib/orders";

const STORAGE_KEY = "metelyk:cart";

type AddItemInput = {
  kind: CartLineKind;
  slug: string;
  variantId: string;
  title: string;
  subtitle?: string;
  weight?: string;
  price_uah: number;
  image?: string;
  qty?: number;
};

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  addItem: (item: AddItemInput) => void;
  removeLine: (lineId: string) => void;
  setLineQty: (lineId: string, qty: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function lineKey(kind: CartLineKind, slug: string, variantId: string): string {
  return `${kind}:${slug}:${variantId}`;
}

function readStoredCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => readStoredCart());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const addItem = useCallback((item: AddItemInput) => {
    const qty = item.qty ?? 1;
    const key = lineKey(item.kind, item.slug, item.variantId);

    setLines((prev) => {
      const existing = prev.find((line) => line.lineId === key);
      if (existing) {
        return prev.map((line) =>
          line.lineId === key ? { ...line, qty: line.qty + qty } : line,
        );
      }
      return [
        ...prev,
        {
          lineId: key,
          kind: item.kind,
          slug: item.slug,
          variantId: item.variantId,
          title: item.title,
          subtitle: item.subtitle,
          weight: item.weight,
          price_uah: item.price_uah,
          qty,
          image: item.image,
        },
      ];
    });
  }, []);

  const removeLine = useCallback((lineId: string) => {
    setLines((prev) => prev.filter((line) => line.lineId !== lineId));
  }, []);

  const setLineQty = useCallback((lineId: string, qty: number) => {
    if (qty < 1) {
      setLines((prev) => prev.filter((line) => line.lineId !== lineId));
      return;
    }
    setLines((prev) =>
      prev.map((line) => (line.lineId === lineId ? { ...line, qty } : line)),
    );
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const itemCount = useMemo(
    () => lines.reduce((sum, line) => sum + line.qty, 0),
    [lines],
  );

  const subtotal = useMemo(() => cartSubtotal(lines), [lines]);

  const value = useMemo(
    () => ({
      lines,
      itemCount,
      subtotal,
      addItem,
      removeLine,
      setLineQty,
      clearCart,
    }),
    [lines, itemCount, subtotal, addItem, removeLine, setLineQty, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

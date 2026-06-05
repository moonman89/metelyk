import raw from "../../data/catalog.json";
import type { Catalog } from "@/types/catalog";

export const catalog = raw as Catalog;

export function formatPrice(usd: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(usd);
}

export function lowestPrice(variants: { price_usd: number }[]): number {
  return Math.min(...variants.map((v) => v.price_usd));
}

export function productImage(product: { image_local?: string | null; image_url?: string | null }): string {
  return product.image_local ?? product.image_url ?? "/assets/original/brand/hero.png";
}

import raw from "../../data/catalog.json";
import type { Catalog } from "@/types/catalog";

export const catalog = raw as Catalog;

export function formatPrice(uah: number): string {
  return `₴${uah.toLocaleString("uk-UA")}`;
}

export function lowestPrice(variants: { price_uah: number }[]): number {
  return Math.min(...variants.map((v) => v.price_uah));
}

export function productImage(product: { image_local?: string | null; image_url?: string | null }): string {
  return product.image_local ?? product.image_url ?? "/assets/original/brand/hero.png";
}

import raw from "../../data/catalog.json";
import type { Catalog } from "@/types/catalog";

export const catalog = raw as Catalog;

const generatedProductImages: Record<string, string> = {
  bairuixiang: "/assets/generated/products/bairuixiang.svg",
  dahongpao: "/assets/generated/products/dahongpao.svg",
  dancong: "/assets/generated/products/dancong.svg",
  dianhong: "/assets/generated/products/dianhong.svg",
  fudingbaicha: "/assets/generated/products/tea-white.svg",
  gongtingshupuer: "/assets/generated/products/gongtingshupuer.svg",
  jinjunmei: "/assets/generated/products/tea-red-2.svg",
  laoshupuer: "/assets/generated/products/laoshupuer.svg",
};

export function formatPrice(uah: number): string {
  return `₴${uah.toLocaleString("uk-UA")}`;
}

export function lowestPrice(variants: { price_uah: number }[]): number {
  return Math.min(...variants.map((v) => v.price_uah));
}

export function productImage(product: { slug?: string; image_local?: string | null; image_url?: string | null }): string {
  if (product.slug && generatedProductImages[product.slug]) return generatedProductImages[product.slug];
  return product.image_local ?? product.image_url ?? "/assets/original/brand/hero.png";
}

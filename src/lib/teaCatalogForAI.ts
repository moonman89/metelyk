import descriptions from "../../data/descriptions-en.json";
import { catalog, formatPrice, productImage } from "@/data/catalog";
import type { AddCartItemInput, CartLineKind } from "@/types/cart";
import type { TeaProduct } from "@/types/catalog";

type TeaDescription = {
  name: string;
  type: string;
  effect: string;
  aroma: string;
  taste: string;
};

const desc = descriptions as Record<string, TeaDescription>;

export function buildTeaCatalogContext(): string {
  const lines = catalog.products.map((p) => {
    const d = desc[p.slug];
    const variants = p.variants
      .map((v) => `${v.id}:${v.weight ?? "unit"}@${formatPrice(v.price_usd)}`)
      .join(", ");
    return [
      `- slug:${p.slug} | ${p.title_en} (${p.subtitle_en}) | category:${p.category}`,
      `  variants: ${variants}`,
      d ? `  character: ${d.effect} | ${d.aroma} | ${d.taste}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  });

  return lines.join("\n");
}

export function resolveProductForCart(
  kind: CartLineKind,
  slug: string,
  variantId?: string,
): { line: Omit<AddCartItemInput, "qty">; label: string } | null {
  if (kind === "tea") {
    const product = catalog.products.find((p) => p.slug === slug);
    if (!product) return null;
    const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
    return {
      label: `${product.title_en} (${variant.weight ?? "unit"})`,
      line: {
        kind: "tea",
        slug: product.slug,
        variantId: variant.id,
        title: product.title_en,
        subtitle: product.subtitle_en,
        weight: variant.weight,
        price_usd: variant.price_usd,
        image: productImage(product),
      },
    };
  }

  const item = catalog.teaware.find((t) => t.slug === slug);
  if (!item) return null;
  const variant = item.variants.find((v) => v.id === variantId) ?? item.variants[0];
  return {
    label: item.title_en,
    line: {
      kind: "teaware",
      slug: item.slug,
      variantId: variant.id,
      title: item.title_en,
      weight: variant.weight,
      price_usd: variant.price_usd,
      image: item.image_local,
    },
  };
}

export function moodStarterPrompt(mood: string): string {
  return `I'm feeling ${mood.toLowerCase()}. Recommend one or two teas from the Metelyk collection for my mood, explain why in one short paragraph, and offer to add your top pick to my bag.`;
}

export const MOOD_CHIPS = ["Calm", "Focus", "Warm", "Energized", "Evening"] as const;

export type MoodChip = (typeof MOOD_CHIPS)[number];

/** Rule-based picks when Gemini is unavailable */
export const MOOD_FALLBACK_SLUGS: Record<MoodChip, string[]> = {
  Calm: ["bairuixiang", "dahongpao", "tieguanyin"],
  Focus: ["yundeshengpuer", "longjin", "fudingbaicha"],
  Warm: ["dianhong", "xiaozhong", "jinjunmei"],
  Energized: ["dancong", "rougui", "laoshupuer"],
  Evening: ["gongtingshupuer", "laoshupuer", "dahongpao"],
};

export function productBySlug(slug: string): TeaProduct | undefined {
  return catalog.products.find((p) => p.slug === slug);
}

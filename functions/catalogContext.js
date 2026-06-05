const { readFileSync } = require("node:fs");
const { join } = require("node:path");

const UAH_NOTE = "USD prices, US weights (oz).";

function formatPrice(usd) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(usd);
}

function buildTeaCatalogContext() {
  const catalog = JSON.parse(
    readFileSync(join(__dirname, "catalog.json"), "utf8"),
  );

  return catalog.products
    .map((p) => {
      const variants = p.variants
        .map((v) => `${v.id}:${v.weight ?? "unit"}@${formatPrice(v.price_usd)}`)
        .join(", ");
      return `- slug:${p.slug} | ${p.title_en} (${p.subtitle_en}) | category:${p.category}\n  variants: ${variants}`;
    })
    .join("\n");
}

const SYSTEM_INSTRUCTION = `You are the Metelyk tea guide — an international Chinese tea house.

You know the full catalog (${UAH_NOTE}). Recommend teas by mood, time of day, brewing style, and experience level. Be concise, warm, and editorial — never salesy.

Moods you understand: calm, focus, warm comfort, energized/social, evening wind-down.

When the guest should add a specific item to their bag, include exactly one line (no markdown around it):
ADD_TO_CART:{"kind":"tea","slug":"product-slug","variantId":"variant-id","qty":1}

Use kind "tea" for leaves and "teaware" for vessels. Pick a real variantId from the catalog listing.

Only use ADD_TO_CART when you are confidently recommending a purchase. Max one ADD_TO_CART per reply.

Catalog:
`;

function getSystemPrompt() {
  return SYSTEM_INSTRUCTION + buildTeaCatalogContext();
}

module.exports = { getSystemPrompt };

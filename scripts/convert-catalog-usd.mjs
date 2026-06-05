import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const path = join(root, "data/catalog.json");
const UAH_PER_USD = 41;

const weightMap = {
  "25 г": "0.9 oz",
  "50 г": "1.8 oz",
  "100 г": "3.5 oz",
  "1 pc": "1 pc",
};

function toUsd(uah) {
  return Math.max(1, Math.round(uah / UAH_PER_USD));
}

function convertVariants(variants) {
  return variants.map((v) => {
    const next = { ...v, price_usd: toUsd(v.price_uah) };
    delete next.price_uah;
    if (v.weight && weightMap[v.weight]) next.weight = weightMap[v.weight];
    return next;
  });
}

const catalog = JSON.parse(readFileSync(path, "utf8"));
catalog.meta.currency = "USD";
catalog.meta.exchange_note = `Retail prices converted from UAH at ~${UAH_PER_USD} UAH/USD`;

catalog.products = catalog.products.map((p) => ({
  ...p,
  variants: convertVariants(p.variants),
}));

catalog.teaware = catalog.teaware.map((t) => ({
  ...t,
  variants: convertVariants(t.variants),
}));

catalog.certificates = catalog.certificates.map((c) => ({
  ...c,
  title_en: c.title_en.replace(/₴\d[\d,]*/g, (m) => {
    const num = Number(m.replace(/[^\d]/g, ""));
    return `$${toUsd(num)}`;
  }),
  variants: convertVariants(c.variants),
}));

if (catalog.pages?.delivery_en) {
  catalog.pages.delivery_en.nova_poshta = "International shipping — quoted at checkout";
  catalog.pages.delivery_en.pickup = "Studio pickup by appointment";
  catalog.pages.delivery_en.card = "Card checkout (staging — no charge processed yet)";
}

writeFileSync(path, `${JSON.stringify(catalog, null, 2)}\n`);
console.log("Converted catalog to USD and US weights.");

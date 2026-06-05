import { readFileSync, writeFileSync, mkdirSync, copyFileSync, unlinkSync, existsSync } from "node:fs";
import { dirname, join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const catalogPath = join(root, "data/catalog.json");
const publicDir = join(root, "public");

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

function moveAsset(oldWebPath, newWebPath) {
  const oldFs = join(publicDir, oldWebPath.replace(/^\//, ""));
  const newFs = join(publicDir, newWebPath.replace(/^\//, ""));
  if (!existsSync(oldFs)) {
    console.warn("skip missing:", oldWebPath);
    return false;
  }
  ensureDir(dirname(newFs));
  copyFileSync(oldFs, newFs);
  return true;
}

const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
const oldPaths = new Set();

for (const product of catalog.products) {
  if (!product.image_local) continue;
  const ext = extname(product.image_local) || ".png";
  const newPath = `/assets/products/${product.slug}${ext}`;
  if (moveAsset(product.image_local, newPath)) oldPaths.add(product.image_local);
  product.image_local = newPath;
}

for (const item of catalog.teaware) {
  if (!item.image_local) continue;
  const ext = extname(item.image_local) || ".png";
  const newPath = `/assets/teaware/${item.slug}${ext}`;
  if (moveAsset(item.image_local, newPath)) oldPaths.add(item.image_local);
  item.image_local = newPath;
}

for (const cert of catalog.certificates) {
  if (!cert.image_local) continue;
  const ext = extname(cert.image_local) || ".svg";
  const newPath = `/assets/certificates/${cert.slug}${ext}`;
  if (moveAsset(cert.image_local, newPath)) oldPaths.add(cert.image_local);
  cert.image_local = newPath;
}

const brandMoves = [
  ["/assets/original/brand/hero.png", "/assets/brand/hero.png"],
  ["/assets/original/brand/logo.png", "/assets/brand/logo.png"],
  ["/assets/original/brand/sources.png", "/assets/brand/sources.png"],
  ["/assets/generated/metelyk-logo-navy.svg", "/assets/brand/metelyk-mark.svg"],
  ["/assets/generated/hero-tea-room.jpg", "/assets/hero/tea-room.jpg"],
];

for (const [from, to] of brandMoves) {
  moveAsset(from, to);
  oldPaths.add(from);
}

writeFileSync(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);
console.log("Updated data/catalog.json");
console.log("New asset paths use /assets/products/{slug}, /assets/teaware/, /assets/certificates/, /assets/brand/, /assets/hero/");
console.log("Remove old files manually or via git after review:", [...oldPaths].length, "paths");

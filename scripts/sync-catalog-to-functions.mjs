import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const destDir = join(root, "functions");
mkdirSync(destDir, { recursive: true });
copyFileSync(join(root, "data/catalog.json"), join(destDir, "catalog.json"));
console.log("Synced catalog.json → functions/catalog.json");

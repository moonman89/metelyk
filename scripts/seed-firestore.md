# Seed Firestore from catalog.json

After creating the Firebase project and enabling Firestore + Storage:

1. `npm install -g firebase-tools` (if needed)
2. `firebase login`
3. `firebase use metelyk-shop`
4. Upload images from `public/assets/original/` to Storage paths:
   - `products/{slug}.png`
   - `brand/logo.png`, `brand/hero.png`
5. Import `data/catalog.json` into collections:
   - `products` — one doc per tea (`slug` as doc id)
   - `teaware`, `certificates`, `categories`, `pages/about`, `pages/delivery`

Example Node script (run locally with service account):

```js
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import catalog from "../data/catalog.json" assert { type: "json" };

initializeApp({ credential: cert("./service-account.json") });
const db = getFirestore();

for (const p of catalog.products) {
  await db.collection("products").doc(p.slug).set({
    ...p,
    active: true,
    updatedAt: new Date(),
  });
}
```

Catalog uses `price_usd` and US weights (oz). Re-run `node scripts/convert-catalog-usd.mjs` if refreshing from UAH source.

Next phase: Cloud Function for email receipts + optional LiqPay when leaving demo mode.

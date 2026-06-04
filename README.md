# Syorb Shop (English revamp)

Upscale English storefront and data archive for [syorb.me](https://syorb.me), prepared for a full e-commerce rebuild with **Firebase Firestore**, **Firebase Storage**, and an **AI tea assistant**.

## What’s included

| Path | Purpose |
|------|---------|
| `data/catalog.json` | Full catalog: 13 teas, teaware, gift certs, categories, UA descriptions, UAH prices, legacy cart IDs |
| `public/assets/original/` | Downloaded product images, certificates, brand logo & hero |
| `src/` | React + Vite English marketing/catalog site (dark luxury UI) |
| `firestore.rules` / `storage.rules` | Starter security rules for shop + assistant |

## Product inventory (UAH, from syorb.me)

| Tea | 25g | 50g | 100g |
|-----|-----|-----|------|
| Fen Huang Dan Cong | ₴170 | ₴340 | ₴680 |
| Da Hong Pao | ₴345 | ₴690 | ₴1380 |
| Jin Jun Mei | ₴205 | ₴410 | ₴820 |
| Tie Guan Yin | ₴185 | ₴370 | ₴740 |
| Xiao Zhong | ₴180 | ₴360 | ₴720 |
| Dian Hong | ₴220 | ₴440 | ₴880 |
| Rou Gui | ₴350 | ₴700 | ₴1400 |
| Long Jing | ₴180 | ₴360 | ₴720 |
| Gong Ting Shu Pu-er | ₴170 | ₴340 | ₴680 |
| Lao Shu Pu-er (2003) | ₴240 | ₴480 | ₴960 |
| Yunnan Sheng Pu-er | ₴358 | ₴715 | ₴1430 |
| Fu Ding Bai Cha | ₴155 | ₴310 | ₴620 |
| Bai Rui Xiang | ₴310 | ₴620 | ₴1240 |

**Teaware:** Glass teapots — ₴300  
**Gift certificates:** ₴500, ₴2000  
**Sets:** Discovery set (6 types) — described on site but **out of stock** in live HTML (June 2026)

Full Ukrainian tasting notes and brewing copy are in `description_ua` per product in `data/catalog.json`.

## Run locally

```bash
cd ~/Projects/syorb-shop
npm install
npm run dev
```

Open http://localhost:5173

## Firebase project (new)

1. [Firebase Console](https://console.firebase.google.com) → **Create project** → id: `syorb-shop`
2. Enable **Firestore** (production mode) and **Storage**
3. Register a **Web app**, copy config into `.env` (see `.env.example`)
4. `firebase login && firebase use syorb-shop`
5. `npm run firebase:deploy:rules`
6. Seed data — see `scripts/seed-firestore.md`

Planned collections:

- `products`, `categories`, `teaware`, `certificates`
- `orders`, `carts`
- `assistant_threads` (AI chat)

## Next phase (your request)

- [ ] Shopping cart + Nova Poshta + LiqPay (like current site)
- [ ] Firestore-backed catalog CMS
- [ ] Upload assets to Storage; reference URLs in Firestore
- [ ] AI assistant (tea recommendations, brewing help)
- [ ] English `description_en` fields (UA preserved)

## Source

Scraped from https://syorb.me on 2026-06-05. Original site by Syorb / Yanis Korchynsky, Kyiv.

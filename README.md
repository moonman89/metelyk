# Metelyk

Upscale English tea storefront and catalog archive, rebuilt from the [Syorb](https://syorb.me) product line. Prepared for Firebase (Firestore + Storage), e-commerce, and an AI tea assistant.

## What's included

| Path | Purpose |
|------|---------|
| `data/catalog.json` | Full catalog: teas, teaware, gift certs, UAH prices, UA descriptions |
| `public/assets/original/` | Product images, certificates, brand visuals |
| `src/` | React + Vite English catalog site |
| `firestore.rules` / `storage.rules` | Firebase rules for shop + assistant |

## Run locally

```bash
git clone https://github.com/YOUR_USERNAME/metelyk.git
cd metelyk
npm install
npm run dev
```

Open http://localhost:5173

## Firebase

Create project **`metelyk-shop`** in [Firebase Console](https://console.firebase.google.com), enable Firestore + Storage, copy web config to `.env` (see `.env.example`), then:

```bash
firebase login && firebase use metelyk-shop
npm run firebase:deploy:rules
```

Seed instructions: `scripts/seed-firestore.md`

## Source data

Product data scraped from https://syorb.me (June 2026). **Metelyk** is the new brand; inventory and sourcing story carry over from the original Kyiv shop.

## License

Public repo for review and mentorship. Product images and copy from the original Syorb site — confirm rights before commercial launch.

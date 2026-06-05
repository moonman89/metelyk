# Metelyk

International tea house — catalog, bag, checkout, and AI tea guide.

**Live:** https://metelyk-shop.web.app

## Stack

- React + Vite + TypeScript
- Firebase Hosting, Firestore, Storage
- Cloud Functions (`teaGuideChat` + OpenAI)

## Layout

| Path | Purpose |
|------|---------|
| `data/catalog.json` | Teas, teaware, certificates (USD, oz) |
| `data/descriptions-en.json` | English tasting notes |
| `public/assets/` | Product, brand, and hero images |
| `src/` | Storefront UI |
| `functions/` | Tea guide API |
| `docs/` | Setup guides |

## Local

```bash
npm install
cp .env.example .env
npm run dev
```

## Deploy

```bash
npm run build
firebase deploy --only hosting
npm run firebase:deploy:functions
```

See `docs/firebase-setup.md` and `docs/tea-assistant-setup.md`.

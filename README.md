# Metelyk

International English tea house — catalog, demo cart, and ChatGPT tea guide. Rebuilt from the [Syorb](https://syorb.me) product line.

## Stack

- **Frontend:** React + Vite + TypeScript
- **Hosting:** Firebase Hosting → https://metelyk-shop.web.app
- **Backend:** Firestore, Storage, Cloud Functions (`teaGuideChat` + OpenAI)

## Project layout

| Path | Purpose |
|------|---------|
| `data/catalog.json` | Teas, teaware, certificates (USD, oz) |
| `data/descriptions-en.json` | English tasting notes for AI + product copy |
| `public/assets/products/` | Product photos named by slug (`bairuixiang.png`, …) |
| `public/assets/brand/` | Logo, mark, hero fallback |
| `public/assets/hero/` | Homepage hero image |
| `src/` | React app (cart, checkout, tea assistant) |
| `functions/` | `teaGuideChat` OpenAI proxy |
| `docs/` | Firebase + tea assistant setup |

## Run locally

```bash
npm install
cp .env.example .env   # fill Firebase web config
npm run dev
```

http://localhost:5173

## Deploy

```bash
npm run build
firebase deploy --only hosting
npm run firebase:deploy:functions   # tea guide (needs OPENAI_API_KEY secret)
```

Setup guides: `docs/firebase-setup.md`, `docs/tea-assistant-setup.md`

## License

Product images and copy from the original Syorb site — confirm rights before commercial launch.

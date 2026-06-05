# Enable Gemini (Firebase AI Logic) for Metelyk

## Already done via CLI

- Firebase **Web app** registered: `Metelyk Shop`
- Local `.env` created from SDK config (gitignored)

## One click in Console (required)

1. Sign in: https://console.firebase.google.com/project/metelyk-shop/ailogic
2. Click **Get started** on **Gemini Developer API**
3. Confirm the API is enabled for project `metelyk-shop`

## Rebuild & deploy after `.env` exists

```bash
npm run build
firebase deploy --only hosting
```

Vite bakes `VITE_*` values into the production bundle at build time.

## Verify

Open the site → **Tea guide** → tap **Calm** → you should get a full Gemini reply (not the “guided mode” fallback).

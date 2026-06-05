# Tea guide with ChatGPT (OpenAI)

The site calls **your OpenAI account** through the `teaGuideChat` Cloud Function so your API key never ships in the browser.

## 1. Firebase Authentication (Anonymous)

Firebase Console → **Authentication** → **Sign-in method** → enable **Anonymous**.

## 2. Cloud Run (allow calls)

https://console.cloud.google.com/run/detail/us-central1/teaguidechat/security?project=metelyk-shop  

Enable **Allow unauthenticated invocations**.

## 3. OpenAI API key

```bash
firebase functions:secrets:set OPENAI_API_KEY
```

## 4. Deploy

```bash
npm run firebase:deploy:functions
npm run build && firebase deploy --only hosting
```

## 5. `.env`

```env
VITE_TEA_AI_PROVIDER=openai
```

## Test

```bash
npm run dev
```

**Tea guide** → **Calm** → ChatGPT reply + **Add to bag**.

Dev check: `node scripts/dev/test-openai-tea-guide.mjs`

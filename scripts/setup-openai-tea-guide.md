# Tea guide with ChatGPT (OpenAI)

The site calls **your OpenAI account** through a Firebase Function so your API key never ships in the browser.

## 1. Firebase Authentication (Anonymous)

Firebase Console → **Authentication** → **Get started** → **Sign-in method** → enable **Anonymous**.

Without this, the tea guide may return `permission-denied` when calling the function.

## 2. OpenAI API key

1. https://platform.openai.com/api-keys → create a key (same billing as ChatGPT Plus if enabled on the org).
2. Store it as a Firebase secret:

```bash
cd /path/to/metelyk
firebase functions:secrets:set OPENAI_API_KEY
# paste sk-... when prompted
```

Optional (function env): `OPENAI_MODEL=gpt-4o-mini` (default) or `gpt-4o`.

## 3. Blaze plan (required)

Cloud Functions need the **Blaze (pay-as-you-go)** plan on `metelyk-shop`. Spark/free cannot deploy functions.

Firebase Console → Project → **Upgrade** (you still stay within free tiers for light usage; OpenAI is billed separately).

## 4. Deploy the function

```bash
npm run firebase:deploy:functions
```

If deploy fails with **build service account permission**, open [Cloud Build settings](https://console.cloud.google.com/cloud-build/settings/service-account?project=metelyk-shop) for the project and ensure the default Cloud Build service account has **Editor** or the roles listed in [Google’s troubleshooting doc](https://cloud.google.com/functions/docs/troubleshooting#build-service-account).

Optional cleanup policy prompt:

```bash
firebase deploy --only functions --force
```

## 5. API key restrictions (if chat fails in browser)

Google Cloud Console → **APIs & Credentials** → your Firebase web API key → ensure **Application restrictions** allow `localhost` and `metelyk-shop.web.app`, or set to **None** while testing.

## 6. Local / production app config

In `.env` (already has Firebase web config):

```env
VITE_TEA_AI_PROVIDER=openai
```

Rebuild and deploy hosting so the client uses the function:

```bash
npm run build
firebase deploy --only hosting
```

## 7. Test

```bash
npm run dev
```

Open **Tea guide** → **Calm** → full ChatGPT reply + **Add to bag**.

## Still use Gemini?

Set `VITE_TEA_AI_PROVIDER=gemini` and enable Firebase AI Logic (needs Gemini credits).

## Cost note

Each chat turn uses the OpenAI API (billed per token on your OpenAI account), not your ChatGPT app subscription unless your plan includes API access.

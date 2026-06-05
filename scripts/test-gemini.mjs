import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { initializeApp } from "firebase/app";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = join(root, ".env");

function loadEnv() {
  if (!existsSync(envPath)) return null;
  const vars = {};
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i > 0) vars[t.slice(0, i)] = t.slice(i + 1);
  }
  return vars;
}

const env = loadEnv();
if (!env?.VITE_FIREBASE_API_KEY || !env?.VITE_FIREBASE_APP_ID) {
  console.log("STATUS: missing_env");
  process.exit(1);
}

const app = initializeApp({
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  appId: env.VITE_FIREBASE_APP_ID,
});

const modelName = env.VITE_FIREBASE_AI_MODEL?.trim() || "gemini-2.0-flash";

try {
  const ai = getAI(app, { backend: new GoogleAIBackend() });
  const model = getGenerativeModel(ai, { model: modelName });
  const result = await model.generateContent(
    "Reply with exactly one word: METELYK_OK",
  );
  const text = result.response.text().trim();
  if (text.includes("METELYK_OK")) {
    console.log("STATUS: gemini_ok");
    console.log("MODEL:", modelName);
  } else {
    console.log("STATUS: gemini_unexpected_reply");
    console.log("PREVIEW:", text.slice(0, 80));
  }
} catch (err) {
  console.log("STATUS: gemini_error");
  console.log("CODE:", err?.code ?? "unknown");
  console.log("MESSAGE:", String(err?.message ?? err).slice(0, 400));
  if (err?.customErrorData) {
    console.log("DETAIL:", JSON.stringify(err.customErrorData).slice(0, 400));
  }
  process.exit(1);
}

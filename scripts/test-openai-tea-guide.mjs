import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

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
if (!env?.VITE_FIREBASE_API_KEY) {
  console.log("STATUS: missing_env");
  process.exit(1);
}

const app = initializeApp({
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  appId: env.VITE_FIREBASE_APP_ID,
});

const auth = getAuth(app);
try {
  await signInAnonymously(auth);
  console.log("AUTH: anonymous_ok");
} catch (authErr) {
  console.log("AUTH: anonymous_skip", authErr?.code ?? authErr?.message);
}

const fn = httpsCallable(
  getFunctions(app, "us-central1"),
  "teaGuideChat",
);

try {
  const res = await fn({
    messages: [{ role: "user", content: "I'm feeling calm. Suggest one tea briefly." }],
  });
  const text = res.data?.text ?? "";
  const hasCart = text.includes("ADD_TO_CART");
  console.log("STATUS: openai_ok");
  console.log("PROVIDER:", res.data?.provider ?? "openai");
  console.log("MODEL:", res.data?.model ?? "unknown");
  console.log("ADD_TO_CART:", hasCart ? "yes" : "no");
  console.log("PREVIEW:", text.replace(/\s+/g, " ").slice(0, 160));
} catch (err) {
  console.log("STATUS: openai_error");
  console.log("CODE:", err?.code ?? "unknown");
  console.log("MESSAGE:", String(err?.message ?? err).slice(0, 400));
  if (err?.details) console.log("DETAILS:", err.details);
  process.exit(1);
}

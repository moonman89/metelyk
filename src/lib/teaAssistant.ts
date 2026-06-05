import { getFunctions, httpsCallable } from "firebase/functions";
import { getAI, getGenerativeModel, GoogleAIBackend, type ChatSession } from "firebase/ai";
import {
  buildTeaCatalogContext,
  MOOD_FALLBACK_SLUGS,
  productBySlug,
  type MoodChip,
} from "@/lib/teaCatalogForAI";
import { formatPrice } from "@/data/catalog";
import { ensureAnonAuth, getFirebaseApp, isFirebaseConfigured } from "@/lib/firebase";
import type { CartLineKind } from "@/types/cart";

export type ChatTurn = {
  role: "user" | "assistant";
  content: string;
};

export type AddToCartAction = {
  kind: CartLineKind;
  slug: string;
  variantId: string;
  qty: number;
};

const ADD_TO_CART_RE = /ADD_TO_CART:\s*(\{[\s\S]*?\})/g;

const SYSTEM_INSTRUCTION = `You are the Metelyk tea guide — an international Chinese tea house.

You know the full catalog (USD, US weights in oz). Recommend teas by mood, time of day, brewing style, and experience level. Be concise, warm, and editorial — never salesy.

Moods you understand: calm, focus, warm comfort, energized/social, evening wind-down.

When the guest should add a specific item to their bag, include exactly one line (no markdown around it):
ADD_TO_CART:{"kind":"tea","slug":"product-slug","variantId":"variant-id","qty":1}

Use kind "tea" for leaves and "teaware" for vessels. Pick a real variantId from the catalog listing.

Only use ADD_TO_CART when you are confidently recommending a purchase. Max one ADD_TO_CART per reply.

Catalog:
`;

let geminiChat: ChatSession | null = null;

function teaAiProvider(): "openai" | "gemini" {
  const pref = import.meta.env.VITE_TEA_AI_PROVIDER?.trim().toLowerCase();
  return pref === "gemini" ? "gemini" : "openai";
}

function getGeminiModel() {
  const app = getFirebaseApp();
  const ai = getAI(app, { backend: new GoogleAIBackend() });
  const modelName = import.meta.env.VITE_FIREBASE_AI_MODEL?.trim() || "gemini-2.0-flash";
  return getGenerativeModel(ai, {
    model: modelName,
    systemInstruction: SYSTEM_INSTRUCTION + buildTeaCatalogContext(),
  });
}

function getGeminiChat(): ChatSession {
  if (!geminiChat) {
    geminiChat = getGeminiModel().startChat();
  }
  return geminiChat;
}

export function stripAddToCartLines(text: string): string {
  return text
    .replace(ADD_TO_CART_RE, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function parseAddToCartActions(text: string): AddToCartAction[] {
  const actions: AddToCartAction[] = [];
  for (const match of text.matchAll(ADD_TO_CART_RE)) {
    try {
      const raw = JSON.parse(match[1]) as AddToCartAction;
      if (raw.slug && raw.variantId && (raw.kind === "tea" || raw.kind === "teaware")) {
        actions.push({
          kind: raw.kind,
          slug: raw.slug,
          variantId: String(raw.variantId),
          qty: Math.min(9, Math.max(1, Number(raw.qty) || 1)),
        });
      }
    } catch {
      /* ignore malformed */
    }
  }
  return actions;
}

async function sendOpenAiMessage(history: ChatTurn[], userText: string): Promise<string> {
  await ensureAnonAuth();
  const fn = httpsCallable<
    { messages: ChatTurn[] },
    { text: string }
  >(getFunctions(getFirebaseApp(), "us-central1"), "teaGuideChat");

  const messages: ChatTurn[] = [...history, { role: "user", content: userText }];
  const result = await fn({ messages });
  return result.data.text?.trim() || "Tell me your mood or what you're looking for in a cup.";
}

async function sendGeminiMessage(userText: string): Promise<string> {
  const chat = getGeminiChat();
  const result = await chat.sendMessage(userText);
  return result.response.text() || "Tell me your mood or what you're looking for in a cup.";
}

export async function sendTeaAssistantMessage(
  userText: string,
  history: ChatTurn[] = [],
): Promise<string> {
  if (!isFirebaseConfigured()) {
    return fallbackReply(userText);
  }

  const provider = teaAiProvider();

  if (provider === "openai") {
    try {
      return await sendOpenAiMessage(history, userText);
    } catch (err) {
      console.warn("OpenAI tea guide error, trying fallback.", err);
      return fallbackReply(
        userText,
        "ChatGPT backend is not ready — deploy the teaGuideChat function and set OPENAI_API_KEY.",
      );
    }
  }

  try {
    return await sendGeminiMessage(userText);
  } catch (err) {
    console.warn("Gemini tea guide error, using fallback.", err);
    return fallbackReply(userText, "Gemini billing or setup issue — switch to OpenAI in .env.");
  }
}

function fallbackReply(userText: string, setupHint?: string): string {
  const lower = userText.toLowerCase();
  const mood = (Object.keys(MOOD_FALLBACK_SLUGS) as MoodChip[]).find((m) =>
    lower.includes(m.toLowerCase()),
  );
  const slugs = mood ? MOOD_FALLBACK_SLUGS[mood] : MOOD_FALLBACK_SLUGS.Calm;
  const pick = productBySlug(slugs[0]) ?? productBySlug("bairuixiang");
  if (!pick) {
    return "Browse the collection — I can recommend once the catalog loads.";
  }
  const variant = pick.variants[0];
  const d = lower.includes("focus")
    ? "bright and clarifying"
    : lower.includes("warm")
      ? "round and comforting"
      : lower.includes("energy")
        ? "lifted and aromatic"
        : lower.includes("evening")
          ? "grounding and soft"
          : "steady and meditative";

  const hint =
    setupHint ??
    "Connect ChatGPT via Firebase Functions (see scripts/setup-openai-tea-guide.md).";

  return `For that mood, I'd start with **${pick.title_en}** (${pick.subtitle_en}) — ${d}. The ${variant.weight ?? "listing"} at ${formatPrice(variant.price_usd)} is a good entry.

ADD_TO_CART:{"kind":"tea","slug":"${pick.slug}","variantId":"${variant.id}","qty":1}

(${hint})`;
}

export function resetTeaAssistantChat(): void {
  geminiChat = null;
}

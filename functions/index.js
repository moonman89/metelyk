const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const { initializeApp } = require("firebase-admin/app");
const OpenAI = require("openai");
const { getSystemPrompt } = require("./catalogContext");

initializeApp();

const openaiApiKey = defineSecret("OPENAI_API_KEY");

const MAX_TURNS = 20;

function sanitizeMessages(messages) {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string",
    )
    .map((m) => ({
      role: m.role,
      content: m.content.trim().slice(0, 4000),
    }))
    .filter((m) => m.content.length > 0)
    .slice(-MAX_TURNS);
}

exports.teaGuideChat = onCall(
  {
    secrets: [openaiApiKey],
    cors: true,
    region: "us-central1",
    invoker: "public",
  },
  async (request) => {
    const messages = sanitizeMessages(request.data?.messages);
    if (messages.length === 0) {
      throw new HttpsError("invalid-argument", "messages array is required.");
    }

    const model =
      process.env.OPENAI_MODEL?.trim() ||
      request.data?.model?.trim() ||
      "gpt-4o-mini";

    const client = new OpenAI({ apiKey: openaiApiKey.value() });

    try {
      const completion = await client.chat.completions.create({
        model,
        messages: [{ role: "system", content: getSystemPrompt() }, ...messages],
        temperature: 0.7,
        max_tokens: 700,
      });

      const text = completion.choices[0]?.message?.content?.trim();
      if (!text) {
        throw new HttpsError("internal", "Empty response from OpenAI.");
      }

      return { text, provider: "openai", model };
    } catch (err) {
      const msg = err?.message ?? String(err);
      console.error("teaGuideChat error:", msg);
      throw new HttpsError(
        "internal",
        msg.includes("api key")
          ? "OpenAI API key is missing or invalid."
          : "Tea guide could not reach OpenAI. Check billing and API key.",
      );
    }
  },
);

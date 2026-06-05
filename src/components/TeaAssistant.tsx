import { useCallback, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import {
  MOOD_CHIPS,
  moodStarterPrompt,
  resolveProductForCart,
} from "@/lib/teaCatalogForAI";
import {
  parseAddToCartActions,
  sendTeaAssistantMessage,
  stripAddToCartLines,
  type AddToCartAction,
  type ChatTurn,
} from "@/lib/teaAssistant";

type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  text: string;
  actions?: AddToCartAction[];
};

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function TeaAssistant() {
  const { addItem, itemCount } = useCart();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "I'm your Metelyk tea guide. Tell me your mood — calm, focus, warm, energized, or evening — and I'll suggest leaves you can add straight to your bag.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToEnd = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  }, []);

  const applyCartActions = useCallback(
    (actions: AddToCartAction[]) => {
      const labels: string[] = [];
      for (const action of actions) {
        const resolved = resolveProductForCart(action.kind, action.slug, action.variantId);
        if (!resolved) continue;
        addItem({ ...resolved.line, qty: action.qty });
        labels.push(resolved.label);
      }
      if (labels.length > 0) {
        setMessages((prev) => [
          ...prev,
          {
            id: `sys-${Date.now()}`,
            role: "system",
            text: `Added to bag: ${labels.join(", ")}.`,
          },
        ]);
      }
    },
    [addItem],
  );

  const sendUserMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || busy) return;

      setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: "user", text: trimmed }]);
      setInput("");
      setBusy(true);
      scrollToEnd();

      try {
        const history: ChatTurn[] = messages
          .filter((m) => m.role === "user" || m.role === "assistant")
          .map((m) => ({
            role: m.role as "user" | "assistant",
            content: stripAddToCartLines(m.text),
          }));
        const raw = await sendTeaAssistantMessage(trimmed, history);
        const actions = parseAddToCartActions(raw);
        const display = stripAddToCartLines(raw);
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            text: display,
            actions: actions.length > 0 ? actions : undefined,
          },
        ]);
      } finally {
        setBusy(false);
        scrollToEnd();
      }
    },
    [busy, scrollToEnd],
  );

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    void sendUserMessage(input);
  }

  return (
    <div className={`tea-assistant ${open ? "tea-assistant--open" : ""}`}>
      <button
        type="button"
        className="tea-assistant-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {open ? "[ Close guide ]" : "[ Tea guide ]"}
      </button>

      {open && (
        <div className="tea-assistant-panel" role="dialog" aria-label="Metelyk tea guide">
          <header className="tea-assistant-header">
            <p className="label-xs">Metelyk · AI tea guide</p>
            <p className="body-small">Mood-led recommendations · ChatGPT · demo bag</p>
          </header>

          <div className="tea-assistant-moods">
            {MOOD_CHIPS.map((mood) => (
              <button
                key={mood}
                type="button"
                className="tea-assistant-mood"
                disabled={busy}
                onClick={() => void sendUserMessage(moodStarterPrompt(mood))}
              >
                {mood}
              </button>
            ))}
          </div>

          <div className="tea-assistant-messages" ref={scrollRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`tea-assistant-msg tea-assistant-msg--${msg.role}`}>
                <p>{renderInline(msg.text)}</p>
                {msg.actions?.map((action) => {
                  const resolved = resolveProductForCart(action.kind, action.slug, action.variantId);
                  if (!resolved) return null;
                  return (
                    <button
                      key={`${action.slug}-${action.variantId}`}
                      type="button"
                      className="tea-assistant-add"
                      onClick={() => applyCartActions([action])}
                    >
                      [ Add {resolved.label} to bag ]
                    </button>
                  );
                })}
              </div>
            ))}
            {busy && (
              <p className="tea-assistant-msg tea-assistant-msg--assistant label-xs">Steeping a reply…</p>
            )}
          </div>

          <form className="tea-assistant-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="e.g. I want something calm for late afternoon"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={busy}
            />
            <button type="submit" className="cta-block" disabled={busy || !input.trim()}>
              [ Send ]
            </button>
          </form>

          <footer className="tea-assistant-footer">
            <Link to="/cart" className="link-underline label-xs">
              Bag [{itemCount}]
            </Link>
          </footer>
        </div>
      )}
    </div>
  );
}

import descriptions from "../../data/descriptions-en.json";

export type DescriptionEn = {
  name?: string;
  type?: string;
  year?: string;
  aroma: string;
  taste: string;
  effect: string;
  story: string;
  brewing: string;
};

const bySlug = descriptions as Record<string, DescriptionEn>;

type Props = { slug: string };

function Row({ label, value }: { label: string; value: string }) {
  return (
    <p style={{ margin: "0 0 0.75rem" }}>
      <strong style={{ color: "var(--text)" }}>{label}: </strong>
      <span style={{ color: "var(--text-muted)" }}>{value}</span>
    </p>
  );
}

export function ProductDescription({ slug }: Props) {
  const d = bySlug[slug];
  if (!d) return null;

  return (
    <div className="description">
      <p style={{ marginBottom: "1.25rem" }}>
        <strong style={{ color: "var(--text)", fontFamily: "var(--font-display)", fontSize: "1.15rem" }}>
          Tasting notes
        </strong>
      </p>
      {d.name && <Row label="Name" value={d.name} />}
      {d.type && <Row label="Type" value={d.type} />}
      {d.year && <Row label="Year" value={d.year} />}
      <Row label="Aroma" value={d.aroma} />
      <Row label="Taste" value={d.taste} />
      <Row label="Effect" value={d.effect} />
      <p style={{ color: "var(--text-muted)", margin: "1rem 0" }}>{d.story}</p>
      <Row label="Brewing" value={d.brewing} />
    </div>
  );
}

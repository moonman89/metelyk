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
      <strong>{label}: </strong>
      <span>{value}</span>
    </p>
  );
}

export function ProductDescription({ slug }: Props) {
  const d = bySlug[slug];
  if (!d) return null;

  return (
    <div className="description">
      <p className="label-xs" style={{ marginBottom: "1.25rem" }}>
        Tasting notes
      </p>
      {d.name && <Row label="Name" value={d.name} />}
      {d.type && <Row label="Type" value={d.type} />}
      {d.year && <Row label="Year" value={d.year} />}
      <Row label="Aroma" value={d.aroma} />
      <Row label="Taste" value={d.taste} />
      <Row label="Effect" value={d.effect} />
      <p className="body-small" style={{ margin: "1rem 0" }}>{d.story}</p>
      <Row label="Brewing" value={d.brewing} />
    </div>
  );
}

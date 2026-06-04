import type { TeaProduct } from "@/types/catalog";

type Props = {
  product: TeaProduct;
  imageSrc?: string;
  index?: number;
};

const categoryLabels: Record<string, string> = {
  white: "White Tea",
  green: "Green Tea",
  red: "Red Tea",
  ulun: "Oolong",
  "shen-puer": "Sheng Pu-er",
  "shu-puer": "Shu Pu-er",
};

export function TeaVisual({ product, imageSrc, index = 0 }: Props) {
  const label = categoryLabels[product.category] ?? "Tea";
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="tea-visual" aria-label={`${product.title_en} image`}>
      {imageSrc ? (
        <img className="tea-visual__image" src={imageSrc} alt={product.title_en} loading="lazy" />
      ) : (
        <div className="tea-visual__fallback" />
      )}
      <div className="tea-visual__meta">
        <span>{number}</span>
        <span>{label}</span>
      </div>
    </div>
  );
}

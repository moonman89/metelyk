import type { TeaProduct } from "@/types/catalog";

type Props = {
  product: TeaProduct;
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

export function TeaVisual({ product, index = 0 }: Props) {
  const label = categoryLabels[product.category] ?? "Tea";
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className={`tea-visual tea-visual--${product.category}`} aria-label={`${product.title_en} visual`}> 
      <div className="tea-visual__plate">
        <div className="tea-visual__shadow" />
        <div className="tea-visual__object tea-visual__object--leaf" />
        <div className="tea-visual__object tea-visual__object--cup" />
        <div className="tea-visual__object tea-visual__object--paper" />
      </div>
      <div className="tea-visual__meta">
        <span>{number}</span>
        <span>{label}</span>
      </div>
    </div>
  );
}

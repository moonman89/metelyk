export type PriceVariant = {
  id: string;
  weight?: string;
  price_usd: number;
};

export type TeaProduct = {
  slug: string;
  title_en: string;
  subtitle_en: string;
  title_ua?: string | null;
  subtitle_ua?: string | null;
  category: string;
  variants: PriceVariant[];
  description_ua: string;
  image_local?: string | null;
};

export type Catalog = {
  meta: { currency: string; updated_at?: string };
  brand: {
    name: string;
    tagline_en: string;
    address_en: string;
  };
  categories: { slug: string; name_en: string }[];
  products: TeaProduct[];
  teaware: Array<{
    slug: string;
    title_en: string;
    variants: PriceVariant[];
    image_local?: string;
  }>;
  certificates: Array<{
    slug: string;
    title_en: string;
    variants: PriceVariant[];
    image_local?: string;
  }>;
  sets: Array<{
    slug: string;
    title_en: string;
    description_en: string;
    status: string;
  }>;
  pages: {
    about_en: string;
    delivery_en: Record<string, string>;
    sources_en: string;
  };
};

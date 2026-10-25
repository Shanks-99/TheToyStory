export type ProductItem = {
  id: number | string;
  name: string;
  emoji: string;
  color: string;
  category: string;
  ages: string[];
  price: number;
  originalPrice: number;
  description: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  inStock: number;
  features: string[];
  specs: Record<string, string>;
  bundle?: {
    title: string;
    items: {
      id: string;
      name: string;
      price: number;
      originalPrice: number;
      image: string;
      checked: boolean;
    }[];
  };
  available_colors?: string[];
};

export const productsData: ProductItem[] = [];

// Registry for dynamic products
const dynamicProductRegistry = new Map<number | string, ProductItem>();

export function registerDynamicProduct(catProduct: any) {
  const item: ProductItem = {
    id: catProduct.id,
    name: catProduct.name,
    emoji: catProduct.emoji || "🎁",
    color: catProduct.color || "#ffffff",
    category: catProduct.subcategory || "Curated Toys",
    ages: catProduct.ages ? [catProduct.ages] : ["Ages 3+"],
    price: catProduct.price,
    originalPrice: catProduct.originalPrice || catProduct.price,
    description: catProduct.description || "",
    images: catProduct.imageUrl ? [catProduct.imageUrl] : ["/logo.png"],
    rating: catProduct.rating || 4.9,
    reviewsCount: catProduct.reviews || 24,
    inStock: 12,
    features: [
      "100% child-safe, non-toxic premium build quality.",
      "Promotes hand-eye coordination and active problem-solving.",
      "Smooth tactile feel and durable construction for daily play.",
      "Backed by The Toy Story 7-day replacement guarantee.",
    ],
    specs: {
      Product: catProduct.name,
      Category: catProduct.subcategory || "Curated Toys",
      "Age Guidance": catProduct.ages || "Ages 3+",
      Material: "Non-Toxic Safe Materials",
      Warranty: "7-Day Replacement Guarantee",
    },
  };

  dynamicProductRegistry.set(catProduct.id, item);
}

export function getProductById(id: number | string): ProductItem | undefined {
  const numericId = Number(id);
  const found =
    productsData.find((p) => p.id === id || p.id === numericId) ||
    dynamicProductRegistry.get(id) ||
    dynamicProductRegistry.get(numericId);
  if (found) return found;

  return undefined;
}

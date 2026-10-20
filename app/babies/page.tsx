import CategoryPageLayout from "../CategoryPageLayout";
import type { CatProduct, CatTheme } from "../CategoryPageLayout";

/* ── Yellow / warm theme ── */
const theme: CatTheme = {
  primary: "#d4a017",
  bg: "#fffdf5",
  heroGrad: "rgba(212, 160, 23, 0.22)",
  badgeBg: "#fef9e7",
  badgeBorder: "#f7e6a1",
  cardBorder: "#faf0d0",
  countBg: "#fef9e7",
};

/* ── Dummy products ── */
const products: CatProduct[] = [
  {
    id: 301,
    name: "Rainbow Stacking Rings",
    emoji: "🌈",
    color: "#fef9e7",
    subcategory: "Motor Skills",
    ages: "0–2",
    price: 799,
    originalPrice: 1199,
    description: "Brightly colored rings on a rocking base — stack, knock down, and do it all over again!",
    rating: 4.9,
    reviews: 523,
  },
  {
    id: 302,
    name: "Musical Crib Mobile",
    emoji: "🎵",
    color: "#e8f5e9",
    subcategory: "Nursery",
    ages: "0–1",
    price: 1999,
    originalPrice: 2799,
    description: "Spinning stars, moons, and clouds that play a gentle lullaby — sweet dreams guaranteed.",
    rating: 4.8,
    reviews: 312,
  },
  {
    id: 303,
    name: "Soft Sensory Blocks",
    emoji: "🧊",
    color: "#e3f2fd",
    subcategory: "Sensory",
    ages: "0–2",
    price: 1299,
    originalPrice: 1799,
    description: "Squishy, textured blocks with numbers, animals, and shapes — safe to chew, toss, and squeeze.",
    rating: 4.7,
    reviews: 267,
  },
  {
    id: 304,
    name: "Baby's First Rattle Set",
    emoji: "🎶",
    color: "#fce4ef",
    subcategory: "Sensory",
    ages: "0–1",
    price: 699,
    originalPrice: 999,
    description: "A set of 4 colorful rattles with different sounds — easy to grip for tiny hands.",
    rating: 4.8,
    reviews: 445,
  },
  {
    id: 305,
    name: "Plush Giraffe Teether",
    emoji: "🦒",
    color: "#fff8e1",
    subcategory: "Teething",
    ages: "0–1",
    price: 599,
    originalPrice: 899,
    description: "A cuddly giraffe with safe silicone teething legs — soothes sore gums with style.",
    rating: 4.9,
    reviews: 612,
  },
  {
    id: 306,
    name: "Shape Sorter Box",
    emoji: "🔷",
    color: "#e8f5e9",
    subcategory: "Educational",
    ages: "1–3",
    price: 1499,
    originalPrice: 1999,
    description: "A wooden box with colorful shape pieces — match the shapes and hear a rewarding click!",
    rating: 4.7,
    reviews: 198,
  },
  {
    id: 307,
    name: "Musical Activity Walker",
    emoji: "🚶",
    color: "#e3f2fd",
    subcategory: "Motor Skills",
    ages: "0–2",
    price: 3499,
    originalPrice: 4499,
    description: "A sturdy walker with buttons, gears, and music — helps little ones take their first brave steps.",
    rating: 4.8,
    reviews: 376,
  },
  {
    id: 308,
    name: "Bath Squeeze Toys",
    emoji: "🛁",
    color: "#e0f7fa",
    subcategory: "Bath Time",
    ages: "0–3",
    price: 899,
    originalPrice: 1299,
    description: "Cute floating animals that squirt water — turn bath time into the most fun part of the day.",
    rating: 4.6,
    reviews: 234,
  },
  {
    id: 309,
    name: "Cuddly Teddy Bear",
    emoji: "🧸",
    color: "#fff0e6",
    subcategory: "Soft Toys",
    ages: "0–3",
    price: 1199,
    originalPrice: 1699,
    description: "An ultra-soft teddy bear made with baby-safe materials — their very first best friend.",
    rating: 4.9,
    reviews: 687,
  },
  {
    id: 310,
    name: "Peek-a-Boo Elephant",
    emoji: "🐘",
    color: "#f3e5f5",
    subcategory: "Interactive",
    ages: "0–2",
    price: 1399,
    originalPrice: 1899,
    description: "An animated elephant that covers its eyes and plays peek-a-boo — giggles every time!",
    rating: 4.8,
    reviews: 398,
  },
  {
    id: 311,
    name: "Tummy Time Play Mat",
    emoji: "🌟",
    color: "#e8f5e9",
    subcategory: "Motor Skills",
    ages: "0–1",
    price: 2499,
    originalPrice: 3299,
    description: "A padded play mat with dangling toys and a mirror — makes tummy time an exciting adventure.",
    rating: 4.7,
    reviews: 289,
  },
  {
    id: 312,
    name: "Wooden Pull-Along Train",
    emoji: "🚂",
    color: "#fef9e7",
    subcategory: "Motor Skills",
    ages: "1–3",
    price: 1599,
    originalPrice: 2199,
    description: "A cheerful wooden train with colorful blocks — pull, stack, and choo-choo across the floor.",
    rating: 4.8,
    reviews: 321,
  },
];

/* ── Page ── */
export default function BabiesPage() {
  return (
    <CategoryPageLayout
      pageTitle="Toys for Babies | The Toy Story"
      title={<>Toys for <span>Babies</span></>}
      description={
        <>
          The tiniest hands deserve the softest, safest, and most delightful
          toys! Our <strong>Toys for Babies</strong> collection includes
          sensory blocks, teethers, rattles, musical mobiles, and cuddly
          plush friends — all designed to spark little discoveries and make
          every moment magical.
        </>
      }
      heroImage="/Baby-hero.mp4"
      breadcrumb="Toys For Babies"
      stats={[
        { icon: "👶", label: `${products.length} Products` },
        { icon: "⭐", label: "4.8 Collection Rating" },
        { icon: "📦", label: "Same Day Shipping" },
        { icon: "🍼", label: "Ages 0–3" },
      ]}
      products={products}
      theme={theme}
    />
  );
}

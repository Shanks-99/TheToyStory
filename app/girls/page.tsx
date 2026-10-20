import CategoryPageLayout from "../CategoryPageLayout";
import type { CatProduct, CatTheme } from "../CategoryPageLayout";

/* ── Pink theme ── */
const theme: CatTheme = {
  primary: "#e8399e",
  bg: "#fff8fb",
  heroGrad: "rgba(232, 57, 158, 0.28)",
  badgeBg: "#fdf0f6",
  badgeBorder: "#f5c2dc",
  cardBorder: "#fce4ef",
  countBg: "#fdf0f6",
};

/* ── Dummy products ── */
const products: CatProduct[] = [
  {
    id: 101,
    name: "Princess Doll Castle",
    emoji: "🏰",
    color: "#fce4ef",
    subcategory: "Pretend Play",
    ages: "3–8",
    price: 3499,
    originalPrice: 4999,
    description: "A magical castle with towers, a throne room, and a tiny princess doll to start the adventure.",
    rating: 4.8,
    reviews: 214,
  },
  {
    id: 102,
    name: "Unicorn Plush Toy",
    emoji: "🦄",
    color: "#f3e5f5",
    subcategory: "Soft Toys",
    ages: "1–6",
    price: 1299,
    originalPrice: 1799,
    description: "Super-soft rainbow unicorn with sparkly horn — perfect cuddle companion for little dreamers.",
    rating: 4.9,
    reviews: 387,
  },
  {
    id: 103,
    name: "Art & Craft Kit",
    emoji: "🎨",
    color: "#fff0e6",
    subcategory: "Creative",
    ages: "4–10",
    price: 1999,
    originalPrice: 2499,
    description: "Paints, glitter, stickers, and stencils — everything for a colorful afternoon of creativity.",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 104,
    name: "Kitchen Play Set",
    emoji: "🍳",
    color: "#fce4ec",
    subcategory: "Pretend Play",
    ages: "3–7",
    price: 2799,
    originalPrice: 3999,
    description: "A mini kitchen with pots, pans, and pretend food — big chef energy for tiny hands.",
    rating: 4.6,
    reviews: 198,
  },
  {
    id: 105,
    name: "Fairy Wings Dress-Up",
    emoji: "🧚",
    color: "#e8f5e9",
    subcategory: "Dress Up",
    ages: "3–8",
    price: 1499,
    originalPrice: 2199,
    description: "Shimmery fairy wings with a matching wand and tiara — let the magical transformation begin!",
    rating: 4.8,
    reviews: 271,
  },
  {
    id: 106,
    name: "Rainbow Hair Styling Head",
    emoji: "💇",
    color: "#fff3e0",
    subcategory: "Creative",
    ages: "5–10",
    price: 2299,
    originalPrice: 2999,
    description: "A styling head with colorful hair, clips, and accessories for hours of salon fun.",
    rating: 4.5,
    reviews: 142,
  },
  {
    id: 107,
    name: "Beading & Jewelry Kit",
    emoji: "💎",
    color: "#ede7f6",
    subcategory: "Creative",
    ages: "5–12",
    price: 899,
    originalPrice: 1299,
    description: "Sparkly beads, charms, and string to create bracelets, necklaces, and friendship bands.",
    rating: 4.7,
    reviews: 309,
  },
  {
    id: 108,
    name: "Dancing Ballerina Music Box",
    emoji: "🩰",
    color: "#fce4ef",
    subcategory: "Musical",
    ages: "3–8",
    price: 1799,
    originalPrice: 2499,
    description: "A beautiful music box with a spinning ballerina — plays a gentle lullaby and stores tiny treasures.",
    rating: 4.9,
    reviews: 428,
  },
  {
    id: 109,
    name: "My Little Dollhouse",
    emoji: "🏠",
    color: "#f3e5f5",
    subcategory: "Pretend Play",
    ages: "3–9",
    price: 4299,
    originalPrice: 5999,
    description: "A 3-story wooden dollhouse with furniture, a tiny family, and endless storytelling possibilities.",
    rating: 4.8,
    reviews: 356,
  },
  {
    id: 110,
    name: "Tea Party Play Set",
    emoji: "🫖",
    color: "#e8f5e9",
    subcategory: "Pretend Play",
    ages: "3–7",
    price: 1199,
    originalPrice: 1699,
    description: "A lovely tea set with cups, saucers, and a teapot — invite your stuffed animals for afternoon tea!",
    rating: 4.6,
    reviews: 187,
  },
  {
    id: 111,
    name: "Butterfly Garden Kit",
    emoji: "🦋",
    color: "#fff0e6",
    subcategory: "Educational",
    ages: "4–10",
    price: 1599,
    originalPrice: 2199,
    description: "Watch real caterpillars transform into beautiful butterflies — a magical nature experience.",
    rating: 4.9,
    reviews: 445,
  },
  {
    id: 112,
    name: "Mermaid Tail Blanket",
    emoji: "🧜",
    color: "#e0f7fa",
    subcategory: "Cozy",
    ages: "3–10",
    price: 1399,
    originalPrice: 1899,
    description: "A snuggly blanket shaped like a mermaid tail — perfect for movie nights and story time.",
    rating: 4.7,
    reviews: 263,
  },
];

/* ── Page ── */
export default function GirlsPage() {
  return (
    <CategoryPageLayout
      pageTitle="Toys for Girls | The Toy Story"
      title={<>Toys for <span>Girls</span></>}
      description={
        <>
          Every girl deserves toys as amazing as she is! Our{" "}
          <strong>Toys for Girls</strong> collection is full of princess
          castles, beautiful dolls, pretend-play kitchen sets, art kits, and
          dress-up fun. From creative play to cuddly companions, these toys
          spark imagination and joyful hours of play.
        </>
      }
      heroImage="/Girls-hero.mp4"
      breadcrumb="Toys For Girls"
      stats={[
        { icon: "🎀", label: `${products.length} Products` },
        { icon: "⭐", label: "4.9 Collection Rating" },
        { icon: "📦", label: "Same Day Shipping" },
        { icon: "👧", label: "Ages 1+" },
      ]}
      products={products}
      theme={theme}
    />
  );
}

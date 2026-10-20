import CategoryPageLayout from "../CategoryPageLayout";
import type { CatProduct, CatTheme } from "../CategoryPageLayout";

/* ── Blue theme ── */
const theme: CatTheme = {
  primary: "#2b8ad6",
  bg: "#f6faff",
  heroGrad: "rgba(43, 138, 214, 0.28)",
  badgeBg: "#eaf4fd",
  badgeBorder: "#b8d8f8",
  cardBorder: "#ddedfb",
  countBg: "#eaf4fd",
};

/* ── Dummy products ── */
const products: CatProduct[] = [
  {
    id: 201,
    name: "Monster Truck Rally",
    emoji: "🛻",
    color: "#e3f2fd",
    subcategory: "Vehicles",
    ages: "3–8",
    price: 2499,
    originalPrice: 3499,
    description: "Big wheels, loud engine sounds, and a ramp for epic jumps — monster truck mania begins!",
    rating: 4.8,
    reviews: 342,
  },
  {
    id: 202,
    name: "Dinosaur World Set",
    emoji: "🦕",
    color: "#e8f5e9",
    subcategory: "Adventure",
    ages: "3–9",
    price: 3299,
    originalPrice: 4499,
    description: "12 realistic dinosaurs with a volcano, trees, and a play mat — bring the Jurassic era to life.",
    rating: 4.9,
    reviews: 518,
  },
  {
    id: 203,
    name: "Robot Builder Kit",
    emoji: "🤖",
    color: "#e8eaf6",
    subcategory: "STEM",
    ages: "6–12",
    price: 2999,
    originalPrice: 3999,
    description: "Build your own walking robot with gears and motors — the perfect intro to engineering.",
    rating: 4.7,
    reviews: 201,
  },
  {
    id: 204,
    name: "Soccer Champion Set",
    emoji: "⚽",
    color: "#e8f5e9",
    subcategory: "Sports",
    ages: "4–10",
    price: 1499,
    originalPrice: 1999,
    description: "Mini goal, pump, cones, and a size-3 ball — backyard tournaments start here.",
    rating: 4.6,
    reviews: 167,
  },
  {
    id: 205,
    name: "Space Explorer Rocket",
    emoji: "🚀",
    color: "#ede7f6",
    subcategory: "Adventure",
    ages: "4–9",
    price: 2799,
    originalPrice: 3799,
    description: "A stomp-launch rocket that flies 30 feet high — 3, 2, 1... blast off into outer space!",
    rating: 4.8,
    reviews: 289,
  },
  {
    id: 206,
    name: "Nerf Blaster Pro",
    emoji: "🔫",
    color: "#fff3e0",
    subcategory: "Action",
    ages: "6–12",
    price: 3499,
    originalPrice: 4999,
    description: "Rapid-fire foam blaster with 20 darts and a target board — dominate the backyard battlefield.",
    rating: 4.7,
    reviews: 432,
  },
  {
    id: 207,
    name: "Racing Car Track",
    emoji: "🏎️",
    color: "#e3f2fd",
    subcategory: "Vehicles",
    ages: "3–8",
    price: 2199,
    originalPrice: 2999,
    description: "A double-loop electric track with two cars — race your friends at lightning speed.",
    rating: 4.5,
    reviews: 198,
  },
  {
    id: 208,
    name: "Superhero Action Figures",
    emoji: "🦸",
    color: "#fce4ec",
    subcategory: "Action Figures",
    ages: "4–10",
    price: 1799,
    originalPrice: 2499,
    description: "A set of 6 poseable heroes with capes and accessories — assemble the ultimate team.",
    rating: 4.8,
    reviews: 376,
  },
  {
    id: 209,
    name: "Construction Crane Set",
    emoji: "🏗️",
    color: "#fff8e1",
    subcategory: "Building",
    ages: "4–9",
    price: 2599,
    originalPrice: 3499,
    description: "A working crane with wrecking ball, dump truck, and hard hat — build your own construction site.",
    rating: 4.6,
    reviews: 154,
  },
  {
    id: 210,
    name: "Pirate Ship Adventure",
    emoji: "🏴‍☠️",
    color: "#efebe9",
    subcategory: "Adventure",
    ages: "4–9",
    price: 2899,
    originalPrice: 3999,
    description: "A detailed pirate ship with cannons, treasure chest, and crew — sail the seven seas!",
    rating: 4.9,
    reviews: 267,
  },
  {
    id: 211,
    name: "Remote Control Helicopter",
    emoji: "🚁",
    color: "#e3f2fd",
    subcategory: "Vehicles",
    ages: "6–12",
    price: 3199,
    originalPrice: 4299,
    description: "Indoor-safe RC helicopter with LED lights and gyro stabilizer — easy to fly and super fun.",
    rating: 4.5,
    reviews: 189,
  },
  {
    id: 212,
    name: "Science Experiment Lab",
    emoji: "🔬",
    color: "#e8f5e9",
    subcategory: "STEM",
    ages: "6–12",
    price: 1999,
    originalPrice: 2699,
    description: "20 safe experiments with test tubes, goggles, and ingredients — discover the scientist within.",
    rating: 4.7,
    reviews: 312,
  },
];

/* ── Page ── */
export default function BoysPage() {
  return (
    <CategoryPageLayout
      pageTitle="Toys for Boys | The Toy Story"
      title={<>Toys for <span>Boys</span></>}
      description={
        <>
          Adventure awaits around every corner! Our{" "}
          <strong>Toys for Boys</strong> collection features monster trucks,
          dinosaur sets, action figures, STEM kits, and sports gear. From
          building robots to racing cars, these toys fuel curiosity and
          endless outdoor and indoor fun.
        </>
      }
      heroImage="/Boys-hero.mp4"
      breadcrumb="Toys For Boys"
      stats={[
        { icon: "🚀", label: `${products.length} Products` },
        { icon: "⭐", label: "4.8 Collection Rating" },
        { icon: "📦", label: "Same Day Shipping" },
        { icon: "👦", label: "Ages 3+" },
      ]}
      products={products}
      theme={theme}
    />
  );
}

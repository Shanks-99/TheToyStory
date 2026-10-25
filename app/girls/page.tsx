import CategoryPageLayout from "../CategoryPageLayout";
import type { CatProduct, CatTheme } from "../CategoryPageLayout";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
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

/* ── Page ── */
export default async function GirlsPage() {
  let displayProducts: CatProduct[] = [];

  try {
    const { data: dbProducts } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (dbProducts && dbProducts.length > 0) {
      const matching = dbProducts.filter((p) => {
        if (p.target_audience && Array.isArray(p.target_audience)) {
          return p.target_audience.includes("girls");
        }
        return (
          (p.category || "").toLowerCase().includes("doll") ||
          (p.category || "").toLowerCase().includes("stuffed") ||
          (p.category || "").toLowerCase().includes("art")
        );
      });

      if (matching.length > 0) {
        displayProducts = matching.map((item) => ({
          id: item.id,
          name: item.name,
          emoji: "👧",
          color: "#fdf0f6",
          subcategory: item.category,
          ages: item.age_range || "3–8",
          price: Number(item.price),
          originalPrice: item.compare_at_price
            ? Number(item.compare_at_price)
            : Number(item.price),
          description: item.description || "",
          rating: 4.9,
          reviews: 32,
          imageUrl:
            (item.category_images && item.category_images["girls"]) ||
            (item.image_urls && item.image_urls.length > 0
              ? item.image_urls[0]
              : undefined),
        }));
      }
    }
  } catch (err) {
    console.warn("Could not query dynamic products for girls:", err);
  }

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
        { icon: "🎀", label: `${displayProducts.length} Products` },
        { icon: "⭐", label: "4.9 Collection Rating" },
        { icon: "📦", label: "Same Day Shipping" },
        { icon: "👧", label: "Ages 1+" },
      ]}
      products={displayProducts}
      theme={theme}
    />
  );
}

import CategoryPageLayout from "../CategoryPageLayout";
import type { CatProduct, CatTheme } from "../CategoryPageLayout";
import { supabase } from "@/lib/supabase";


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

/* ── Page ── */
export default async function BabiesPage() {
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
          return p.target_audience.includes("babies");
        }
        return (p.category || "").toLowerCase().includes("baby");
      });

      if (matching.length > 0) {
        displayProducts = matching.map((item) => ({
          id: item.id,
          name: item.name,
          emoji: "👶",
          color: "#fef9e7",
          subcategory: item.category,
          ages: item.age_range || "0–2",
          price: Number(item.price),
          originalPrice: item.compare_at_price
            ? Number(item.compare_at_price)
            : Number(item.price),
          description: item.description || "",
          rating: 4.9,
          reviews: 28,
          imageUrl:
            (item.category_images && item.category_images["babies"]) ||
            (item.image_urls && item.image_urls.length > 0
              ? item.image_urls[0]
              : undefined),
        }));
      }
    }
  } catch (err) {
    console.warn("Could not query dynamic products for babies:", err);
  }

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
        { icon: "👶", label: `${displayProducts.length} Products` },
        { icon: "⭐", label: "4.8 Collection Rating" },
        { icon: "📦", label: "Same Day Shipping" },
        { icon: "🍼", label: "Ages 0–3" },
      ]}
      products={displayProducts}
      theme={theme}
    />
  );
}

import CategoryPageLayout from "../CategoryPageLayout";
import type { CatProduct, CatTheme } from "../CategoryPageLayout";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
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

/* ── Page ── */
export default async function BoysPage() {
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
          return p.target_audience.includes("boys");
        }
        return (
          (p.category || "").toLowerCase().includes("vehicle") ||
          (p.category || "").toLowerCase().includes("action") ||
          (p.category || "").toLowerCase().includes("construct")
        );
      });

      if (matching.length > 0) {
        displayProducts = matching.map((item) => ({
          id: item.id,
          name: item.name,
          emoji: "👦",
          color: "#e3f2fd",
          subcategory: item.category,
          ages: item.age_range || "3–8",
          price: Number(item.price),
          originalPrice: item.compare_at_price
            ? Number(item.compare_at_price)
            : Number(item.price),
          description: item.description || "",
          rating: 4.9,
          reviews: 35,
          imageUrl:
            (item.category_images && item.category_images["boys"]) ||
            (item.image_urls && item.image_urls.length > 0
              ? item.image_urls[0]
              : undefined),
        }));
      }
    }
  } catch (err) {
    console.warn("Could not query dynamic products for boys:", err);
  }

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
        { icon: "🚀", label: `${displayProducts.length} Products` },
        { icon: "⭐", label: "4.8 Collection Rating" },
        { icon: "📦", label: "Same Day Shipping" },
        { icon: "👦", label: "Ages 3+" },
      ]}
      products={displayProducts}
      theme={theme}
    />
  );
}

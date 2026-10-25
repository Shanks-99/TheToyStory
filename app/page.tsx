import { supabase } from "@/lib/supabase";
import HomeClient, { Product } from "./HomeClient";

export default async function Page() {
  let initialProducts: Product[] = [];

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Could not query Supabase products on server:", error.message);
    } else if (data && data.length > 0) {
      initialProducts = data.map((item) => {
        const cat = (item.category || "").toLowerCase();
        let color = "#fff4d4";
        let emoji = "🧸";

        if (cat.includes("building") || cat.includes("construct") || cat.includes("block")) {
          color = "#fff4d4";
          emoji = "🏰";
        } else if (cat.includes("doll") || cat.includes("stuffed") || cat.includes("plush")) {
          color = "#ffe8ee";
          emoji = "🧸";
        } else if (cat.includes("vehicle") || cat.includes("action") || cat.includes("car") || cat.includes("truck")) {
          color = "#e8f2fe";
          emoji = "🚚";
        } else if (cat.includes("educat") || cat.includes("creative") || cat.includes("puzzle") || cat.includes("art")) {
          color = "#e6f7ec";
          emoji = "🎨";
        }

        const ages = item.age_range
          ? item.age_range.split(",").map((s: string) => s.trim())
          : ["0-2", "3-5", "6-8", "9+"];

        return {
          id: item.id,
          name: item.name,
          emoji,
          color,
          category: item.category,
          ages,
          price: Number(item.price),
          originalPrice: item.compare_at_price
            ? Number(item.compare_at_price)
            : Number(item.price),
          description: item.description || "",
          imageUrl:
            item.image_urls && item.image_urls.length > 0
              ? item.image_urls[0]
              : undefined,
          slug: item.slug,
        };
      });
    }
  } catch (err) {
    console.error("Failed to fetch initial products on server:", err);
  }

  return <HomeClient initialProducts={initialProducts} />;
}

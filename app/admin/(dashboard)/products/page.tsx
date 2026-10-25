import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import AdminHeader from "../../components/AdminHeader";
import ProductsClient from "./ProductsClient";
import type { DbProduct } from "@/lib/types";

export default async function AdminProductsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  const products: DbProduct[] = data || [];

  return (
    <>
      <AdminHeader
        title="Products Catalog"
        subtitle="Manage product specifications, pricing, imagery, and store visibility"
      >
        <Link href="/admin/products/new" className="btn-primary">
          <span>+</span>
          <span>Add Product</span>
        </Link>
      </AdminHeader>

      <div className="admin-body">
        {error && (
          <div
            style={{
              padding: "14px 18px",
              backgroundColor: "var(--admin-danger-light)",
              color: "var(--admin-danger-text)",
              borderRadius: "var(--admin-radius-md)",
              marginBottom: "24px",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            Failed to load products: {error.message}
          </div>
        )}

        <ProductsClient initialProducts={products} />
      </div>
    </>
  );
}

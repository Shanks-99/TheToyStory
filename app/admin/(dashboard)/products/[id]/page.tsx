import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import AdminHeader from "../../../components/AdminHeader";
import ProductForm from "../../../components/ProductForm";
import type { DbProduct } from "@/lib/types";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const product: DbProduct = data;

  return (
    <>
      <AdminHeader
        title={`Edit: ${product.name}`}
        subtitle={`ID: ${product.id} · Slug: /${product.slug}`}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <Link href="/admin/products" className="btn-secondary">
            ← All Products
          </Link>
          <Link
            href={`/product/${product.id}`}
            target="_blank"
            className="btn-secondary"
          >
            Preview on Store ↗
          </Link>
        </div>
      </AdminHeader>

      <div className="admin-body">
        <ProductForm initialData={product} />
      </div>
    </>
  );
}

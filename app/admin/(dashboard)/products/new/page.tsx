import Link from "next/link";
import AdminHeader from "../../../components/AdminHeader";
import ProductForm from "../../../components/ProductForm";

export default function NewProductPage() {
  return (
    <>
      <AdminHeader
        title="Add New Product"
        subtitle="Create a new toy item and publish it to the storefront catalog"
      >
        <Link href="/admin/products" className="btn-secondary">
          ← Back to Products
        </Link>
      </AdminHeader>

      <div className="admin-body">
        <ProductForm />
      </div>
    </>
  );
}

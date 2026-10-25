import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import AdminHeader from "../../components/AdminHeader";
import type { DbProduct } from "@/lib/types";

export default async function AdminInventoryPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("products")
    .select("*")
    .order("stock", { ascending: true });

  const products: DbProduct[] = data || [];

  const outOfStock = products.filter((p) => p.stock === 0);
  const lowStock = products.filter((p) => p.stock > 0 && p.stock < 5);
  const healthyStock = products.filter((p) => p.stock >= 5);
  const totalUnits = products.reduce((acc, p) => acc + p.stock, 0);

  return (
    <>
      <AdminHeader
        title="Inventory Control"
        subtitle="Stock levels, warehouse quantities, and low inventory warnings"
      >
        <Link href="/admin/products/new" className="btn-primary">
          + Add Product
        </Link>
      </AdminHeader>

      <div className="admin-body">
        {/* Inventory Summary Cards */}
        <div className="admin-stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-blue">📦</div>
            <div>
              <div className="stat-label">Total Units on Hand</div>
              <div className="stat-value">{totalUnits}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-red">🚨</div>
            <div>
              <div className="stat-label">Out of Stock</div>
              <div className="stat-value">{outOfStock.length}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-yellow">⚠️</div>
            <div>
              <div className="stat-label">Low Stock Alert (&lt; 5)</div>
              <div className="stat-value">{lowStock.length}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-green">✅</div>
            <div>
              <div className="stat-label">Healthy Stock (5+)</div>
              <div className="stat-value">{healthyStock.length}</div>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="admin-card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "18px",
            }}
          >
            <h2
              style={{
                fontSize: "17px",
                fontWeight: 800,
                color: "var(--admin-navy)",
                margin: 0,
              }}
            >
              Stock Breakdown by Product
            </h2>
          </div>

          {products.length === 0 ? (
            <div
              style={{
                padding: "36px 16px",
                textAlign: "center",
                backgroundColor: "var(--admin-bg)",
                borderRadius: "var(--admin-radius-md)",
              }}
            >
              <p style={{ color: "var(--admin-text-muted)" }}>
                No products found in inventory. Add products to track stock.
              </p>
            </div>
          ) : (
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Current Units</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th style={{ textAlign: "right" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => {
                    const isZero = p.stock === 0;
                    const isLow = p.stock > 0 && p.stock < 5;

                    return (
                      <tr key={p.id}>
                        <td style={{ fontWeight: 700 }}>
                          <Link
                            href={`/admin/products/${p.id}`}
                            style={{
                              color: "inherit",
                              textDecoration: "none",
                            }}
                          >
                            {p.name}
                          </Link>
                        </td>
                        <td>{p.category}</td>
                        <td>
                          <span
                            style={{
                              fontSize: "16px",
                              fontWeight: 800,
                              color: isZero
                                ? "#dc2626"
                                : isLow
                                ? "#d97706"
                                : "var(--admin-navy)",
                            }}
                          >
                            {p.stock}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              isZero
                                ? "badge-danger"
                                : isLow
                                ? "badge-warning"
                                : "badge-success"
                            }`}
                          >
                            {isZero
                              ? "Out of Stock"
                              : isLow
                              ? "Low Inventory"
                              : "In Stock"}
                          </span>
                        </td>
                        <td>Rs. {p.price.toLocaleString("en-PK")}</td>
                        <td style={{ textAlign: "right" }}>
                          <Link
                            href={`/admin/products/${p.id}`}
                            className="btn-secondary"
                            style={{ padding: "6px 12px", fontSize: "12px" }}
                          >
                            Update Stock
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

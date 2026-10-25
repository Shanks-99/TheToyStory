import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import AdminHeader from "../components/AdminHeader";
import type { DbProduct } from "@/lib/types";

export default async function AdminDashboardOverviewPage() {
  const supabase = await createClient();

  // Fetch real statistics from Supabase
  const { data: allProducts, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  const products: DbProduct[] = allProducts || [];

  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.is_active).length;
  const inactiveProducts = totalProducts - activeProducts;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock < 5).length;

  // Real category breakdown
  const categoryMap: Record<string, number> = {};
  for (const p of products) {
    const cat = p.category || "Uncategorized";
    categoryMap[cat] = (categoryMap[cat] || 0) + 1;
  }
  const categoryStats = Object.entries(categoryMap).sort((a, b) => b[1] - a[1]);

  const recentProducts = products.slice(0, 5);

  return (
    <>
      <AdminHeader
        title="Store Overview"
        subtitle="Live catalog metrics, inventory health, and store shortcuts"
      >
        <Link href="/admin/products/new" className="btn-primary">
          <span>+</span>
          <span>Add Product</span>
        </Link>
      </AdminHeader>

      <div className="admin-body">
        {/* Welcome banner */}
        <div className="admin-banner">
          <div className="admin-banner-text">
            <h2>Welcome to The Toy Story Admin ✨</h2>
            <p>
              Manage your toy catalog, monitor inventory levels in real-time,
              upload product photography, and control what visitors see on your
              live storefront.
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px", zIndex: 1 }}>
            <Link
              href="/admin/products/new"
              className="btn-primary"
              style={{ backgroundColor: "#fbbf24" }}
            >
              + New Product
            </Link>
            <Link
              href="/admin/products"
              className="btn-secondary"
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "#ffffff",
                borderColor: "rgba(255,255,255,0.25)",
              }}
            >
              Manage Catalog →
            </Link>
          </div>
        </div>

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
            Database query notice: {error.message}
          </div>
        )}

        {/* Real Stats Grid */}
        <div className="admin-stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-yellow">🧸</div>
            <div>
              <div className="stat-label">Total Products</div>
              <div className="stat-value">{totalProducts}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-green">✅</div>
            <div>
              <div className="stat-label">Active on Storefront</div>
              <div className="stat-value">{activeProducts}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-blue">⏸️</div>
            <div>
              <div className="stat-label">Draft / Inactive</div>
              <div className="stat-value">{inactiveProducts}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-red">⚠️</div>
            <div>
              <div className="stat-label">Low / Out of Stock</div>
              <div className="stat-value">{outOfStock + lowStock}</div>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          {/* Recent Products Panel */}
          <div className="admin-card">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
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
                Recent Products
              </h2>
              <Link
                href="/admin/products"
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#d97706",
                  textDecoration: "none",
                }}
              >
                View all ({totalProducts}) →
              </Link>
            </div>

            {recentProducts.length === 0 ? (
              <div
                style={{
                  padding: "36px 16px",
                  textAlign: "center",
                  backgroundColor: "var(--admin-bg)",
                  borderRadius: "var(--admin-radius-md)",
                  border: "1px dashed var(--admin-border)",
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>📦</div>
                <h3
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    marginBottom: "4px",
                  }}
                >
                  No products in database yet
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--admin-text-muted)",
                    marginBottom: "16px",
                  }}
                >
                  Create your first product to begin populating your store.
                </p>
                <Link href="/admin/products/new" className="btn-primary">
                  + Add First Product
                </Link>
              </div>
            ) : (
              <div
                style={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                {recentProducts.map((product) => {
                  const image =
                    product.image_urls && product.image_urls.length > 0
                      ? product.image_urls[0]
                      : null;

                  return (
                    <div
                      key={product.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "10px 12px",
                        backgroundColor: "var(--admin-bg)",
                        borderRadius: "var(--admin-radius-md)",
                        border: "1px solid var(--admin-border-subtle)",
                      }}
                    >
                      {image ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={image}
                          alt={product.name}
                          className="product-row-image"
                        />
                      ) : (
                        <div className="product-row-placeholder">🧸</div>
                      )}

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <Link
                          href={`/admin/products/${product.id}`}
                          style={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "var(--admin-navy)",
                            textDecoration: "none",
                            display: "block",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {product.name}
                        </Link>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "var(--admin-text-muted)",
                            marginTop: "2px",
                          }}
                        >
                          Rs. {product.price.toLocaleString("en-PK")} ·{" "}
                          <span
                            style={{
                              color:
                                product.stock === 0
                                  ? "#dc2626"
                                  : product.stock < 5
                                  ? "#d97706"
                                  : "#059669",
                              fontWeight: 600,
                            }}
                          >
                            {product.stock} in stock
                          </span>
                        </div>
                      </div>

                      <span
                        className={`badge ${
                          product.is_active ? "badge-success" : "badge-neutral"
                        }`}
                      >
                        {product.is_active ? "Active" : "Draft"}
                      </span>

                      <Link
                        href={`/admin/products/${product.id}`}
                        className="btn-secondary"
                        style={{ padding: "6px 12px", fontSize: "12px" }}
                      >
                        Edit
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Category Distribution */}
          <div className="admin-card">
            <h2
              style={{
                fontSize: "17px",
                fontWeight: 800,
                color: "var(--admin-navy)",
                marginBottom: "18px",
              }}
            >
              Category Distribution
            </h2>

            {categoryStats.length === 0 ? (
              <div
                style={{
                  padding: "36px 16px",
                  textAlign: "center",
                  backgroundColor: "var(--admin-bg)",
                  borderRadius: "var(--admin-radius-md)",
                  border: "1px dashed var(--admin-border)",
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "6px" }}>🏷️</div>
                <p style={{ fontSize: "13px", color: "var(--admin-text-muted)" }}>
                  Categories will populate as you create products.
                </p>
              </div>
            ) : (
              <div
                style={{ display: "flex", flexDirection: "column", gap: "12px" }}
              >
                {categoryStats.map(([catName, count]) => {
                  const percentage = Math.round((count / totalProducts) * 100);
                  return (
                    <div key={catName}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "13px",
                          fontWeight: 600,
                          marginBottom: "4px",
                        }}
                      >
                        <span>{catName}</span>
                        <span style={{ color: "var(--admin-text-muted)" }}>
                          {count} ({percentage}%)
                        </span>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          height: "8px",
                          backgroundColor: "#f1ebd9",
                          borderRadius: "9999px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${percentage}%`,
                            height: "100%",
                            backgroundColor: "#f59e0b",
                            borderRadius: "9999px",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Future-Ready Sections (Honest Empty States as required) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "24px",
          }}
        >
          {/* Orders Section */}
          <div className="admin-card">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "14px",
              }}
            >
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: 800,
                  color: "var(--admin-navy)",
                  margin: 0,
                }}
              >
                Orders & Transactions
              </h2>
              <span className="badge badge-warning">Future Ready</span>
            </div>

            <div
              style={{
                padding: "24px 16px",
                textAlign: "center",
                backgroundColor: "var(--admin-bg)",
                borderRadius: "var(--admin-radius-md)",
                border: "1px dashed var(--admin-border)",
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>🛍️</div>
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "4px",
                }}
              >
                Order Processing Pipeline
              </h3>
              <p
                style={{
                  fontSize: "12px",
                  color: "var(--admin-text-muted)",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                No customer orders processed yet. When checkout orders are
                received, order fulfillment and payment tracking will appear
                here.
              </p>
            </div>
          </div>

          {/* Customers Section */}
          <div className="admin-card">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "14px",
              }}
            >
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: 800,
                  color: "var(--admin-navy)",
                  margin: 0,
                }}
              >
                Customer Management
              </h2>
              <span className="badge badge-warning">Future Ready</span>
            </div>

            <div
              style={{
                padding: "24px 16px",
                textAlign: "center",
                backgroundColor: "var(--admin-bg)",
                borderRadius: "var(--admin-radius-md)",
                border: "1px dashed var(--admin-border)",
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>👥</div>
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "4px",
                }}
              >
                Customer Profiles
              </h3>
              <p
                style={{
                  fontSize: "12px",
                  color: "var(--admin-text-muted)",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                No customer profiles yet. Customer accounts, contact history,
                and purchase loyalty details will be consolidated here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

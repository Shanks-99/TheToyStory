"use client";

import { useState, useTransition, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteProductAction, toggleProductActiveAction } from "../../actions";
import type { DbProduct } from "@/lib/types";

interface ProductsClientProps {
  initialProducts: DbProduct[];
}

export default function ProductsClient({
  initialProducts,
}: ProductsClientProps) {
  const router = useRouter();
  const [products, setProducts] = useState<DbProduct[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState<
    "All" | "active" | "inactive"
  >("All");
  const [selectedAudience, setSelectedAudience] = useState<
    "All" | "babies" | "boys" | "girls"
  >("All");

  const [deleteModalProduct, setDeleteModalProduct] =
    useState<DbProduct | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  // Extract all categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialProducts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set)];
  }, [initialProducts]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q));

      const matchesCat =
        selectedCategory === "All" || p.category === selectedCategory;

      const matchesStatus =
        selectedStatus === "All" ||
        (selectedStatus === "active" ? p.is_active : !p.is_active);

      const matchesAudience =
        selectedAudience === "All" ||
        (Array.isArray(p.target_audience)
          ? p.target_audience.includes(selectedAudience)
          : true);

      return matchesSearch && matchesCat && matchesStatus && matchesAudience;
    });
  }, [products, search, selectedCategory, selectedStatus, selectedAudience]);

  // Handle active status toggle
  async function handleToggleActive(product: DbProduct) {
    const newStatus = !product.is_active;
    setTogglingId(product.id);

    // Optimistic update
    setProducts((current) =>
      current.map((item) =>
        item.id === product.id ? { ...item, is_active: newStatus } : item
      )
    );

    const res = await toggleProductActiveAction(product.id, newStatus);
    setTogglingId(null);

    if (!res.success) {
      // Revert optimistic update
      setProducts((current) =>
        current.map((item) =>
          item.id === product.id
            ? { ...item, is_active: product.is_active }
            : item
        )
      );
      alert(`Could not update status: ${res.error}`);
    } else {
      startTransition(() => {
        router.refresh();
      });
    }
  }

  // Handle product deletion
  async function handleDeleteConfirm() {
    if (!deleteModalProduct) return;
    setIsDeleting(true);
    setDeleteError(null);

    const res = await deleteProductAction(deleteModalProduct.id);
    setIsDeleting(false);

    if (!res.success) {
      setDeleteError(res.error || "Failed to delete product.");
    } else {
      setProducts((current) =>
        current.filter((item) => item.id !== deleteModalProduct.id)
      );
      setDeleteModalProduct(null);
      startTransition(() => {
        router.refresh();
      });
    }
  }

  return (
    <div>
      {/* Search and Filters Bar */}
      <div className="filter-bar">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="form-input"
            placeholder="Search products by name or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <select
            className="form-select"
            style={{ width: "auto", minWidth: "180px" }}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          <select
            className="form-select"
            style={{ width: "auto", minWidth: "140px" }}
            value={selectedStatus}
            onChange={(e) =>
              setSelectedStatus(e.target.value as "All" | "active" | "inactive")
            }
          >
            <option value="All">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="inactive">Draft / Inactive</option>
          </select>

          <select
            className="form-select"
            style={{ width: "auto", minWidth: "150px" }}
            value={selectedAudience}
            onChange={(e) =>
              setSelectedAudience(
                e.target.value as "All" | "babies" | "boys" | "girls"
              )
            }
          >
            <option value="All">All Audiences</option>
            <option value="babies">👶 Babies Only</option>
            <option value="boys">👦 Boys Only</option>
            <option value="girls">👧 Girls Only</option>
          </select>

          {(search ||
            selectedCategory !== "All" ||
            selectedStatus !== "All" ||
            selectedAudience !== "All") && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
                setSelectedStatus("All");
                setSelectedAudience("All");
              }}
              className="btn-secondary"
              style={{ fontSize: "13px", padding: "8px 14px" }}
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Filter status counter */}
      <div
        style={{
          fontSize: "13px",
          color: "var(--admin-text-muted)",
          marginBottom: "14px",
          fontWeight: 600,
        }}
      >
        Showing {filteredProducts.length} of {products.length} products
      </div>

      {/* Products Table */}
      {filteredProducts.length === 0 ? (
        <div
          className="admin-card"
          style={{
            padding: "48px 24px",
            textAlign: "center",
            borderRadius: "var(--admin-radius-lg)",
          }}
        >
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔎</div>
          <h3
            style={{
              fontSize: "17px",
              fontWeight: 800,
              color: "var(--admin-navy)",
              marginBottom: "6px",
            }}
          >
            No matching products found
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "var(--admin-text-muted)",
              marginBottom: "20px",
            }}
          >
            {products.length === 0
              ? "Your product catalog is empty. Click below to add your first toy!"
              : "Try adjusting your search criteria or clearing filters to see more items."}
          </p>
          {products.length === 0 ? (
            <Link href="/admin/products/new" className="btn-primary">
              + Add First Product
            </Link>
          ) : (
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
                setSelectedStatus("All");
              }}
              className="btn-secondary"
            >
              Clear All Filters
            </button>
          )}
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: "64px" }}>Image</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th style={{ textAlign: "right", minWidth: "140px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const thumbnail =
                  product.image_urls && product.image_urls.length > 0
                    ? product.image_urls[0]
                    : null;

                const isLowStock = product.stock > 0 && product.stock < 5;
                const isOutOfStock = product.stock === 0;

                return (
                  <tr key={product.id}>
                    <td>
                      {thumbnail ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={thumbnail}
                          alt={product.name}
                          className="product-row-image"
                        />
                      ) : (
                        <div className="product-row-placeholder">🧸</div>
                      )}
                    </td>

                    <td>
                      <div style={{ fontWeight: 700, color: "var(--admin-navy)" }}>
                        <Link
                          href={`/admin/products/${product.id}`}
                          style={{
                            color: "inherit",
                            textDecoration: "none",
                          }}
                        >
                          {product.name}
                        </Link>
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "var(--admin-text-muted)",
                          fontFamily: "monospace",
                          marginTop: "2px",
                        }}
                      >
                        /{product.slug}
                      </div>
                      {product.age_range && (
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#d97706",
                            marginTop: "2px",
                          }}
                        >
                          Ages: {product.age_range}
                        </div>
                      )}
                      {product.target_audience &&
                        product.target_audience.length > 0 && (
                          <div
                            style={{
                              display: "flex",
                              gap: "4px",
                              marginTop: "4px",
                              flexWrap: "wrap",
                            }}
                          >
                            {product.target_audience.includes("babies") && (
                              <span
                                className="badge"
                                style={{
                                  fontSize: "10px",
                                  padding: "1px 6px",
                                  backgroundColor: "#eef9f1",
                                  color: "#166534",
                                }}
                              >
                                👶 Babies
                              </span>
                            )}
                            {product.target_audience.includes("boys") && (
                              <span
                                className="badge"
                                style={{
                                  fontSize: "10px",
                                  padding: "1px 6px",
                                  backgroundColor: "#eaf4fd",
                                  color: "#1e40af",
                                }}
                              >
                                👦 Boys
                              </span>
                            )}
                            {product.target_audience.includes("girls") && (
                              <span
                                className="badge"
                                style={{
                                  fontSize: "10px",
                                  padding: "1px 6px",
                                  backgroundColor: "#fdf0f6",
                                  color: "#9d174d",
                                }}
                              >
                                👧 Girls
                              </span>
                            )}
                          </div>
                        )}
                    </td>

                    <td>
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 500,
                          color: "var(--admin-navy)",
                        }}
                      >
                        {product.category}
                      </span>
                    </td>

                    <td>
                      <div style={{ fontWeight: 700 }}>
                        Rs. {product.price.toLocaleString("en-PK")}
                      </div>
                      {product.compare_at_price && (
                        <div
                          style={{
                            fontSize: "12px",
                            color: "var(--admin-text-light)",
                            textDecoration: "line-through",
                          }}
                        >
                          Rs. {product.compare_at_price.toLocaleString("en-PK")}
                        </div>
                      )}
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          isOutOfStock
                            ? "badge-danger"
                            : isLowStock
                            ? "badge-warning"
                            : "badge-neutral"
                        }`}
                      >
                        {isOutOfStock
                          ? "Out of Stock"
                          : isLowStock
                          ? `Low (${product.stock})`
                          : `${product.stock} units`}
                      </span>
                    </td>

                    <td>
                      <button
                        onClick={() => handleToggleActive(product)}
                        disabled={togglingId === product.id}
                        className={`badge ${
                          product.is_active ? "badge-success" : "badge-neutral"
                        }`}
                        style={{
                          cursor: "pointer",
                          border: "none",
                          padding: "5px 12px",
                          transition: "all 0.15s ease",
                          opacity: togglingId === product.id ? 0.6 : 1,
                        }}
                        title="Click to toggle visibility on public storefront"
                      >
                        {togglingId === product.id
                          ? "Updating..."
                          : product.is_active
                          ? "● Active"
                          : "○ Inactive"}
                      </button>
                    </td>

                    <td style={{ textAlign: "right" }}>
                      <div
                        style={{
                          display: "inline-flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="btn-secondary"
                          style={{ padding: "6px 12px", fontSize: "12px" }}
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => setDeleteModalProduct(product)}
                          style={{
                            padding: "6px 10px",
                            fontSize: "12px",
                            backgroundColor: "transparent",
                            color: "var(--admin-danger)",
                            border: "1px solid var(--admin-danger-light)",
                            borderRadius: "var(--admin-radius-sm)",
                            cursor: "pointer",
                            fontWeight: 600,
                            transition: "all 0.15s ease",
                          }}
                          title="Delete product"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "var(--admin-danger-light)",
                color: "var(--admin-danger)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                marginBottom: "16px",
              }}
            >
              🗑️
            </div>

            <h3
              style={{
                fontSize: "18px",
                fontWeight: 800,
                color: "var(--admin-navy)",
                marginBottom: "8px",
              }}
            >
              Delete Product?
            </h3>

            <p
              style={{
                fontSize: "14px",
                color: "var(--admin-text-muted)",
                lineHeight: 1.5,
                marginBottom: "20px",
              }}
            >
              Are you sure you want to permanently delete{" "}
              <strong style={{ color: "var(--admin-navy)" }}>
                &ldquo;{deleteModalProduct.name}&rdquo;
              </strong>
              ? This action cannot be undone.
            </p>

            {deleteError && (
              <div
                style={{
                  padding: "10px 12px",
                  backgroundColor: "var(--admin-danger-light)",
                  color: "var(--admin-danger-text)",
                  borderRadius: "var(--admin-radius-sm)",
                  fontSize: "13px",
                  marginBottom: "16px",
                }}
              >
                {deleteError}
              </div>
            )}

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "flex-end",
              }}
            >
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setDeleteModalProduct(null);
                  setDeleteError(null);
                }}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

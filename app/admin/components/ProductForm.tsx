"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { slugify } from "@/lib/slug";
import { uploadProductImage } from "@/lib/storage";
import { createProductAction, updateProductAction } from "../actions";
import type { DbProduct, ProductFormData } from "@/lib/types";

interface ProductFormProps {
  initialData?: DbProduct;
}

const DEFAULT_CATEGORIES = [
  "Building & Construction Toys",
  "Dolls & Stuffed Toys",
  "Vehicles & Action Toys",
  "Educational & Creative Toys",
  "Baby & Toddler Toys",
  "Outdoor & Sports",
  "Games & Puzzles",
];

const TARGET_AUDIENCE_OPTIONS = [
  { id: "babies", label: "Babies", subtitle: "0–2 years (Shown in /babies)", emoji: "👶" },
  { id: "boys", label: "Boys", subtitle: "All ages (Shown in /boys)", emoji: "👦" },
  { id: "girls", label: "Girls", subtitle: "All ages (Shown in /girls)", emoji: "👧" },
];

const COMMON_COLORS = [
  { name: "Blue", hex: "#3b82f6" },
  { name: "Pink", hex: "#ec4899" },
  { name: "Red", hex: "#ef4444" },
  { name: "Yellow", hex: "#eab308" },
  { name: "Green", hex: "#22c55e" },
  { name: "Purple", hex: "#a855f7" },
  { name: "Orange", hex: "#f97316" },
  { name: "White", hex: "#ffffff", border: true },
  { name: "Black", hex: "#1e293b" },
  { name: "Multicolor", hex: "linear-gradient(135deg, #ef4444, #eab308, #3b82f6)" },
];

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialData);

  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [slugCustomized, setSlugCustomized] = useState(Boolean(initialData?.slug));
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [category, setCategory] = useState(
    initialData?.category || DEFAULT_CATEGORIES[0]
  );
  const [customCategory, setCustomCategory] = useState("");
  const [price, setPrice] = useState<string>(
    initialData ? String(initialData.price) : ""
  );
  const [compareAtPrice, setCompareAtPrice] = useState<string>(
    initialData?.compare_at_price ? String(initialData.compare_at_price) : ""
  );
  const [stock, setStock] = useState<string>(
    initialData ? String(initialData.stock) : "10"
  );
  const [ageRange, setAgeRange] = useState(initialData?.age_range || "3-5, 6-8");
  const [targetAudience, setTargetAudience] = useState<string[]>(
    initialData?.target_audience && initialData.target_audience.length > 0
      ? initialData.target_audience
      : []
  );
  const [availableColors, setAvailableColors] = useState<string[]>(
    initialData?.available_colors || []
  );
  const [customColorInput, setCustomColorInput] = useState("");
  const [categoryImages, setCategoryImages] = useState<Record<string, string>>(
    initialData?.category_images || {}
  );
  const [isActive, setIsActive] = useState<boolean>(
    initialData ? initialData.is_active : true
  );
  const [imageUrls, setImageUrls] = useState<string[]>(
    initialData?.image_urls || []
  );

  function toggleAudience(id: string) {
    setTargetAudience((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  }

  function toggleCommonColor(col: string) {
    setAvailableColors((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  }

  function handleAddCustomColor() {
    const trimmed = customColorInput.trim();
    if (!trimmed) return;
    if (!availableColors.includes(trimmed)) {
      setAvailableColors((prev) => [...prev, trimmed]);
    }
    setCustomColorInput("");
  }

  function handleRemoveColor(col: string) {
    setAvailableColors((prev) => prev.filter((c) => c !== col));
  }

  function handleSetCategoryCover(catKey: string, url: string) {
    setCategoryImages((prev) => ({ ...prev, [catKey]: url }));
  }

  function handleRemoveCategoryCover(catKey: string) {
    setCategoryImages((prev) => {
      const copy = { ...prev };
      delete copy[catKey];
      return copy;
    });
  }

  async function handleCategoryFileUpload(
    catKey: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingImage(true);
      const res = await uploadProductImage(file);
      handleSetCategoryCover(catKey, res.url);
      if (!imageUrls.includes(res.url)) {
        setImageUrls((prev) => [...prev, res.url]);
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Image upload failed");
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  }

  const [imageUrlInput, setImageUrlInput] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Auto-generate slug when name changes (unless user explicitly customized slug)
  function handleNameChange(newName: string) {
    setName(newName);
    if (!slugCustomized) {
      setSlug(slugify(newName));
    }
  }

  // Handle image upload through Supabase Storage
  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    setUploadError(null);

    try {
      const newUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const res = await uploadProductImage(file);
        newUrls.push(res.url);
      }
      setImageUrls((prev) => [...prev, ...newUrls]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Image upload failed.";
      setUploadError(msg);
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  }

  // Handle manual image URL addition
  function handleAddImageUrl() {
    const trimmed = imageUrlInput.trim();
    if (!trimmed) return;
    if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://") && !trimmed.startsWith("/")) {
      setUploadError("Image URL must start with http://, https://, or /");
      return;
    }
    setImageUrls((prev) => [...prev, trimmed]);
    setImageUrlInput("");
    setUploadError(null);
  }

  function handleRemoveImage(index: number) {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  }

  // Form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    // Client-side validations
    const trimmedName = name.trim();
    if (!trimmedName) {
      setFormError("Product name is required.");
      return;
    }

    const finalCategory =
      category === "__CUSTOM__" ? customCategory.trim() : category.trim();
    if (!finalCategory) {
      setFormError("Please select or enter a category.");
      return;
    }

    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice < 0) {
      setFormError("Please enter a valid non-negative price.");
      return;
    }

    let numCompare: number | null = null;
    if (compareAtPrice.trim() !== "") {
      numCompare = parseFloat(compareAtPrice);
      if (isNaN(numCompare) || numCompare < 0) {
        setFormError("Compare-at price must be a non-negative number.");
        return;
      }
    }

    const numStock = parseInt(stock, 10);
    if (isNaN(numStock) || numStock < 0) {
      setFormError("Stock must be a non-negative whole integer.");
      return;
    }

    if (targetAudience.length === 0) {
      setFormError("Please select at least one category (Babies, Boys, or Girls).");
      return;
    }

    const payload: ProductFormData = {
      name: trimmedName,
      slug: slugify(slug.trim() || trimmedName),
      description: description.trim(),
      category: finalCategory,
      target_audience: targetAudience,
      available_colors: availableColors,
      category_images: categoryImages,
      price: numPrice,
      compare_at_price: numCompare,
      stock: numStock,
      age_range: ageRange.trim(),
      is_active: isActive,
      image_urls: imageUrls,
    };

    setSaving(true);

    try {
      if (isEditing && initialData) {
        const res = await updateProductAction(initialData.id, payload);
        if (!res.success) {
          setFormError(res.error || "Failed to update product.");
          setSaving(false);
          return;
        }
      } else {
        const res = await createProductAction(payload);
        if (!res.success) {
          setFormError(res.error || "Failed to create product.");
          setSaving(false);
          return;
        }
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An error occurred.";
      setFormError(msg);
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {formError && (
        <div
          style={{
            padding: "14px 18px",
            backgroundColor: "var(--admin-danger-light)",
            color: "var(--admin-danger-text)",
            borderRadius: "var(--admin-radius-md)",
            fontSize: "14px",
            fontWeight: 600,
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span>⚠️</span>
          <span>{formError}</span>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
        }}
      >
        {/* Left Column: Core Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="admin-card">
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 800,
                color: "var(--admin-navy)",
                marginBottom: "18px",
              }}
            >
              General Information
            </h2>

            <div className="form-group">
              <label className="form-label" htmlFor="prod-name">
                Product Name <span className="required">*</span>
              </label>
              <input
                id="prod-name"
                type="text"
                required
                className="form-input"
                placeholder="e.g. Remote Control Freight Pickup Truck"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="prod-slug">
                URL Slug <span className="required">*</span>
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="prod-slug"
                  type="text"
                  required
                  className="form-input"
                  style={{ fontFamily: "monospace", fontSize: "13px" }}
                  placeholder="remote-control-freight-truck"
                  value={slug}
                  onChange={(e) => {
                    setSlugCustomized(true);
                    setSlug(e.target.value);
                  }}
                />
              </div>
              <div className="form-hint">
                Auto-generated from product name. Used in product URLs.
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="prod-desc">
                Description
              </label>
              <textarea
                id="prod-desc"
                rows={5}
                className="form-textarea"
                placeholder="Provide a vivid description of features, play value, materials, and excitement..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="admin-card">
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 800,
                color: "var(--admin-navy)",
                marginBottom: "18px",
              }}
            >
              Pricing & Inventory
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div className="form-group">
                <label className="form-label" htmlFor="prod-price">
                  Price (PKR) <span className="required">*</span>
                </label>
                <input
                  id="prod-price"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  className="form-input"
                  placeholder="4550"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="prod-compare">
                  Compare-at Price (PKR)
                </label>
                <input
                  id="prod-compare"
                  type="number"
                  step="0.01"
                  min="0"
                  className="form-input"
                  placeholder="6595 (Original)"
                  value={compareAtPrice}
                  onChange={(e) => setCompareAtPrice(e.target.value)}
                />
                <div className="form-hint">Shows as crossed-out discount</div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div className="form-group">
                <label className="form-label" htmlFor="prod-stock">
                  Units in Stock <span className="required">*</span>
                </label>
                <input
                  id="prod-stock"
                  type="number"
                  min="0"
                  step="1"
                  required
                  className="form-input"
                  placeholder="10"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="prod-age">
                  Age Range
                </label>
                <input
                  id="prod-age"
                  type="text"
                  className="form-input"
                  placeholder="e.g. 3-5, 6-8, 9+"
                  value={ageRange}
                  onChange={(e) => setAgeRange(e.target.value)}
                />
              </div>
            </div>

            {/* Available Colors & Variants Card */}
            <div className="admin-card" style={{ marginTop: "24px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "8px",
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
                  🎨 Available Colors & Variants
                </h2>
                <span style={{ fontSize: "12px", color: "var(--admin-text-muted)" }}>
                  {availableColors.length} selected
                </span>
              </div>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--admin-text-muted)",
                  marginBottom: "16px",
                  lineHeight: 1.4,
                }}
              >
                Select which colors are in stock for this toy. Buyers will be able to choose their preferred color on the product page before adding to bag.
              </p>

              {/* Quick Pick Popular Colors */}
              <label className="form-label" style={{ marginBottom: "8px" }}>
                Quick Select Common Colors:
              </label>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "16px",
                }}
              >
                {COMMON_COLORS.map((col) => {
                  const isSel = availableColors.includes(col.name);
                  return (
                    <button
                      key={col.name}
                      type="button"
                      onClick={() => toggleCommonColor(col.name)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 12px",
                        borderRadius: "999px",
                        border: isSel
                          ? "2px solid #2563eb"
                          : "1px solid var(--admin-border)",
                        background: isSel ? "#eff6ff" : "#ffffff",
                        color: isSel ? "#1e40af" : "var(--admin-navy)",
                        fontWeight: isSel ? 700 : 500,
                        fontSize: "12px",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <span
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          background: col.hex,
                          border: col.border ? "1px solid #cbd5e1" : "none",
                          display: "inline-block",
                        }}
                      />
                      <span>{col.name}</span>
                      {isSel && <span>✓</span>}
                    </button>
                  );
                })}
              </div>

              {/* Custom Color Input */}
              <div className="form-group" style={{ marginBottom: "16px" }}>
                <label className="form-label">Or Add Custom Color Name</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Royal Gold, Ocean Cyan, Space Grey"
                    value={customColorInput}
                    onChange={(e) => setCustomColorInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCustomColor();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomColor}
                    className="btn-secondary"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    + Add Color
                  </button>
                </div>
              </div>

              {/* Active Selected Colors Chips */}
              {availableColors.length > 0 ? (
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "var(--admin-navy)",
                      marginBottom: "8px",
                    }}
                  >
                    Selected Colors for Buyer:
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {availableColors.map((colorName) => (
                      <span
                        key={colorName}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "5px 12px",
                          borderRadius: "999px",
                          background: "#f8fafc",
                          border: "1px solid #cbd5e1",
                          fontSize: "12.5px",
                          fontWeight: 700,
                          color: "#1e293b",
                        }}
                      >
                        <span>● {colorName}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveColor(colorName)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#94a3b8",
                            cursor: "pointer",
                            padding: "0",
                            fontSize: "14px",
                            lineHeight: 1,
                            fontWeight: 800,
                          }}
                          title={`Remove ${colorName}`}
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--admin-text-muted)",
                    fontStyle: "italic",
                  }}
                >
                  No specific colors added. Buyers will see standard product ordering.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Imagery & Organization */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Organization & Visibility */}
          <div className="admin-card">
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 800,
                color: "var(--admin-navy)",
                marginBottom: "18px",
              }}
            >
              Category & Status
            </h2>

            <div className="form-group">
              <label className="form-label" htmlFor="prod-category">
                Category <span className="required">*</span>
              </label>
              <select
                id="prod-category"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {DEFAULT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
                <option value="__CUSTOM__">+ Custom Category...</option>
              </select>
            </div>

            {category === "__CUSTOM__" && (
              <div className="form-group">
                <label className="form-label" htmlFor="prod-custom-cat">
                  Custom Category Name <span className="required">*</span>
                </label>
                <input
                  id="prod-custom-cat"
                  type="text"
                  className="form-input"
                  placeholder="Enter new category name..."
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                />
              </div>
            )}

            {/* Target Category / Gender Checkboxes */}
            <div className="form-group" style={{ marginTop: "18px" }}>
              <label className="form-label">
                Show in Categories / Gender Collections <span className="required">*</span>
              </label>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--admin-text-muted)",
                  marginBottom: "10px",
                  lineHeight: 1.4,
                }}
              >
                Check 1 or more. The product will be displayed in <strong>All Products</strong> on the homepage, and specifically in each checked collection.
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                  gap: "10px",
                  marginBottom: "8px",
                }}
              >
                {TARGET_AUDIENCE_OPTIONS.map((opt) => {
                  const isChecked = targetAudience.includes(opt.id);
                  return (
                    <label
                      key={opt.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px 12px",
                        backgroundColor: isChecked ? "var(--admin-primary-light)" : "var(--admin-bg)",
                        border: `1.5px solid ${isChecked ? "var(--admin-primary)" : "var(--admin-border)"}`,
                        borderRadius: "var(--admin-radius-md)",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleAudience(opt.id)}
                        style={{
                          width: "18px",
                          height: "18px",
                          accentColor: "#f59e0b",
                        }}
                      />
                      <div>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: "13px",
                            color: "var(--admin-navy)",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <span>{opt.emoji}</span>
                          <span>{opt.label}</span>
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: isChecked ? "var(--admin-primary-text)" : "var(--admin-text-muted)",
                          }}
                        >
                          {opt.subtitle}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>

              {targetAudience.length === 0 && (
                <div style={{ fontSize: "12px", color: "var(--admin-danger)", fontWeight: 600, marginTop: "4px" }}>
                  Please select at least one collection (Babies, Boys, or Girls).
                </div>
              )}
            </div>

            <div
              style={{
                padding: "16px",
                backgroundColor: "var(--admin-bg)",
                borderRadius: "var(--admin-radius-md)",
                border: "1px solid var(--admin-border)",
                marginTop: "16px",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  style={{ width: "18px", height: "18px", accentColor: "#f59e0b" }}
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "14px" }}>
                    Active Product
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--admin-text-muted)",
                      marginTop: "2px",
                    }}
                  >
                    When enabled, this product is immediately visible on the public storefront.
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Category-Specific Cover Photos (shown when 2 or more categories are selected) */}
          {targetAudience.length >= 2 && (
            <div
              className="admin-card"
              style={{
                border: "2px solid #3b82f6",
                backgroundColor: "#f8fbff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "6px",
                }}
              >
                <span style={{ fontSize: "20px" }}>📸</span>
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "var(--admin-navy)",
                    margin: 0,
                  }}
                >
                  Category-Specific Cover Photos
                </h2>
              </div>
              <p
                style={{
                  fontSize: "12.5px",
                  color: "var(--admin-text-muted)",
                  marginBottom: "16px",
                  lineHeight: 1.45,
                }}
              >
                You selected multiple categories (<strong>{targetAudience.join(", ")}</strong>). You can set a separate cover photo for each collection so boys see their version on <em>/boys</em> and girls see their version on <em>/girls</em>. If unset, the primary photo is used.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {targetAudience.map((audId) => {
                  const opt =
                    TARGET_AUDIENCE_OPTIONS.find((o) => o.id === audId) || {
                      label: audId,
                      emoji: "🎯",
                    };
                  const currentCover = categoryImages[audId] || "";

                  return (
                    <div
                      key={audId}
                      style={{
                        padding: "14px",
                        borderRadius: "var(--admin-radius-md)",
                        backgroundColor: "#ffffff",
                        border: currentCover
                          ? "1.5px solid #2563eb"
                          : "1px solid var(--admin-border)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "10px",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 800,
                            fontSize: "13.5px",
                            color: "var(--admin-navy)",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <span>{opt.emoji}</span>
                          <span>{opt.label} Cover Photo</span>
                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: 600,
                              color: "var(--admin-text-muted)",
                            }}
                          >
                            (Shown on /{audId})
                          </span>
                        </span>
                        {currentCover && (
                          <button
                            type="button"
                            onClick={() => handleRemoveCategoryCover(audId)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "var(--admin-danger)",
                              fontSize: "12px",
                              fontWeight: 700,
                              cursor: "pointer",
                            }}
                          >
                            ✕ Remove
                          </button>
                        )}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "14px",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "72px",
                            height: "72px",
                            borderRadius: "10px",
                            overflow: "hidden",
                            backgroundColor: "#f1f5f9",
                            border: "1px solid var(--admin-border)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {currentCover ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={currentCover}
                              alt={`${opt.label} cover`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <span style={{ fontSize: "24px", opacity: 0.4 }}>
                              📷
                            </span>
                          )}
                        </div>

                        <div
                          style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                          }}
                        >
                          {/* Pick from attached gallery images */}
                          {imageUrls.length > 0 && (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                flexWrap: "wrap",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "11px",
                                  fontWeight: 700,
                                  color: "var(--admin-text-muted)",
                                }}
                              >
                                Pick from photos:
                              </span>
                              {imageUrls.map((url, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() =>
                                    handleSetCategoryCover(audId, url)
                                  }
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "6px",
                                    overflow: "hidden",
                                    border:
                                      currentCover === url
                                        ? "2px solid #2563eb"
                                        : "1px solid #cbd5e1",
                                    cursor: "pointer",
                                    padding: 0,
                                    outline:
                                      currentCover === url
                                        ? "2px solid #93c5fd"
                                        : "none",
                                  }}
                                  title={`Use photo #${i + 1}`}
                                >
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={url}
                                    alt=""
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Or upload new file / paste url */}
                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                              alignItems: "center",
                            }}
                          >
                            <label
                              className="btn-secondary"
                              style={{
                                fontSize: "11px",
                                padding: "6px 12px",
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              <span>📁</span> Upload {opt.label} Photo
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleCategoryFileUpload(audId, e)
                                }
                                style={{ display: "none" }}
                              />
                            </label>

                            <input
                              type="text"
                              className="form-input"
                              placeholder="Or paste image URL..."
                              value={currentCover}
                              onChange={(e) =>
                                handleSetCategoryCover(audId, e.target.value)
                              }
                              style={{
                                fontSize: "12px",
                                padding: "6px 10px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Product Photography & Storage */}
          <div className="admin-card">
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 800,
                color: "var(--admin-navy)",
                marginBottom: "18px",
              }}
            >
              Product Imagery
            </h2>

            {/* Upload Zone */}
            <div
              style={{
                border: "2px dashed var(--admin-border)",
                borderRadius: "var(--admin-radius-lg)",
                padding: "24px 16px",
                textAlign: "center",
                backgroundColor: "var(--admin-bg)",
                marginBottom: "18px",
                position: "relative",
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>📸</div>
              <div style={{ fontWeight: 700, fontSize: "14px", marginBottom: "4px" }}>
                Upload Photography to Supabase Storage
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--admin-text-muted)",
                  marginBottom: "14px",
                }}
              >
                PNG, JPG, WEBP or GIF up to 5MB
              </div>

              <label
                className="btn-secondary"
                style={{
                  cursor: uploadingImage ? "not-allowed" : "pointer",
                  display: "inline-flex",
                }}
              >
                {uploadingImage ? "Uploading to Storage..." : "Browse Files"}
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                  onChange={handleFileUpload}
                  disabled={uploadingImage}
                  style={{ display: "none" }}
                />
              </label>
            </div>

            {uploadError && (
              <div
                style={{
                  padding: "10px 14px",
                  backgroundColor: "var(--admin-danger-light)",
                  color: "var(--admin-danger-text)",
                  borderRadius: "var(--admin-radius-sm)",
                  fontSize: "12px",
                  marginBottom: "14px",
                  fontWeight: 600,
                }}
              >
                {uploadError}
              </div>
            )}

            {/* Or enter URL */}
            <div className="form-group" style={{ marginBottom: "18px" }}>
              <label className="form-label">Or Add Image by URL</label>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="https://... or /Cars.jpeg"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddImageUrl();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="btn-secondary"
                  style={{ whiteSpace: "nowrap" }}
                >
                  + Add URL
                </button>
              </div>
            </div>

            {/* Image Previews */}
            {imageUrls.length > 0 ? (
              <div>
                <label className="form-label" style={{ marginBottom: "10px" }}>
                  Attached Photos ({imageUrls.length})
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
                    gap: "10px",
                  }}
                >
                  {imageUrls.map((url, idx) => (
                    <div
                      key={idx}
                      style={{
                        position: "relative",
                        aspectRatio: "1",
                        borderRadius: "var(--admin-radius-md)",
                        overflow: "hidden",
                        border: "1px solid var(--admin-border)",
                        backgroundColor: "#f1f5f9",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt={`Photo ${idx + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        style={{
                          position: "absolute",
                          top: "4px",
                          right: "4px",
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          backgroundColor: "rgba(15, 23, 42, 0.75)",
                          color: "#ffffff",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          lineHeight: 1,
                        }}
                        title="Remove image"
                      >
                        ✕
                      </button>
                      {idx === 0 && (
                        <div
                          style={{
                            position: "absolute",
                            bottom: "0",
                            insetInline: "0",
                            backgroundColor: "rgba(245, 158, 11, 0.9)",
                            color: "#0f172a",
                            fontSize: "9px",
                            fontWeight: 800,
                            textAlign: "center",
                            padding: "2px 0",
                            textTransform: "uppercase",
                          }}
                        >
                          Cover
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--admin-text-muted)",
                  fontStyle: "italic",
                }}
              >
                No images attached yet. A default toy placeholder will be used on the storefront.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Form Bottom Actions */}
      <div
        style={{
          marginTop: "32px",
          paddingTop: "24px",
          borderTop: "1px solid var(--admin-border)",
          display: "flex",
          justifyContent: "flex-end",
          gap: "14px",
        }}
      >
        <Link href="/admin/products" className="btn-secondary">
          Cancel
        </Link>
        <button
          type="submit"
          className="btn-primary"
          style={{ minWidth: "160px" }}
          disabled={saving}
        >
          {saving
            ? isEditing
              ? "Saving Changes..."
              : "Creating Product..."
            : isEditing
            ? "Save Changes"
            : "Create Product"}
        </button>
      </div>
    </form>
  );
}

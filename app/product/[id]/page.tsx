"use client";

import { use, useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProductById, productsData } from "../../data/products";
import "./product-page.css";

const money = (amount: number) =>
  `Rs. ${Math.round(amount).toLocaleString("en-PK")}`;

const discountPercent = (orig: number, sale: number) =>
  Math.round(((orig - sale) / orig) * 100);

function ProductDetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const product = getProductById(resolvedParams.id) || productsData[0];

  // State
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [giftReady, setGiftReady] = useState(false);
  const [giftNote, setGiftNote] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "reviews" | "shipping">("overview");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Bundle selection state
  const initialBundleChecked = product.bundle
    ? product.bundle.items.reduce<Record<string, boolean>>((acc, item) => {
        acc[item.id] = item.checked;
        return acc;
      }, {})
    : {};
  const [bundleChecked, setBundleChecked] = useState<Record<string, boolean>>(initialBundleChecked);

  const images = product.images && product.images.length > 0 ? product.images : ["/Cars.jpeg"];
  const currentImage = images[activeImageIdx] || images[0];

  // Scroll listener for sticky purchase bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 550) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = () => {
    setCartCount((c) => c + quantity);
    triggerToast(`Added ${quantity} × ${product.name} to your cart! 🛍️`);
  };

  const handleBuyNow = () => {
    try {
      const checkoutItems = [
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          image: images[0] || "/Cars.jpeg",
        },
      ];
      localStorage.setItem("tts_checkout_cart", JSON.stringify(checkoutItems));
    } catch (e) {
      console.error(e);
    }
    router.push(`/checkout?productId=${product.id}&qty=${quantity}`);
  };

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  // Bundle calculations
  const selectedBundleItems = product.bundle
    ? product.bundle.items.filter((item) => bundleChecked[item.id])
    : [];

  const bundleTotalOriginal =
    product.originalPrice +
    selectedBundleItems.reduce((acc, item) => acc + item.originalPrice, 0);

  const bundleTotalCurrent =
    product.price +
    selectedBundleItems.reduce((acc, item) => acc + item.price, 0);

  const bundleSavings = bundleTotalOriginal - bundleTotalCurrent;

  const handleAddBundleToCart = () => {
    const countToAdd = 1 + selectedBundleItems.length;
    setCartCount((c) => c + countToAdd);
    triggerToast(`Added full bundle (${countToAdd} items) to your cart! 🎁`);
  };

  return (
    <div className="pdp-page">
      {/* ── Top Navigation Bar ── */}
      <header className="pdp-nav">
        <div className="pdp-nav__inner">
          <Link href="/" className="pdp-nav__brand">
            <img src="/logo.png" alt="The Toy Story" />
            <span>THE TOY STORY</span>
          </Link>

          <nav className="pdp-nav__links">
            <Link href="/">Home</Link>
            <Link href="/babies">Babies</Link>
            <Link href="/boys">Boys</Link>
            <Link href="/girls">Girls</Link>
          </nav>

          <div className="pdp-nav__actions">
            <Link href="/" className="pdp-nav__back">
              ← Store
            </Link>
            <button
              type="button"
              className="pdp-nav__cart"
              onClick={() => router.push("/checkout")}
              aria-label="View shopping bag"
            >
              🛍️
              {cartCount > 0 && <span className="pdp-nav__cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* ── Toast Notification ── */}
      {toastMessage && (
        <div className="pdp-toast" role="status">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── Breadcrumb Navigation ── */}
      <nav className="pdp-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="pdp-breadcrumb__sep">›</span>
        <Link href="/#shop">All Products</Link>
        <span className="pdp-breadcrumb__sep">›</span>
        <Link href="/#shop">{product.category}</Link>
        <span className="pdp-breadcrumb__sep">›</span>
        <span className="pdp-breadcrumb__current">{product.name}</span>
      </nav>

      {/* ── Main Showcase Container ── */}
      <main className="pdp-container">
        <div className="pdp-grid">
          {/* ── Left Column: Clean Interactive Gallery ── */}
          <div className="pdp-gallery-wrap">
            {/* Vertical / Horizontal Thumbnails */}
            {images.length > 1 && (
              <div className="pdp-thumbnails" role="tablist" aria-label="Product thumbnails">
                {images.map((imgSrc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={activeImageIdx === idx}
                    className={`pdp-thumb-btn ${activeImageIdx === idx ? "is-active" : ""}`}
                    onClick={() => setActiveImageIdx(idx)}
                  >
                    <img src={imgSrc} alt={`${product.name} thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image Stage */}
            <div className="pdp-main-image-stage">
              <img
                src={currentImage}
                alt={product.name}
                className="pdp-main-image"
              />

              {/* Prev / Next controls */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    className="pdp-img-arrow pdp-img-arrow--prev"
                    onClick={prevImage}
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="pdp-img-arrow pdp-img-arrow--next"
                    onClick={nextImage}
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </>
              )}

              {/* Wishlist Button */}
              <button
                type="button"
                className={`pdp-wishlist-btn ${isFavorite ? "is-active" : ""}`}
                onClick={() => {
                  setIsFavorite(!isFavorite);
                  triggerToast(
                    !isFavorite ? "Saved to your favorites! ♥" : "Removed from favorites"
                  );
                }}
                aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
              >
                {isFavorite ? "♥" : "♡"}
              </button>

              {/* Image Counter Badge */}
              {images.length > 1 && (
                <span className="pdp-counter-badge">
                  {activeImageIdx + 1} / {images.length}
                </span>
              )}
            </div>
          </div>

          {/* ── Right Column: Clean Buying Information ── */}
          <div className="pdp-info-wrap">
            {/* Meta tags & Stock urgency */}
            <div className="pdp-meta-row">
              <span className="pdp-category-tag">{product.category}</span>
              <span className="pdp-stock-badge">
                🔥 Only {product.inStock} left in stock — Order fast!
              </span>
            </div>

            {/* Product Title */}
            <h1 className="pdp-title">{product.name}</h1>

            {/* Rating & Verified summary */}
            <div className="pdp-rating-row">
              <span className="pdp-stars">★★★★★</span>
              <span className="pdp-reviews-count">
                <strong>{product.rating}</strong> ({product.reviewsCount} verified reviews)
              </span>
              <span className="pdp-verified-tag">✓ 100% Genuine</span>
            </div>

            {/* Price Box */}
            <div className="pdp-price-box">
              <span className="pdp-price-current">{money(product.price)}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="pdp-price-original">
                    {money(product.originalPrice)}
                  </span>
                  <span className="pdp-savings-pill">
                    Save {money(product.originalPrice - product.price)} (
                    {discountPercent(product.originalPrice, product.price)}% OFF)
                  </span>
                </>
              )}
            </div>

            {/* Subtle Bank Transfer 10% Discount Callout */}
            <div className="pdp-bank-offer">
              <span>💳</span>
              <div>
                <strong>Extra 10% OFF via Bank Transfer:</strong> Skip phone verification calls & enjoy instant priority dispatch!
              </div>
            </div>

            {/* "Make It Gift Ready" Option */}
            <div className={`pdp-gift-box ${giftReady ? "is-selected" : ""}`}>
              <label className="pdp-gift-label">
                <div className="pdp-gift-left">
                  <span className="pdp-gift-icon">🎁</span>
                  <div className="pdp-gift-text">
                    <h4>
                      Make It Gift Ready <span className="pdp-gift-badge">+Rs. 150</span>
                    </h4>
                    <p>Includes luxury gift wrapping, satin bow, and a handwritten personalized message.</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  className="pdp-gift-checkbox"
                  checked={giftReady}
                  onChange={(e) => setGiftReady(e.target.checked)}
                />
              </label>

              {giftReady && (
                <div className="pdp-gift-input-wrap">
                  <input
                    type="text"
                    className="pdp-gift-input"
                    placeholder="Write your special message for the child (e.g. Happy Birthday Ali!)..."
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Quantity Stepper & Add to Cart */}
            <div className="pdp-actions-row">
              <div className="pdp-qty-stepper" aria-label="Quantity selector">
                <button
                  type="button"
                  className="pdp-qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="pdp-qty-val">{quantity}</span>
                <button
                  type="button"
                  className="pdp-qty-btn"
                  onClick={() => setQuantity((q) => Math.min(product.inStock, q + 1))}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="pdp-btn-cart"
                onClick={handleAddToCart}
              >
                <span>🛒</span> Add to Bag · {money(product.price * quantity + (giftReady ? 150 : 0))}
              </button>
            </div>

            {/* Instant Buy Now Button */}
            <button
              type="button"
              className="pdp-btn-buynow"
              onClick={handleBuyNow}
            >
              <span>⚡</span> BUY IT NOW (Cash on Delivery)
            </button>

            {/* WhatsApp Quick Order Banner */}
            <div className="pdp-whatsapp-banner">
              <span>💬 Prefer ordering directly on WhatsApp?</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Hi The Toy Story! I'd like to order: ${product.name} (${money(product.price)})`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>🟢</span> WhatsApp Order
              </a>
            </div>

            {/* Clean Trust Guarantees */}
            <div className="pdp-trust-grid">
              <div className="pdp-trust-item">
                <span className="pdp-trust-item__icon">🚚</span>
                <div className="pdp-trust-item__text">
                  <strong>Fast Nationwide Shipping</strong>
                  <span>2–4 business days delivery across Pakistan</span>
                </div>
              </div>

              <div className="pdp-trust-item">
                <span className="pdp-trust-item__icon">🛡️</span>
                <div className="pdp-trust-item__text">
                  <strong>Child-Safe Certified</strong>
                  <span>100% Non-toxic ABS & safety inspected</span>
                </div>
              </div>

              <div className="pdp-trust-item">
                <span className="pdp-trust-item__icon">🔄</span>
                <div className="pdp-trust-item__text">
                  <strong>7-Day Easy Returns</strong>
                  <span>Hassle-free replacement if damaged</span>
                </div>
              </div>

              <div className="pdp-trust-item">
                <span className="pdp-trust-item__icon">💵</span>
                <div className="pdp-trust-item__text">
                  <strong>Cash on Delivery</strong>
                  <span>Pay safely upon receiving your parcel</span>
                </div>
              </div>
            </div>

            {/* Clean Payment Badges */}
            <div className="pdp-payment-trust">
              <p>Safe & Secure Checkout</p>
              <div className="pdp-payment-pills">
                <span className="pdp-pay-pill">Cash on Delivery</span>
                <span className="pdp-pay-pill">Direct Bank Transfer</span>
                <span className="pdp-pay-pill">HBL</span>
                <span className="pdp-pay-pill">Visa</span>
                <span className="pdp-pay-pill">Mastercard</span>
                <span className="pdp-pay-pill">Easypaisa</span>
                <span className="pdp-pay-pill">JazzCash</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Frequently Bought Together (Clean Bundle Card) ── */}
        {product.bundle && (
          <section className="pdp-bundle-card">
            <div className="pdp-bundle-header">
              <h3>{product.bundle.title} ⏰</h3>
              <p>Combine and save big! Get our most popular play accessories together.</p>
            </div>

            {/* Visual combo row */}
            <div className="pdp-bundle-visuals">
              <div className="pdp-bundle-img-wrap">
                <img src={images[0]} alt={product.name} />
              </div>
              <span className="pdp-bundle-plus">+</span>
              <div className="pdp-bundle-img-wrap">
                <img src={product.bundle.items[0].image} alt={product.bundle.items[0].name} />
              </div>
              <span className="pdp-bundle-plus">+</span>
              <div className="pdp-bundle-img-wrap">
                <img src={product.bundle.items[1].image} alt={product.bundle.items[1].name} />
              </div>
            </div>

            {/* Interactive bundle checkboxes */}
            <div className="pdp-bundle-checklist">
              <label className="pdp-bundle-item-label">
                <input type="checkbox" checked disabled />
                <span>
                  <strong>This item:</strong> {product.name}
                </span>
                <span className="pdp-bundle-price-tag">{money(product.price)}</span>
              </label>

              {product.bundle.items.map((item) => (
                <label key={item.id} className="pdp-bundle-item-label">
                  <input
                    type="checkbox"
                    checked={bundleChecked[item.id] || false}
                    onChange={(e) =>
                      setBundleChecked({
                        ...bundleChecked,
                        [item.id]: e.target.checked,
                      })
                    }
                  />
                  <span>
                    <strong>Add:</strong> {item.name}
                  </span>
                  <span className="pdp-bundle-price-tag">
                    <span className="pdp-bundle-strike">{money(item.originalPrice)}</span>
                    {money(item.price)}
                  </span>
                </label>
              ))}
            </div>

            {/* Bundle total footer */}
            <div className="pdp-bundle-footer">
              <div>
                <span className="pdp-bundle-total-strike">
                  {money(bundleTotalOriginal)}
                </span>
                <span className="pdp-bundle-total-price">
                  {money(bundleTotalCurrent)}
                </span>
                {bundleSavings > 0 && (
                  <span className="pdp-savings-pill" style={{ marginLeft: "10px" }}>
                    Save {money(bundleSavings)}
                  </span>
                )}
              </div>

              <button
                type="button"
                className="pdp-bundle-cta-btn"
                onClick={handleAddBundleToCart}
              >
                🛒 Add Selected to Bag & Save {money(bundleSavings)}
              </button>
            </div>
          </section>
        )}

        {/* ── Deep-Dive Tabbed Information (Clean & Structured) ── */}
        <section className="pdp-tabs-section">
          <div className="pdp-tab-headers" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "overview"}
              className={`pdp-tab-btn ${activeTab === "overview" ? "is-active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview & Features
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "specs"}
              className={`pdp-tab-btn ${activeTab === "specs" ? "is-active" : ""}`}
              onClick={() => setActiveTab("specs")}
            >
              Specifications
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "reviews"}
              className={`pdp-tab-btn ${activeTab === "reviews" ? "is-active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews ({product.reviewsCount})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "shipping"}
              className={`pdp-tab-btn ${activeTab === "shipping" ? "is-active" : ""}`}
              onClick={() => setActiveTab("shipping")}
            >
              Shipping & Guarantee
            </button>
          </div>

          <div className="pdp-tab-content">
            {activeTab === "overview" && (
              <div>
                <p style={{ fontSize: "1.02rem", lineHeight: 1.7, color: "#334155" }}>
                  {product.description}
                </p>

                <h4 style={{ margin: "24px 0 10px", fontSize: "1.1rem", fontWeight: 800 }}>
                  🚚 Key Highlights & Built-in Features
                </h4>
                <ul className="pdp-features-list">
                  {product.features.map((feat, idx) => (
                    <li key={idx}>
                      <span className="pdp-feature-icon">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "specs" && (
              <div>
                <table className="pdp-specs-table">
                  <tbody>
                    {Object.entries(product.specs).map(([key, val]) => (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                  <div style={{ fontSize: "2.8rem", fontWeight: 900, color: "#0f172a", lineHeight: 1 }}>
                    {product.rating}
                  </div>
                  <div>
                    <div style={{ color: "#f59e0b", fontSize: "1.2rem" }}>★★★★★</div>
                    <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "2px" }}>
                      Based on {product.reviewsCount} verified customer orders
                    </div>
                  </div>
                </div>

                <div className="pdp-reviews-grid">
                  <div className="pdp-review-card">
                    <div className="pdp-review-top">
                      <div>
                        <div className="pdp-review-author">Zainab K.</div>
                        <div className="pdp-review-city">Lahore · Verified Buyer</div>
                      </div>
                      <span className="pdp-review-stars">★★★★★</span>
                    </div>
                    <p className="pdp-review-text">
                      "My 7-year-old son has not put this truck down since it arrived! The smoke effect was such a surprise and completely mess-free. The remote controller works smoothly without lag. Very fast delivery too!"
                    </p>
                  </div>

                  <div className="pdp-review-card">
                    <div className="pdp-review-top">
                      <div>
                        <div className="pdp-review-author">Usman M.</div>
                        <div className="pdp-review-city">Karachi · Verified Buyer</div>
                      </div>
                      <span className="pdp-review-stars">★★★★★</span>
                    </div>
                    <p className="pdp-review-text">
                      "Top quality build. Usually toys ordered online feel flimsy, but this freight truck has solid ABS plastic and authentic rubber tires. Opening container doors are a great touch."
                    </p>
                  </div>

                  <div className="pdp-review-card">
                    <div className="pdp-review-top">
                      <div>
                        <div className="pdp-review-author">Ayesha R.</div>
                        <div className="pdp-review-city">Islamabad · Verified Buyer</div>
                      </div>
                      <span className="pdp-review-stars">★★★★★</span>
                    </div>
                    <p className="pdp-review-text">
                      "Ordered as a birthday gift with the gift wrapping service. The packaging was lovely and arrived on the exact day. Highly recommend The Toy Story!"
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "#334155" }}>
                <p>
                  <strong>Delivery Timelines:</strong>
                  <br />
                  Major Cities (Karachi, Lahore, Islamabad, Rawalpindi): <strong>2–3 business days</strong>.
                  <br />
                  Other Cities & Nationwide: <strong>3–4 business days</strong>.
                </p>
                <p style={{ marginTop: "14px" }}>
                  <strong>Payment Options:</strong>
                  <br />
                  Cash on Delivery (COD) is available across Pakistan. You can inspect the outer parcel seal before paying the courier. We also accept direct online bank transfers with an instant 10% discount!
                </p>
                <p style={{ marginTop: "14px" }}>
                  <strong>7-Day Replacement Policy:</strong>
                  <br />
                  Every toy is tested before dispatch. In the rare case of transit damage or manufacturing defect, contact us within 7 days on WhatsApp for a prompt doorstep replacement.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ── Sticky Purchase Bar (Appears on Scroll) ── */}
      <aside className={`pdp-sticky-bar ${showStickyBar ? "is-visible" : ""}`} aria-label="Quick purchase bar">
        <div className="pdp-sticky-inner">
          <div className="pdp-sticky-product">
            <img src={images[0]} alt={product.name} className="pdp-sticky-img" />
            <div>
              <div className="pdp-sticky-title">{product.name}</div>
              <div className="pdp-sticky-price">{money(product.price)}</div>
            </div>
          </div>

          <div className="pdp-sticky-actions">
            <button
              type="button"
              className="pdp-sticky-btn"
              onClick={handleAddToCart}
            >
              🛒 Add to Bag
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function ProductPageSkeleton() {
  return (
    <div
      className="pdp-page"
      style={{
        padding: "100px 20px",
        textAlign: "center",
        color: "#64748b",
      }}
    >
      <div style={{ fontSize: "2.4rem", marginBottom: "12px" }}>🧸</div>
      <p style={{ fontWeight: 600, fontSize: "1rem" }}>Loading product details...</p>
    </div>
  );
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<ProductPageSkeleton />}>
      <ProductDetailContent params={params} />
    </Suspense>
  );
}

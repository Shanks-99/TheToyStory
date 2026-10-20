"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getProductById, productsData } from "../data/products";
import "./checkout.css";

interface CheckoutItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const formatPrice = (amount: number) =>
  `Rs ${amount.toLocaleString("en-PK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

function CheckoutContent() {
  const searchParams = useSearchParams();

  // Load items
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [email, setEmail] = useState("");
  const [emailOffers, setEmailOffers] = useState(true);
  const [country, setCountry] = useState("Pakistan");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);

  // Payment & Billing
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card" | "bank">("cod");
  const [billingAddressType, setBillingAddressType] = useState<"same" | "different">("same");

  // Discount Code
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{
    code: string;
    amount: number;
  } | null>(null);
  const [discountError, setDiscountError] = useState("");

  // Order Placement
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // Mobile Summary Toggle
  const [showMobileSummary, setShowMobileSummary] = useState(false);

  useEffect(() => {
    const pId = searchParams.get("productId");
    const qty = parseInt(searchParams.get("qty") || "1", 10);

    if (pId) {
      const p = getProductById(pId);
      if (p) {
        setItems([
          {
            id: p.id,
            name: p.name,
            price: p.price,
            quantity: Math.max(1, qty),
            image: p.images && p.images[0] ? p.images[0] : "/Cars.jpeg",
          },
        ]);
        setLoading(false);
        return;
      }
    }

    // Try localStorage
    try {
      const stored = localStorage.getItem("tts_checkout_cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }

    // Default to the Freight Truck featured in user reference
    const defaultProduct = productsData[0];
    setItems([
      {
        id: defaultProduct.id,
        name: defaultProduct.name,
        price: defaultProduct.price,
        quantity: 1,
        image: defaultProduct.images[0] || "/images/truck/truck-1.jpg",
      },
    ]);
    setLoading(false);
  }, [searchParams]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 295.0;
  const discountAmount = appliedDiscount ? appliedDiscount.amount : 0;
  const total = Math.max(0, subtotal + shipping - discountAmount);

  const handleApplyDiscount = () => {
    setDiscountError("");
    const cleanCode = discountCode.trim().toUpperCase();
    if (!cleanCode) return;

    if (cleanCode === "TOY10" || cleanCode === "SAVE10") {
      const discount = subtotal * 0.1;
      setAppliedDiscount({ code: cleanCode, amount: discount });
      setDiscountCode("");
    } else if (cleanCode === "WELCOME" || cleanCode === "GIFT") {
      setAppliedDiscount({ code: cleanCode, amount: 300 });
      setDiscountCode("");
    } else {
      setDiscountError("Enter a valid discount code (e.g. TOY10)");
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName || !address || !city || !phone) {
      alert("Please fill in all required delivery details (Email, Name, Address, City, Phone).");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const genNum = "TTS-" + Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(genNum);
      setIsSubmitting(false);
      setOrderComplete(true);
      try {
        localStorage.removeItem("tts_checkout_cart");
      } catch (err) {
        console.error(err);
      }
    }, 1200);
  };

  if (loading) {
    return (
      <div className="checkout-page" style={{ padding: "60px 20px", textAlign: "center" }}>
        <p>Loading your checkout...</p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      {/* ── Mobile Summary Accordion Banner ── */}
      <div
        className="checkout-mobile-summary"
        onClick={() => setShowMobileSummary(!showMobileSummary)}
      >
        <div className="checkout-mobile-summary-toggle">
          <span>🛍️</span>
          <span>{showMobileSummary ? "Hide order summary" : "Show order summary"}</span>
          <span style={{ fontSize: "11px" }}>{showMobileSummary ? "▲" : "▼"}</span>
        </div>
        <div className="checkout-mobile-total">{formatPrice(total)}</div>
      </div>

      <div className="checkout-layout">
        {/* ── Left Column: Checkout Form ── */}
        <main className="checkout-main">
          {/* Brand Logo Header */}
          <Link href="/" className="checkout-brand">
            <img src="/logo.png" alt="The Toy Story" />
            <span>THE TOY STORY</span>
          </Link>

          <form onSubmit={handleCompleteOrder}>
            {/* Contact Section */}
            <section className="checkout-section">
              <div className="checkout-section-header">
                <h2 className="checkout-section-title">Contact</h2>
                <a href="#signin" className="checkout-signin-link" onClick={(e) => { e.preventDefault(); alert("Sign in modal - guest checkout is active!"); }}>
                  Sign in
                </a>
              </div>

              <div className="checkout-field">
                <div className="checkout-input-wrap">
                  <input
                    type="email"
                    className="checkout-input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <span className="checkout-field-icon" title="We'll send your receipt and tracking info here">
                    ?
                  </span>
                </div>
              </div>

              <label className="checkout-checkbox-label">
                <input
                  type="checkbox"
                  className="checkout-checkbox"
                  checked={emailOffers}
                  onChange={(e) => setEmailOffers(e.target.checked)}
                />
                <span>Email me with news and offers</span>
              </label>
            </section>

            {/* Delivery Section */}
            <section className="checkout-section">
              <h2 className="checkout-section-title" style={{ marginBottom: "14px" }}>
                Delivery
              </h2>

              {/* Country Select */}
              <div className="checkout-field">
                <select
                  className="checkout-select"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="Pakistan">Pakistan</option>
                </select>
              </div>

              {/* First & Last Name */}
              <div className="checkout-field-row">
                <div className="checkout-field">
                  <input
                    type="text"
                    className="checkout-input"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="checkout-field">
                  <input
                    type="text"
                    className="checkout-input"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              {/* Street Address */}
              <div className="checkout-field">
                <input
                  type="text"
                  className="checkout-input"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              {/* City & Postal Code */}
              <div className="checkout-field-row">
                <div className="checkout-field">
                  <input
                    type="text"
                    className="checkout-input"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className="checkout-field">
                  <input
                    type="text"
                    className="checkout-input"
                    placeholder="Postal code (optional)"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="checkout-field">
                <div className="checkout-input-wrap">
                  <input
                    type="tel"
                    className="checkout-input"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <span className="checkout-field-icon" title="Required for courier delivery updates">
                    ?
                  </span>
                </div>
              </div>

              <label className="checkout-checkbox-label">
                <input
                  type="checkbox"
                  className="checkout-checkbox"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                />
                <span>Save this information for next time</span>
              </label>
            </section>

            {/* Shipping Method Section */}
            <section className="checkout-section">
              <h2 className="checkout-section-title" style={{ marginBottom: "14px" }}>
                Shipping method
              </h2>
              <div className="checkout-shipping-box">
                <span>Flat Rate</span>
                <span>Rs 295.00</span>
              </div>
            </section>

            {/* Payment Section */}
            <section className="checkout-section">
              <h2 className="checkout-section-title">Payment</h2>
              <p className="checkout-section-subtext">
                All transactions are secure and encrypted.
              </p>

              <div className="checkout-radio-group">
                {/* 1. Cash on Delivery */}
                <div
                  className={`checkout-radio-item ${
                    paymentMethod === "cod" ? "is-selected" : ""
                  }`}
                >
                  <label className="checkout-radio-header">
                    <div className="checkout-radio-left">
                      <input
                        type="radio"
                        name="payment"
                        className="checkout-radio"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                      />
                      <span>Cash on Delivery (COD)</span>
                    </div>
                  </label>

                  {paymentMethod === "cod" && (
                    <div className="checkout-payment-details">
                      <p style={{ margin: 0 }}>
                        Pay in Cash at the time of delivery.
                        <br />
                        For COD shipments for new customers, if your order total is more than Rs. 10,000 then 10% advance required!
                      </p>
                      <div className="checkout-payment-details-urdu">
                        ڈلیوری کے وقت کیش میں ادائیگی کریں۔
                        <br />
                        اگر آپ کے آرڈر کی کل رقم 10,000 روپے سے زیادہ ہے، تو 10% ایڈوانس درکار ہوگا۔
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Debit / Credit Card */}
                <div
                  className={`checkout-radio-item ${
                    paymentMethod === "card" ? "is-selected" : ""
                  }`}
                >
                  <label className="checkout-radio-header">
                    <div className="checkout-radio-left">
                      <input
                        type="radio"
                        name="payment"
                        className="checkout-radio"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                      />
                      <span>Debit - Credit Card</span>
                    </div>
                    <div className="checkout-payment-logos">
                      <span className="checkout-logo-pill checkout-logo-visa">VISA</span>
                      <span className="checkout-logo-pill checkout-logo-mastercard">MC</span>
                      <span className="checkout-logo-pill checkout-logo-unionpay">UnionPay</span>
                    </div>
                  </label>

                  {paymentMethod === "card" && (
                    <div className="checkout-payment-details">
                      <p style={{ margin: 0 }}>
                        After clicking &quot;Complete order&quot;, you will be redirected to our secure payment gateway to finalize your transaction.
                      </p>
                    </div>
                  )}
                </div>

                {/* 3. Bank Deposit */}
                <div
                  className={`checkout-radio-item ${
                    paymentMethod === "bank" ? "is-selected" : ""
                  }`}
                >
                  <label className="checkout-radio-header">
                    <div className="checkout-radio-left">
                      <input
                        type="radio"
                        name="payment"
                        className="checkout-radio"
                        checked={paymentMethod === "bank"}
                        onChange={() => setPaymentMethod("bank")}
                      />
                      <span>Bank Deposit</span>
                    </div>
                  </label>

                  {paymentMethod === "bank" && (
                    <div className="checkout-payment-details">
                      <p style={{ margin: 0 }}>
                        Please transfer the total amount to our HBL account and share the receipt on WhatsApp for same-day priority dispatch.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Billing Address Section */}
            <section className="checkout-section">
              <h2 className="checkout-section-title" style={{ marginBottom: "14px" }}>
                Billing address
              </h2>

              <div className="checkout-radio-group">
                <div
                  className={`checkout-radio-item ${
                    billingAddressType === "same" ? "is-selected" : ""
                  }`}
                >
                  <label className="checkout-radio-header">
                    <div className="checkout-radio-left">
                      <input
                        type="radio"
                        name="billing"
                        className="checkout-radio"
                        checked={billingAddressType === "same"}
                        onChange={() => setBillingAddressType("same")}
                      />
                      <span>Same as shipping address</span>
                    </div>
                  </label>
                </div>

                <div
                  className={`checkout-radio-item ${
                    billingAddressType === "different" ? "is-selected" : ""
                  }`}
                >
                  <label className="checkout-radio-header">
                    <div className="checkout-radio-left">
                      <input
                        type="radio"
                        name="billing"
                        className="checkout-radio"
                        checked={billingAddressType === "different"}
                        onChange={() => setBillingAddressType("different")}
                      />
                      <span>Use a different billing address</span>
                    </div>
                  </label>
                </div>
              </div>
            </section>

            {/* Complete Order Button */}
            <button
              type="submit"
              className="checkout-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing order..." : "Complete order"}
            </button>

            {/* Footer Policy Link */}
            <a href="#policies" className="checkout-footer-link" onClick={(e) => { e.preventDefault(); alert("The Toy Story guarantees authentic, sealed toys with safe 7-day replacement and customer protection."); }}>
              Terms and policies
            </a>
          </form>
        </main>

        {/* ── Right Column: Order Summary ── */}
        <aside
          className="checkout-sidebar"
          style={{ display: showMobileSummary ? "block" : undefined }}
        >
          {/* Header with TZ/Toy icon and Bag */}
          <div className="checkout-sidebar-header">
            <span className="checkout-sidebar-brand">TheToyStory</span>
            <span className="checkout-sidebar-bag">🛍️</span>
          </div>

          {/* Cart Item(s) */}
          <div className="checkout-item-list">
            {items.map((item) => (
              <div className="checkout-item" key={item.id}>
                <div className="checkout-item-left">
                  <div className="checkout-item-thumb-wrap">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="checkout-item-thumb"
                    />
                    <span className="checkout-item-badge">{item.quantity}</span>
                  </div>
                  <div className="checkout-item-info">
                    <h4>{item.name}</h4>
                  </div>
                </div>
                <div className="checkout-item-price">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Discount Code Input */}
          <div className="checkout-discount-box">
            <input
              type="text"
              className="checkout-discount-input"
              placeholder="Discount code or gift card"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleApplyDiscount())}
            />
            <button
              type="button"
              className={`checkout-discount-btn ${
                discountCode.trim() ? "is-active" : ""
              }`}
              onClick={handleApplyDiscount}
            >
              Apply
            </button>
          </div>

          {discountError && (
            <p style={{ color: "#ef4444", fontSize: "12px", margin: "-16px 0 16px" }}>
              {discountError}
            </p>
          )}

          {appliedDiscount && (
            <div className="checkout-discount-applied">
              <span>Code <strong>{appliedDiscount.code}</strong> applied (-{formatPrice(appliedDiscount.amount)})</span>
              <button
                type="button"
                onClick={() => setAppliedDiscount(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#15803d", fontWeight: "bold" }}
              >
                ✕
              </button>
            </div>
          )}

          {/* Price Breakdown */}
          <div className="checkout-summary-lines">
            <div className="checkout-summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>

            {appliedDiscount && (
              <div className="checkout-summary-row" style={{ color: "#15803d" }}>
                <span>Discount</span>
                <strong>-{formatPrice(appliedDiscount.amount)}</strong>
              </div>
            )}

            <div className="checkout-summary-row">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                Shipping <span style={{ fontSize: "11px", color: "#9ca3af" }}>?</span>
              </span>
              <strong>{formatPrice(shipping)}</strong>
            </div>
          </div>

          {/* Total */}
          <div className="checkout-total-row">
            <div className="checkout-total-left">
              <span>Total</span>
              <span className="checkout-total-currency">PKR</span>
            </div>
            <div className="checkout-total-amount">
              {formatPrice(total)}
            </div>
          </div>
        </aside>
      </div>

      {/* ── Order Complete Modal ── */}
      {orderComplete && (
        <div className="checkout-success-overlay">
          <div className="checkout-success-card">
            <div className="checkout-success-icon">✓</div>
            <h3 className="checkout-success-title">Order Confirmed!</h3>
            <span className="checkout-success-order-num">Order {orderNumber}</span>
            <p className="checkout-success-desc">
              Thank you, <strong>{firstName}</strong>! Your toy order has been successfully placed. We have sent a confirmation email to <strong>{email}</strong>. Our dispatch team will deliver your parcel to <strong>{city}</strong> via Cash on Delivery.
            </p>
            <Link href="/" className="checkout-success-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{ padding: "60px", textAlign: "center" }}>Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

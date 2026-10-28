"use client";

import { useState } from "react";
import Link from "next/link";
import "./category-page.css";

/* ── Types ── */

export type CatProduct = {
  id: number | string;
  name: string;
  emoji: string;
  color: string;
  subcategory: string;
  ages: string;
  price: number;
  originalPrice: number;
  description: string;
  rating: number;
  reviews: number;
  imageUrl?: string;
};

export type CatTheme = {
  /** CSS primary accent */
  primary: string;
  /** Page background tint */
  bg: string;
  /** Hero gradient overlay end color */
  heroGrad: string;
  /** Badge background */
  badgeBg: string;
  /** Badge border */
  badgeBorder: string;
  /** Card border */
  cardBorder: string;
  /** Product count bubble bg */
  countBg: string;
};

export type CategoryPageProps = {
  /** Page <title> */
  pageTitle: string;
  /** Display title — can include a <span> for accent color */
  title: React.ReactNode;
  /** Description paragraph (supports bold via <strong>) */
  description: React.ReactNode;
  /** Hero banner image path */
  heroImage: string;
  /** Breadcrumb label */
  breadcrumb: string;
  /** Stats badges */
  stats: { icon: string; label: string }[];
  /** Product array */
  products: CatProduct[];
  /** Color theme tokens */
  theme: CatTheme;
};

/* ── Helpers ── */

const money = (amount: number) =>
  `Rs. ${amount.toLocaleString("en-PK")}`;

const discount = (original: number, sale: number) =>
  `${Math.round(((original - sale) / original) * 100)}% OFF`;

function renderStars(rating: number) {
  return (
    <span className="cat-card__stars-row" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const fillPercent = Math.max(0, Math.min(1, rating - star + 1));
        const gradId = `star-grad-${star}-${String(rating).replace(".", "_")}`;
        return (
          <svg
            key={star}
            className="cat-card__star-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={gradId}>
                <stop offset={`${fillPercent * 100}%`} stopColor="#f59e0b" />
                <stop offset={`${fillPercent * 100}%`} stopColor="#e2e8f0" />
              </linearGradient>
            </defs>
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              fill={fillPercent >= 0.99 ? "#f59e0b" : fillPercent <= 0.01 ? "#e2e8f0" : `url(#${gradId})`}
              stroke="#d97706"
              strokeWidth="0.5"
            />
          </svg>
        );
      })}
    </span>
  );
}

function formatAgeRange(ages: string | string[]): string {
  if (!ages) return "All Ages";
  const str = Array.isArray(ages) ? ages.join(", ") : String(ages);
  const numbers = str.match(/\d+/g)?.map(Number);
  if (numbers && numbers.length > 0) {
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    if (min === max) return `Age ${min}+`;
    return `Ages ${min}–${max}`;
  }
  return `Ages ${str}`;
}

function cleanShortDescription(name: string, desc: string): string {
  if (!desc) return "";
  let clean = desc.trim();
  if (clean.toLowerCase().startsWith(name.toLowerCase())) {
    clean = clean.slice(name.length).replace(/^[\s.:,-]+/, "");
  }
  return clean;
}

/* ── Component ── */

export default function CategoryPageLayout({
  title,
  description,
  heroImage,
  breadcrumb,
  stats,
  products,
  theme,
}: CategoryPageProps) {
  const [favorites, setFavorites] = useState<(number | string)[]>([]);
  const [cart, setCart] = useState<Record<number | string, number>>({});
  const [addedIds, setAddedIds] = useState<Record<number | string, boolean>>({});

  function toggleFav(id: number | string) {
    setFavorites((c) =>
      c.includes(id) ? c.filter((i) => i !== id) : [...c, id]
    );
  }

  function addToCart(id: number | string) {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  }

  function handleAddToCart(id: number | string) {
    addToCart(id);
    setAddedIds((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [id]: false }));
    }, 1400);
  }

  const style = {
    "--cat-primary": theme.primary,
    "--cat-bg": theme.bg,
    "--cat-hero-grad-end": theme.heroGrad,
    "--cat-badge-bg": theme.badgeBg,
    "--cat-badge-border": theme.badgeBorder,
    "--cat-card-border": theme.cardBorder,
    "--cat-count-bg": theme.countBg,
  } as React.CSSProperties;

  return (
    <main className="cat-page" style={style}>
      {/* ── Navigation ── */}
      <nav className="cat-nav">
        <Link href="/" className="cat-nav__brand">
          <img src="/logo.png" alt="The Toy Story" />
          <span>THE TOY STORY</span>
        </Link>

        <div className="cat-nav__links">
          <Link href="/">Home</Link>
          <Link href="/babies">Babies</Link>
          <Link href="/boys">Boys</Link>
          <Link href="/girls">Girls</Link>
        </div>

        <Link href="/" className="cat-nav__back">
          ← Back to Store
        </Link>
      </nav>

      {/* ── Hero banner ── */}
      <section className="cat-hero">
        {heroImage.toLowerCase().endsWith(".mp4") ? (
          <video
            className="cat-hero__img"
            src={heroImage}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            className="cat-hero__img"
            src={heroImage}
            alt={breadcrumb}
            width={1440}
            height={440}
          />
        )}
        <div className="cat-hero__overlay" />
      </section>

      {/* ── Breadcrumb ── */}
      <div className="cat-breadcrumb">
        <Link href="/">Home</Link>
        <span className="cat-breadcrumb__sep">›</span>
        <span>All Products</span>
        <span className="cat-breadcrumb__sep">›</span>
        <span className="cat-breadcrumb__current">{breadcrumb}</span>
      </div>

      {/* ── Info ── */}
      <div className="cat-info">
        <h1 className="cat-info__title">{title}</h1>

        <div className="cat-info__badges">
          {stats.map((s) => (
            <span className="cat-badge" key={s.label}>
              <span className="cat-badge__icon">{s.icon}</span>
              {s.label}
            </span>
          ))}
        </div>

        <p className="cat-info__desc">{description}</p>
      </div>

      {/* ── Products ── */}
      <section className="cat-products">
        <div className="cat-products__header">
          <h2 className="cat-products__title">
            All {breadcrumb} 🎁
          </h2>
          <span className="cat-products__count">
            {products.length} Products
          </span>
        </div>

        {products.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "70px 20px",
              background: "#ffffff",
              borderRadius: "24px",
              border: "1.5px dashed var(--cat-badge-border, #e2e8f0)",
              maxWidth: "540px",
              margin: "20px auto 40px",
            }}
          >
            <div style={{ fontSize: "52px", marginBottom: "16px" }}>🎁</div>
            <h3 style={{ fontSize: "22px", fontWeight: 900, color: "var(--toy-ink, #0f172a)", marginBottom: "8px" }}>
              New Toys Coming Soon!
            </h3>
            <p style={{ fontSize: "14px", color: "var(--toy-muted, #64748b)", lineHeight: 1.6, marginBottom: "24px" }}>
              We are actively handpicking delightful new treasures for this collection. Explore our other collections or check back shortly!
            </p>
            <Link
              href="/#shop"
              style={{
                display: "inline-block",
                padding: "12px 28px",
                background: "var(--cat-primary, #2563eb)",
                color: "#ffffff",
                borderRadius: "999px",
                fontWeight: 800,
                fontSize: "14px",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
              }}
            >
              Explore All Toys
            </Link>
          </div>
        ) : (
          <div className="cat-grid">
            {products.map((p) => (
              <Link
                href={`/product/${p.id}`}
                key={p.id}
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                <article className="cat-card" style={{ cursor: "pointer" }}>
                  <div
                    className="cat-card__art"
                    style={{ "--card-color": p.color } as React.CSSProperties}
                  >
                    <span className="cat-card__badge">
                      {discount(p.originalPrice, p.price)}
                    </span>

                    <button
                      className={`cat-card__fav ${favorites.includes(p.id) ? "is-fav" : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFav(p.id);
                      }}
                      aria-label={
                        favorites.includes(p.id)
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                    >
                      {favorites.includes(p.id) ? "♥" : "♡"}
                    </button>

                    {p.imageUrl && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          objectPosition: "center",
                          display: "block",
                        }}
                      />
                    )}
                  </div>

                  <div className="cat-card__info">
                    <span className="cat-card__category">{p.subcategory}</span>
                    <h3 className="cat-card__name">{p.name}</h3>
                    <p className="cat-card__desc">
                      {cleanShortDescription(p.name, p.description)}
                    </p>

                    <div className="cat-card__rating">
                      {renderStars(p.rating)}
                      <strong className="cat-card__rating-val">{p.rating}</strong>
                      <span className="cat-card__reviews-count">
                        ({p.reviews} reviews)
                      </span>
                    </div>

                    <div className="cat-card__bottom">
                      <div className="cat-card__prices">
                        <div className="cat-card__price-row">
                          <strong className="cat-card__price">
                            {money(p.price)}
                          </strong>
                          {p.originalPrice > p.price && (
                            <span className="cat-card__original">
                              {money(p.originalPrice)}
                            </span>
                          )}
                        </div>
                        <span className="cat-card__age-badge">
                          {formatAgeRange(p.ages)}
                        </span>
                      </div>

                      <button
                        className={`cat-card__btn ${addedIds[p.id] ? "is-added" : ""}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(p.id);
                        }}
                        aria-label={`Add ${p.name} to bag`}
                      >
                        {addedIds[p.id] ? (
                          <>
                            <span className="cat-card__btn-icon">✓</span> Added!
                          </>
                        ) : (
                          <>
                            <span className="cat-card__btn-icon">+</span> Add
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── Footer ── */}
      <footer className="cat-footer">
        <p>
          © 2026 The Toy Story · Made for little imaginations ✦
          {" · "}
          <Link href="/">Back to Home</Link>
        </p>
      </footer>
    </main>
  );
}

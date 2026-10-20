"use client";

import { useState } from "react";
import Link from "next/link";
import "./category-page.css";

/* ── Types ── */

export type CatProduct = {
  id: number;
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

const stars = (rating: number) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(5 - full - half);
};

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
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<Record<number, number>>({});

  function toggleFav(id: number) {
    setFavorites((c) =>
      c.includes(id) ? c.filter((i) => i !== id) : [...c, id]
    );
  }

  function addToCart(id: number) {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
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

        <div className="cat-grid">
          {products.map((p) => (
            <article className="cat-card" key={p.id}>
              <div
                className="cat-card__art"
                style={{ "--card-color": p.color } as React.CSSProperties}
              >
                <span className="cat-card__badge">
                  {discount(p.originalPrice, p.price)}
                </span>

                <button
                  className={`cat-card__fav ${favorites.includes(p.id) ? "is-fav" : ""}`}
                  onClick={() => toggleFav(p.id)}
                  aria-label={
                    favorites.includes(p.id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  {favorites.includes(p.id) ? "♥" : "♡"}
                </button>

                <span className="cat-card__emoji" aria-hidden="true">
                  {p.emoji}
                </span>
                <span className="cat-card__sparkle">✦</span>
              </div>

              <div className="cat-card__info">
                <span className="cat-card__category">{p.subcategory}</span>
                <h3 className="cat-card__name">{p.name}</h3>
                <p className="cat-card__desc">{p.description}</p>

                <div className="cat-card__rating">
                  <span className="cat-card__stars">{stars(p.rating)}</span>
                  <span className="cat-card__rating-text">
                    {p.rating} ({p.reviews})
                  </span>
                </div>

                <div className="cat-card__bottom">
                  <div className="cat-card__prices">
                    <strong className="cat-card__price">
                      {money(p.price)}
                    </strong>
                    <span className="cat-card__original">
                      {money(p.originalPrice)}
                    </span>
                    <span className="cat-card__age">Ages {p.ages}</span>
                  </div>

                  <button
                    className="cat-card__btn"
                    onClick={() => addToCart(p.id)}
                    aria-label={`Add ${p.name} to bag`}
                  >
                    <span>+</span> Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="cat-sample-notice">
          Products and prices shown are samples for this website preview.
        </p>
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

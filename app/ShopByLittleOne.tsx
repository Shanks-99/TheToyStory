"use client";

import Link from "next/link";
import "./shop-by-little-one.css";

const cards = [
  {
    id: "babies",
    href: "/babies",
    title: "Babies",
    subtitle: "Toys for little explorers",
    emoji: "👶",
    image: "/images/babies.jpg",
    accent: "#3bb96a",      /* green */
    border: "#c8ecd5",
    bg: "#eef9f1",
  },
  {
    id: "boys",
    href: "/boys",
    title: "Boys",
    subtitle: "Toys for every adventure",
    emoji: "👦",
    image: "/images/boys.jpg",
    accent: "#2b8ad6",      /* blue */
    border: "#b8d8f8",
    bg: "#eaf4fd",
  },
  {
    id: "girls",
    href: "/girls",
    title: "Girls",
    subtitle: "Toys for bright and bold dreams",
    emoji: "👧",
    image: "/images/girls.jpg",
    accent: "#e8399e",      /* pink */
    border: "#f5c2dc",
    bg: "#fdf0f6",
  },
];

export default function ShopByLittleOne() {
  return (
    <section className="sblo" aria-label="Shop by Little One">
      {/* Floating decorations */}
      <span className="sblo__deco sblo__deco--rocket" aria-hidden="true">🚀</span>
      <span className="sblo__deco sblo__deco--star" aria-hidden="true">⭐</span>
      <span className="sblo__deco sblo__deco--bear" aria-hidden="true">🧸</span>

      {/* Section header */}
      <div className="sblo__header">
        <h2 className="sblo__title">
          Shop by <span className="sblo__title-highlight">Little One</span>
        </h2>
        <p className="sblo__subtitle">
          Find the perfect toys for every little star ⭐
        </p>
      </div>

      {/* Cards */}
      <div className="sblo__grid">
        {cards.map((card) => (
          <Link
            key={card.id}
            href={card.href}
            className="sblo__card"
            style={
              {
                "--card-accent": card.accent,
                "--card-border": card.border,
                "--card-bg": card.bg,
              } as React.CSSProperties
            }
            aria-label={`Shop toys for ${card.title}`}
          >
            {/* Image */}
            <div className="sblo__card-image-wrap">
              <img
                src={card.image}
                alt={`${card.title} – ${card.subtitle}`}
                className="sblo__card-image"
                loading="lazy"
                width={480}
                height={560}
              />
            </div>

            {/* Label */}
            <div className="sblo__card-label">
              <span className="sblo__card-emoji">{card.emoji}</span>
              <div className="sblo__card-text">
                <span className="sblo__card-title">{card.title}</span>
                <span className="sblo__card-subtitle">{card.subtitle}</span>
              </div>
              <span
                className="sblo__card-arrow"
                style={{ background: card.accent }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

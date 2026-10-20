"use client";

import { useRef, useState, useEffect } from "react";
import {
  ShoppingBag,
  Menu,
  X,
} from "lucide-react";
import "./hero-section.css";

type HeroSectionProps = {
  cartCount: number;
  onOpenCart: () => void;
};

export default function HeroSection({
  cartCount,
  onOpenCart,
}: HeroSectionProps) {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [phase, setPhase] = useState<"intro" | "playing" | "ended">("intro");

  /* After 3 seconds the intro text fades out and the video is revealed */
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("playing");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoEnd = () => {
    desktopVideoRef.current?.pause();
    mobileVideoRef.current?.pause();
    setPhase("ended");
  };

  return (
    <section className={`toy-hero toy-hero--${phase}`} id="home">
      {/* Desktop / Laptop Video (16:9 widescreen) */}
      <video
        ref={desktopVideoRef}
        className="toy-hero__video toy-hero__video--desktop"
        autoPlay
        muted
        playsInline
        loop={false}
        preload="auto"
        onEnded={handleVideoEnd}
        aria-label="The Toy Story intro"
      >
        <source src="/hero.mp4" type="video/mp4" />
        Your browser does not support background video.
      </video>

      {/* Mobile & Small Devices Video (9:16 vertical) */}
      <video
        ref={mobileVideoRef}
        className="toy-hero__video toy-hero__video--mobile"
        autoPlay
        muted
        playsInline
        loop={false}
        preload="auto"
        onEnded={handleVideoEnd}
        aria-label="The Toy Story intro mobile"
      >
        <source src="/Herovertical.mp4" type="video/mp4" />
        Your browser does not support background video.
      </video>

      {/* Dynamic overlay scrim */}
      <div className="toy-hero__scrim" />

      {/* Persistent top gradient for nav readability */}
      <div className="toy-hero__top-grad" aria-hidden="true" />

      {/* ── Navigation ── */}
      <header className="toy-hero__header">
        <a href="#home" className="toy-hero__brand" aria-label="The Toy Story home">
          <img
            src="/logo.png"
            alt="The Toy Story logo"
            className="toy-hero__brand-icon"
            width={34}
            height={34}
          />
          <span>THE TOY STORY</span>
        </a>

        <nav className="toy-hero__nav" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#shop">Our Toys</a>
          <a href="#story">Our Story</a>
        </nav>

        <button
          className="toy-hero__bag"
          type="button"
          onClick={onOpenCart}
          aria-label={`Open shopping bag, ${cartCount} items`}
        >
          <ShoppingBag size={16} />
          <span>My Bag ({cartCount})</span>
        </button>

        {/* Mobile hamburger */}
        <button
          className="toy-hero__menu-button"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {menuOpen && (
          <nav className="toy-hero__mobile-nav" aria-label="Mobile navigation">
            <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#categories" onClick={() => setMenuOpen(false)}>Categories</a>
            <a href="#shop" onClick={() => setMenuOpen(false)}>Our Toys</a>
            <a href="#story" onClick={() => setMenuOpen(false)}>Our Story</a>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onOpenCart();
              }}
            >
              <ShoppingBag size={16} /> My Bag ({cartCount})
            </button>
          </nav>
        )}
      </header>



      {/* ── Phase 3: Final centred title after video ends ── */}
      <div className="toy-hero__final">
        <h2 className="toy-hero__final-title">
          <span className="toy-hero__final-the">The</span>
          <span className="toy-hero__final-toy">Toy</span>
          <span className="toy-hero__final-story">Story</span>
        </h2>
        <p className="toy-hero__final-tagline">Little toys. Big adventures. Endless imagination.</p>
        <div className="toy-hero__final-actions">
          <a className="toy-hero__primary" href="#shop">
            Shop Now
          </a>
          <a className="toy-hero__secondary" href="#categories">
            Explore Categories
          </a>
        </div>
      </div>

      <div className="toy-hero__bottom-glow" aria-hidden="true" />
    </section>
  );
}
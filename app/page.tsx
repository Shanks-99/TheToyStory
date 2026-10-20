

"use client";
import HeroSection from "./HeroSection";
import ShopByLittleOne from "./ShopByLittleOne";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const categories = [
  {
    name: "Building & Construction Toys",
    image: "/Blocks.jpeg",
    accent: "#d99b16",
    border: "#f6e3ab",
    bg: "#fffbf0",
    color: "#fff4d4",
    tag: "Build & Create",
    note: "Blocks, building sets, magnetic tiles, construction kits, and engineering toys.",
  },
  {
    name: "Dolls & Stuffed Toys",
    image: "/Dolls.jpeg",
    accent: "#e8399e",
    border: "#f8cddd",
    bg: "#fff5f8",
    color: "#ffe8ee",
    tag: "Cuddle & Play",
    note: "Dolls, teddy bears, plush animals, action figures, and character toy",
  },
  {
    name: "Vehicles & Action Toys",
    image: "/Cars.jpeg",
    accent: "#2884dc",
    border: "#bedcfb",
    bg: "#f3f8fe",
    color: "#e8f2fe",
    tag: "Speed & Action",
    note: "Toy cars, trucks, trains, remote-control vehicles, and playsets.",
  },
  {
    name: "Educational & Creative Toys",
    image: "/Educational.jpeg",
    accent: "#2da866",
    border: "#c3ebd2",
    bg: "#f2faf5",
    color: "#e6f7ec",
    tag: "Think & Learn",
    note: "Puzzles, board games, STEM kits, art supplies, and learning toys.",
  },
];

const ageGroups = [
  { id: "0-2", label: "0–2 years", emoji: "🐣", note: "Little discoveries" },
  { id: "3-5", label: "3–5 years", emoji: "🎨", note: "Big imaginations" },
  { id: "6-8", label: "6–8 years", emoji: "🚀", note: "Ready for adventure" },
  { id: "9+", label: "9+ years", emoji: "🧠", note: "Bigger challenges" },
];

const products = [
  // Page 1
  { id: 1, name: "Remote Control Freight Pickup Truck with Container Light And Smoke", emoji: "🚚", color: "#e8f2fe", category: "Vehicles & Action Toys", ages: ["3-5", "6-8", "9+"], price: 4550, description: "High-speed freight truck with realistic LED lights, safe exhaust smoke, and opening container." },
  { id: 2, name: "Magnetic Castle Building Blocks", emoji: "🏰", color: "#fff4d4", category: "Building & Construction Toys", ages: ["3-5", "6-8", "9+"], price: 2499, description: "Build, create, and engineer magnificent architectural towers." },
  { id: 3, name: "Cuddly Teddy Bear & Doll Set", emoji: "🧸", color: "#ffe8ee", category: "Dolls & Stuffed Toys", ages: ["0-2", "3-5", "6-8"], price: 1499, description: "Ultra-soft plush companion and dress-up doll for sweet hugs." },
  { id: 4, name: "STEM Science & Creative Art Kit", emoji: "🔬", color: "#e6f7ec", category: "Educational & Creative Toys", ages: ["3-5", "6-8", "9+"], price: 1699, description: "Fun experiments, puzzles, and art supplies for curious minds." },
  { id: 5, name: "Hero Action Figure & Space Shuttle", emoji: "🚀", color: "#e8f2fe", category: "Vehicles & Action Toys", ages: ["3-5", "6-8", "9+"], price: 1799, description: "Galactic hero figure with sound effects and launch vehicle." },
  { id: 6, name: "Rainbow Stacking Rings & Gear Kit", emoji: "🌈", color: "#fff4d4", category: "Building & Construction Toys", ages: ["0-2", "3-5"], price: 899, description: "Colorful magnetic stacking gears for little engineers." },
  { id: 7, name: "Fluffy Unicorn & Bunny Plush", emoji: "🦄", color: "#ffe8ee", category: "Dolls & Stuffed Toys", ages: ["0-2", "3-5", "6-8"], price: 1199, description: "Sparkly fairytale plush friend made with cloud-soft cotton." },
  { id: 8, name: "Wooden Brain Teaser & Puzzle Board", emoji: "🧩", color: "#e6f7ec", category: "Educational & Creative Toys", ages: ["6-8", "9+"], price: 1299, description: "Engaging brain teasers and logic games for creative thinkers." },

  // Page 2
  { id: 9, name: "Monster Off-Road 4x4 Truck", emoji: "🚙", color: "#e8f2fe", category: "Vehicles & Action Toys", ages: ["3-5", "6-8", "9+"], price: 2199, description: "All-terrain monster suspension truck with giant rubber wheels." },
  { id: 10, name: "Architectural Marble Run Kit", emoji: "🎢", color: "#fff4d4", category: "Building & Construction Toys", ages: ["3-5", "6-8", "9+"], price: 2699, description: "Glow-in-the-dark twisting ramps, vortex loops, and marble maze." },
  { id: 11, name: "Princess Fashion Doll & Wardrobe", emoji: "👗", color: "#ffe8ee", category: "Dolls & Stuffed Toys", ages: ["3-5", "6-8"], price: 1899, description: "Royal dress-up doll with glittering tiaras and designer outfits." },
  { id: 12, name: "Solar System Electronic Planetarium", emoji: "🪐", color: "#e6f7ec", category: "Educational & Creative Toys", ages: ["6-8", "9+"], price: 2299, description: "Rotating motor planetarium projector with educational narration." },
  { id: 13, name: "Bullet Train Speed Track Set", emoji: "🚄", color: "#e8f2fe", category: "Vehicles & Action Toys", ages: ["3-5", "6-8", "9+"], price: 2799, description: "Electric locomotive with working headlight and sound effects." },
  { id: 14, name: "Wooden Tool Bench & Construction Set", emoji: "🔨", color: "#fff4d4", category: "Building & Construction Toys", ages: ["0-2", "3-5"], price: 1999, description: "Eco-friendly wood workshop with hammer, wrench, nuts, and bolts." },
  { id: 15, name: "Interactive Talking Dinosaur Toy", emoji: "🦖", color: "#ffe8ee", category: "Dolls & Stuffed Toys", ages: ["3-5", "6-8"], price: 1599, description: "Roaring T-Rex plush buddy that repeats phrases and plays songs." },
  { id: 16, name: "Kids Watercolor Art & Pottery Easel", emoji: "🎨", color: "#e6f7ec", category: "Educational & Creative Toys", ages: ["3-5", "6-8", "9+"], price: 1399, description: "Complete artist studio with non-toxic paints, brushes, and clay." },

  // Page 3
  { id: 17, name: "Aerobatic Flying Drone & Helicopter", emoji: "🚁", color: "#e8f2fe", category: "Vehicles & Action Toys", ages: ["6-8", "9+"], price: 2999, description: "Easy-to-fly gyro helicopter with 360-degree aerial stunt flips." },
  { id: 18, name: "Magnetic 3D Geometry Cube Set", emoji: "🧊", color: "#fff4d4", category: "Building & Construction Toys", ages: ["3-5", "6-8", "9+"], price: 1799, description: "Transformable magnetic shape-shifting puzzle blocks." },
  { id: 19, name: "Magical Fairy Wings & Dress-Up Doll", emoji: "🧚", color: "#ffe8ee", category: "Dolls & Stuffed Toys", ages: ["3-5", "6-8"], price: 1699, description: "Light-up sparkling fairy wings and poseable enchanted doll." },
  { id: 20, name: "Beginner Coding Robot Bug", emoji: "🤖", color: "#e6f7ec", category: "Educational & Creative Toys", ages: ["3-5", "6-8", "9+"], price: 2499, description: "Screen-free early robotics kit with directional coding cards." },
  { id: 21, name: "Die-Cast City Construction Fleet", emoji: "🚜", color: "#e8f2fe", category: "Vehicles & Action Toys", ages: ["0-2", "3-5", "6-8"], price: 1599, description: "Heavy-duty bulldozer, excavator, and dump truck set." },
  { id: 22, name: "Giant Soft Foam Building Blocks", emoji: "🧱", color: "#fff4d4", category: "Building & Construction Toys", ages: ["0-2", "3-5"], price: 2199, description: "Ultra-safe jumbo foam bricks for building towering castles safely." },
  { id: 23, name: "Soft Plush Animal Jungle Kingdom", emoji: "🦁", color: "#ffe8ee", category: "Dolls & Stuffed Toys", ages: ["0-2", "3-5"], price: 1399, description: "Set of 5 adorable wildlife safari buddies with embroidered eyes." },
  { id: 24, name: "World Map Geography Floor Puzzle", emoji: "🌍", color: "#e6f7ec", category: "Educational & Creative Toys", ages: ["6-8", "9+"], price: 1099, description: "100-piece jumbo floor puzzle featuring animals and world landmarks." },
];

type Product = (typeof products)[number];

const money = (amount: number) =>
  `Rs. ${amount.toLocaleString("en-PK")}`;

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [age, setAge] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Temporary selections inside the dropdown
  const [draftCategory, setDraftCategory] = useState("All");
  const [draftAge, setDraftAge] = useState("All");
  const [draftMinPrice, setDraftMinPrice] = useState("");
  const [draftMaxPrice, setDraftMaxPrice] = useState("");
  const [draftSortBy, setDraftSortBy] = useState("featured");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 8;

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    const matches = products.filter((product) => {
      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term);

      const matchesCategory =
        category === "All" || product.category === category;

      const matchesAge =
        age === "All" || product.ages.includes(age);

      const matchesMinPrice =
        minPrice === "" || product.price >= Number(minPrice);

      const matchesMaxPrice =
        maxPrice === "" || product.price <= Number(maxPrice);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesAge &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });

    return [...matches].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [search, category, age, sortBy, minPrice, maxPrice]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const start = (safeCurrentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, safeCurrentPage]);

  const cartProducts = products.filter((product) => cart[product.id] > 0);

  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const cartTotal = cartProducts.reduce(
    (total, product) => total + product.price * cart[product.id],
    0
  );

  function addToCart(id: number) {
    setCart((current) => ({
      ...current,
      [id]: (current[id] || 0) + 1,
    }));
  }

  function changeQuantity(id: number, amount: number) {
    setCart((current) => {
      const next = { ...current };
      const quantity = (next[id] || 0) + amount;

      if (quantity <= 0) {
        delete next[id];
      } else {
        next[id] = quantity;
      }

      return next;
    });
  }

  function toggleFavorite(id: number) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function chooseCategory(name: string) {
    setCategory(name);
    setAge("All");
    setCurrentPage(1);
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  }

  function chooseAge(id: string) {
    setAge(id);
    setCategory("All");
    setCurrentPage(1);
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  }

  const hasActiveFilters = Boolean(
    search.trim() ||
    category !== "All" ||
    age !== "All" ||
    minPrice !== "" ||
    maxPrice !== "" ||
    sortBy !== "featured"
  );

  function resetFilters() {
    setSearch("");
    setCategory("All");
    setAge("All");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("featured");
    setDraftCategory("All");
    setDraftAge("All");
    setDraftMinPrice("");
    setDraftMaxPrice("");
    setDraftSortBy("featured");
  }

  return (
    <main>
      <HeroSection
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      <section className="benefit-strip" aria-label="Our promises">
        <div><span>🎁</span><div><strong>Gift-worthy finds</strong><small>For every little occasion</small></div></div>
        <div><span>🌈</span><div><strong>Play with purpose</strong><small>Ideas for curious minds</small></div></div>
        <div><span>💛</span><div><strong>Made for happy moments</strong><small>Big smiles start here</small></div></div>
      </section>

      <ShopByLittleOne />

      <section className="content-section categories-section" id="categories">
        <div className="section-topline">
          <span className="section-sparkle">✳</span>
          <p className="eyebrow">FIND THEIR KIND OF FUN</p>
          <span className="section-sparkle">✳</span>
        </div>
        <h2>Play starts <span className="heading-highlight">right here.</span></h2>
        <p className="section-description">
          Big ideas come in little packages. Explore a world of toys
          made for their next favorite adventure.
        </p>

        <div className="category-grid">
          {categories.map((item) => (
            <button
              className="category-card"
              style={
                {
                  "--cat-accent": item.accent,
                  "--cat-border": item.border,
                  "--cat-bg": item.bg,
                } as React.CSSProperties
              }
              key={item.name}
              onClick={() => chooseCategory(item.name)}
              aria-label={`Explore ${item.name}`}
            >
              {/* Big Featured Picture */}
              <div className="category-card__image-wrap">
                <img
                  src={item.image}
                  alt={item.name}
                  className="category-card__image"
                  loading="lazy"
                />
                <span
                  className="category-card__tag"
                  style={{ background: item.accent }}
                >
                  {item.tag}
                </span>
              </div>

              {/* Card Content */}
              <div className="category-card__body">
                <span className="category-card-title">{item.name}</span>
                <span className="category-note">{item.note}</span>
                <div className="category-card__footer">
                  <span className="card-arrow">
                    Explore collection
                    <span
                      className="card-arrow__icon"
                      style={{ background: item.accent }}
                    >
                      ↗
                    </span>
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="content-section products-section" id="shop">
        <div className="section-topline">
          <span className="section-sparkle">✳</span>
          <p className="eyebrow">SMALL THINGS, BIG JOY</p>
          <span className="section-sparkle">✳</span>
        </div>
        <h2>Meet their <span className="heading-highlight">new bestie.</span></h2>
        <p className="section-description">
          A handpicked world of pretend play, clever creations,
          cozy cuddles, and wonderful surprises.
        </p>



        <div className="shop-tools">
          {/* Search stays on the left */}
          <label className="search-box">
            <span>⌕</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Find a little something..."
              aria-label="Search toys"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </label>

          {/* Filter dropdown */}
          <div className="filter-dropdown">
            <button
              type="button"
              className={`filter-toggle ${hasActiveFilters ? "has-active-filters" : ""}`}
              onClick={() => setFiltersOpen(!filtersOpen)}
              aria-expanded={filtersOpen}
            >
              <span>☷</span>
              Filters
              {hasActiveFilters && <span className="filter-active-dot" />}
              <span className="filter-arrow">
                {filtersOpen ? "▲" : "▼"}
              </span>
            </button>

            {filtersOpen && (
              <div className="filter-panel">
                <h3 className="filter-panel-heading">Filter your toys</h3>

                <div className="filter-panel-grid">
                  {/* Category */}
                  <label className="filter-field">
                    <span>Category</span>
                    <select
                      value={draftCategory}
                      onChange={(event) =>
                        setDraftCategory(event.target.value)
                      }
                    >
                      <option value="All">All toys</option>
                      {categories.map((item) => (
                        <option key={item.name} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* Age group */}
                  <label className="filter-field">
                    <span>Age Group</span>
                    <select
                      value={draftAge}
                      onChange={(event) => setDraftAge(event.target.value)}
                    >
                      <option value="All">All ages</option>
                      {ageGroups.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* Minimum price */}
                  <label className="filter-field">
                    <span>Minimum Price (Rs.)</span>
                    <input
                      type="number"
                      min="0"
                      placeholder="No minimum"
                      value={draftMinPrice}
                      onChange={(event) =>
                        setDraftMinPrice(event.target.value)
                      }
                    />
                  </label>

                  {/* Maximum price */}
                  <label className="filter-field">
                    <span>Maximum Price (Rs.)</span>
                    <input
                      type="number"
                      min="0"
                      placeholder="No maximum"
                      value={draftMaxPrice}
                      onChange={(event) =>
                        setDraftMaxPrice(event.target.value)
                      }
                    />
                  </label>

                  {/* Sorting */}
                  <label className="filter-field">
                    <span>Sort By</span>
                    <select
                      value={draftSortBy}
                      onChange={(event) =>
                        setDraftSortBy(event.target.value)
                      }
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name">Name: A to Z</option>
                    </select>
                  </label>
                </div>

                {/* Buttons inside dropdown */}
                <div className="filter-actions">
                  <button
                    type="button"
                    className="filter-clear-btn"
                    onClick={() => {
                      setDraftCategory("All");
                      setDraftAge("All");
                      setDraftMinPrice("");
                      setDraftMaxPrice("");
                      setDraftSortBy("featured");

                      setCategory("All");
                      setAge("All");
                      setMinPrice("");
                      setMaxPrice("");
                      setSortBy("featured");
                    }}
                  >
                    Clear All
                  </button>

                  <button
                    type="button"
                    className="filter-apply-btn"
                    onClick={() => {
                      setCategory(draftCategory);
                      setAge(draftAge);
                      setMinPrice(draftMinPrice);
                      setMaxPrice(draftMaxPrice);
                      setSortBy(draftSortBy);
                      setFiltersOpen(false);
                    }}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Clear Filter button in RED right next to the Filters button */}
          {hasActiveFilters && (
            <button
              type="button"
              className="clear-filters-btn-red"
              onClick={resetFilters}
              aria-label="Clear all active filters"
            >
              <span className="clear-filters-btn-red__icon">✕</span>
              <span>Clear Filters</span>
            </button>
          )}
        </div>



        {hasActiveFilters && (
          <div className="active-filters">
            <span>
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? "toy" : "toys"}
              {category !== "All" ? ` · ${category}` : ""}
              {age !== "All" ? ` · Age ${age}` : ""}
              {search.trim() ? ` · "${search}"` : ""}
              {totalPages > 1 ? ` · Page ${safeCurrentPage} of ${totalPages}` : ""}
            </span>
          </div>
        )}

        <div className="product-grid">
          {paginatedProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <Link
                href={`/product/${product.id}`}
                style={{ textDecoration: "none", display: "block" }}
              >
                <div className="product-art" style={{ backgroundColor: product.color }}>
                  <span className="product-label">LITTLE FAVORITE</span>
                  <button
                    type="button"
                    className={`favorite-button ${favorites.includes(product.id) ? "is-favorite" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    aria-label={favorites.includes(product.id) ? "Remove from favorites" : "Add to favorites"}
                    aria-pressed={favorites.includes(product.id)}
                  >
                    {favorites.includes(product.id) ? "♥" : "♡"}
                  </button>
                  <span className="product-emoji" aria-hidden="true">{product.emoji}</span>
                  <span className="product-art-sparkle">✦</span>
                </div>
              </Link>

              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <Link
                  href={`/product/${product.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h3>{product.name}</h3>
                </Link>
                <p>{product.description}</p>
                <div className="product-bottom">
                  <div>
                    <strong className="product-price">{money(product.price)}</strong>
                    <span className="product-age">Ages {product.ages.join(", ")}</span>
                  </div>
                  <button
                    className="product-button"
                    onClick={() => addToCart(product.id)}
                    aria-label={`Add ${product.name} to bag`}
                  >
                    <span>+</span> Add
                  </button>
                </div>
              </div>
            </article>
          ))}

          {filteredProducts.length === 0 && (
            <div className="empty-search">
              <span>🔎</span>
              <h3>No little treasures found!</h3>
              <p>Try a different search or clear your filters to explore all our toys.</p>
              <button className="reset-button" onClick={resetFilters}>Show all toys</button>
            </div>
          )}
        </div>

        {/* Pagination at the bottom of the products */}
        {totalPages > 1 && (
          <nav className="toy-pagination" aria-label="Product pages">
            <button
              type="button"
              className="toy-pagination__btn toy-pagination__arrow"
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
              }}
              disabled={safeCurrentPage === 1}
              aria-label="Previous page"
            >
              ← Prev
            </button>

            <div className="toy-pagination__pages">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  className={`toy-pagination__btn toy-pagination__num ${
                    safeCurrentPage === page ? "is-active" : ""
                  }`}
                  onClick={() => {
                    setCurrentPage(page);
                    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  aria-label={`Go to page ${page}`}
                  aria-current={safeCurrentPage === page ? "page" : undefined}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="toy-pagination__btn toy-pagination__arrow"
              onClick={() => {
                setCurrentPage((p) => Math.min(totalPages, p + 1));
                document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
              }}
              disabled={safeCurrentPage === totalPages}
              aria-label="Next page"
            >
              Next →
            </button>
          </nav>
        )}

        <p className="sample-notice">
          Our displayed products and prices are sample content for this website preview.
        </p>
      </section>

      <section className="story-section" id="about">
        <div className="story-decoration story-decoration-one">✦</div>
        <div className="story-decoration story-decoration-two">✿</div>
        <div className="story-illustration" aria-hidden="true">
          <span className="story-cloud">☁️</span>
          <span className="story-toy">🧸</span>
          <span className="story-block">🧱</span>
          <span className="story-star">⭐</span>
        </div>
        <div className="story-content">
          <p className="eyebrow">MORE THAN JUST TOYS</p>
          <h2>Little toys. <br /> <span>Big childhood memories.</span></h2>
          <p>
            We believe the best toys do more than entertain. They spark
            curiosity, inspire imagination, and turn ordinary afternoons
            into extraordinary adventures.
          </p>
          <a href="#shop" className="story-button">Find a little magic <span>→</span></a>
        </div>
      </section>

      <section className="newsletter-section">
        <div className="newsletter-icon">💌</div>
        <p className="eyebrow">A LITTLE JOY IN YOUR INBOX</p>
        <h2>Stay in the <span className="heading-highlight">play loop.</span></h2>
        <p>New toy ideas, gift inspiration, and a little extra happy.</p>
        <a className="newsletter-button" href="#shop">Explore the toy collection →</a>
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-icon">✦</span>
          <span>The Toy Story</span>
        </a>
        <p className="footer-tagline">Making room for more wonder, one toy at a time.</p>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#shop">Our Toys</a>
          <a href="#about">Our Story</a>
        </div>

        <div className="footer-bottom">
          <span>© 2026 The Toy Story</span>
          <span>Made for little imaginations ✦</span>
        </div>
      </footer>

      {cartOpen && (
        <div
          className="cart-backdrop"
          onClick={() => setCartOpen(false)}
          role="presentation"
        >
          <aside
            className="cart-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cart-header">
              <div>
                <p className="eyebrow">YOUR LITTLE FINDS</p>
                <h2 id="cart-title">My Bag <span>({cartCount})</span></h2>
              </div>
              <button className="cart-close" onClick={() => setCartOpen(false)} aria-label="Close cart">×</button>
            </div>

            {cartProducts.length === 0 ? (
              <div className="cart-empty">
                <span>🧸</span>
                <h3>Your bag is taking a nap.</h3>
                <p>Add a little something to bring it to life!</p>
                <button className="cart-continue" onClick={() => setCartOpen(false)}>
                  Explore toys
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cartProducts.map((product: Product) => (
                    <div className="cart-item" key={product.id}>
                      <div className="cart-item-art" style={{ backgroundColor: product.color }}>
                        {product.emoji}
                      </div>
                      <div className="cart-item-info">
                        <h3>{product.name}</h3>
                        <p>{money(product.price)}</p>
                        <div className="quantity-controls">
                          <button onClick={() => changeQuantity(product.id, -1)} aria-label={`Remove one ${product.name}`}>−</button>
                          <span>{cart[product.id]}</span>
                          <button onClick={() => changeQuantity(product.id, 1)} aria-label={`Add one ${product.name}`}>+</button>
                        </div>
                      </div>
                      <strong className="cart-line-total">
                        {money(product.price * cart[product.id])}
                      </strong>
                    </div>
                  ))}
                </div>

                <div className="cart-total">
                  <div><span>Subtotal</span><strong>{money(cartTotal)}</strong></div>
                  <p>Delivery and final charges can be added at checkout.</p>
                  <button
                    onClick={() => {
                      try {
                        const checkoutItems = cartProducts.map((p: Product) => ({
                          id: p.id,
                          name: p.name,
                          price: p.price,
                          quantity: cart[p.id],
                          image:
                            p.id === 1
                              ? "/images/truck/truck-1.jpg"
                              : p.category === "Building & Construction Toys"
                              ? "/Blocks.jpeg"
                              : p.category === "Dolls & Stuffed Toys"
                              ? "/Dolls.jpeg"
                              : p.category === "Educational & Creative Toys"
                              ? "/Educational.jpeg"
                              : "/Cars.jpeg",
                        }));
                        localStorage.setItem(
                          "tts_checkout_cart",
                          JSON.stringify(checkoutItems)
                        );
                      } catch (e) {
                        console.error(e);
                      }
                      router.push("/checkout");
                    }}
                  >
                    Continue to checkout →
                  </button>
                </div>
              </>
            )}
            <p className="cart-demo-note">Demo cart · Orders are not submitted or saved yet.</p>
          </aside>
        </div>
      )}
    </main>
  );
}

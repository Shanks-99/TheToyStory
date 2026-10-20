export type ProductItem = {
  id: number;
  name: string;
  emoji: string;
  color: string;
  category: string;
  ages: string[];
  price: number;
  originalPrice: number;
  description: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  inStock: number;
  features: string[];
  specs: Record<string, string>;
  bundle?: {
    title: string;
    items: {
      id: string;
      name: string;
      price: number;
      originalPrice: number;
      image: string;
      checked: boolean;
    }[];
  };
};

export const productsData: ProductItem[] = [
  // Product 1: The Freight Truck (Featured from User's Reference)
  {
    id: 1,
    name: "Remote Control Freight Pickup Truck with Container Light And Smoke",
    emoji: "🚚",
    color: "#e8f2fe",
    category: "Vehicles & Action Toys",
    ages: ["3-5", "6-8", "9+"],
    price: 4550,
    originalPrice: 6595,
    description:
      "Turn playtime into an authentic transport delivery adventure with this high-performance remote control freight truck. Featuring a striking teal-green cab paired with a heavy-duty industrial grey container, realistic working LED headlights, and a safe push-button water-vapor exhaust smoke effect that brings miniature hauling to life.",
    images: [
      "/images/truck/truck-1.jpg",
      "/images/truck/truck-2.jpg",
      "/images/truck/truck-3.jpg",
      "/Cars.jpeg",
    ],
    rating: 4.9,
    reviewsCount: 180,
    inStock: 5,
    features: [
      "Full-function 2.4GHz remote control with interference-free multi-vehicle racing.",
      "Realistic front LED headlights that light up automatically when driving forward.",
      "Cool push-button water-vapor exhaust smoke simulator (100% child-safe, uses ordinary water).",
      "Detachable corrugated cargo container with fully functional opening rear doors.",
      "Durable textured rubber tires engineered for grip on tiles, wood floors, and paved surfaces.",
      "Includes rechargeable battery pack with convenient USB charging cable.",
    ],
    specs: {
      "Product Type": "Remote Control Transport Truck",
      "Scale": "1:16 Realistic Miniature Scale",
      "Colorway": "Teal Green Cab with Industrial Grey Container",
      "Remote Frequency": "2.4 GHz Multi-Channel",
      "Remote Range": "Up to 35 meters",
      "Truck Battery": "3.7V Rechargeable Li-Ion (Included)",
      "Charging Time": "Approx. 60–80 minutes",
      "Run Time": "25–35 minutes continuous play",
      "Controller Battery": "2 x 1.5V AA (Not included)",
      "Recommended Age": "6 years and above",
      "Material": "Eco-friendly, Non-toxic ABS Child-Safe Plastic",
    },
    bundle: {
      title: "Limited Time Adventure Bundle",
      items: [
        {
          id: "parachute",
          name: "Throwing Army Parachute 1 Pcs",
          price: 711,
          originalPrice: 1245,
          image: "/images/bundle/parachute.jpg",
          checked: true,
        },
        {
          id: "missiles",
          name: "Flying Sky Missiles With Light And Whistling Sound",
          price: 1183.5,
          originalPrice: 1995,
          image: "/images/bundle/missile.jpg",
          checked: true,
        },
      ],
    },
  },

  // Product 2: Magnetic Castle Building Blocks
  {
    id: 2,
    name: "Magnetic Castle Building Blocks",
    emoji: "🏰",
    color: "#fff4d4",
    category: "Building & Construction Toys",
    ages: ["3-5", "6-8", "9+"],
    price: 2499,
    originalPrice: 3499,
    description:
      "Unleash architectural imagination with vibrant 3D magnetic tiles. Children can build towering fortresses, futuristic pyramids, and colorful geometric sculptures while developing spatial reasoning and fine motor skills.",
    images: ["/Blocks.jpeg", "/images/truck/truck-1.jpg"],
    rating: 4.9,
    reviewsCount: 94,
    inStock: 12,
    features: [
      "Reinforced ultrasonic welding prevents magnets from ever popping loose.",
      "Diamond-facet crystal patterns refract light into dazzling room reflections.",
      "Compatible with all major brand magnetic tile sets.",
      "Includes step-by-step idea booklet with 50+ build challenges.",
    ],
    specs: {
      "Piece Count": "100 Translucent Magnetic Pieces",
      "Material": "Food-grade BPA-Free ABS Plastic",
      "Age Guidance": "3 years and up",
      "Safety": "CE & ASTM Certified",
    },
  },

  // Product 3: Cuddly Teddy Bear & Doll Set
  {
    id: 3,
    name: "Cuddly Teddy Bear & Doll Set",
    emoji: "🧸",
    color: "#ffe8ee",
    category: "Dolls & Stuffed Toys",
    ages: ["0-2", "3-5", "6-8"],
    price: 1499,
    originalPrice: 2199,
    description:
      "Ultra-soft plush companion and dress-up doll duo made with velvet-touch hypoallergenic cotton. Designed for bedtime cuddles, pretend tea parties, and warm nursery comfort.",
    images: ["/Dolls.jpeg", "/images/truck/truck-1.jpg"],
    rating: 4.8,
    reviewsCount: 112,
    inStock: 8,
    features: [
      "Cloud-soft plush exterior safe for sensitive toddler skin.",
      "Embroidered facial features with zero choking hazards.",
      "Machine washable on gentle cycle.",
      "Includes miniature removable outfits and accessories.",
    ],
    specs: {
      "Height": "32 cm cuddly size",
      "Fill Material": "100% Recycled Poly-fiber",
      "Safety": "Oeko-Tex Standard 100 Certified",
      "Age Guidance": "Birth and upwards (0+)",
    },
  },

  // Product 4: STEM Science & Creative Art Kit
  {
    id: 4,
    name: "STEM Science & Creative Art Kit",
    emoji: "🔬",
    color: "#e6f7ec",
    category: "Educational & Creative Toys",
    ages: ["3-5", "6-8", "9+"],
    price: 1699,
    originalPrice: 2499,
    description:
      "Inspire budding scientists with 45+ hands-on experiments including volcano eruptions, crystal growing, color chemistry, and tactile slime engineering.",
    images: ["/Educational.jpeg", "/Blocks.jpeg"],
    rating: 4.9,
    reviewsCount: 78,
    inStock: 15,
    features: [
      "45 fun experiments using safe child-friendly ingredients.",
      "Includes lab coat, safety goggles, test tubes, and beaker.",
      "Full-color visual instruction guide with scientific explanations.",
    ],
    specs: {
      "Experiments": "45 Guided Activities",
      "Age Guidance": "5 to 12 years",
      "Safety": "Non-toxic child-safe chemicals",
    },
  },

  // Product 5: Hero Action Figure & Space Shuttle
  {
    id: 5,
    name: "Hero Action Figure & Space Shuttle",
    emoji: "🚀",
    color: "#e8f2fe",
    category: "Vehicles & Action Toys",
    ages: ["3-5", "6-8", "9+"],
    price: 1799,
    originalPrice: 2599,
    description:
      "Galactic explorer shuttle with cockpit canopy that opens, launch sound effects, retractable landing gear, and poseable astronaut hero figure.",
    images: ["/Cars.jpeg", "/images/truck/truck-2.jpg"],
    rating: 4.7,
    reviewsCount: 65,
    inStock: 9,
    features: [
      "Electronic booster ignition roar with glowing blue LED thrusters.",
      "Cockpit seats 2 astronaut action figures.",
      "Cargo bay opens to deploy miniature space rover.",
    ],
    specs: {
      "Shuttle Length": "28 cm",
      "Batteries": "2 x AAA (Included)",
      "Material": "Impact-resistant ABS",
    },
  },

  // Product 6: Rainbow Stacking Rings & Gear Kit
  {
    id: 6,
    name: "Rainbow Stacking Rings & Gear Kit",
    emoji: "🌈",
    color: "#fff4d4",
    category: "Building & Construction Toys",
    ages: ["0-2", "3-5"],
    price: 899,
    originalPrice: 1299,
    description:
      "Tactile spin-stacking toy with interlocking gears and graduated rainbow rings that whirl smoothly down the corkscrew pole.",
    images: ["/Blocks.jpeg"],
    rating: 4.9,
    reviewsCount: 140,
    inStock: 19,
    features: [
      "Dual-sided reversible rings with rich sensory textures.",
      "Helps develop hand-eye coordination and cause-and-effect learning.",
      "Sturdy wobbler base keeps tower steady during play.",
    ],
    specs: {
      "Pieces": "6 Stackable Discs + Spin Pole",
      "Age": "12 months and above",
    },
  },

  // Product 7: Fluffy Unicorn & Bunny Plush
  {
    id: 7,
    name: "Fluffy Unicorn & Bunny Plush",
    emoji: "🦄",
    color: "#ffe8ee",
    category: "Dolls & Stuffed Toys",
    ages: ["0-2", "3-5", "6-8"],
    price: 1199,
    originalPrice: 1799,
    description:
      "Sparkly fairytale plush friend crafted from shimmering velvety plush with metallic golden horn and iridescent wings.",
    images: ["/Dolls.jpeg"],
    rating: 4.8,
    reviewsCount: 88,
    inStock: 11,
    features: [
      "Extra squishy marshmallow filling.",
      "Soft glitter horn that doesn't scratch or shed.",
      "Perfect nursery decor piece.",
    ],
    specs: {
      "Size": "25 cm",
      "Washable": "Hand wash or gentle machine wash",
    },
  },

  // Product 8: Wooden Brain Teaser & Puzzle Board
  {
    id: 8,
    name: "Wooden Brain Teaser & Puzzle Board",
    emoji: "🧩",
    color: "#e6f7ec",
    category: "Educational & Creative Toys",
    ages: ["6-8", "9+"],
    price: 1299,
    originalPrice: 1899,
    description:
      "Handcrafted wooden geometric tangram puzzle with 60 solution challenge cards that promote problem-solving and critical thinking.",
    images: ["/Educational.jpeg"],
    rating: 4.9,
    reviewsCount: 52,
    inStock: 7,
    features: [
      "Natural beech wood with smooth water-based non-toxic paints.",
      "Smooth beveled edges safe for small hands.",
      "Includes canvas travel storage pouch.",
    ],
    specs: {
      "Material": "Natural Beechwood",
      "Dimensions": "22 x 22 cm",
    },
  },

  // Products 9 - 24 fallback generator
  ...[
    { id: 9, name: "Monster Off-Road 4x4 Truck", emoji: "🚙", color: "#e8f2fe", category: "Vehicles & Action Toys", ages: ["3-5", "6-8", "9+"], price: 2199, originalPrice: 2999, description: "All-terrain monster suspension truck with giant rubber wheels, coil springs, and rugged rock-crawling capabilities.", img: "/Cars.jpeg" },
    { id: 10, name: "Architectural Marble Run Kit", emoji: "🎢", color: "#fff4d4", category: "Building & Construction Toys", ages: ["3-5", "6-8", "9+"], price: 2699, originalPrice: 3899, description: "Glow-in-the-dark twisting ramps, vortex loops, and marble maze with 120 interlocking builder pieces.", img: "/Blocks.jpeg" },
    { id: 11, name: "Princess Fashion Doll & Wardrobe", emoji: "👗", color: "#ffe8ee", category: "Dolls & Stuffed Toys", ages: ["3-5", "6-8"], price: 1899, originalPrice: 2699, description: "Royal dress-up doll with glittering tiaras, interchangeable designer ballgowns, and vanity accessories.", img: "/Dolls.jpeg" },
    { id: 12, name: "Solar System Electronic Planetarium", emoji: "🪐", color: "#e6f7ec", category: "Educational & Creative Toys", ages: ["6-8", "9+"], price: 2299, originalPrice: 3299, description: "Motorized 360-degree rotating ceiling projector with educational voice narration and glowing constellations.", img: "/Educational.jpeg" },
    { id: 13, name: "Bullet Train Speed Track Set", emoji: "🚄", color: "#e8f2fe", category: "Vehicles & Action Toys", ages: ["3-5", "6-8", "9+"], price: 2799, originalPrice: 3999, description: "Electric high-speed locomotive with luminous headlights, passenger coaches, and 4-meter expandable railway.", img: "/Cars.jpeg" },
    { id: 14, name: "Wooden Tool Bench & Construction Set", emoji: "🔨", color: "#fff4d4", category: "Building & Construction Toys", ages: ["0-2", "3-5"], price: 1999, originalPrice: 2799, description: "Eco-friendly natural wood workshop with child-safe hammer, wrench, screwdriver, screws, and wooden gears.", img: "/Blocks.jpeg" },
    { id: 15, name: "Interactive Talking Dinosaur Toy", emoji: "🦖", color: "#ffe8ee", category: "Dolls & Stuffed Toys", ages: ["3-5", "6-8"], price: 1599, originalPrice: 2299, description: "Roaring T-Rex plush buddy with motion sensors that repeats speech, walks forward, and plays dinosaur songs.", img: "/Dolls.jpeg" },
    { id: 16, name: "Kids Watercolor Art & Pottery Easel", emoji: "🎨", color: "#e6f7ec", category: "Educational & Creative Toys", ages: ["3-5", "6-8", "9+"], price: 1399, originalPrice: 1999, description: "Complete artist studio with non-toxic washable paints, natural clay wheel, premium brushes, and desktop easel.", img: "/Educational.jpeg" },
    { id: 17, name: "Aerobatic Flying Drone & Helicopter", emoji: "🚁", color: "#e8f2fe", category: "Vehicles & Action Toys", ages: ["6-8", "9+"], price: 2999, originalPrice: 4299, description: "Easy-to-fly gyro helicopter with 360-degree aerial stunt flips, obstacle avoidance sensors, and LED night light.", img: "/Cars.jpeg" },
    { id: 18, name: "Magnetic 3D Geometry Cube Set", emoji: "🧊", color: "#fff4d4", category: "Building & Construction Toys", ages: ["3-5", "6-8", "9+"], price: 1799, originalPrice: 2499, description: "Transformable magnetic shape-shifting puzzle blocks that morph into over 70 unique 3D geometric configurations.", img: "/Blocks.jpeg" },
    { id: 19, name: "Magical Fairy Wings & Dress-Up Doll", emoji: "🧚", color: "#ffe8ee", category: "Dolls & Stuffed Toys", ages: ["3-5", "6-8"], price: 1699, originalPrice: 2399, description: "Light-up sparkling fairy wings and poseable enchanted doll with sparkling glitter wand and storybook.", img: "/Dolls.jpeg" },
    { id: 20, name: "Beginner Coding Robot Bug", emoji: "🤖", color: "#e6f7ec", category: "Educational & Creative Toys", ages: ["3-5", "6-8", "9+"], price: 2499, originalPrice: 3499, description: "Screen-free early robotics kit with directional coding cards, maze tiles, and fun interactive obstacle courses.", img: "/Educational.jpeg" },
    { id: 21, name: "Die-Cast City Construction Fleet", emoji: "🚜", color: "#e8f2fe", category: "Vehicles & Action Toys", ages: ["0-2", "3-5", "6-8"], price: 1599, originalPrice: 2299, description: "Heavy-duty metal alloy bulldozer, excavator, and dump truck set with authentic movable hydraulic joints.", img: "/Cars.jpeg" },
    { id: 22, name: "Giant Soft Foam Building Blocks", emoji: "🧱", color: "#fff4d4", category: "Building & Construction Toys", ages: ["0-2", "3-5"], price: 2199, originalPrice: 2999, description: "Ultra-safe jumbo foam bricks for building towering castles, forts, and towers with zero hurt on falling.", img: "/Blocks.jpeg" },
    { id: 23, name: "Soft Plush Animal Jungle Kingdom", emoji: "🦁", color: "#ffe8ee", category: "Dolls & Stuffed Toys", ages: ["0-2", "3-5"], price: 1399, originalPrice: 1999, description: "Set of 5 adorable wildlife safari buddies with embroidered eyes and machine-washable cotton fabric.", img: "/Dolls.jpeg" },
    { id: 24, name: "World Map Geography Floor Puzzle", emoji: "🌍", color: "#e6f7ec", category: "Educational & Creative Toys", ages: ["6-8", "9+"], price: 1099, originalPrice: 1599, description: "100-piece jumbo floor puzzle featuring animals, landmarks, oceans, and continents with durable wipe-clean pieces.", img: "/Educational.jpeg" },
  ].map((p) => ({
    id: p.id,
    name: p.name,
    emoji: p.emoji,
    color: p.color,
    category: p.category,
    ages: p.ages,
    price: p.price,
    originalPrice: p.originalPrice,
    description: p.description,
    images: [p.img, "/images/truck/truck-1.jpg"],
    rating: 4.8,
    reviewsCount: ((p.id * 7 + 33) % 80) + 40,
    inStock: ((p.id * 3 + 2) % 8) + 4,
    features: [
      "Engineered from premium child-safe non-toxic materials.",
      "Tested and certified to meet international toy safety standards.",
      "Promotes creative learning, imaginative play, and fine motor skills.",
      "Backed by The Toy Story 7-day hassle-free satisfaction guarantee.",
    ],
    specs: {
      "Product": p.name,
      "Category": p.category,
      "Age Guidance": `Ages ${p.ages.join(", ")}`,
      "Material": "Child-Safe Eco-Friendly Construction",
      "Warranty": "7-Day Replacement Guarantee",
    },
  })),
];

export function getProductById(id: number | string): ProductItem | undefined {
  const numericId = Number(id);
  return productsData.find((p) => p.id === numericId);
}

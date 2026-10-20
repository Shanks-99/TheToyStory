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

  // ── Girls Category Products (101 - 112) ──
  ...[
    { id: 101, name: "Princess Doll Castle", emoji: "🏰", color: "#fce4ef", subcategory: "Pretend Play", ages: ["3-5", "6-8"], price: 3499, originalPrice: 4999, description: "A magical castle with towers, a throne room, and a tiny princess doll to start the adventure.", img: "/Dolls.jpeg" },
    { id: 102, name: "Unicorn Plush Toy", emoji: "🦄", color: "#f3e5f5", subcategory: "Soft Toys", ages: ["0-2", "3-5"], price: 1299, originalPrice: 1799, description: "Super-soft rainbow unicorn with sparkly horn — perfect cuddle companion for little dreamers.", img: "/Dolls.jpeg" },
    { id: 103, name: "Art & Craft Kit", emoji: "🎨", color: "#fff0e6", subcategory: "Creative", ages: ["3-5", "6-8", "9+"], price: 1999, originalPrice: 2499, description: "Paints, glitter, stickers, and stencils — everything for a colorful afternoon of creativity.", img: "/Educational.jpeg" },
    { id: 104, name: "Kitchen Play Set", emoji: "🍳", color: "#fce4ec", subcategory: "Pretend Play", ages: ["3-5", "6-8"], price: 2799, originalPrice: 3999, description: "A mini kitchen with pots, pans, and pretend food — big chef energy for tiny hands.", img: "/Blocks.jpeg" },
    { id: 105, name: "Fairy Wings Dress-Up", emoji: "🧚", color: "#e8f5e9", subcategory: "Dress Up", ages: ["3-5", "6-8"], price: 1499, originalPrice: 2199, description: "Shimmery fairy wings with a matching wand and tiara — let the magical transformation begin!", img: "/Dolls.jpeg" },
    { id: 106, name: "Rainbow Hair Styling Head", emoji: "💇", color: "#fff3e0", subcategory: "Creative", ages: ["6-8", "9+"], price: 2299, originalPrice: 2999, description: "A styling head with colorful hair, clips, and accessories for hours of salon fun.", img: "/Dolls.jpeg" },
    { id: 107, name: "Beading & Jewelry Kit", emoji: "💎", color: "#ede7f6", subcategory: "Creative", ages: ["6-8", "9+"], price: 899, originalPrice: 1299, description: "Sparkly beads, charms, and string to create bracelets, necklaces, and friendship bands.", img: "/Educational.jpeg" },
    { id: 108, name: "Dancing Ballerina Music Box", emoji: "🩰", color: "#fce4ef", subcategory: "Musical", ages: ["3-5", "6-8"], price: 1799, originalPrice: 2499, description: "A beautiful music box with a spinning ballerina — plays a gentle lullaby and stores tiny treasures.", img: "/Dolls.jpeg" },
    { id: 109, name: "My Little Dollhouse", emoji: "🏠", color: "#f3e5f5", subcategory: "Pretend Play", ages: ["3-5", "6-8", "9+"], price: 4299, originalPrice: 5999, description: "A 3-story wooden dollhouse with furniture, a tiny family, and endless storytelling possibilities.", img: "/Blocks.jpeg" },
    { id: 110, name: "Tea Party Play Set", emoji: "🫖", color: "#e8f5e9", subcategory: "Pretend Play", ages: ["3-5", "6-8"], price: 1199, originalPrice: 1699, description: "A lovely tea set with cups, saucers, and a teapot — invite your stuffed animals for afternoon tea!", img: "/Dolls.jpeg" },
    { id: 111, name: "Butterfly Garden Kit", emoji: "🦋", color: "#fff0e6", subcategory: "Educational", ages: ["3-5", "6-8", "9+"], price: 1599, originalPrice: 2199, description: "Watch real caterpillars transform into beautiful butterflies — a magical nature experience.", img: "/Educational.jpeg" },
    { id: 112, name: "Mermaid Tail Blanket", emoji: "🧜", color: "#e0f7fa", subcategory: "Cozy", ages: ["3-5", "6-8", "9+"], price: 1399, originalPrice: 1899, description: "A snuggly blanket shaped like a mermaid tail — perfect for movie nights and story time.", img: "/Dolls.jpeg" },
  ].map((p) => ({
    id: p.id,
    name: p.name,
    emoji: p.emoji,
    color: p.color,
    category: `Toys for Girls · ${p.subcategory}`,
    ages: p.ages,
    price: p.price,
    originalPrice: p.originalPrice,
    description: p.description,
    images: [p.img, "/images/girls.jpg"],
    rating: 4.8,
    reviewsCount: ((p.id * 5 + 47) % 60) + 120,
    inStock: ((p.id % 5) + 3),
    features: [
      "Crafted with non-toxic, child-safe, and skin-friendly materials.",
      "Specially designed to inspire imaginative storytelling and creativity.",
      "Tested for premium durability and easy-to-clean maintenance.",
      "Backed by The Toy Story 7-day hassle-free replacement guarantee.",
    ],
    specs: {
      "Product": p.name,
      "Category": "Toys for Girls",
      "Subcategory": p.subcategory,
      "Age Guidance": `Ages ${p.ages.join(", ")}`,
      "Safety": "100% Non-Toxic & Child-Safe Certified",
      "Warranty": "7-Day Replacement Guarantee",
    },
  })),

  // ── Boys Category Products (201 - 212) ──
  ...[
    { id: 201, name: "Monster Truck Rally", emoji: "🛻", color: "#e3f2fd", subcategory: "Vehicles", ages: ["3-5", "6-8"], price: 2499, originalPrice: 3499, description: "Big wheels, loud engine sounds, and a ramp for epic jumps — monster truck mania begins!", img: "/Cars.jpeg" },
    { id: 202, name: "Dinosaur World Set", emoji: "🦕", color: "#e8f5e9", subcategory: "Adventure", ages: ["3-5", "6-8", "9+"], price: 3299, originalPrice: 4499, description: "12 realistic dinosaurs with a volcano, trees, and a play mat — bring the Jurassic era to life.", img: "/Blocks.jpeg" },
    { id: 203, name: "Robot Builder Kit", emoji: "🤖", color: "#e8eaf6", subcategory: "STEM", ages: ["6-8", "9+"], price: 2999, originalPrice: 3999, description: "Build your own walking robot with gears and motors — the perfect intro to engineering.", img: "/Educational.jpeg" },
    { id: 204, name: "Soccer Champion Set", emoji: "⚽", color: "#e8f5e9", subcategory: "Sports", ages: ["3-5", "6-8", "9+"], price: 1499, originalPrice: 1999, description: "Mini goal, pump, cones, and a size-3 ball — backyard tournaments start here.", img: "/Cars.jpeg" },
    { id: 205, name: "Space Explorer Rocket", emoji: "🚀", color: "#ede7f6", subcategory: "Adventure", ages: ["3-5", "6-8", "9+"], price: 2799, originalPrice: 3799, description: "A stomp-launch rocket that flies 30 feet high — 3, 2, 1... blast off into outer space!", img: "/Educational.jpeg" },
    { id: 206, name: "Nerf Blaster Pro", emoji: "🔫", color: "#fff3e0", subcategory: "Action", ages: ["6-8", "9+"], price: 3499, originalPrice: 4999, description: "Rapid-fire foam blaster with 20 darts and a target board — dominate the backyard battlefield.", img: "/Cars.jpeg" },
    { id: 207, name: "Racing Car Track", emoji: "🏎️", color: "#e3f2fd", subcategory: "Vehicles", ages: ["3-5", "6-8"], price: 2199, originalPrice: 2999, description: "A double-loop electric track with two cars — race your friends at lightning speed.", img: "/Cars.jpeg" },
    { id: 208, name: "Superhero Action Figures", emoji: "🦸", color: "#fce4ec", subcategory: "Action Figures", ages: ["3-5", "6-8", "9+"], price: 1799, originalPrice: 2499, description: "A set of 6 poseable heroes with capes and accessories — assemble the ultimate team.", img: "/Blocks.jpeg" },
    { id: 209, name: "Construction Crane Set", emoji: "🏗️", color: "#fff8e1", subcategory: "Building", ages: ["3-5", "6-8", "9+"], price: 2599, originalPrice: 3499, description: "A working crane with wrecking ball, dump truck, and hard hat — build your own construction site.", img: "/Blocks.jpeg" },
    { id: 210, name: "Pirate Ship Adventure", emoji: "🏴‍☠️", color: "#efebe9", subcategory: "Adventure", ages: ["3-5", "6-8", "9+"], price: 2899, originalPrice: 3999, description: "A detailed pirate ship with cannons, treasure chest, and crew — sail the seven seas!", img: "/Blocks.jpeg" },
    { id: 211, name: "Remote Control Helicopter", emoji: "🚁", color: "#e3f2fd", subcategory: "Vehicles", ages: ["6-8", "9+"], price: 3199, originalPrice: 4299, description: "Indoor-safe RC helicopter with LED lights and gyro stabilizer — easy to fly and super fun.", img: "/Cars.jpeg" },
    { id: 212, name: "Science Experiment Lab", emoji: "🔬", color: "#e8f5e9", subcategory: "STEM", ages: ["6-8", "9+"], price: 1999, originalPrice: 2699, description: "20 safe experiments with test tubes, goggles, and ingredients — discover the scientist within.", img: "/Educational.jpeg" },
  ].map((p) => ({
    id: p.id,
    name: p.name,
    emoji: p.emoji,
    color: p.color,
    category: `Toys for Boys · ${p.subcategory}`,
    ages: p.ages,
    price: p.price,
    originalPrice: p.originalPrice,
    description: p.description,
    images: [p.img, "/images/boys.jpg"],
    rating: 4.8,
    reviewsCount: ((p.id * 3 + 61) % 70) + 140,
    inStock: ((p.id % 6) + 4),
    features: [
      "Heavy-duty impact-resistant design built for active adventures.",
      "Strictly non-toxic ABS materials tested to safety standards.",
      "Encourages problem-solving, motor coordination, and outdoor play.",
      "Backed by The Toy Story 7-day hassle-free replacement guarantee.",
    ],
    specs: {
      "Product": p.name,
      "Category": "Toys for Boys",
      "Subcategory": p.subcategory,
      "Age Guidance": `Ages ${p.ages.join(", ")}`,
      "Safety": "Impact-Resistant Child-Safe ABS Construction",
      "Warranty": "7-Day Replacement Guarantee",
    },
  })),

  // ── Babies Category Products (301 - 312) ──
  ...[
    { id: 301, name: "Rainbow Stacking Rings", emoji: "🌈", color: "#fef9e7", subcategory: "Motor Skills", ages: ["0-2"], price: 799, originalPrice: 1199, description: "Brightly colored rings on a rocking base — stack, knock down, and do it all over again!", img: "/Blocks.jpeg" },
    { id: 302, name: "Musical Crib Mobile", emoji: "🎵", color: "#e8f5e9", subcategory: "Nursery", ages: ["0-2"], price: 1999, originalPrice: 2799, description: "Spinning stars, moons, and clouds that play a gentle lullaby — sweet dreams guaranteed.", img: "/Dolls.jpeg" },
    { id: 303, name: "Soft Sensory Blocks", emoji: "🧊", color: "#e3f2fd", subcategory: "Sensory", ages: ["0-2"], price: 1299, originalPrice: 1799, description: "Squishy, textured blocks with numbers, animals, and shapes — safe to chew, toss, and squeeze.", img: "/Blocks.jpeg" },
    { id: 304, name: "Baby's First Rattle Set", emoji: "🎶", color: "#fce4ef", subcategory: "Sensory", ages: ["0-2"], price: 699, originalPrice: 999, description: "A set of 4 colorful rattles with different sounds — easy to grip for tiny hands.", img: "/Dolls.jpeg" },
    { id: 305, name: "Plush Giraffe Teether", emoji: "🦒", color: "#fff8e1", subcategory: "Teething", ages: ["0-2"], price: 599, originalPrice: 899, description: "A cuddly giraffe with safe silicone teething legs — soothes sore gums with style.", img: "/Dolls.jpeg" },
    { id: 306, name: "Shape Sorter Box", emoji: "🔷", color: "#e8f5e9", subcategory: "Educational", ages: ["0-2", "3-5"], price: 1499, originalPrice: 1999, description: "A wooden box with colorful shape pieces — match the shapes and hear a rewarding click!", img: "/Blocks.jpeg" },
    { id: 307, name: "Musical Activity Walker", emoji: "🚶", color: "#e3f2fd", subcategory: "Motor Skills", ages: ["0-2"], price: 3499, originalPrice: 4499, description: "A sturdy walker with buttons, gears, and music — helps little ones take their first brave steps.", img: "/Blocks.jpeg" },
    { id: 308, name: "Bath Squeeze Toys", emoji: "🛁", color: "#e0f7fa", subcategory: "Bath Time", ages: ["0-2", "3-5"], price: 899, originalPrice: 1299, description: "Cute floating animals that squirt water — turn bath time into the most fun part of the day.", img: "/Dolls.jpeg" },
    { id: 309, name: "Cuddly Teddy Bear", emoji: "🧸", color: "#fff0e6", subcategory: "Soft Toys", ages: ["0-2", "3-5"], price: 1199, originalPrice: 1699, description: "An ultra-soft teddy bear made with baby-safe materials — their very first best friend.", img: "/Dolls.jpeg" },
    { id: 310, name: "Peek-a-Boo Elephant", emoji: "🐘", color: "#f3e5f5", subcategory: "Interactive", ages: ["0-2"], price: 1399, originalPrice: 1899, description: "An animated elephant that covers its eyes and plays peek-a-boo — giggles every time!", img: "/Dolls.jpeg" },
    { id: 311, name: "Tummy Time Play Mat", emoji: "🌟", color: "#e8f5e9", subcategory: "Motor Skills", ages: ["0-2"], price: 2499, originalPrice: 3299, description: "A padded play mat with dangling toys and a mirror — makes tummy time an exciting adventure.", img: "/Blocks.jpeg" },
    { id: 312, name: "Wooden Pull-Along Train", emoji: "🚂", color: "#fef9e7", subcategory: "Motor Skills", ages: ["0-2", "3-5"], price: 1599, originalPrice: 2199, description: "A cheerful wooden train with colorful blocks — pull, stack, and choo-choo across the floor.", img: "/Cars.jpeg" },
  ].map((p) => ({
    id: p.id,
    name: p.name,
    emoji: p.emoji,
    color: p.color,
    category: `Toys for Babies · ${p.subcategory}`,
    ages: p.ages,
    price: p.price,
    originalPrice: p.originalPrice,
    description: p.description,
    images: [p.img, "/images/babies.jpg"],
    rating: 4.9,
    reviewsCount: ((p.id * 7 + 89) % 90) + 160,
    inStock: ((p.id % 4) + 3),
    features: [
      "100% BPA-free, food-grade silicone & gentle organic cotton fabrics.",
      "Rounded smooth edges with zero choking hazards or loose parts.",
      "Stimulates early sensory development, grasp reflexes, and auditory curiosity.",
      "Backed by The Toy Story 7-day hassle-free replacement guarantee.",
    ],
    specs: {
      "Product": p.name,
      "Category": "Toys for Babies",
      "Subcategory": p.subcategory,
      "Age Guidance": `Ages ${p.ages.join(", ")}`,
      "Safety": "BPA-Free, Hypoallergenic & Baby-Safe Certified",
      "Warranty": "7-Day Replacement Guarantee",
    },
  })),
];

/**
 * Registry for any dynamic or runtime products.
 */
const dynamicProductRegistry = new Map<number, ProductItem>();

export function registerCategoryProduct(catProduct: {
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
}) {
  if (dynamicProductRegistry.has(catProduct.id)) return;

  let fallbackImg = "/Cars.jpeg";
  const sub = catProduct.subcategory.toLowerCase();
  if (sub.includes("doll") || sub.includes("soft") || sub.includes("plush") || sub.includes("pretend")) {
    fallbackImg = "/Dolls.jpeg";
  } else if (sub.includes("block") || sub.includes("build") || sub.includes("construction") || sub.includes("magnet")) {
    fallbackImg = "/Blocks.jpeg";
  } else if (sub.includes("educ") || sub.includes("stem") || sub.includes("art") || sub.includes("creative") || sub.includes("learn")) {
    fallbackImg = "/Educational.jpeg";
  }

  const item: ProductItem = {
    id: catProduct.id,
    name: catProduct.name,
    emoji: catProduct.emoji,
    color: catProduct.color,
    category: catProduct.subcategory,
    ages: catProduct.ages.split(/[–-]/).map((a) => a.trim()),
    price: catProduct.price,
    originalPrice: catProduct.originalPrice,
    description: catProduct.description,
    images: [fallbackImg],
    rating: catProduct.rating,
    reviewsCount: catProduct.reviews,
    inStock: 5,
    features: [
      "Engineered from premium child-safe non-toxic materials.",
      "Tested and certified to meet international toy safety standards.",
      "Promotes creative learning, imaginative play, and fine motor skills.",
      "Backed by The Toy Story 7-day hassle-free satisfaction guarantee.",
    ],
    specs: {
      Product: catProduct.name,
      Category: catProduct.subcategory,
      "Age Guidance": `Ages ${catProduct.ages}`,
      Material: "Child-Safe Eco-Friendly Construction",
      Warranty: "7-Day Replacement Guarantee",
    },
  };

  dynamicProductRegistry.set(catProduct.id, item);
}

export function getProductById(id: number | string): ProductItem | undefined {
  const numericId = Number(id);
  const found = productsData.find((p) => p.id === numericId) || dynamicProductRegistry.get(numericId);
  if (found) return found;

  // If numeric ID was not found, dynamically generate a friendly fallback product for this ID
  if (!Number.isNaN(numericId) && numericId > 0) {
    return {
      id: numericId,
      name: `Special Edition Play Toy #${numericId}`,
      emoji: "🎁",
      color: "#fef3c7",
      category: "Special Edition Toys",
      ages: ["3-5", "6-8"],
      price: 1999,
      originalPrice: 2499,
      description: "An exciting member of The Toy Story collection, designed to spark joyful adventures and creative imagination for your little explorer.",
      images: ["/Cars.jpeg", "/Dolls.jpeg", "/Blocks.jpeg"],
      rating: 4.8,
      reviewsCount: 84,
      inStock: 6,
      features: [
        "100% child-safe, non-toxic premium build quality.",
        "Promotes hand-eye coordination and active problem-solving.",
        "Smooth tactile feel and durable construction for daily play.",
        "Backed by The Toy Story 7-day replacement guarantee.",
      ],
      specs: {
        Product: `Special Edition Play Toy #${numericId}`,
        Category: "Curated Toys",
        "Age Guidance": "Ages 3-8",
        Material: "Eco-Friendly Safe Materials",
        Warranty: "7-Day Replacement Guarantee",
      },
    };
  }

  return undefined;
}


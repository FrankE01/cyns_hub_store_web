import { Product, Category, CustomerSentiment } from "../types";

export const CATEGORIES: Category[] = [
  {
    id: "new-arrivals",
    name: "New Arrivals",
    slug: "new-arrivals",
    description: "The latest curated drops and seasonal silhouettes.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
    itemCount: 18,
  },
  {
    id: "dresses",
    name: "Dresses",
    slug: "dresses",
    description: "Flowing midi dresses, slip dresses, and effortless occasion wear.",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800",
    itemCount: 24,
  },
  {
    id: "sets",
    name: "Co-Ord Sets",
    slug: "sets",
    description: "Effortlessly matched sets designed for versatile everyday styling.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
    itemCount: 12,
  },
  {
    id: "blazers",
    name: "Blazers & Tops",
    slug: "blazers",
    description: "Relaxed tailored blazers and breathable natural linen shirts.",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
    itemCount: 15,
  },
  {
    id: "accessories",
    name: "Accessories",
    slug: "accessories",
    description: "Handcrafted woven bags, fine jewelry, and styling essentials.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
    itemCount: 9,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-3",
    name: "Solene Blazer",
    slug: "solene-blazer",
    category: "blazers",
    price: 750,
    originalPrice: 850,
    description:
      "Tailored with subtle precision, the solene blazer is a modern wardrobe essential. Cut from a breathable linen-cotton blend, its relaxed structure and neutral tone make it endlessly versatile layer it over anything, wear it everywhere.",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200",
    ],
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    availableColors: [
      { name: "Brown", hex: "#B87E4B" },
      { name: "Beige", hex: "#C7B89E" },
      { name: "Grey", hex: "#94989B" },
      { name: "White", hex: "#FAFAFA" },
    ],
    variants: [
      { id: "v-sb-1", size: "S", color: "Beige", colorHex: "#C7B89E", inStock: true, stockCount: 12 },
      { id: "v-sb-2", size: "M", color: "Beige", colorHex: "#C7B89E", inStock: true, stockCount: 15 },
      { id: "v-sb-3", size: "L", color: "Beige", colorHex: "#C7B89E", inStock: true, stockCount: 8 },
      { id: "v-sb-4", size: "XL", color: "Beige", colorHex: "#C7B89E", inStock: true, stockCount: 4 },
      { id: "v-sb-5", size: "XXL", color: "Beige", colorHex: "#C7B89E", inStock: false, stockCount: 0 },
      { id: "v-sb-6", size: "S", color: "Brown", colorHex: "#B87E4B", inStock: true, stockCount: 6 },
      { id: "v-sb-7", size: "M", color: "Brown", colorHex: "#B87E4B", inStock: true, stockCount: 8 },
      { id: "v-sb-8", size: "L", color: "Brown", colorHex: "#B87E4B", inStock: true, stockCount: 3 },
      { id: "v-sb-9", size: "XL", color: "Brown", colorHex: "#B87E4B", inStock: false, stockCount: 0 },
      { id: "v-sb-10", size: "XXL", color: "Brown", colorHex: "#B87E4B", inStock: false, stockCount: 0 },
      { id: "v-sb-11", size: "S", color: "Grey", colorHex: "#94989B", inStock: true, stockCount: 9 },
      { id: "v-sb-12", size: "M", color: "Grey", colorHex: "#94989B", inStock: true, stockCount: 11 },
      { id: "v-sb-13", size: "L", color: "Grey", colorHex: "#94989B", inStock: true, stockCount: 5 },
      { id: "v-sb-14", size: "XL", color: "Grey", colorHex: "#94989B", inStock: false, stockCount: 0 },
      { id: "v-sb-15", size: "XXL", color: "Grey", colorHex: "#94989B", inStock: false, stockCount: 0 },
      { id: "v-sb-16", size: "S", color: "White", colorHex: "#FAFAFA", inStock: true, stockCount: 7 },
      { id: "v-sb-17", size: "M", color: "White", colorHex: "#FAFAFA", inStock: true, stockCount: 8 },
      { id: "v-sb-18", size: "L", color: "White", colorHex: "#FAFAFA", inStock: true, stockCount: 2 },
      { id: "v-sb-19", size: "XL", color: "White", colorHex: "#FAFAFA", inStock: false, stockCount: 0 },
      { id: "v-sb-20", size: "XXL", color: "White", colorHex: "#FAFAFA", inStock: false, stockCount: 0 },
    ],
    isPreOrder: false,
    rating: 4.5,
    reviewCount: 189,
    ratingBreakdown: {
      5: 78,
      4: 15,
      3: 4,
      2: 2,
      1: 1,
    },
    customerSentiments: ["Light Weight", "Value For Money", "Comfort", "Quality", "Appeal"],
    offers: [
      "Order within the countdown for next day delivery in Accra.",
      "Get 10% off your first purchase with coupon code WELCOME10.",
      "Free nationwide shipping on all orders over GH₵ 500.",
    ],
    tags: ["Bestseller", "New Drop", "Tailored"],
    details: {
      fit: "Relaxed, structured silhouette model is 5'8\" and wears a size S",
      fabric: "55% Linen, 45% Organic Cotton",
      care: "Dry clean recommended or gentle machine wash cold line dry to preserve shape",
    },
    reviews: [
      {
        id: "rev-1",
        author: "Sandra Rox",
        location: "Accra, Ghana",
        rating: 5,
        date: "3 days ago",
        comment:
          "I wasn't sure at first, but this blazer exceeded expectations. The fit is perfect relaxed but structured and the fabric feels premium. I've worn it to work, dinner, and even on casual weekends. It's become a go-to staple in my wardrobe.",
        tags: ["Light Weight", "Quality", "Value For Money"],
        verifiedPurchase: true,
      },
      {
        id: "rev-2",
        author: "Abena Darko",
        location: "Kumasi, Ghana",
        rating: 5,
        date: "1 week ago",
        comment:
          "Absolutely stunning piece! The linen drape is breathable and doesn't crease horribly like cheaper linen. Delivered to Kumasi within 48 hours without hassle.",
        tags: ["Comfort", "Quality"],
        verifiedPurchase: true,
      },
      {
        id: "rev-3",
        author: "Nana Yaa",
        location: "Tema, Ghana",
        rating: 4,
        date: "2 weeks ago",
        comment:
          "True to size and beautiful neutral color palette. Pairs effortlessly with wide leg denim or tailored trousers. Highly recommended!",
        tags: ["Appeal", "True To Size"],
        verifiedPurchase: true,
      },
    ],
  },
  {
    id: "prod-1",
    name: "Linen Oversized Shirt",
    slug: "linen-oversized-shirt",
    category: "clothing",
    price: 420,
    originalPrice: 480,
    description:
      "A quintessential wardrobe staple crafted from 100% breathable organic linen. Features a relaxed silhouette with drop shoulders, pearlescent buttons, and a gently curved hem.",
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=900",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=900",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=900",
    ],
    availableSizes: ["XS", "S", "M", "L", "XL"],
    availableColors: [
      { name: "Cream White", hex: "#F8F6F0" },
      { name: "Warm Sand", hex: "#D8C7B0" },
      { name: "Sage Olive", hex: "#7B866D" },
    ],
    variants: [
      { id: "v1", size: "S", color: "Cream White", colorHex: "#F8F6F0", inStock: true, stockCount: 8 },
      { id: "v2", size: "M", color: "Cream White", colorHex: "#F8F6F0", inStock: true, stockCount: 12 },
      { id: "v3", size: "L", color: "Cream White", colorHex: "#F8F6F0", inStock: true, stockCount: 5 },
      { id: "v4", size: "S", color: "Warm Sand", colorHex: "#D8C7B0", inStock: true, stockCount: 6 },
      { id: "v5", size: "M", color: "Warm Sand", colorHex: "#D8C7B0", inStock: true, stockCount: 9 },
    ],
    isPreOrder: false,
    rating: 4.8,
    reviewCount: 42,
    ratingBreakdown: { 5: 82, 4: 12, 3: 4, 2: 1, 1: 1 },
    customerSentiments: ["Light Weight", "Comfort", "True To Size"],
    tags: ["Bestseller", "100% Linen"],
    details: {
      fit: "Relaxed oversized cut. Model is 5'8\" wearing size S.",
      fabric: "100% European Flax Linen.",
      care: "Machine wash cold on gentle cycle. Hang or flat dry.",
    },
  },
  {
    id: "prod-2",
    name: "Sage Tiered Midi Dress",
    slug: "sage-tiered-midi-dress",
    category: "dresses",
    price: 580,
    originalPrice: 650,
    description:
      "Designed for warm sunny days and celebratory evenings. Features a flattering V-neckline, adjustable waist tie, and a flowy tiered midi skirt that moves gracefully.",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=900",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=900",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=900",
    ],
    availableSizes: ["XS", "S", "M", "L", "XL"],
    availableColors: [
      { name: "Sage Green", hex: "#8F9A82" },
      { name: "Noir Black", hex: "#1C1917" },
      { name: "Ivory", hex: "#F9F6F0" },
    ],
    variants: [
      { id: "v6", size: "S", color: "Sage Green", colorHex: "#8F9A82", inStock: true, stockCount: 15 },
      { id: "v7", size: "M", color: "Sage Green", colorHex: "#8F9A82", inStock: true, stockCount: 10 },
      { id: "v8", size: "L", color: "Sage Green", colorHex: "#8F9A82", inStock: true, stockCount: 8 },
    ],
    isPreOrder: true,
    preOrderDispatchDate: "Nov 25, 2026",
    preOrderCutoffDate: "Nov 15, 2026",
    rating: 4.9,
    reviewCount: 86,
    ratingBreakdown: { 5: 90, 4: 8, 3: 2, 2: 0, 1: 0 },
    customerSentiments: ["Quality", "Appeal", "Comfort"],
    tags: ["Pre-Order", "Customer Favorite"],
    details: {
      fit: "True to size. Flowing skirt with structured bust.",
      fabric: "70% Viscose, 30% Linen blend with cotton lining.",
      care: "Dry clean or delicate hand wash recommended.",
    },
  },
  {
    id: "prod-4",
    name: "Woven Rattan Crossbody Bag",
    slug: "woven-crossbody-bag",
    category: "accessories",
    price: 350,
    description:
      "Handcrafted by skilled artisans from sustainable woven rattan with genuine leather strap and buckle detailing. The perfect accent for effortless day-to-night styling.",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=900",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=900",
    ],
    availableSizes: ["M"],
    availableColors: [
      { name: "Honey Rattan", hex: "#C69255" },
      { name: "Espresso Brown", hex: "#4A3223" },
    ],
    variants: [
      { id: "v13", size: "M", color: "Honey Rattan", colorHex: "#C69255", inStock: true, stockCount: 18 },
    ],
    isPreOrder: false,
    rating: 4.9,
    reviewCount: 51,
    ratingBreakdown: { 5: 88, 4: 10, 3: 2, 2: 0, 1: 0 },
    customerSentiments: ["Quality", "Value For Money", "Appeal"],
    tags: ["Artisan", "Handmade"],
    details: {
      fit: "Dimensions: 22cm x 16cm x 8cm. Adjustable strap length up to 120cm.",
      fabric: "Natural Rattan & Genuine Leather.",
      care: "Wipe with damp cloth. Store in dry place.",
    },
  },
  {
    id: "prod-5",
    name: "Striped Resort Knit Set",
    slug: "striped-knit-coord-set",
    category: "sets",
    price: 620,
    originalPrice: 690,
    description:
      "Two-piece ribbed knit set featuring a cropped buttoned shirt and flattering high-waisted shorts with a drawstring tie. Ultra soft, breathable, and designed for luxurious leisure.",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=900",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=900",
    ],
    availableSizes: ["S", "M", "L"],
    availableColors: [
      { name: "Oatmeal Stripe", hex: "#D6CCA9" },
      { name: "Noir Stripe", hex: "#262626" },
    ],
    variants: [
      { id: "v14", size: "S", color: "Oatmeal Stripe", colorHex: "#D6CCA9", inStock: true, stockCount: 6 },
      { id: "v15", size: "M", color: "Oatmeal Stripe", colorHex: "#D6CCA9", inStock: true, stockCount: 11 },
    ],
    isPreOrder: false,
    rating: 4.8,
    reviewCount: 38,
    ratingBreakdown: { 5: 85, 4: 12, 3: 3, 2: 0, 1: 0 },
    customerSentiments: ["Comfort", "Light Weight", "True To Size"],
    tags: ["Co-ord", "Limited Stock"],
    details: {
      fit: "Relaxed fit shirt with elasticated drawstring waist shorts.",
      fabric: "100% Fine Organic Cotton Knit.",
      care: "Cold gentle cycle inside out. Lay flat to dry.",
    },
  },
  {
    id: "prod-6",
    name: "Wide Leg Pleated Jumpsuit",
    slug: "wide-leg-pleated-jumpsuit",
    category: "clothing",
    price: 680,
    description:
      "A statuesque silhouette featuring tailored bodice seams, deep side pockets, and dramatic wide pleated legs. Transitions seamlessly from formal occasions to weekend dinners.",
    images: [
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&q=80&w=900",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=900",
    ],
    availableSizes: ["XS", "S", "M", "L", "XL"],
    availableColors: [
      { name: "Pitch Black", hex: "#171717" },
      { name: "Deep Olive", hex: "#4B5320" },
    ],
    variants: [
      { id: "v16", size: "S", color: "Pitch Black", colorHex: "#171717", inStock: true, stockCount: 20 },
      { id: "v17", size: "M", color: "Pitch Black", colorHex: "#171717", inStock: true, stockCount: 20 },
    ],
    isPreOrder: true,
    preOrderDispatchDate: "Nov 30, 2026",
    preOrderCutoffDate: "Nov 18, 2026",
    rating: 4.9,
    reviewCount: 94,
    ratingBreakdown: { 5: 89, 4: 9, 3: 2, 2: 0, 1: 0 },
    customerSentiments: ["Quality", "Appeal", "Value For Money"],
    tags: ["Pre-Order", "Statement Piece"],
    details: {
      fit: "Fitted through the waist with dramatic flow through the legs.",
      fabric: "Premium Heavyweight Linen Blend.",
      care: "Steam or dry clean recommended.",
    },
  },
  // Inspo-matched recommended items from Image 2:
  {
    id: "prod-7",
    name: "Black Blazer",
    slug: "black-blazer",
    category: "blazers",
    price: 720,
    originalPrice: 790,
    description:
      "A sharp, structured silhouette in midnight noir. Cut with notched lapels and single-button closure for an elevated finish.",
    images: [
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&q=80&w=900",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=900",
    ],
    availableSizes: ["S", "M", "L", "XL"],
    availableColors: [{ name: "Noir Black", hex: "#111111" }],
    variants: [
      { id: "v-bb-1", size: "S", color: "Noir Black", colorHex: "#111111", inStock: true, stockCount: 8 },
      { id: "v-bb-2", size: "M", color: "Noir Black", colorHex: "#111111", inStock: true, stockCount: 14 },
    ],
    isPreOrder: false,
    rating: 3.5,
    reviewCount: 48,
    tags: ["Tailored", "Classics"],
    details: {
      fit: "Tailored fit. Structured shoulders.",
      fabric: "Wool-polyester crease-resistant blend.",
      care: "Dry clean only.",
    },
  },
  {
    id: "prod-8",
    name: "Grey Turtleneck",
    slug: "grey-turtleneck",
    category: "clothing",
    price: 420,
    description:
      "Minimalist fine-gauge ribbed turtleneck knit in slate grey. Ideal for layering under blazers or pairing with wide-leg trousers.",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=900",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=900",
    ],
    availableSizes: ["S", "M", "L"],
    availableColors: [{ name: "Slate Grey", hex: "#6B7280" }],
    variants: [
      { id: "v-gt-1", size: "S", color: "Slate Grey", colorHex: "#6B7280", inStock: true, stockCount: 10 },
      { id: "v-gt-2", size: "M", color: "Slate Grey", colorHex: "#6B7280", inStock: true, stockCount: 16 },
    ],
    isPreOrder: false,
    rating: 4.0,
    reviewCount: 62,
    tags: ["Essential", "Layering"],
    details: {
      fit: "Slim ribbed fit with generous stretch.",
      fabric: "90% Modal Cotton, 10% Elastane.",
      care: "Gentle machine wash cold.",
    },
  },
  {
    id: "prod-9",
    name: "Aqua Blazer",
    slug: "aqua-blazer",
    category: "blazers",
    price: 780,
    description:
      "Vibrant teal-aqua tailored jacket designed to make an unforgettable entrance. Unlined for airy tropical breathability.",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=900",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=900",
    ],
    availableSizes: ["S", "M", "L"],
    availableColors: [{ name: "Deep Aqua", hex: "#2E6B65" }],
    variants: [
      { id: "v-ab-1", size: "S", color: "Deep Aqua", colorHex: "#2E6B65", inStock: true, stockCount: 7 },
      { id: "v-ab-2", size: "M", color: "Deep Aqua", colorHex: "#2E6B65", inStock: true, stockCount: 9 },
    ],
    isPreOrder: false,
    rating: 3.5,
    reviewCount: 31,
    tags: ["Statement", "Color Pop"],
    details: {
      fit: "Relaxed boyfriend silhouette.",
      fabric: "60% Linen, 40% Viscose.",
      care: "Dry clean only.",
    },
  },
  {
    id: "prod-10",
    name: "Olive Plaid Coat",
    slug: "olive-plaid-coat",
    category: "blazers",
    price: 890,
    description:
      "Lightweight duster trench coat in an understated earthy olive plaid weave. Accented with tortoiseshell buttons and self-tie belt.",
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=900",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=900",
    ],
    availableSizes: ["S", "M", "L", "XL"],
    availableColors: [{ name: "Earthy Olive Plaid", hex: "#555A44" }],
    variants: [
      { id: "v-oc-1", size: "S", color: "Earthy Olive Plaid", colorHex: "#555A44", inStock: true, stockCount: 5 },
      { id: "v-oc-2", size: "M", color: "Earthy Olive Plaid", colorHex: "#555A44", inStock: true, stockCount: 8 },
    ],
    isPreOrder: false,
    rating: 4.5,
    reviewCount: 75,
    tags: ["Outerwear", "Premium"],
    details: {
      fit: "Oversized draping duster length.",
      fabric: "Woven Cotton-Linen Canvas.",
      care: "Dry clean recommended.",
    },
  },
];

export const CUSTOMER_SENTIMENTS: CustomerSentiment[] = [
  { tag: "Light Weight", percentage: 94 },
  { tag: "Value For Money", percentage: 96 },
  { tag: "Comfort", percentage: 98 },
  { tag: "Quality", percentage: 97 },
  { tag: "True To Size", percentage: 92 },
  { tag: "Appeal", percentage: 95 },
];

export const FEATURED_REVIEWS = [
  {
    id: "rev-1",
    author: "Sandra Rox",
    location: "Accra, Ghana",
    rating: 5,
    date: "2 days ago",
    comment:
      "I wasn't sure at first, but this blazer exceeded expectations. The fit is perfect relaxed but structured and the fabric feels premium. I've worn it to work, dinner, and even on casual weekends. It's become a go-to staple in my wardrobe.",
    tags: ["Value For Money", "Quality", "Light Weight"],
    verifiedPurchase: true,
  },
  {
    id: "rev-2",
    author: "Amina K.",
    location: "Kumasi, Ghana",
    rating: 5,
    date: "1 week ago",
    comment:
      "Pre-ordered the sage dress and it arrived right on the promised dispatch date! The communication was super clear and the quality is even better in person than on Instagram.",
    tags: ["True To Size", "Comfort"],
    verifiedPurchase: true,
  },
  {
    id: "rev-3",
    author: "Efua Mensah",
    location: "East Legon, Accra",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Obsessed with the resort knit set. The material is so breathable for our Accra heat while still looking so put together. Will definitely order again!",
    tags: ["Light Weight", "Quality"],
    verifiedPurchase: true,
  },
];

// Helper Functions
export function getProductBySlug(slug: string): Product | undefined {
  // Support solene-blazer and alias solene-tailored-blazer
  if (slug === "solene-tailored-blazer") {
    return PRODUCTS.find((p) => p.slug === "solene-blazer") || PRODUCTS.find((p) => p.slug === slug);
  }
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all" || category === "all-products") {
    return PRODUCTS;
  }
  if (category === "new-arrivals") {
    return PRODUCTS.filter((p) => p.tags.includes("New Arrival") || p.tags.includes("New Drop"));
  }
  return PRODUCTS.filter((p) => p.category === category);
}

export function getRelatedProducts(productId: string, limit: number = 4): Product[] {
  const current = PRODUCTS.find((p) => p.id === productId);
  if (!current) {
    return PRODUCTS.slice(0, limit);
  }

  // If Solene Blazer or blazer, show the 4 inspo items (Black Blazer, Grey Turtleneck, Aqua Blazer, Olive Plaid Coat)
  if (current.slug === "solene-blazer" || current.category === "blazers") {
    const specificSlugs = ["black-blazer", "grey-turtleneck", "aqua-blazer", "olive-plaid-coat"];
    const matched = PRODUCTS.filter((p) => specificSlugs.includes(p.slug));
    if (matched.length === 4) {
      return matched;
    }
  }

  const related = PRODUCTS.filter((p) => p.id !== productId);
  return related.slice(0, limit);
}

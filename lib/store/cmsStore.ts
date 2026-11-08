import {
  Product,
  Category,
  StorefrontSections,
  Order,
  FunnelAnalytics,
  FulfillmentStatus,
  PaymentStatus,
} from "../types";
import { PRODUCTS, CATEGORIES } from "../data/products";

export interface CMSState {
  products: Product[];
  categories: Category[];
  sections: StorefrontSections;
  orders: Order[];
  analytics: FunnelAnalytics;
}

const DEFAULT_SECTIONS: StorefrontSections = {
  announcement: {
    enabled: true,
    text: "Pre-orders open for the Festive Drop — Free delivery in Greater Accra on orders over GH₵ 600",
    linkText: "Shop Now",
    linkHref: "/shop",
  },
  hero: {
    headline: "Effortless, elevated female silhouettes tailored for sunlit days and timeless grace.",
    subheadline: "Curated drops and limited pre-order collections handcrafted for the modern African woman.",
    backgroundImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=85&w=1920",
    ctaText: "Explore Collection",
    ctaLink: "/shop",
    showLogo: true,
  },
  curatedCollections: [
    {
      id: "cur-1",
      tag: "SUNNY DAYS AHEAD",
      title: "Summer Essentials",
      linkText: "Shop The Collection",
      linkHref: "/shop/dresses",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000",
    },
    {
      id: "cur-2",
      tag: "FINISHING TOUCHES",
      title: "Accessorize",
      linkText: "Discover Pieces",
      linkHref: "/shop/accessories",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1000",
    },
  ],
  policies: {
    freeDeliveryThreshold: 600,
    accraDeliveryFee: 35,
    outsideAccraDeliveryFee: 65,
    whatsappNumber: "233240000000",
    momoNumber: "024 123 4567",
    momoAccountName: "CYNTHIA E. / CYN'S HUB",
  },
};

const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-101",
    reference: "CYN-8429",
    createdAt: "2026-11-08T14:32:00Z",
    customerName: "Ama Owusu",
    customerPhone: "+233 24 555 1234",
    customerEmail: "ama.owusu@gmail.com",
    deliveryRegion: "Greater Accra",
    deliveryAddress: "Apartment 4B, Mirage Residence, Airport Residential Area",
    digitalAddress: "GA-183-9024",
    deliveryNotes: "Call when security gate is reached. Leave with concierge if unreachable.",
    deliveryFee: 35,
    subtotal: 750,
    total: 785,
    paymentMethod: "momo_paystack",
    paymentStatus: "paid",
    fulfillmentStatus: "ready_for_dispatch",
    isPreOrder: false,
    sourceChannel: "instagram",
    items: [
      {
        id: "item-101-1",
        productId: "prod-3",
        productName: "Solene Blazer",
        slug: "solene-blazer",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1200",
        size: "M",
        color: "Beige",
        price: 750,
        quantity: 1,
        isPreOrder: false,
      },
    ],
  },
  {
    id: "ord-102",
    reference: "CYN-8430",
    createdAt: "2026-11-08T11:15:00Z",
    customerName: "Akosua Mensah",
    customerPhone: "+233 20 444 8899",
    customerEmail: "akosua.m@yahoo.com",
    deliveryRegion: "Greater Accra",
    deliveryAddress: "House 12, 5th Circular Road, Cantonments",
    digitalAddress: "GL-045-3120",
    deliveryNotes: "Ring bell at the black gate.",
    deliveryFee: 0,
    subtotal: 1040,
    total: 1040,
    paymentMethod: "momo_paystack",
    paymentStatus: "paid",
    fulfillmentStatus: "awaiting_stock",
    isPreOrder: true,
    sourceChannel: "instagram",
    items: [
      {
        id: "item-102-1",
        productId: "prod-2",
        productName: "Aria Linen Wrap Dress",
        slug: "aria-linen-wrap-dress",
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=900",
        size: "S",
        color: "Olive",
        price: 520,
        quantity: 2,
        isPreOrder: true,
      },
    ],
  },
  {
    id: "ord-103",
    reference: "CYN-8431",
    createdAt: "2026-11-08T09:40:00Z",
    customerName: "Naa Adjei",
    customerPhone: "+233 55 888 3311",
    customerEmail: "naa.adjei@outlook.com",
    deliveryRegion: "Greater Accra",
    deliveryAddress: "Oxford Street opposite Koala, Osu",
    digitalAddress: "GA-032-4421",
    deliveryNotes: "Call when outside.",
    deliveryFee: 35,
    subtotal: 480,
    total: 515,
    paymentMethod: "direct_momo",
    paymentStatus: "pending",
    fulfillmentStatus: "awaiting_payment",
    isPreOrder: false,
    sourceChannel: "whatsapp",
    items: [
      {
        id: "item-103-1",
        productId: "prod-1",
        productName: "Elysian Silk Midi Dress",
        slug: "elysian-silk-midi-dress",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=900",
        size: "M",
        color: "Terracotta",
        price: 480,
        quantity: 1,
        isPreOrder: false,
      },
    ],
  },
  {
    id: "ord-104",
    reference: "CYN-8432",
    createdAt: "2026-11-07T16:20:00Z",
    customerName: "Efua Boateng",
    customerPhone: "+233 27 777 5544",
    deliveryRegion: "Ashanti Region (Kumasi)",
    deliveryAddress: "Ahodwo roundabout, near Golden Tulip, Kumasi",
    digitalAddress: "AK-102-8812",
    deliveryNotes: "Dispatch via VIP bus parcel office if intra-city courier is unavailable.",
    deliveryFee: 65,
    subtotal: 620,
    total: 685,
    paymentMethod: "momo_paystack",
    paymentStatus: "paid",
    fulfillmentStatus: "out_for_delivery",
    isPreOrder: false,
    sourceChannel: "tiktok",
    items: [
      {
        id: "item-104-1",
        productId: "prod-4",
        productName: "Paloma Wide-Leg Linen Set",
        slug: "paloma-linen-set",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=900",
        size: "L",
        color: "Sage Green",
        price: 620,
        quantity: 1,
        isPreOrder: false,
      },
    ],
  },
  {
    id: "ord-105",
    reference: "CYN-8433",
    createdAt: "2026-11-06T18:05:00Z",
    customerName: "Abena Darko",
    customerPhone: "+233 24 111 9922",
    deliveryRegion: "Greater Accra",
    deliveryAddress: "Coastal Estates, Coastal junction, Spintex",
    digitalAddress: "GZ-204-1189",
    deliveryFee: 35,
    subtotal: 390,
    total: 425,
    paymentMethod: "momo_paystack",
    paymentStatus: "paid",
    fulfillmentStatus: "completed",
    isPreOrder: false,
    sourceChannel: "instagram",
    items: [
      {
        id: "item-105-1",
        productId: "prod-5",
        productName: "Monaco Pleated Halter Top",
        slug: "monaco-halter-top",
        image: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&q=80&w=900",
        size: "S",
        color: "Ivory",
        price: 390,
        quantity: 1,
        isPreOrder: false,
      },
    ],
  },
];

const INITIAL_ANALYTICS: FunnelAnalytics = {
  storeVisits: 14820,
  productViews: 9240,
  addToCarts: 2480,
  checkoutInitiations: 980,
  completedOrders: 486,
  channelBreakdown: [
    { channel: "instagram", label: "Instagram (Bio & DMs)", visits: 8150, orders: 298, revenue: 172840 },
    { channel: "tiktok", label: "TikTok Video Drops", visits: 3920, orders: 114, revenue: 64980 },
    { channel: "whatsapp", label: "WhatsApp Broadcasts", visits: 1680, orders: 54, revenue: 31320 },
    { channel: "direct", label: "Direct & Organic Search", visits: 1070, orders: 20, revenue: 11600 },
  ],
};

const CMS_STORAGE_KEY = "cyns_hub_cms_v1";

const DEFAULT_STATE: CMSState = {
  products: PRODUCTS,
  categories: CATEGORIES,
  sections: DEFAULT_SECTIONS,
  orders: INITIAL_ORDERS,
  analytics: INITIAL_ANALYTICS,
};

let currentState: CMSState = DEFAULT_STATE;
const listeners = new Set<() => void>();

// Load persisted state safely in browser
if (typeof window !== "undefined") {
  try {
    const saved = localStorage.getItem(CMS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as CMSState;
      currentState = {
        ...DEFAULT_STATE,
        ...parsed,
        // Ensure products array merges or uses parsed
        products: parsed.products?.length ? parsed.products : PRODUCTS,
        categories: parsed.categories?.length ? parsed.categories : CATEGORIES,
        sections: parsed.sections ? { ...DEFAULT_SECTIONS, ...parsed.sections } : DEFAULT_SECTIONS,
        orders: parsed.orders?.length ? parsed.orders : INITIAL_ORDERS,
        analytics: parsed.analytics || INITIAL_ANALYTICS,
      };
    }
  } catch {
    currentState = DEFAULT_STATE;
  }
}

function persistState() {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(currentState));
    } catch {
      // Ignored
    }
  }
  listeners.forEach((listener) => listener());
}

export const cmsStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  getSnapshot(): CMSState {
    return currentState;
  },

  getServerSnapshot(): CMSState {
    return DEFAULT_STATE;
  },

  // Section updates
  updateAnnouncement(announcement: Partial<StorefrontSections["announcement"]>) {
    currentState = {
      ...currentState,
      sections: {
        ...currentState.sections,
        announcement: {
          ...currentState.sections.announcement,
          ...announcement,
        },
      },
    };
    persistState();
  },

  updateHero(hero: Partial<StorefrontSections["hero"]>) {
    currentState = {
      ...currentState,
      sections: {
        ...currentState.sections,
        hero: {
          ...currentState.sections.hero,
          ...hero,
        },
      },
    };
    persistState();
  },

  updateCuratedCollections(curatedCollections: StorefrontSections["curatedCollections"]) {
    currentState = {
      ...currentState,
      sections: {
        ...currentState.sections,
        curatedCollections,
      },
    };
    persistState();
  },

  updatePolicies(policies: Partial<StorefrontSections["policies"]>) {
    currentState = {
      ...currentState,
      sections: {
        ...currentState.sections,
        policies: {
          ...currentState.sections.policies,
          ...policies,
        },
      },
    };
    persistState();
  },

  // Category Actions
  addCategory(category: Category) {
    if (!category || typeof category !== "object") return;
    const slug = (category.slug || category.name || `cat-${Date.now()}`)
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    const safeCategory: Category = {
      ...category,
      id: category.id || `cat-${Date.now()}`,
      name: category.name || "Untitled Category",
      slug,
      description: category.description || "",
      image: category.image || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
      itemCount: typeof category.itemCount === "number" ? category.itemCount : 0,
    };
    currentState = {
      ...currentState,
      categories: [...currentState.categories, safeCategory],
    };
    persistState();
  },

  updateCategory(id: string, updated: Partial<Category>) {
    if (!id || typeof id !== "string") return;
    currentState = {
      ...currentState,
      categories: currentState.categories.map((c) =>
        c.id === id ? { ...c, ...updated } : c
      ),
    };
    persistState();
  },

  deleteCategory(id: string) {
    if (!id || typeof id !== "string") return;
    currentState = {
      ...currentState,
      categories: currentState.categories.filter((c) => c.id !== id),
    };
    persistState();
  },

  // Product Actions
  addProduct(product: Product) {
    if (!product || typeof product !== "object") return;
    const slug = (product.slug || product.name || `product-${Date.now()}`)
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    const safeProduct: Product = {
      ...product,
      id: product.id || `prod-${Date.now()}`,
      name: product.name || "Untitled Piece",
      slug,
      category: (product.category || "dresses").toLowerCase().trim(),
      price: typeof product.price === "number" ? product.price : 0,
      description: product.description || "",
      images: Array.isArray(product.images) && product.images.length > 0
        ? product.images
        : ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800"],
      availableSizes: Array.isArray(product.availableSizes) ? product.availableSizes : ["S", "M", "L"],
      availableColors: Array.isArray(product.availableColors) ? product.availableColors : [{ name: "Standard", hex: "#1C1917" }],
      variants: Array.isArray(product.variants) ? product.variants : [],
      tags: Array.isArray(product.tags) ? product.tags : [],
    };
    currentState = {
      ...currentState,
      products: [safeProduct, ...currentState.products],
    };
    persistState();
  },

  updateProduct(id: string, updated: Partial<Product>) {
    if (!id || typeof id !== "string") return;
    currentState = {
      ...currentState,
      products: currentState.products.map((p) =>
        p.id === id ? { ...p, ...updated } : p
      ),
    };
    persistState();
  },

  deleteProduct(id: string) {
    if (!id || typeof id !== "string") return;
    currentState = {
      ...currentState,
      products: currentState.products.filter((p) => p.id !== id),
    };
    persistState();
  },

  // Order Actions
  addOrder(order: Order) {
    if (!order || typeof order !== "object") return;
    currentState = {
      ...currentState,
      orders: [order, ...currentState.orders],
    };
    persistState();
  },

  updateOrderStatus(orderId: string, status: FulfillmentStatus) {
    if (!orderId || typeof orderId !== "string") return;
    currentState = {
      ...currentState,
      orders: currentState.orders.map((o) =>
        o.id === orderId ? { ...o, fulfillmentStatus: status } : o
      ),
    };
    persistState();
  },

  updateOrderPayment(orderId: string, paymentStatus: PaymentStatus) {
    if (!orderId || typeof orderId !== "string") return;
    currentState = {
      ...currentState,
      orders: currentState.orders.map((o) =>
        o.id === orderId ? { ...o, paymentStatus } : o
      ),
    };
    persistState();
  },

  // Query helpers for dynamic storefront access
  getProductBySlug(slug?: string): Product | undefined {
    if (!slug || typeof slug !== "string") return undefined;
    const clean = slug.trim().toLowerCase();
    if (!clean) return undefined;
    const products = Array.isArray(currentState.products) ? currentState.products : [];
    if (clean === "solene-tailored-blazer") {
      return (
        products.find((p) => (p.slug || "").toLowerCase() === "solene-blazer") ||
        products.find((p) => (p.slug || "").toLowerCase() === clean)
      );
    }
    return products.find((p) => (p.slug || "").toLowerCase() === clean);
  },

  getAllProducts(): Product[] {
    return Array.isArray(currentState.products) ? currentState.products : [];
  },

  getProductsByCategory(categorySlug?: string): Product[] {
    if (!categorySlug || typeof categorySlug !== "string") return [];
    const clean = categorySlug.trim().toLowerCase();
    if (!clean) return [];
    const products = Array.isArray(currentState.products) ? currentState.products : [];
    if (clean === "all" || clean === "all-products") return products;
    if (clean === "new-arrivals") {
      return products.filter(
        (p) =>
          p.tags?.some((t) => typeof t === "string" && (t.toLowerCase().includes("new arrival") || t.toLowerCase().includes("new drop"))) ||
          (p.category || "").toLowerCase() === "new-arrivals"
      );
    }
    return products.filter((p) => (p.category || "").toLowerCase() === clean);
  },

  getCategoryBySlug(slug?: string): Category | undefined {
    if (!slug || typeof slug !== "string") return undefined;
    const clean = slug.trim().toLowerCase();
    if (!clean) return undefined;
    const categories = Array.isArray(currentState.categories) ? currentState.categories : [];
    return categories.find((c) => (c.slug || "").toLowerCase() === clean);
  },

  getRelatedProducts(productId?: string, limit = 4): Product[] {
    const products = Array.isArray(currentState.products) ? currentState.products : [];
    const safeLimit = Math.max(1, limit || 4);
    if (!productId || typeof productId !== "string") {
      return products.slice(0, safeLimit);
    }
    const cleanId = productId.trim().toLowerCase();
    const current = products.find((p) => (p.id || "").toLowerCase() === cleanId);
    if (!current) {
      return products.slice(0, safeLimit);
    }
    if (current.slug === "solene-blazer" || (current.category || "").toLowerCase() === "blazers") {
      const specificSlugs = ["black-blazer", "grey-turtleneck", "aqua-blazer", "olive-plaid-coat"];
      const matched = products.filter((p) => specificSlugs.includes(p.slug));
      if (matched.length === 4) {
        return matched.slice(0, safeLimit);
      }
    }
    return products.filter((p) => (p.id || "").toLowerCase() !== cleanId).slice(0, safeLimit);
  },

  // Record funnel event
  recordFunnelEvent(
    event: "visit" | "view" | "add_to_cart" | "checkout" | "order",
    channel: "instagram" | "tiktok" | "whatsapp" | "direct" = "direct",
    orderRevenue = 0
  ) {
    const analytics = { ...currentState.analytics };
    if (event === "visit") analytics.storeVisits += 1;
    if (event === "view") analytics.productViews += 1;
    if (event === "add_to_cart") analytics.addToCarts += 1;
    if (event === "checkout") analytics.checkoutInitiations += 1;
    if (event === "order") {
      analytics.completedOrders += 1;
      analytics.channelBreakdown = analytics.channelBreakdown.map((ch) =>
        ch.channel === channel
          ? {
              ...ch,
              orders: ch.orders + 1,
              revenue: ch.revenue + orderRevenue,
            }
          : ch
      );
    }

    currentState = { ...currentState, analytics };
    persistState();
  },

  resetToDefaults() {
    currentState = DEFAULT_STATE;
    persistState();
  },
};

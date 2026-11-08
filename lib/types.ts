export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface ProductVariant {
  id: string;
  size: Size;
  color: string;
  colorHex: string;
  inStock: boolean;
  stockCount: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number; // 1 to 5
  date: string;
  comment: string;
  tags?: string[];
  verifiedPurchase: boolean;
}

export interface ProductDetails {
  fit: string;
  fabric: string;
  care: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  variants: ProductVariant[];
  availableSizes: Size[];
  availableColors: { name: string; hex: string }[];
  isPreOrder: boolean;
  preOrderDispatchDate?: string;
  preOrderCutoffDate?: string;
  rating: number;
  reviewCount: number;
  ratingBreakdown?: { 5: number; 4: number; 3: number; 2: number; 1: number };
  customerSentiments?: string[];
  offers?: string[];
  tags: string[]; // e.g. "New Arrival", "Bestseller", "Pre-Order"
  details: ProductDetails;
  reviews?: Review[];
}

export interface CartItem {
  id: string; // unique cart item id (product id + variant id)
  productId: string;
  productName: string;
  slug: string;
  price: number;
  image: string;
  size: Size;
  color: string;
  colorHex: string;
  quantity: number;
  isPreOrder: boolean;
  preOrderDispatchDate?: string;
}

export interface CustomerSentiment {
  tag: string;
  percentage: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "owner" | "admin" | "staff";
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  slug: string;
  image: string;
  size: Size;
  color: string;
  price: number;
  quantity: number;
  isPreOrder: boolean;
}

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type FulfillmentStatus =
  | "awaiting_payment"
  | "processing"
  | "awaiting_stock"
  | "ready_for_dispatch"
  | "out_for_delivery"
  | "completed"
  | "cancelled";

export interface Order {
  id: string;
  reference: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryRegion: string;
  deliveryAddress: string;
  digitalAddress?: string; // Ghana Post GPS (e.g. GA-183-9024)
  deliveryNotes?: string;
  deliveryFee: number;
  items: OrderItem[];
  subtotal: number;
  total: number;
  paymentMethod: "momo_paystack" | "direct_momo" | "bank_transfer" | "cash_on_delivery";
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  isPreOrder: boolean;
  sourceChannel?: "instagram" | "tiktok" | "whatsapp" | "direct";
}

export interface CuratedCollectionItem {
  id: string;
  tag: string;
  title: string;
  linkText: string;
  linkHref: string;
  image: string;
}

export interface StorefrontSections {
  announcement: {
    enabled: boolean;
    text: string;
    linkText: string;
    linkHref: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    backgroundImage: string;
    ctaText: string;
    ctaLink: string;
    showLogo: boolean;
  };
  curatedCollections: CuratedCollectionItem[];
  policies: {
    freeDeliveryThreshold: number;
    accraDeliveryFee: number;
    outsideAccraDeliveryFee: number;
    whatsappNumber: string;
    momoNumber: string;
    momoAccountName: string;
  };
}

export interface ChannelMetric {
  channel: "instagram" | "tiktok" | "whatsapp" | "direct";
  label: string;
  visits: number;
  orders: number;
  revenue: number;
}

export interface FunnelAnalytics {
  storeVisits: number;
  productViews: number;
  addToCarts: number;
  checkoutInitiations: number;
  completedOrders: number;
  channelBreakdown: ChannelMetric[];
}

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
  useMemo,
} from "react";
import { CartItem } from "../types";

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  totalCount: number;
  subtotal: number;
  hasPreOrder: boolean;
  preOrderItems: CartItem[];
  readyToShipItems: CartItem[];
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "cyns_hub_cart_v1";
const EMPTY_CART: CartItem[] = [];

let listeners: (() => void)[] = [];
let memoryCart: CartItem[] = EMPTY_CART;

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function getInitialCart(): CartItem[] {
  if (typeof window === "undefined") return EMPTY_CART;
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : EMPTY_CART;
  } catch {
    return EMPTY_CART;
  }
}

if (typeof window !== "undefined") {
  memoryCart = getInitialCart();
}

export const cartStore = {
  subscribe(listener: () => void) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot(): CartItem[] {
    return memoryCart;
  },
  getServerSnapshot(): CartItem[] {
    return EMPTY_CART;
  },
  set(nextItems: CartItem[]) {
    memoryCart = nextItems;
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextItems));
      } catch {
        // ignore storage errors
      }
    }
    emitChange();
  },
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);
  const toggleDrawer = () => setIsOpen((prev) => !prev);

  const addItem = (item: Omit<CartItem, "id">) => {
    const id = `${item.productId}-${item.size}-${item.color}`;
    const existing = items.find((i) => i.id === id);
    if (existing) {
      cartStore.set(
        items.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      );
    } else {
      cartStore.set([...items, { ...item, id }]);
    }
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    cartStore.set(items.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    cartStore.set(
      items.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    cartStore.set([]);
  };

  const totalCount = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items]
  );

  const hasPreOrder = useMemo(
    () => items.some((item) => item.isPreOrder),
    [items]
  );

  const preOrderItems = useMemo(
    () => items.filter((item) => item.isPreOrder),
    [items]
  );

  const readyToShipItems = useMemo(
    () => items.filter((item) => !item.isPreOrder),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        totalCount,
        subtotal,
        hasPreOrder,
        preOrderItems,
        readyToShipItems,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

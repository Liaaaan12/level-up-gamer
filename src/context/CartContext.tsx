import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Product } from '../types';
import { parsePrice } from '../utils/price';

type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, qty?: number) => void;
  removeItem: (codigo: string) => void;
  updateQuantity: (codigo: string, qty: number) => void;
  clear: () => void;
  totalCount: () => number;
  totalPrice: () => number; // devuelve total en CLP (número)
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'levelup_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw) as CartItem[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore write errors
    }
  }, [items]);

  const addItem = (product: Product, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.product.codigo === product.codigo);
      if (idx >= 0) {
        const copy = prev.slice();
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qty };
        return copy;
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const removeItem = (codigo: string) => {
    setItems((prev) => prev.filter((i) => i.product.codigo !== codigo));
  };

  const updateQuantity = (codigo: string, qty: number) => {
    setItems((prev) => {
      const copy = prev.slice();
      const idx = copy.findIndex((i) => i.product.codigo === codigo);
      if (idx >= 0) {
        if (qty <= 0) {
          copy.splice(idx, 1);
        } else {
          copy[idx] = { ...copy[idx], quantity: qty };
        }
      }
      return copy;
    });
  };

  const clear = () => setItems([]);

  const totalCount = () => items.reduce((s, it) => s + it.quantity, 0);

  const totalPrice = () => items.reduce((sum, it) => sum + parsePrice(it.product.precio) * it.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clear, totalCount, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};

// Nota: no exportar el contexto como default para evitar advertencias de fast-refresh.

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Product } from '../types';
import { parsePrice } from '../utils/price';
import type { CartItem, CartContextType } from './cartTypes';

const CART_STORAGE_KEY = 'levelup_cart_v1';

export const CartContext = createContext<CartContextType | undefined>(undefined);

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
      // ignore
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

export default CartContext;
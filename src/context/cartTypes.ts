import type { Product } from '../types';

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, qty?: number) => void;
  removeItem: (codigo: string) => void;
  updateQuantity: (codigo: string, qty: number) => void;
  clear: () => void;
  totalCount: () => number;
  totalPrice: () => number;
};

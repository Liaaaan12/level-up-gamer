import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { CartProvider } from './cartContext';
import { useCart } from './useCart';
import type { Product } from '../types';

// Mock de localStorage
beforeEach(() => {
  localStorage.clear();
});

const productA: Product = {
  codigo: "A001",
  categoria: "Test",
  nombre: "Producto A",
  precio: "$10.000 CLP",
  descripcion: "Desc A",
  imagen: "imgA.jpg"
};

const productB: Product = {
  codigo: "B002",
  categoria: "Test",
  nombre: "Producto B",
  precio: "$5.000 CLP",
  descripcion: "Desc B",
  imagen: "imgB.jpg"
};

// Wrapper para proveer el contexto a los hooks
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {

  it('debería inicializar un carrito vacío', () => {
  const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toEqual([]);
    expect(result.current.totalCount()).toBe(0);
    expect(result.current.totalPrice()).toBe(0);
  });

  it('debería agregar un nuevo producto al carrito', () => {
  const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(productA, 1);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].product.codigo).toBe("A001");
    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.totalCount()).toBe(1);
    expect(result.current.totalPrice()).toBe(10000);
  });

  it('debería aumentar la cantidad si el producto ya existe', () => {
  const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(productA, 1);
    });
    act(() => {
      result.current.addItem(productA, 2);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(3);
    expect(result.current.totalCount()).toBe(3);
    expect(result.current.totalPrice()).toBe(30000);
  });

  it('debería agregar múltiples productos diferentes', () => {
  const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(productA, 1);
      result.current.addItem(productB, 2);
    });

    expect(result.current.items).toHaveLength(2);
    expect(result.current.totalCount()).toBe(3); // 1 de A + 2 de B
    expect(result.current.totalPrice()).toBe(20000); // 10000 (A) + 2 * 5000 (B)
  });

  it('debería eliminar un producto del carrito', () => {
  const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(productA, 1);
      result.current.addItem(productB, 2);
    });

    act(() => {
      result.current.removeItem("A001");
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].product.codigo).toBe("B002");
    expect(result.current.totalCount()).toBe(2);
    expect(result.current.totalPrice()).toBe(10000);
  });

  it('debería actualizar la cantidad de un producto', () => {
  const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(productA, 1);
    });

    act(() => {
      result.current.updateQuantity("A001", 5);
    });

    expect(result.current.items[0].quantity).toBe(5);
    expect(result.current.totalCount()).toBe(5);
    expect(result.current.totalPrice()).toBe(50000);
  });

  it('debería eliminar un producto si la cantidad actualizada es 0 o menor', () => {
  const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(productA, 1);
      result.current.addItem(productB, 1);
    });

    act(() => {
      result.current.updateQuantity("A001", 0);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].product.codigo).toBe("B002");
    expect(result.current.totalCount()).toBe(1);
  });

  it('debería limpiar el carrito', () => {
  const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(productA, 1);
      result.current.addItem(productB, 2);
    });

    act(() => {
      result.current.clear();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalCount()).toBe(0);
    expect(result.current.totalPrice()).toBe(0);
  });
});
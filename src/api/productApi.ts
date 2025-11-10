import type { Product } from '../types';
// Importamos los datos estáticos desde el archivo original
import { products as allProducts } from '../data/products';

// Simula una base de datos en memoria
const products: Product[] = [...allProducts];

const simulateDelay = (data: unknown) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, 300); // Simula 300ms de lag de red
  });
};

/**
 * (R)ead: Obtiene todos los productos
 */
export const getProducts = (): Promise<Product[]> => {
  return simulateDelay(products) as Promise<Product[]>;
};

/**
 * (R)ead: Obtiene un producto por su código
 */
export const getProductByCodigo = (codigo: string): Promise<Product | undefined> => {
  const product = products.find(p => p.codigo === codigo);
  return simulateDelay(product) as Promise<Product | undefined>;
};

/**
 * (C)reate: Añade un nuevo producto
 * (Esto sería para el panel de admin)
 */
export const createProduct = (newProductData: Omit<Product, 'codigo'>): Promise<Product> => {
  const newProduct: Product = {
    ...newProductData,
    codigo: `PROD${Date.now()}`, // Genera un código simple
  };
  products.push(newProduct);
  return simulateDelay(newProduct) as Promise<Product>;
};

/**
 * (U)pdate: Actualiza un producto existente
 * (Esto sería para el panel de admin)
 */
export const updateProduct = (codigo: string, updates: Partial<Product>): Promise<Product | null> => {
  const index = products.findIndex(p => p.codigo === codigo);
  if (index === -1) {
    return simulateDelay(null) as Promise<null>;
  }
  products[index] = { ...products[index], ...updates };
  return simulateDelay(products[index]) as Promise<Product>;
};

/**
 * (D)elete: Elimina un producto
 * (Esto sería para el panel de admin)
 */
export const deleteProduct = (codigo: string): Promise<boolean> => {
  const index = products.findIndex(p => p.codigo === codigo);
  if (index === -1) {
    return simulateDelay(false) as Promise<boolean>;
  }
  products.splice(index, 1);
  return simulateDelay(true) as Promise<boolean>;
};
import React from 'react';
import { products } from '../data/products';
import ProductCard from './ProductCard';

const ProductList: React.FC = () => {
  return (
    <section>
      <h2>Catálogo de Productos</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.codigo} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
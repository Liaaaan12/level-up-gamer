import React from 'react';
import ProductList from '../components/ProductList';

const ShopPage: React.FC = () => {
  return (
    <main className="main-content">
      <h2>Tienda</h2>
      <ProductList />
    </main>
  );
};

export default ShopPage;

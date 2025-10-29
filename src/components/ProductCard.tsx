import React from 'react';
import type { Product } from '../types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      
      {/* Contenedor de la Imagen */}
      <div className="product-image-container">
        {/* Usamos product.imagen, asegúrate de agregarlo a tus datos */}
        <img 
          src={product.imagen} 
          alt={product.nombre} 
          className="product-image" 
        />
      </div>

      <div className="product-content">
        <h3 className="product-name">{product.nombre}</h3>
        <p className="product-category">{product.categoria}</p>
        <p className="product-description">{product.descripcion}</p>
        
        <div className="product-footer">
          <span className="product-price">{product.precio}</span>
          <button>Agregar al Carrito</button>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
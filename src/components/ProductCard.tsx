import React, { useState } from 'react';
import type { Product } from '../types';
import './ProductCard.css';
import { useCart } from '../context/useCart';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [added, setAdded] = useState(false);
  const [fav, setFav] = useState(false);
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    // feedback visual breve
    setTimeout(() => setAdded(false), 1400);
  };

  const [qty, setQty] = useState<number>(1);

  const handleFav = () => setFav((s) => !s);

  const handleView = () => {
    // Placeholder: en una app real abrirías modal o ruta
    alert(`${product.nombre}\n\n${product.descripcion}`);
  };

  return (
    <article className="product-card" aria-label={product.nombre}>
      <div className="product-image-container">
        <img
          src={product.imagen}
          alt={product.nombre}
          className="product-image"
        />
      </div>

      <div className="product-content">
        <div>
          <h3 className="product-name">{product.nombre}</h3>
          <p className="product-category">{product.categoria}</p>
        </div>

        <p className="product-description">{product.descripcion}</p>

        <div className="product-footer">
          <div className="left">
            <span className="product-price">{product.precio}</span>
            <div className="product-badges">
              <span className="badge">{product.codigo}</span>
            </div>
          </div>

          <div className="action-buttons">
            <input className="qty-input" type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))} aria-label="Cantidad" />
            <button
              className={`btn btn-primary ${added ? 'added' : ''}`}
              onClick={handleAdd}
              aria-pressed={added}
            >
              {added ? `Añadido ✓` : `Agregar`}
            </button>

            <button
              className={`btn btn-ghost btn-fav ${fav ? 'is-fav' : ''}`}
              onClick={handleFav}
              aria-pressed={fav}
              title={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              {fav ? '♥' : '♡'}
            </button>

            <button className="btn btn-ghost" onClick={handleView}>
              Ver
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
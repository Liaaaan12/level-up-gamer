import React from 'react';
import './CartDrawer.css';
import { useCart } from '../context/useCart';

type Props = {
  open: boolean;
  onClose: () => void;
};

const formatPrice = (amount: number) => {
  // Formatea 59990 -> "$59.990 CLP"
  return '$' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' CLP';
};

const CartDrawer: React.FC<Props> = ({ open, onClose }) => {
  const { items, updateQuantity, removeItem, totalPrice, clear } = useCart();

  if (!open) return null;

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <header className="cart-drawer-header">
          <h3>Tu carrito</h3>
          <button className="close-btn" onClick={onClose}>Cerrar</button>
        </header>

        <div className="cart-items">
          {items.length === 0 && <p className="empty">Tu carrito está vacío.</p>}

          {items.map((it) => (
            <div className="cart-item" key={it.product.codigo}>
              <img src={it.product.imagen} alt={it.product.nombre} />
              <div className="info">
                <div className="top">
                  <strong>{it.product.nombre}</strong>
                  <button className="remove" onClick={() => removeItem(it.product.codigo)}>Eliminar</button>
                </div>
                <div className="meta">{it.product.categoria}</div>
                <div className="controls">
                  <input type="number" min={1} value={it.quantity} onChange={(e) => updateQuantity(it.product.codigo, Math.max(1, Number(e.target.value) || 1))} />
                  <div className="price">{formatPrice(Number(it.product.precio.replace(/[^0-9]/g, '')) * it.quantity)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="cart-drawer-footer">
          <div className="subtotal">
            <span>Subtotal</span>
            <strong>{formatPrice(totalPrice())}</strong>
          </div>
          <div className="actions">
            <button className="btn btn-ghost" onClick={clear}>Vaciar</button>
            <button className="btn btn-primary">Pagar</button>
          </div>
        </footer>
      </aside>
    </div>
  );
};

export default CartDrawer;

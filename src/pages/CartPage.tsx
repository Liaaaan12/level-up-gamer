import React from 'react';
import { useCart } from '../context/useCart';
import { formatPrice } from '../utils/price';

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  return (
    <main className="main-content">
      <h2>Carrito</h2>
      {items.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          {items.map((it) => (
            <div key={it.product.codigo} style={{display:'flex',gap:12,alignItems:'center',marginBottom:12}}>
              <img src={it.product.imagen} alt={it.product.nombre} style={{width:80,height:80,objectFit:'cover'}} />
              <div style={{flex:1}}>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <strong>{it.product.nombre}</strong>
                  <button onClick={() => removeItem(it.product.codigo)}>Eliminar</button>
                </div>
                <div style={{marginTop:6}}>
                  <input type="number" min={1} value={it.quantity} onChange={(e) => updateQuantity(it.product.codigo, Math.max(1, Number(e.target.value) || 1))} />
                </div>
              </div>
            </div>
          ))}

          <div style={{display:'flex',justifyContent:'space-between',marginTop:16}}>
            <strong>Total:</strong>
            <strong>{formatPrice(totalPrice())}</strong>
          </div>
        </div>
      )}
    </main>
  );
};

export default CartPage;

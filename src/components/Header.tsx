import * as React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import CartDrawer from './CartDrawer';

const Header: React.FC = () => {
  const { totalCount, totalPrice } = useCart();
  const count = totalCount();
  const [open, setOpen] = React.useState(false);

  const formatPrice = (amount: number) => {
    return '$' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' CLP';
  };

  return (
    <>
      <header className="app-header">
        <div className="logo">
          <h1>Level Up Gamer</h1>
        </div>

        <nav className="nav">
          <Link className="nav-btn" to="/">Inicio</Link>
          <Link className="nav-btn" to="/shop">Tienda</Link>
          <Link className="nav-btn" to="/category">Categorías</Link>
          <Link className="nav-btn" to="/about">Sobre</Link>
        </nav>

        <div className="header-actions">
          <input className="search" placeholder="Buscar productos..." aria-label="Buscar" />
          <Link className="nav-btn" to="/login">Login</Link>
          <Link className="nav-btn" to="/profile">Perfil</Link>
          <button className="nav-btn" onClick={() => setOpen(true)}>Carrito ({count})</button>
          <Link className="nav-btn" to="/cart">Ver Carrito</Link>
          <div style={{marginLeft:8, fontSize:12, color:'var(--color-texto-secundario)'}}>{formatPrice(totalPrice())}</div>
        </div>
      </header>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Header;
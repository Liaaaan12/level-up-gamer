import React, { useMemo, useState } from 'react';
import { products } from '../data/products';
import ProductCard from './ProductCard';

const parsePrice = (precio: string) => {
  // Convierte "$59.990 CLP" a número 59990
  const digits = precio.replace(/[^0-9]/g, '');
  return Number(digits) || 0;
};

const ProductList: React.FC = () => {
  const [category, setCategory] = useState('Todas');
  const [sort, setSort] = useState<'none' | 'asc' | 'desc'>('none');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.categoria)));
    return ['Todas', ...cats];
  }, []);

  const filtered = useMemo(() => {
    let items = products.slice();
    if (category !== 'Todas') items = items.filter((p) => p.categoria === category);
    if (sort === 'asc') items = items.sort((a, b) => parsePrice(a.precio) - parsePrice(b.precio));
    if (sort === 'desc') items = items.sort((a, b) => parsePrice(b.precio) - parsePrice(a.precio));
    return items;
  }, [category, sort]);

  return (
    <section>
      <div className="product-list-header" style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}>
        <h2>Catálogo de Productos</h2>

        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <label style={{fontSize:12,color:'var(--color-texto-secundario)'}}>Categoría</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <label style={{fontSize:12,color:'var(--color-texto-secundario)'}}>Orden</label>
          <select value={sort} onChange={(e) => setSort(e.target.value as 'none' | 'asc' | 'desc')}>
            <option value="none">Por defecto</option>
            <option value="asc">Precio: menor → mayor</option>
            <option value="desc">Precio: mayor → menor</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {filtered.map((product) => (
          <ProductCard key={product.codigo} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
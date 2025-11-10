import React, { useMemo, useState, useEffect } from 'react';
import type { Product } from '../types';
import { getProducts } from '../api/productApi'; // Importa desde la API simulada
import ProductCard from './ProductCard';
import { parsePrice } from '../utils/price'; // Importa la función parsePrice

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('Todas');
  const [sort, setSort] = useState<'none' | 'asc' | 'desc'>('none');

  // Hook useEffect para cargar datos al montar el componente
  useEffect(() => {
    setLoading(true);
    getProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar productos: ", err);
        setLoading(false);
      });
  }, []); // El array vacío asegura que se ejecute solo una vez

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.categoria)));
    return ['Todas', ...cats];
  }, [products]);

  const filtered = useMemo(() => {
    let items = products.slice();
    if (category !== 'Todas') items = items.filter((p) => p.categoria === category);
    if (sort === 'asc') items = items.sort((a, b) => parsePrice(a.precio) - parsePrice(b.precio));
    if (sort === 'desc') items = items.sort((a, b) => parsePrice(b.precio) - parsePrice(a.precio));
    return items;
  }, [category, sort, products]);

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

      {/* Indicador de carga */}
      {loading && <p>Cargando productos...</p>}

      <div className="product-grid">
        {!loading && filtered.map((product) => (
          <ProductCard key={product.codigo} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
import React, { Suspense, useEffect, useState } from 'react';
import { Droplets } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import { useLanguage } from '../../hooks/useLanguage';
import type { TranslationKey } from '../../contexts/language';

const SprinklerScene3D = React.lazy(() => import('./components/SprinklerScene3D'));

// El "value" es el que se guarda en la base de datos (siempre en español,
// no se traduce); el "labelKey" es solo lo que se muestra en pantalla.
const CATEGORIES: { value: string; labelKey: TranslationKey }[] = [
  { value: 'Todas', labelKey: 'catTodas' },
  { value: 'Tuberías y Conexiones', labelKey: 'catTuberias' },
  { value: 'Válvulas', labelKey: 'catValvulas' },
  { value: 'Electrobombas y Tanques', labelKey: 'catElectrobombas' },
  { value: 'Sistemas de Riego', labelKey: 'catRiego' },
  { value: 'Accesorios Eléctricos', labelKey: 'catElectricos' },
  { value: 'Filtros', labelKey: 'catFiltros' },
  { value: 'Ferretería y Otros', labelKey: 'catFerreteria' },
];

const Products = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Fetchear los primeros 100 para no saturar, idealmente habría paginación
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .limit(100);

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'Todas' || p.categoria === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Portada del catálogo: título a la izquierda, aspersor 3D + tarjeta de
          caudal a la derecha (oculto en móvil, igual que en el diseño original). */}
      <section className="products-hero">
        <div className="products-hero-grid container">
          <div className="products-hero-text">
            <h1>{t('productsHeaderTitle')}</h1>
            <p>{t('productsHeaderSubtitle')}</p>
          </div>

          <div className="products-hero-3d">
            <Suspense fallback={<div className="model3d-loader" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="model3d-spinner" /></div>}>
              <SprinklerScene3D />
            </Suspense>

            <div className="products-hero-flow-card">
              <div className="products-hero-flow-icon">
                <Droplets size={20} />
              </div>
              <div>
                <div className="products-hero-flow-label">{t('productsFlowRateLabel')}</div>
                <div className="products-hero-flow-value">24.5 <span>L/min</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: '4rem' }}>

        {/* Filtros */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem', background: 'var(--bg-card)', padding: '2rem', border: '4px solid var(--bg-elevated)' }}>
          <div style={{ flex: '1 1 300px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary)', fontFamily: 'Oswald', textTransform: 'uppercase' }}>{t('buscarProducto')}</label>
            <input
              type="text"
              placeholder={t('buscarProductoPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '1rem', background: 'var(--bg-dark)', border: '2px solid var(--bg-elevated)', color: 'var(--text-light)', outline: 'none' }}
            />
          </div>
          <div style={{ flex: '1 1 300px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary)', fontFamily: 'Oswald', textTransform: 'uppercase' }}>{t('filtrarCategoria')}</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ width: '100%', padding: '1rem', background: 'var(--bg-dark)', border: '2px solid var(--bg-elevated)', color: 'var(--text-light)', outline: 'none' }}
            >
              {CATEGORIES.map(c => (
                <option key={c.value} value={c.value}>{t(c.labelKey)}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', fontSize: '1.2rem', padding: '4rem 0' }}>{t('cargandoCatalogo')}</p>
        ) : (
          <>
            <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>{t('mostrandoProductos', { count: filteredProducts.length })}</p>
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card glass">
                  <div className="product-img">
                    <img
                      src={product.imagen_url || 'https://via.placeholder.com/300x200.png?text=Producto'}
                      alt={product.nombre}
                      loading="lazy"
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=400';
                      }}
                    />
                  </div>
                  <div className="product-info">
                    <span className="product-category">{product.categoria}</span>
                    <h3 className="product-name">{product.nombre}</h3>
                    <button className="btn btn-outline" style={{ width: '100%', marginTop: '1rem', padding: '0.5rem', fontSize: '1rem' }}>{t('solicitarCotizacion')}</button>
                  </div>
                </div>
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem 0' }}>{t('sinResultados')}</p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Products;

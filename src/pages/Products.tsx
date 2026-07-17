import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import { supabase } from '../supabaseClient';

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');

  const categories = [
    'Todas',
    'Tuberías y Conexiones',
    'Válvulas',
    'Electrobombas y Tanques',
    'Sistemas de Riego',
    'Accesorios Eléctricos',
    'Filtros',
    'Ferretería y Otros'
  ];

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
      <PageHeader title="Catálogo de Productos" subtitle="Más de 1100 productos en nuestro inventario" />
      <div className="container" style={{ paddingBottom: '4rem' }}>
        
        {/* Filtros */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem', background: '#1e293b', padding: '2rem', border: '4px solid #334155' }}>
          <div style={{ flex: '1 1 300px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary)', fontFamily: 'Oswald', textTransform: 'uppercase' }}>Buscar Producto</label>
            <input 
              type="text" 
              placeholder="Ej: Aspersor, Bomba, Tubo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '1rem', background: '#0f172a', border: '2px solid #334155', color: '#fff', outline: 'none' }} 
            />
          </div>
          <div style={{ flex: '1 1 300px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary)', fontFamily: 'Oswald', textTransform: 'uppercase' }}>Filtrar por Categoría</label>
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ width: '100%', padding: '1rem', background: '#0f172a', border: '2px solid #334155', color: '#fff', outline: 'none' }}
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', fontSize: '1.2rem', padding: '4rem 0' }}>Cargando catálogo...</p>
        ) : (
          <>
            <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>Mostrando {filteredProducts.length} productos (Top 100 resultados)</p>
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
                    <button className="btn btn-outline" style={{ width: '100%', marginTop: '1rem', padding: '0.5rem', fontSize: '1rem' }}>Solicitar Cotización</button>
                  </div>
                </div>
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem 0' }}>No se encontraron productos con esa búsqueda.</p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Products;

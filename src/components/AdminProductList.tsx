import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

interface Producto {
  id: number;
  nombre: string;
  categoria: string | null;
  imagen_url: string | null;
}

export const AdminProductList = ({ refreshKey }: { refreshKey: number }) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProductos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('productos')
      .select('id, nombre, categoria, imagen_url')
      .order('id', { ascending: false });

    if (!error) setProductos(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProductos();
  }, [refreshKey]);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este producto?')) return;
    const { error } = await supabase.from('productos').delete().eq('id', id);
    if (!error) setProductos(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '8px', border: '1px solid #334155' }}>
      <h3 style={{ fontFamily: 'Oswald', color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
        Productos Creados {!loading && `(${productos.length})`}
      </h3>

      {loading ? (
        <p style={{ color: '#94a3b8' }}>Cargando...</p>
      ) : productos.length === 0 ? (
        <p style={{ color: '#94a3b8' }}>Todavía no has agregado productos.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '500px', overflowY: 'auto' }}>
          {productos.map(p => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#0f172a', padding: '0.75rem', borderRadius: '6px', border: '1px solid #334155' }}>
              <div style={{ width: '48px', height: '48px', flexShrink: 0, borderRadius: '4px', overflow: 'hidden', background: '#1e293b' }}>
                {p.imagen_url ? (
                  <img src={p.imagen_url} alt={p.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: '#64748b', textAlign: 'center' }}>Sin foto</div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: '#fff', fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.nombre}</p>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{p.categoria}</span>
              </div>
              <button
                onClick={() => handleDelete(p.id)}
                style={{ background: 'none', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '4px', padding: '0.4rem 0.7rem', cursor: 'pointer', fontSize: '0.8rem', flexShrink: 0 }}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

interface Proyecto {
  id: number;
  titulo: string;
  tipo: string | null;
  imagen_url: string | null;
}

export const AdminProjectList = ({ refreshKey }: { refreshKey: number }) => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState<number | null>(null);

  const fetchProyectos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('proyectos')
      .select('id, titulo, tipo, imagen_url')
      .order('id', { ascending: true });

    if (!error) setProyectos(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProyectos();
  }, [refreshKey]);

  const handleImageChange = async (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const allowedTypes = ['image/webp', 'image/avif'];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert('Solo se permiten imágenes en formato .webp o .avif.');
      e.target.value = '';
      return;
    }

    setUploadingId(id);

    try {
      const fileExt = selectedFile.name.split('.').pop();
      const filePath = `${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('proyectos_imagenes')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('proyectos_imagenes')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('proyectos')
        .update({ imagen_url: publicUrlData.publicUrl })
        .eq('id', id);

      if (updateError) throw updateError;

      setProyectos(prev => prev.map(p => p.id === id ? { ...p, imagen_url: publicUrlData.publicUrl } : p));
    } catch (err: any) {
      alert('Error al subir la imagen: ' + (err.message || 'desconocido'));
    } finally {
      setUploadingId(null);
      e.target.value = '';
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este proyecto?')) return;
    const { error } = await supabase.from('proyectos').delete().eq('id', id);
    if (!error) setProyectos(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '8px', border: '1px solid #334155' }}>
      <h3 style={{ fontFamily: 'Oswald', color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
        Proyectos Creados {!loading && `(${proyectos.length})`}
      </h3>

      {loading ? (
        <p style={{ color: '#94a3b8' }}>Cargando...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '500px', overflowY: 'auto' }}>
          {proyectos.map(p => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#0f172a', padding: '0.75rem', borderRadius: '6px', border: '1px solid #334155' }}>
              <div style={{ width: '48px', height: '48px', flexShrink: 0, borderRadius: '4px', overflow: 'hidden', background: '#1e293b' }}>
                {p.imagen_url ? (
                  <img src={p.imagen_url} alt={p.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: '#64748b', textAlign: 'center' }}>Sin foto</div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: '#fff', fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.titulo}</p>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{p.tipo}</span>
              </div>
              <label style={{ flexShrink: 0, background: 'none', border: '1px solid var(--primary)', color: 'var(--primary)', borderRadius: '4px', padding: '0.4rem 0.7rem', cursor: 'pointer', fontSize: '0.8rem' }}>
                {uploadingId === p.id ? 'Subiendo...' : (p.imagen_url ? 'Cambiar foto' : 'Agregar foto')}
                <input
                  type="file"
                  accept="image/webp, image/avif"
                  onChange={(e) => handleImageChange(p.id, e)}
                  disabled={uploadingId === p.id}
                  style={{ display: 'none' }}
                />
              </label>
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

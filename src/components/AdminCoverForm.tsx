import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export const AdminCoverForm = () => {
  const [imagenUrl, setImagenUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchCover = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('imagenes_sitio')
      .select('imagen_url')
      .eq('clave', 'nosotros_cover')
      .maybeSingle();

    setImagenUrl(data?.imagen_url ?? null);
    setLoading(false);
  };

  useEffect(() => {
    fetchCover();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const allowedTypes = ['image/webp', 'image/avif'];
    if (!allowedTypes.includes(selectedFile.type)) {
      setMessage('Error: Solo se permiten imágenes en formato .webp o .avif.');
      e.target.value = '';
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const fileExt = selectedFile.name.split('.').pop();
      const filePath = `nosotros/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('sitio_imagenes')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('sitio_imagenes')
        .getPublicUrl(filePath);

      const { error: upsertError } = await supabase
        .from('imagenes_sitio')
        .upsert({ clave: 'nosotros_cover', imagen_url: publicUrlData.publicUrl });

      if (upsertError) throw upsertError;

      setImagenUrl(publicUrlData.publicUrl);
      setMessage('¡Imagen de portada actualizada!');
    } catch (err: any) {
      setMessage('Error: ' + (err.message || 'desconocido'));
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '8px', border: '1px solid #334155' }}>
      <h3 style={{ fontFamily: 'Oswald', color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.5rem' }}>Imagen de "Nosotros"</h3>
      <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Foto que aparece en la página "¿Quiénes Somos?".</p>

      {message && (
        <div style={{ padding: '1rem', marginBottom: '1rem', background: message.includes('Error') ? 'rgba(255,0,0,0.1)' : 'rgba(0,255,0,0.1)', color: message.includes('Error') ? '#ff6b6b' : '#4ade80', borderRadius: '4px' }}>
          {message}
        </div>
      )}

      {!loading && (
        <div style={{ width: '100%', height: '160px', borderRadius: '4px', overflow: 'hidden', background: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {imagenUrl ? (
            <img src={imagenUrl} alt="Portada Nosotros" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Sin imagen todavía</span>
          )}
        </div>
      )}

      <label className="btn btn-outline" style={{ display: 'inline-block', cursor: 'pointer', opacity: uploading ? 0.5 : 1 }}>
        {uploading ? 'Subiendo...' : (imagenUrl ? 'Cambiar Imagen' : 'Subir Imagen')}
        <input
          type="file"
          accept="image/webp, image/avif"
          onChange={handleFileChange}
          disabled={uploading}
          style={{ display: 'none' }}
        />
      </label>
    </div>
  );
};

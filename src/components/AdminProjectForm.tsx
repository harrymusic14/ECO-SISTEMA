import { useState } from 'react';
import { supabase } from '../supabaseClient';

export const AdminProjectForm = ({ onProjectAdded }: { onProjectAdded: () => void }) => {
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const allowedTypes = ['image/webp', 'image/avif'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setMessage('Error: Solo se permiten imágenes en formato .webp o .avif para optimizar la carga.');
        setFile(null);
        e.target.value = '';
        return;
      }
      setFile(selectedFile);
      setMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let imagenUrl = null;

      if (file) {
        const fileExt = file.name.split('.').pop();
        const filePath = `${Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('proyectos_imagenes')
          .upload(filePath, file);

        if (uploadError) {
          throw new Error('Error al subir la imagen: ' + uploadError.message);
        }

        const { data: publicUrlData } = supabase.storage
          .from('proyectos_imagenes')
          .getPublicUrl(filePath);

        imagenUrl = publicUrlData.publicUrl;
      }

      const { error: insertError } = await supabase
        .from('proyectos')
        .insert([{ titulo, tipo, descripcion, imagen_url: imagenUrl }]);

      if (insertError) {
        throw insertError;
      }

      setMessage('¡Proyecto agregado exitosamente!');
      setTitulo('');
      setTipo('');
      setDescripcion('');
      setFile(null);
      onProjectAdded();

    } catch (err: any) {
      setMessage(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '8px', border: '1px solid #334155' }}>
      <h3 style={{ fontFamily: 'Oswald', color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Agregar Nuevo Proyecto</h3>

      {message && (
        <div style={{ padding: '1rem', marginBottom: '1rem', background: message.includes('Error') ? 'rgba(255,0,0,0.1)' : 'rgba(0,255,0,0.1)', color: message.includes('Error') ? '#ff6b6b' : '#4ade80', borderRadius: '4px' }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>Título del Proyecto</label>
          <input
            type="text"
            required
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            style={{ width: '100%', padding: '0.8rem', background: '#0f172a', border: '1px solid #475569', color: 'white', borderRadius: '4px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>Tipo de Sistema</label>
          <input
            type="text"
            required
            placeholder="Ej: Sistema de Riego por Goteo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            style={{ width: '100%', padding: '0.8rem', background: '#0f172a', border: '1px solid #475569', color: 'white', borderRadius: '4px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>Descripción</label>
          <input
            type="text"
            placeholder="Ej: Centro Comercial"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            style={{ width: '100%', padding: '0.8rem', background: '#0f172a', border: '1px solid #475569', color: 'white', borderRadius: '4px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>Imagen (SOLO .webp o .avif)</label>
          <input
            type="file"
            accept="image/webp, image/avif"
            onChange={handleFileChange}
            style={{ width: '100%', padding: '0.8rem', background: '#0f172a', border: '1px dashed #475569', color: 'white', borderRadius: '4px' }}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ alignSelf: 'flex-start' }}>
          {loading ? 'Guardando...' : 'Guardar Proyecto'}
        </button>
      </form>
    </div>
  );
};

import { useState } from 'react';
import { supabase } from '../supabaseClient';

export const AdminProductForm = ({ onProductAdded }: { onProductAdded: () => void }) => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('Sistemas de Riego');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const categories = [
    'Tuberías y Conexiones',
    'Válvulas',
    'Electrobombas y Tanques',
    'Sistemas de Riego',
    'Accesorios Eléctricos',
    'Filtros',
    'Ferretería y Otros'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      
      // Validación estricta de tipo de archivo (Restricción solicitada)
      const allowedTypes = ['image/webp', 'image/avif'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setMessage('Error: Solo se permiten imágenes en formato .webp o .avif para optimizar la carga.');
        setFile(null);
        e.target.value = ''; // Limpiar el input
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

      // Si hay archivo, lo subimos al bucket "productos"
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('imagenes-productos')
          .upload(filePath, file);

        if (uploadError) {
          throw new Error('Error al subir la imagen: ' + uploadError.message);
        }

        const { data: publicUrlData } = supabase.storage
          .from('imagenes-productos')
          .getPublicUrl(filePath);
          
        imagenUrl = publicUrlData.publicUrl;
      }

      // Insertar producto en la BD
      const { error: insertError } = await supabase
        .from('productos')
        .insert([
          { nombre, categoria, imagen_url: imagenUrl }
        ]);

      if (insertError) {
        throw insertError;
      }

      setMessage('¡Producto agregado exitosamente!');
      setNombre('');
      setFile(null);
      // resetear file input es un poco complicado sin ref, omitido por simplicidad
      onProductAdded();
      
    } catch (err: any) {
      setMessage(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '8px', border: '1px solid #334155' }}>
      <h3 style={{ fontFamily: 'Oswald', color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Agregar Nuevo Producto</h3>
      
      {message && (
        <div style={{ padding: '1rem', marginBottom: '1rem', background: message.includes('Error') ? 'rgba(255,0,0,0.1)' : 'rgba(0,255,0,0.1)', color: message.includes('Error') ? '#ff6b6b' : '#4ade80', borderRadius: '4px' }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>Nombre del Producto</label>
          <input 
            type="text" 
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ width: '100%', padding: '0.8rem', background: '#0f172a', border: '1px solid #475569', color: 'white', borderRadius: '4px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>Categoría</label>
          <select 
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            style={{ width: '100%', padding: '0.8rem', background: '#0f172a', border: '1px solid #475569', color: 'white', borderRadius: '4px' }}
          >
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>Imagen (SOLO .webp o .avif)</label>
          <input 
            type="file" 
            accept="image/webp, image/avif" 
            onChange={handleFileChange}
            style={{ width: '100%', padding: '0.8rem', background: '#0f172a', border: '1px dashed #475569', color: 'white', borderRadius: '4px' }}
          />
          <small style={{ color: '#94a3b8', display: 'block', marginTop: '0.5rem' }}>* Los formatos WebP y AVIF aseguran una carga súper rápida de la página (Lazy Loading).</small>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ alignSelf: 'flex-start' }}>
          {loading ? 'Guardando...' : 'Guardar Producto'}
        </button>
      </form>
    </div>
  );
};

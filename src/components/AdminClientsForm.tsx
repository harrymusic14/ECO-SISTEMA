import { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { Loader2, Trash2, Upload, Edit2, Save, X } from 'lucide-react';

interface Cliente {
  id: number;
  nombre: string;
  logo_url: string | null;
  orden: number;
}

export const AdminClientsForm = () => {
  const [nombre, setNombre] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editNombre, setEditNombre] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const fetchClientes = async () => {
    setLoadingList(true);
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .order('orden', { ascending: true })
      .order('id', { ascending: true });
      
    if (!error && data) {
      setClientes(data);
    }
    setLoadingList(false);
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // VALIDACIÓN ESTRICTA: Solo WebP, AVIF o SVG permitidos
      const validTypes = ['image/webp', 'image/avif', 'image/svg+xml'];
      if (!validTypes.includes(file.type)) {
        setMessage({ text: 'Error: Solo se permiten imágenes en formato .webp, .avif o .svg para máxima optimización.', type: 'error' });
        e.target.value = '';
        setLogoFile(null);
        return;
      }
      setLogoFile(file);
      setMessage({ text: '', type: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      let publicUrl = null;

      if (logoFile) {
        const fileExt = logoFile.name.split('.').pop();
        const fileName = `${Date.now()}_cliente.${fileExt}`;
        const filePath = `clientes/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('sitio_imagenes')
          .upload(filePath, logoFile, { cacheControl: '3600', upsert: false });

        if (uploadError) throw uploadError;

        const { data: { publicUrl: url } } = supabase.storage
          .from('sitio_imagenes')
          .getPublicUrl(filePath);

        publicUrl = url;
      }

      // Ordenar al final
      const orden = clientes.length > 0 ? Math.max(...clientes.map(c => c.orden || 0)) + 1 : 1;

      const { error: insertError } = await supabase
        .from('clientes')
        .insert([{ nombre, logo_url: publicUrl, orden }]);

      if (insertError) throw insertError;

      setMessage({ text: 'Cliente agregado exitosamente.', type: 'success' });
      setNombre('');
      setLogoFile(null);
      
      // Limpiar input de archivo
      const fileInput = document.getElementById('clienteLogo') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      fetchClientes();
    } catch (error: any) {
      console.error(error);
      setMessage({ text: 'Error al agregar cliente: ' + (error.message || 'Desconocido'), type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Seguro que deseas eliminar este cliente?')) return;
    try {
      // Podríamos eliminar el logo de storage aquí si lo deseamos. Por brevedad, lo dejamos.
      const { error } = await supabase.from('clientes').delete().eq('id', id);
      if (error) throw error;
      fetchClientes();
    } catch (error: any) {
      alert('Error al eliminar: ' + error.message);
    }
  };

  const handleUpdateLogo = async (id: number, file: File) => {
    const validTypes = ['image/webp', 'image/avif', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      alert('Error: Solo se permiten imágenes .webp, .avif o .svg');
      return;
    }

    setUploadingId(id);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_cliente_${id}.${fileExt}`;
      const filePath = `clientes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('sitio_imagenes')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw uploadError;

      const { data: { publicUrl: url } } = supabase.storage
        .from('sitio_imagenes')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('clientes')
        .update({ logo_url: url })
        .eq('id', id);

      if (updateError) throw updateError;
      fetchClientes();
    } catch (error: any) {
      alert('Error al actualizar logo: ' + error.message);
    } finally {
      setUploadingId(null);
    }
  };

  const handleEditNombre = async (id: number) => {
    if (!editNombre.trim()) return;
    try {
      const { error } = await supabase
        .from('clientes')
        .update({ nombre: editNombre })
        .eq('id', id);
      if (error) throw error;
      setEditingId(null);
      fetchClientes();
    } catch (error: any) {
      alert('Error al actualizar nombre: ' + error.message);
    }
  };

  return (
    <div className="glass" style={{ padding: '2rem', borderRadius: '12px' }}>
      <h3 style={{ fontFamily: 'Oswald', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>
        Administrar Clientes
      </h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
            Nombre del Cliente (Obligatorio)
          </label>
          <input 
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: '#fff' }}
            placeholder="Ej. ACR Ingenieros"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
            Logo del Cliente (Opcional - <span style={{color: '#ef4444'}}>Solo .webp, .avif, .svg</span>)
          </label>
          <input 
            id="clienteLogo"
            type="file"
            accept=".webp,.avif,.svg,image/webp,image/avif,image/svg+xml"
            onChange={handleFileChange}
            style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: '#fff' }}
          />
        </div>

        {message.text && (
          <div style={{ padding: '1rem', borderRadius: '4px', background: message.type === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)', color: message.type === 'error' ? '#fca5a5' : '#6ee7b7' }}>
            {message.text}
          </div>
        )}

        <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
          {loading ? <Loader2 className="animate-spin" /> : null}
          {loading ? 'Agregando...' : 'Agregar Cliente'}
        </button>
      </form>

      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
        <h4 style={{ fontFamily: 'Oswald', marginBottom: '1rem', color: '#fff' }}>Clientes Actuales</h4>
        {loadingList ? (
          <p style={{ color: 'var(--text-muted)' }}>Cargando clientes...</p>
        ) : clientes.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No hay clientes registrados.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
            {clientes.map(c => (
              <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                  {c.logo_url ? (
                    <img src={c.logo_url} alt={c.nombre} style={{ width: '40px', height: '40px', objectFit: 'contain', flexShrink: 0 }} />
                  ) : (
                    <div style={{ width: '40px', height: '40px', background: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', borderRadius: '4px', flexShrink: 0 }}>TXT</div>
                  )}
                  {editingId === c.id ? (
                    <input 
                      type="text"
                      value={editNombre}
                      onChange={(e) => setEditNombre(e.target.value)}
                      style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid var(--primary)', background: '#1e293b', color: '#fff' }}
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleEditNombre(c.id);
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                    />
                  ) : (
                    <span style={{ fontWeight: '500', wordBreak: 'break-word' }}>{c.nombre}</span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '0.2rem' }}>
                  {editingId === c.id ? (
                    <>
                      <button 
                        onClick={() => handleEditNombre(c.id)}
                        style={{ background: 'none', border: 'none', color: '#10b981', cursor: 'pointer', padding: '0.5rem' }}
                        title="Guardar Nombre"
                      >
                        <Save size={18} />
                      </button>
                      <button 
                        onClick={() => setEditingId(null)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.5rem' }}
                        title="Cancelar"
                      >
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => { setEditingId(c.id); setEditNombre(c.nombre); }}
                      style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: '0.5rem' }}
                      title="Editar Nombre"
                    >
                      <Edit2 size={18} />
                    </button>
                  )}
                  <input
                    type="file"
                    accept=".webp,.avif,.svg,image/webp,image/avif,image/svg+xml"
                    style={{ display: 'none' }}
                    ref={el => { fileInputRefs.current[c.id] = el; }}
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleUpdateLogo(c.id, e.target.files[0]);
                      }
                      e.target.value = '';
                    }}
                  />
                  <button 
                    onClick={() => fileInputRefs.current[c.id]?.click()} 
                    style={{ background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer', padding: '0.5rem' }}
                    title="Subir / Cambiar Logo"
                    disabled={uploadingId === c.id}
                  >
                    {uploadingId === c.id ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                  </button>
                  <button 
                    onClick={() => handleDelete(c.id)} 
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem' }}
                    title="Eliminar Cliente"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

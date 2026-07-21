import { useEffect, useRef, useState } from 'react';
import { supabase } from '../supabaseClient';

const MAX_VIDEO_MB = 60;

interface ShowcaseVideo {
  id: number;
  video_url: string;
  titulo: string | null;
  orden: number;
}

export const AdminVideosForm = () => {
  const [videos, setVideos] = useState<ShowcaseVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const dragId = useRef<number | null>(null);

  const fetchVideos = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('showcase_videos')
      .select('id, video_url, titulo, orden')
      .order('orden', { ascending: true });
    setVideos(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const allowedTypes = ['video/webm'];
    if (!allowedTypes.includes(selectedFile.type)) {
      setMessage('Error: Solo se permiten videos en formato optimizado (.webm).');
      e.target.value = '';
      return;
    }

    if (selectedFile.size > MAX_VIDEO_MB * 1024 * 1024) {
      setMessage(`Error: el video pesa ${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB. Comprímelo a menos de ${MAX_VIDEO_MB} MB.`);
      e.target.value = '';
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const fileExt = selectedFile.name.split('.').pop();
      const filePath = `showcase/video_${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('sitio_imagenes')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('sitio_imagenes')
        .getPublicUrl(filePath);

      const nextOrden = videos.length > 0 ? Math.max(...videos.map((v) => v.orden)) + 1 : 0;

      const { data: inserted, error: insertError } = await supabase
        .from('showcase_videos')
        .insert({ video_url: publicUrlData.publicUrl, titulo: '', orden: nextOrden })
        .select('id, video_url, titulo, orden')
        .single();

      if (insertError) throw insertError;

      setVideos((prev) => [...prev, inserted]);
      setMessage('¡Video agregado!');
    } catch (err: any) {
      setMessage('Error: ' + (err.message || 'desconocido'));
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleTitleChange = (id: number, titulo: string) => {
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, titulo } : v)));
  };

  const handleTitleBlur = async (id: number, titulo: string) => {
    await supabase.from('showcase_videos').update({ titulo }).eq('id', id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este video?')) return;
    const { error } = await supabase.from('showcase_videos').delete().eq('id', id);
    if (!error) setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  const persistOrder = async (ordered: ShowcaseVideo[]) => {
    setVideos(ordered);
    await Promise.all(ordered.map((v, idx) => supabase.from('showcase_videos').update({ orden: idx }).eq('id', v.id)));
  };

  const handleDragStart = (id: number) => {
    dragId.current = id;
  };
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (targetId: number) => {
    const sourceId = dragId.current;
    dragId.current = null;
    if (sourceId === null || sourceId === targetId) return;

    const current = [...videos];
    const fromIdx = current.findIndex((v) => v.id === sourceId);
    const toIdx = current.findIndex((v) => v.id === targetId);
    if (fromIdx === -1 || toIdx === -1) return;

    const [moved] = current.splice(fromIdx, 1);
    current.splice(toIdx, 0, moved);
    persistOrder(current);
  };

  return (
    <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '8px', border: '1px solid #334155' }}>
      <h3 style={{ fontFamily: 'Oswald', color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.5rem' }}>Videos (sección "Nuestros Productos en Acción")</h3>
      <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
        Videos cortos grabados con celular — arrastra uno en la lista para cambiar el orden.
      </p>

      {message && (
        <div style={{ padding: '1rem', marginBottom: '1.5rem', background: message.includes('Error') ? 'rgba(255,0,0,0.1)' : 'rgba(0,255,0,0.1)', color: message.includes('Error') ? '#ff6b6b' : '#4ade80', borderRadius: '4px' }}>
          {message}
        </div>
      )}

      {!loading && videos.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
          {videos.map((v, idx) => (
            <div
              key={v.id}
              draggable
              onDragStart={() => handleDragStart(v.id)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(v.id)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#0f172a', padding: '0.6rem', borderRadius: '6px', border: '1px solid #334155', cursor: 'grab' }}
            >
              <span style={{ color: '#64748b', fontSize: '1.1rem' }}>⠿</span>
              <span style={{ color: 'var(--primary)', fontFamily: 'Oswald', fontSize: '0.85rem', width: '18px' }}>{idx + 1}</span>
              <video src={v.video_url} muted preload="none" style={{ width: '48px', height: '64px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Título (opcional)"
                value={v.titulo ?? ''}
                onChange={(e) => handleTitleChange(v.id, e.target.value)}
                onBlur={(e) => handleTitleBlur(v.id, e.target.value)}
                style={{ flex: 1, minWidth: 0, padding: '0.5rem', background: '#1e293b', border: '1px solid #334155', color: 'white', borderRadius: '4px', fontSize: '0.85rem' }}
              />
              <button
                onClick={() => handleDelete(v.id)}
                style={{ background: 'none', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '4px', padding: '0.3rem 0.6rem', cursor: 'pointer', fontSize: '0.75rem', flexShrink: 0 }}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}

      {!loading && videos.length === 0 && (
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>Todavía no has subido ningún video.</p>
      )}

      <label className="btn btn-outline" style={{ display: 'inline-block', cursor: 'pointer', opacity: uploading ? 0.5 : 1, fontSize: '0.9rem' }}>
        {uploading ? 'Subiendo...' : 'Agregar Video'}
        <input
          type="file"
          accept="video/webm"
          onChange={handleVideoChange}
          disabled={uploading}
          style={{ display: 'none' }}
        />
      </label>
      <small style={{ color: '#94a3b8', display: 'block', marginTop: '0.5rem' }}>.webm, máx {MAX_VIDEO_MB} MB cada uno</small>
    </div>
  );
};

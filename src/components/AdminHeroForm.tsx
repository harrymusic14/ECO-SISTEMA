import { useEffect, useRef, useState } from 'react';
import { supabase } from '../supabaseClient';

const MAX_VIDEO_MB = 60;

interface HeroVideo {
  id: number;
  video_url: string;
  orden: number;
}

export const AdminHeroForm = () => {
  const [videos, setVideos] = useState<HeroVideo[]>([]);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingPoster, setUploadingPoster] = useState(false);
  const [message, setMessage] = useState('');
  const dragId = useRef<number | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    const [videosRes, posterRes] = await Promise.all([
      supabase.from('hero_videos').select('id, video_url, orden').order('orden', { ascending: true }),
      supabase.from('imagenes_sitio').select('imagen_url').eq('clave', 'home_hero').maybeSingle(),
    ]);

    setVideos(videosRes.data || []);
    setPosterUrl(posterRes.data?.imagen_url ?? null);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
    if (!allowedTypes.includes(selectedFile.type)) {
      setMessage('Error: Solo se permiten videos en formato .mp4, .mov o .webm.');
      e.target.value = '';
      return;
    }

    if (selectedFile.size > MAX_VIDEO_MB * 1024 * 1024) {
      setMessage(`Error: El video pesa ${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB. Comprímelo a menos de ${MAX_VIDEO_MB} MB.`);
      e.target.value = '';
      return;
    }

    setUploadingVideo(true);
    setMessage('');

    try {
      const fileExt = selectedFile.name.split('.').pop();
      const filePath = `home/video_${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('sitio_imagenes')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('sitio_imagenes')
        .getPublicUrl(filePath);

      const nextOrden = videos.length > 0 ? Math.max(...videos.map(v => v.orden)) + 1 : 0;

      const { data: inserted, error: insertError } = await supabase
        .from('hero_videos')
        .insert({ video_url: publicUrlData.publicUrl, orden: nextOrden })
        .select('id, video_url, orden')
        .single();

      if (insertError) throw insertError;

      setVideos(prev => [...prev, inserted]);
      setMessage('¡Video agregado a la lista!');
    } catch (err: any) {
      setMessage('Error: ' + (err.message || 'desconocido'));
    } finally {
      setUploadingVideo(false);
      e.target.value = '';
    }
  };

  const handleDeleteVideo = async (id: number) => {
    if (!confirm('¿Eliminar este video de la portada?')) return;
    const { error } = await supabase.from('hero_videos').delete().eq('id', id);
    if (!error) setVideos(prev => prev.filter(v => v.id !== id));
  };

  const persistOrder = async (ordered: HeroVideo[]) => {
    setVideos(ordered);
    await Promise.all(
      ordered.map((v, idx) => supabase.from('hero_videos').update({ orden: idx }).eq('id', v.id))
    );
  };

  const handleDragStart = (id: number) => {
    dragId.current = id;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetId: number) => {
    const sourceId = dragId.current;
    dragId.current = null;
    if (sourceId === null || sourceId === targetId) return;

    const current = [...videos];
    const fromIdx = current.findIndex(v => v.id === sourceId);
    const toIdx = current.findIndex(v => v.id === targetId);
    if (fromIdx === -1 || toIdx === -1) return;

    const [moved] = current.splice(fromIdx, 1);
    current.splice(toIdx, 0, moved);
    persistOrder(current);
  };

  const handlePosterChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const allowedTypes = ['image/webp', 'image/avif'];
    if (!allowedTypes.includes(selectedFile.type)) {
      setMessage('Error: Solo se permiten imágenes en formato .webp o .avif.');
      e.target.value = '';
      return;
    }

    setUploadingPoster(true);
    setMessage('');

    try {
      const fileExt = selectedFile.name.split('.').pop();
      const filePath = `home/poster_${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('sitio_imagenes')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('sitio_imagenes')
        .getPublicUrl(filePath);

      const { error: upsertError } = await supabase
        .from('imagenes_sitio')
        .upsert({ clave: 'home_hero', imagen_url: publicUrlData.publicUrl });

      if (upsertError) throw upsertError;

      setPosterUrl(publicUrlData.publicUrl);
      setMessage('¡Imagen de portada actualizada!');
    } catch (err: any) {
      setMessage('Error: ' + (err.message || 'desconocido'));
    } finally {
      setUploadingPoster(false);
      e.target.value = '';
    }
  };

  return (
    <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '8px', border: '1px solid #334155' }}>
      <h3 style={{ fontFamily: 'Oswald', color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.5rem' }}>Portada de Inicio (Videos)</h3>
      <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
        Los videos se reproducen en orden, uno tras otro en loop. Arrastra un video en la lista para cambiar el orden — el primero de la lista es el que se reproduce primero.
      </p>

      {message && (
        <div style={{ padding: '1rem', marginBottom: '1.5rem', background: message.includes('Error') ? 'rgba(255,0,0,0.1)' : 'rgba(0,255,0,0.1)', color: message.includes('Error') ? '#ff6b6b' : '#4ade80', borderRadius: '4px' }}>
          {message}
        </div>
      )}

      <div style={{ marginBottom: '2rem' }}>
        <p style={{ color: '#cbd5e1', marginBottom: '0.75rem', fontSize: '0.9rem' }}>Videos de fondo ({videos.length})</p>

        {!loading && videos.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
            {videos.map((v, idx) => (
              <div
                key={v.id}
                draggable
                onDragStart={() => handleDragStart(v.id)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(v.id)}
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#0f172a', padding: '0.6rem', borderRadius: '6px', border: '1px solid #334155', cursor: 'grab' }}
              >
                <span style={{ color: '#64748b', fontSize: '1.1rem' }}>⠿</span>
                <span style={{ color: 'var(--primary)', fontFamily: 'Oswald', fontSize: '0.85rem', width: '20px' }}>{idx + 1}</span>
                <video src={v.video_url} muted style={{ width: '64px', height: '40px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }} />
                <span style={{ color: '#94a3b8', fontSize: '0.8rem', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {idx === 0 ? 'Se reproduce primero' : `Video ${idx + 1}`}
                </span>
                <button
                  onClick={() => handleDeleteVideo(v.id)}
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

        <label className="btn btn-outline" style={{ display: 'inline-block', cursor: 'pointer', opacity: uploadingVideo ? 0.5 : 1, fontSize: '0.9rem' }}>
          {uploadingVideo ? 'Subiendo...' : 'Agregar Video'}
          <input
            type="file"
            accept="video/mp4, video/webm, video/quicktime"
            onChange={handleVideoChange}
            disabled={uploadingVideo}
            style={{ display: 'none' }}
          />
        </label>
        <small style={{ color: '#94a3b8', display: 'block', marginTop: '0.5rem' }}>.mp4, .mov o .webm, máx {MAX_VIDEO_MB} MB cada uno</small>
      </div>

      <div>
        <p style={{ color: '#cbd5e1', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Imagen de respaldo (poster)</p>
        {!loading && (
          <div style={{ width: '160px', height: '90px', borderRadius: '4px', overflow: 'hidden', background: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {posterUrl ? (
              <img src={posterUrl} alt="Poster portada" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ color: '#64748b', fontSize: '0.8rem' }}>Sin imagen</span>
            )}
          </div>
        )}
        <label className="btn btn-outline" style={{ display: 'inline-block', cursor: 'pointer', opacity: uploadingPoster ? 0.5 : 1, fontSize: '0.9rem' }}>
          {uploadingPoster ? 'Subiendo...' : (posterUrl ? 'Cambiar Imagen' : 'Subir Imagen')}
          <input
            type="file"
            accept="image/webp, image/avif"
            onChange={handlePosterChange}
            disabled={uploadingPoster}
            style={{ display: 'none' }}
          />
        </label>
        <small style={{ color: '#94a3b8', display: 'block', marginTop: '0.5rem' }}>.webp o .avif</small>
      </div>
    </div>
  );
};

import { useEffect, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { buildExtended, useLoopCarousel } from '../hooks/useLoopCarousel';

interface ShowcaseVideo {
  id: number;
  video_url: string;
  titulo: string | null;
}

const BUFFER = 6;

const VideosSection = () => {
  const [videos, setVideos] = useState<ShowcaseVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<ShowcaseVideo | null>(null);
  const videoRefs = useRef(new Map<number, HTMLVideoElement>());

  useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await supabase
        .from('showcase_videos')
        .select('id, video_url, titulo')
        .order('orden', { ascending: true });
      setVideos(data || []);
      setLoading(false);
    };
    fetchVideos();
  }, []);

  // Modal propio en vez de la API nativa de pantalla completa (poco
  // confiable entre navegadores): bloquea el scroll de fondo y permite
  // cerrar con Escape mientras está abierto.
  useEffect(() => {
    if (!expanded) return;
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpanded(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [expanded]);

  const extended = buildExtended(videos, BUFFER);
  const { viewportRef, index, trackStyle, movedRef, goToSlide, viewportHandlers } = useLoopCarousel({
    itemCount: videos.length || 1,
    buffer: BUFFER,
    autoAdvanceMs: 3000,
    storageKey: 'videos-carousel-index',
  });

  // Estilo "shorts": solo el video centrado se reproduce (en loop), el resto
  // se pausa y vuelve al inicio, como en TikTok/Reels. Depende también de
  // `videos`: al cargar, `index` ya tiene su valor inicial antes de que
  // lleguen los videos de Supabase, así que sin esta dependencia el efecto
  // nunca se vuelve a ejecutar cuando los <video> reales aparecen en el DOM.
  useEffect(() => {
    videoRefs.current.forEach((el, i) => {
      if (i === index) {
        el.currentTime = 0;
        el.play().catch(() => {});
      } else {
        el.pause();
        el.currentTime = 0;
      }
    });
  }, [index, videos]);

  const realIndex = videos.length > 0 ? (((index - BUFFER) % videos.length) + videos.length) % videos.length : 0;

  return (
    <section className="help-section">
      <div className="container">
        <h2 className="dashed-title">
          <span className="dashed-title-line" />
          Nuestros Productos en Acción
          <span className="dashed-title-line" />
        </h2>
      </div>

      {!loading && videos.length === 0 && (
        <div className="container">
          <p className="cert-caption">Próximamente: clips reales grabados en campo durante nuestras instalaciones.</p>
        </div>
      )}

      {videos.length > 0 && (
        <div ref={viewportRef} className="carousel-viewport" {...viewportHandlers}>
          <div className="carousel-track video-carousel-track" style={trackStyle}>
            {extended.map((video, i) => {
              const isActive = i === index;
              return (
                <div
                  key={i}
                  className={`carousel-slide video-slide ${isActive ? 'active' : ''}`}
                  onClick={() => { if (!movedRef.current) goToSlide(i); }}
                >
                  <div className="video-card">
                    <video
                      ref={(el) => {
                        if (el) videoRefs.current.set(i, el);
                        else videoRefs.current.delete(i);
                      }}
                      src={video.video_url}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      draggable={false}
                      className="video-card-media"
                    />
                    {isActive && (
                      <button
                        type="button"
                        className="video-card-expand"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => { e.stopPropagation(); setExpanded(video); }}
                        aria-label="Ver en pantalla completa"
                      >
                        <Maximize2 size={16} />
                      </button>
                    )}
                    {video.titulo && <span className="video-card-title">{video.titulo}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {videos.length > 1 && (
        <div className="video-carousel-dots">
          {videos.map((v, i) => (
            <button
              key={v.id}
              type="button"
              className={`video-carousel-dot ${i === realIndex ? 'active' : ''}`}
              onClick={() => goToSlide(BUFFER + i)}
              aria-label={`Ver video ${i + 1}`}
            />
          ))}
        </div>
      )}

      {videos.length > 0 && (
        <div className="container">
          <p className="cert-caption">
            Así se ve nuestro trabajo en campo — clips reales grabados durante las instalaciones y el mantenimiento.
          </p>
        </div>
      )}

      {expanded && (
        <div className="video-modal" onClick={() => setExpanded(null)}>
          <button
            type="button"
            className="video-modal-close"
            onClick={() => setExpanded(null)}
            aria-label="Cerrar"
          >
            <X size={22} />
          </button>
          <video
            key={expanded.id}
            src={expanded.video_url}
            controls
            autoPlay
            playsInline
            className="video-modal-media"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default VideosSection;

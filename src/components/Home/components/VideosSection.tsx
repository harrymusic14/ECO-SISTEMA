import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { buildExtended, useLoopCarousel } from '../../../hooks/useLoopCarousel';
import { useLanguage } from '../../../hooks/useLanguage';

interface ShowcaseVideo {
  id: number;
  video_url: string;
  titulo: string | null;
}

const BUFFER = 6;

// Videos locales (public/assets/videos/showcase/), ya no se cargan desde Supabase.
const VIDEOS: ShowcaseVideo[] = [
  { id: 1, video_url: '/assets/videos/showcase/showcase-1.webm', titulo: null },
  { id: 2, video_url: '/assets/videos/showcase/showcase-2.webm', titulo: null },
  { id: 3, video_url: '/assets/videos/showcase/showcase-3.webm', titulo: null },
  { id: 4, video_url: '/assets/videos/showcase/showcase-4.webm', titulo: null },
  { id: 5, video_url: '/assets/videos/showcase/showcase-5.webm', titulo: null },
  { id: 6, video_url: '/assets/videos/showcase/showcase-6.webm', titulo: null },
  { id: 7, video_url: '/assets/videos/showcase/showcase-7.webm', titulo: null },
];

const VideosSection = () => {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<ShowcaseVideo | null>(null);
  const videoRefs = useRef(new Map<number, HTMLVideoElement>());

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

  const extended = buildExtended(VIDEOS, BUFFER);
  const { viewportRef, index, trackStyle, movedRef, goToSlide, viewportHandlers } = useLoopCarousel({
    itemCount: VIDEOS.length,
    buffer: BUFFER,
    autoAdvanceMs: 3000,
    storageKey: 'videos-carousel-index',
  });

  // Estilo "shorts": solo el video centrado se reproduce (en loop), el resto
  // se pausa y vuelve al inicio, como en TikTok/Reels.
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
  }, [index]);

  const realIndex = (((index - BUFFER) % VIDEOS.length) + VIDEOS.length) % VIDEOS.length;

  return (
    <section className="help-section">
      <div className="container">
        <h2 className="dashed-title">
          <span className="dashed-title-line" />
          {t('videosSectionTitle')}
          <span className="dashed-title-line" />
        </h2>
      </div>

      <div ref={viewportRef} className="carousel-viewport" {...viewportHandlers}>
        <div className="carousel-track video-carousel-track" style={trackStyle}>
          {extended.map((video, i) => {
            const isActive = i === index;
            return (
              <div
                key={i}
                className={`carousel-slide video-slide ${isActive ? 'active' : ''}`}
                onClick={() => {
                  if (movedRef.current) return;
                  if (isActive) setExpanded(video);
                  else goToSlide(i);
                }}
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
                  {video.titulo && <span className="video-card-title">{video.titulo}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="video-carousel-dots">
        {VIDEOS.map((v, i) => (
          <button
            key={v.id}
            type="button"
            className={`video-carousel-dot ${i === realIndex ? 'active' : ''}`}
            onClick={() => goToSlide(BUFFER + i)}
            aria-label={`Ver video ${i + 1}`}
          />
        ))}
      </div>

      <div className="container">
        <p className="cert-caption">
          {t('videosSectionCaption')}
        </p>
      </div>

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

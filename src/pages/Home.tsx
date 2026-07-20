
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import FeaturedProducts from '../components/FeaturedProducts';
import PumpsShowcase from '../components/PumpsShowcase';
import HelpSection from '../components/HelpSection';
import VideosSection from '../components/VideosSection';
import Reveal from '../components/Reveal';

const Home = () => {
  const [heroVideos, setHeroVideos] = useState<string[]>([]);
  const [heroPoster, setHeroPoster] = useState<string | undefined>(undefined);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const fetchHero = async () => {
      const [videosRes, posterRes] = await Promise.all([
        supabase.from('hero_videos').select('video_url').order('orden', { ascending: true }),
        supabase.from('imagenes_sitio').select('imagen_url').eq('clave', 'home_hero').maybeSingle(),
      ]);

      if (videosRes.data) setHeroVideos(videosRes.data.map(v => v.video_url));
      if (posterRes.data?.imagen_url) setHeroPoster(posterRes.data.imagen_url);
    };

    fetchHero();
  }, []);

  const handleVideoEnded = () => {
    setCurrentVideoIndex(prev => (prev + 1) % heroVideos.length);
  };

  const currentVideo = heroVideos[currentVideoIndex];

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <video
          key={currentVideo}
          className="hero-video-bg"
          autoPlay
          loop={heroVideos.length <= 1}
          muted
          playsInline
          preload="metadata"
          poster={heroPoster}
          onEnded={handleVideoEnded}
        >
          {currentVideo && <source src={currentVideo} type="video/mp4" />}
        </video>
        <div className="hero-overlay"></div>
        
        <div className="container">
          <div className="hero-content">
            <h1>Soluciones en <span>Sistemas de Riego</span></h1>
            <p>Más de 20 años instalando sistemas de riego tecnificado por Aspersión, Microaspersión, Goteo y Nebulización para residencias, edificios, parques, centros comerciales y campos agrícolas.</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="/productos" className="btn btn-primary">Catálogo</a>
              <a href="/contacto" className="btn btn-outline">Contáctanos</a>
            </div>
          </div>
        </div>
      </section>

      <FeaturedProducts />

      <PumpsShowcase />

      <Reveal><HelpSection /></Reveal>

      <Reveal><VideosSection /></Reveal>

      {/* Marcas Section */}
      <Reveal className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2 className="section-title" style={{ marginTop: '0' }}>Nuestras <span>Marcas</span></h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem', alignItems: 'center', marginTop: '2rem' }}>
          <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '8px' }}>
            <h3 style={{ color: '#000', fontFamily: 'Oswald', fontSize: '2rem' }}>DIG</h3>
            <span style={{ color: '#666' }}>water matters</span>
          </div>
          <div style={{ padding: '1.5rem', background: '#005a8b', borderRadius: '8px' }}>
            <h3 style={{ color: '#fff', fontFamily: 'Oswald', fontSize: '2rem' }}>Hunter</h3>
          </div>
          <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '8px' }}>
            <h3 style={{ color: '#000', fontFamily: 'Oswald', fontSize: '2rem' }}>RAIN<span style={{ color: 'var(--primary-dark)' }}>PRO</span></h3>
          </div>
          <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '8px', border: '2px solid #333' }}>
            <h3 style={{ color: '#000', fontFamily: 'Oswald', fontSize: '2rem' }}>WASSERMANN</h3>
          </div>
          <div style={{ padding: '1.5rem', background: '#0a3d91', borderRadius: '8px' }}>
            <h3 style={{ color: '#ffe600', fontFamily: 'Oswald', fontSize: '2rem' }}>TUBOPLAST</h3>
          </div>
        </div>
      </Reveal>

      <Reveal className="container" style={{ marginBottom: '4rem' }}>
        <div className="glass" style={{ padding: '3rem', borderLeft: '4px solid var(--primary)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>¿Buscas soluciones en sistemas de riego?</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
            Somos una empresa peruana con más de 20 años de experiencia ofreciendo productos de alta calidad y servicios de asesoría, instalación y diseño para todo tipo de proyectos.
          </p>
          <a href="/nosotros" className="btn btn-primary">Conócenos más</a>
        </div>
      </Reveal>
    </>
  );
};

export default Home;

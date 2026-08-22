
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import FeaturedProducts from './components/FeaturedProducts';
import PumpsShowcase from './components/PumpsShowcase';
import HelpSection from './components/HelpSection';
import VideosSection from './components/VideosSection';
import Reveal from './components/Reveal';
import { useLanguage } from '../../hooks/useLanguage';
import type { Language } from '../../contexts/language';

// Hero con fotos en transición (en espera de los nuevos videos que se van a
// grabar). Cada foto trae su propio título, descripción y posición de texto
// — al cambiar la foto, cambian con ella (de centro, a izquierda, a derecha).
const HERO_SLIDES: Record<Language, { image: string; title: React.ReactNode; description: string; position: 'left' | 'center' | 'right' }[]> = {
  es: [
    {
      image: '/assets/fotos/inicio/portada/lumin-osity-6DMht7wYt6g-unsplash.webp',
      title: <>Riego <span>Agrícola</span></>,
      description: 'Sistemas de riego tecnificado que maximizan el rendimiento de tus cultivos, campo tras campo.',
      position: 'center',
    },
    {
      image: '/assets/fotos/inicio/portada/parque_aspersores_hd.webp',
      title: <>Riego para <span>Parques y Jardines</span></>,
      description: 'Cobertura uniforme para áreas verdes exuberantes, todo el año.',
      position: 'left',
    },
    {
      image: '/assets/fotos/inicio/portada/tilak-teja-S-LAOuZV6vA-unsplash.webp',
      title: <>Proyectos <span>Integrales</span></>,
      description: 'Diseño e instalación de sistemas hidráulicos de alta eficiencia para la industria y la construcción.',
      position: 'right',
    },
  ],
  en: [
    {
      image: '/assets/fotos/inicio/portada/lumin-osity-6DMht7wYt6g-unsplash.webp',
      title: <>Agricultural <span>Irrigation</span></>,
      description: 'Advanced irrigation systems that maximize your crop yield, field after field.',
      position: 'center',
    },
    {
      image: '/assets/fotos/inicio/portada/parque_aspersores_hd.webp',
      title: <>Irrigation for <span>Parks and Gardens</span></>,
      description: 'Uniform coverage for lush green areas, all year round.',
      position: 'left',
    },
    {
      image: '/assets/fotos/inicio/portada/tilak-teja-S-LAOuZV6vA-unsplash.webp',
      title: <>Integral <span>Projects</span></>,
      description: 'Design and installation of high-efficiency hydraulic systems for industry and construction.',
      position: 'right',
    },
  ],
};

const HERO_JUSTIFY: Record<'left' | 'center' | 'right', string> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const HERO_SLIDE_MS = 6000;

const Home = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const { language, t } = useLanguage();
  const slides = HERO_SLIDES[language];

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % slides.length);
    }, HERO_SLIDE_MS);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[slideIndex];

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        {slides.map((s, i) => (
          <div
            key={s.image}
            className={`hero-bg-photo ${i === slideIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${s.image})` }}
          />
        ))}
        <div className={`hero-overlay hero-overlay-${slide.position}`}></div>

        <div className="container" style={{ display: 'flex', justifyContent: HERO_JUSTIFY[slide.position] }}>
          <div className="hero-content" key={slideIndex} style={{ textAlign: slide.position }}>
            <h1>{slide.title}</h1>
            <p>{slide.description}</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: HERO_JUSTIFY[slide.position] }}>
              <a href="/assets/catalogos/ecosistema.pdf" download className="btn btn-primary">{t('heroBtnCatalog')}</a>
              <Link to="/contacto" className="btn btn-outline">{t('heroBtnContact')}</Link>
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
        <h2 className="section-title" style={{ marginTop: '0' }}>{t('homeMarcasTitle1')} <span>{t('homeMarcasTitle2')}</span> {t('homeMarcasTitle3')}</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem', alignItems: 'center', marginTop: '2rem' }}>
          <div style={{ padding: '1.5rem', background: 'var(--bg-card)', borderRadius: '8px' }}>
            <h3 style={{ color: '#0194d3', fontFamily: 'Oswald', fontSize: '2rem' }}>DIG</h3>
            <span style={{ color: 'var(--text-muted)' }}>water matters</span>
          </div>
          <div style={{ padding: '1.5rem', background: '#005a8b', borderRadius: '8px' }}>
            <h3 style={{ color: '#fff', fontFamily: 'Oswald', fontSize: '2rem' }}>Hunter</h3>
          </div>
          <div style={{ padding: '1.5rem', background: 'var(--bg-card)', borderRadius: '8px' }}>
            <h3 style={{ fontFamily: 'Oswald', fontSize: '2rem', fontStyle: 'italic', fontWeight: 700 }}>
              <span style={{ color: '#1b2f5e' }}>RAIN</span>
              <span style={{ color: '#8b9bd1' }}>PRO</span>
              <span style={{ color: '#1b2f5e' }}>-HIT</span>
            </h3>
          </div>
          <div style={{ padding: '1.5rem', background: 'var(--bg-card)', borderRadius: '8px' }}>
            <h3 style={{ color: '#00843d', fontFamily: 'Oswald', fontSize: '2rem', fontStyle: 'italic' }}>Rain Bird</h3>
          </div>
          <div style={{ padding: '1.5rem', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ color: 'var(--text-light)', fontFamily: 'Oswald', fontSize: '2rem' }}>WASSERMANN</h3>
          </div>
          <div style={{ padding: '1.5rem', background: '#0a3d91', borderRadius: '8px' }}>
            <h3 style={{ color: '#ffe600', fontFamily: 'Oswald', fontSize: '2rem' }}>TUBOPLAST</h3>
          </div>
        </div>
      </Reveal>

      <Reveal className="container" style={{ marginBottom: '4rem' }}>
        <div className="glass" style={{ padding: '3rem', borderLeft: '4px solid var(--primary)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{t('homeCtaTitle')}</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
            {t('homeCtaText')}
          </p>
          <Link to="/nosotros" className="btn btn-primary">{t('homeCtaBtn')}</Link>
        </div>
      </Reveal>
    </>
  );
};

export default Home;

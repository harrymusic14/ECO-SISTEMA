import { useEffect, useState, useRef } from 'react';
import { Link, useLoaderData } from 'react-router';
import { useInView, useSpring } from 'framer-motion';
import { ShieldCheck, Users, Droplets, Trophy } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import { buildExtended, useLoopCarousel } from '../../hooks/useLoopCarousel';
import { useLanguage } from '../../hooks/useLanguage';
import type { Language } from '../../contexts/language';

const Counter = ({ end, suffix = '' }: { end: number, suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [value, setValue] = useState(0);
  const spring = useSpring(0, { bounce: 0, duration: 2500 });

  useEffect(() => {
    if (isInView) {
      spring.set(end);
    }
  }, [isInView, end, spring]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      setValue(Math.floor(latest));
    });
  }, [spring]);

  return <span ref={ref}>{value}{suffix}</span>;
};

const TIMELINE_DATA: Record<Language, { year: string; title: string; desc: string }[]> = {
  es: [
    { year: '2001', title: 'Fundación', desc: 'Iniciamos operaciones en Perú, dedicados a la instalación de sistemas de riego residencial.' },
    { year: '2010', title: 'Expansión Comercial', desc: 'Ampliamos nuestros servicios a edificios multifamiliares y centros comerciales de gran escala.' },
    { year: '2015', title: 'Alianzas Estratégicas', desc: 'Nos convertimos en distribuidores de marcas líderes mundiales en tecnología de riego.' },
    { year: '2023', title: 'Innovación Agrícola', desc: 'Integración de sistemas de automatización avanzada para riego agrícola y deportivo.' },
  ],
  en: [
    { year: '2001', title: 'Founded', desc: 'We began operations in Peru, focused on installing residential irrigation systems.' },
    { year: '2010', title: 'Commercial Expansion', desc: 'We expanded our services to multi-family buildings and large-scale shopping centers.' },
    { year: '2015', title: 'Strategic Partnerships', desc: 'We became distributors of leading global brands in irrigation technology.' },
    { year: '2023', title: 'Agricultural Innovation', desc: 'Integration of advanced automation systems for agricultural and sports irrigation.' },
  ],
};

const FEATURES_DATA: Record<Language, { title: string; desc: string }[]> = {
  es: [
    { title: 'Calidad Garantizada', desc: 'Productos de marcas reconocidas internacionalmente con garantía de fábrica.' },
    { title: 'Servicio Personalizado', desc: 'Asesoría técnica experta desde el diseño hasta la instalación de tu proyecto.' },
    { title: 'Tecnología Eficiente', desc: 'Sistemas diseñados para el máximo ahorro de agua y energía.' },
    { title: 'Líderes del Sector', desc: 'Más de dos décadas de trayectoria respaldan nuestro trabajo.' },
  ],
  en: [
    { title: 'Guaranteed Quality', desc: 'Internationally recognized brand products with factory warranty.' },
    { title: 'Personalized Service', desc: 'Expert technical advice from design to installation of your project.' },
    { title: 'Efficient Technology', desc: 'Systems designed for maximum water and energy savings.' },
    { title: 'Industry Leaders', desc: 'Over two decades of experience back up our work.' },
  ],
};

const FEATURE_ICONS = [<ShieldCheck size={40} />, <Users size={40} />, <Droplets size={40} />, <Trophy size={40} />];

const FALLBACK_CLIENTS = [
  { id: '1', nombre: 'ACR Ingenieros & Arquitectos' },
  { id: '2', nombre: 'Arteco Inmobiliaria' },
  { id: '3', nombre: 'Desarrolladora' },
  { id: '4', nombre: 'Faber-Castell' },
  { id: '5', nombre: 'Garden Studio' },
];

// Se ejecuta en el servidor (SSR) y también en el cliente al navegar acá
// directamente — la portada y los clientes ya llegan armados en el HTML
// inicial, en vez de mostrarse recién después de un fetch en el navegador.
export async function loader() {
  const [{ data: coverRow }, { data: clientRows, error: clientErr }] = await Promise.all([
    supabase.from('imagenes_sitio').select('imagen_url').eq('clave', 'nosotros_cover').maybeSingle(),
    supabase.from('clientes').select('*').order('orden', { ascending: true }),
  ]);

  const clients = (!clientErr && clientRows && clientRows.length > 0) ? clientRows : FALLBACK_CLIENTS;
  return { coverUrl: coverRow?.imagen_url ?? null, clients };
}

const About = () => {
  const { language, t } = useLanguage();
  const { coverUrl, clients } = useLoaderData<typeof loader>();

  const timelineData = TIMELINE_DATA[language];
  const features = FEATURES_DATA[language].map((feature, idx) => ({ ...feature, icon: FEATURE_ICONS[idx] }));

  const BUFFER = 6;
  const extendedClients = buildExtended(clients, BUFFER);
  const { viewportRef, index: clientIndex, trackStyle, movedRef, goToSlide, viewportHandlers } = useLoopCarousel({
    itemCount: clients.length || 1,
    buffer: BUFFER,
    autoAdvanceMs: 3000,
    storageKey: 'clients-carousel-index',
  });

  return (
    <>
      {/* Custom Hero Cover (Portada) */}
      <section style={{ 
        position: 'relative', 
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        background: 'var(--bg-dark)',
        overflow: 'hidden'
      }}>
        {/* Background Image — <img> real (no CSS background-image) para que el
            navegador la detecte de inmediato como candidata a LCP y la
            priorice, en vez de descubrirla recién cuando React aplica el
            estilo inline. */}
        <img
          src="/assets/fotos/nosotros/portada.webp"
          alt=""
          fetchPriority="high"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'right center',
            zIndex: 1
          }}
        />
        
        {/* Dark Gradient Overlay para legibilidad del texto (igual a la referencia) */}
        <div className="hero-cover-overlay" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 3, padding: '4rem 1rem' }}>
          <div style={{ maxWidth: '750px' }}>
            <div style={{ marginBottom: '2rem', fontSize: '0.9rem', fontWeight: '500', color: 'var(--primary)' }}>
              <span>Inicio</span> <span style={{ margin: '0 0.5rem', color: 'var(--text-muted)' }}>/</span> <span style={{ color: 'var(--text-light)' }}>Sobre Nosotros</span>
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', 
              fontWeight: '800', 
              lineHeight: '1.1', 
              marginBottom: '1.5rem',
              color: 'var(--text-light)',
              fontFamily: 'Oswald, sans-serif'
            }}>
              Más de una década impulsando la industria con soluciones eficientes y sostenibles.
            </h1>
            
            <p style={{ 
              fontSize: '1.1rem', 
              lineHeight: '1.7', 
              color: 'var(--text-muted)', 
              marginBottom: '2.5rem',
              maxWidth: '650px'
            }}>
              En Eco-Sistema diseñamos y suministramos componentes industriales bajo los más altos estándares de calidad, ofreciendo soluciones confiables para sistemas de enfriamiento, manejo de agua y la industria en general.
            </p>
            
            <Link to="/productos" style={{
              display: 'inline-block',
              background: 'var(--primary)',
              color: '#000000',
              padding: '1rem 2.5rem',
              borderRadius: '4px',
              fontWeight: 'bold',
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0, 210, 255, 0.3)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'var(--primary-dark)';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'var(--primary)';
              e.currentTarget.style.color = '#000000';
            }}
            >
              VER PRODUCTOS
            </Link>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="container" style={{ padding: '4rem 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div style={{ animation: 'none' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>{t('aboutLabelEmpresa')}</span>
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', marginTop: '0.5rem', lineHeight: '1.1' }}>{t('aboutIntroTitle1')} <span style={{ color: 'var(--primary)' }}>{t('aboutIntroTitle2')}</span></h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              {t('aboutIntroP1')}
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
              {t('aboutIntroP2')}
            </p>
          </div>

          <div
            className="glass"
            style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', overflow: 'hidden' }}
          >
            <img
              src={coverUrl || '/assets/fotos/nosotros/pexels-gustavo-fring-4975384.webp'}
              alt={t('aboutImageAlt')}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number"><Counter end={20} suffix="+" /></div>
            <div className="stat-label">{t('statYears')}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number"><Counter end={500} suffix="+" /></div>
            <div className="stat-label">{t('statProjects')}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number"><Counter end={100} suffix="%" /></div>
            <div className="stat-label">{t('statQuality')}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number"><Counter end={30} suffix="+" /></div>
            <div className="stat-label">{t('statProducts')}</div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ background: 'var(--bg-dark)', padding: '4rem 1rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>{t('aboutLabelValor')}</span>
            <h2 className="section-title" style={{ marginTop: '0.5rem' }}>{t('aboutWhyTitle')}</h2>
          </div>
          <div className="features-grid">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="feature-card"
              >
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container" style={{ padding: '5rem 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>{t('aboutLabelTrayectoria')}</span>
          <h2 className="section-title" style={{ marginTop: '0.5rem' }}>{t('aboutHistoryTitle')}</h2>
        </div>
        
        <div className="timeline">
          {timelineData.map((item, index) => (
            <div 
              key={index} 
              className={`timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
            >
              <div className="timeline-content">
                <span className="timeline-year">{item.year}</span>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clients Loop Carousel */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-dark)' }}>
        <div 
          className="container" 
          style={{ textAlign: 'center', marginBottom: '2rem' }}
        >
          <span style={{ color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>{t('aboutLabelClientes')}</span>
          <h2 className="section-title" style={{ marginTop: '0.5rem' }}>{t('aboutClientsTitle')}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem' }}>{t('aboutClientsHint')}</p>
        </div>
        
        <div ref={viewportRef} className="carousel-viewport" {...viewportHandlers} style={{ marginTop: '2rem' }}>
          <div className="carousel-track clients-carousel-track" style={trackStyle}>
            {extendedClients.map((client, i) => {
              const isActive = i === clientIndex;
              return (
                <div
                  key={i}
                  className={`carousel-slide ${isActive ? 'active' : ''}`}
                  onClick={() => { if (!movedRef.current) goToSlide(i); }}
                  style={{ opacity: isActive ? 1 : 0.4 }}
                >
                  <div className="client-logo-box" style={{ 
                    height: '350px', 
                    width: '100%', 
                    margin: 0,
                    borderRadius: '24px',
                    border: isActive ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    boxShadow: isActive 
                      ? '0 15px 35px rgba(0, 0, 0, 0.15), 0 0 20px rgba(0, 210, 255, 0.1)' 
                      : '0 8px 20px rgba(0, 0, 0, 0.05)',
                    background: 'var(--bg-card)', /* Solid grey background as requested */
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    transition: 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)'
                  }}>
                    {client.logo_url ? (
                      <div style={{
                        width: '100%', 
                        height: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        position: 'relative'
                      }}>
                        <img 
                          src={client.logo_url} 
                          alt={client.nombre} 
                          style={{ 
                            maxWidth: '100%', 
                            maxHeight: '100%', 
                            objectFit: 'contain', 
                            filter: isActive ? 'grayscale(0%) opacity(100%)' : 'grayscale(80%) opacity(50%)',
                            transition: 'all 0.6s ease',
                            borderRadius: '12px'
                          }} 
                        />
                      </div>
                    ) : (
                      <h3 style={{ 
                        fontSize: isActive ? '2.2rem' : '1.6rem', 
                        fontWeight: 'bold', 
                        fontFamily: 'Oswald', 
                        color: isActive ? 'var(--text-light)' : 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        textAlign: 'center',
                        textShadow: isActive ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
                        transition: 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)'
                      }}>
                        {client.nombre}
                      </h3>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

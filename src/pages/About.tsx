import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';
import { ShieldCheck, Users, Droplets, Trophy } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { supabase } from '../supabaseClient';
import { buildExtended, useLoopCarousel } from '../hooks/useLoopCarousel';

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

const About = () => {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchCover = async () => {
      const { data } = await supabase
        .from('imagenes_sitio')
        .select('imagen_url')
        .eq('clave', 'nosotros_cover')
        .maybeSingle();

      setCoverUrl(data?.imagen_url ?? null);
    };

    fetchCover();
  }, []);

  const timelineData = [
    { year: '2001', title: 'Fundación', desc: 'Iniciamos operaciones en Perú, dedicados a la instalación de sistemas de riego residencial.' },
    { year: '2010', title: 'Expansión Comercial', desc: 'Ampliamos nuestros servicios a edificios multifamiliares y centros comerciales de gran escala.' },
    { year: '2015', title: 'Alianzas Estratégicas', desc: 'Nos convertimos en distribuidores de marcas líderes mundiales en tecnología de riego.' },
    { year: '2023', title: 'Innovación Agrícola', desc: 'Integración de sistemas de automatización avanzada para riego agrícola y deportivo.' }
  ];

  const features = [
    { icon: <ShieldCheck size={40} />, title: 'Calidad Garantizada', desc: 'Productos de marcas reconocidas internacionalmente con garantía de fábrica.' },
    { icon: <Users size={40} />, title: 'Servicio Personalizado', desc: 'Asesoría técnica experta desde el diseño hasta la instalación de tu proyecto.' },
    { icon: <Droplets size={40} />, title: 'Tecnología Eficiente', desc: 'Sistemas diseñados para el máximo ahorro de agua y energía.' },
    { icon: <Trophy size={40} />, title: 'Líderes del Sector', desc: 'Más de dos décadas de trayectoria respaldan nuestro trabajo.' }
  ];

  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    const fetchClientes = async () => {
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .order('orden', { ascending: true });
        
      if (!error && data && data.length > 0) {
        setClients(data);
      } else {
        // Fallback temporal si no hay en la DB
        setClients([
          { id: '1', nombre: 'ACR Ingenieros & Arquitectos' },
          { id: '2', nombre: 'Arteco Inmobiliaria' },
          { id: '3', nombre: 'Desarrolladora' },
          { id: '4', nombre: 'Faber-Castell' },
          { id: '5', nombre: 'Garden Studio' }
        ]);
      }
    };
    fetchClientes();
  }, []);

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
      <PageHeader title="¿Quiénes Somos?" subtitle="Conoce nuestra historia y propuesta de valor" />
      
      {/* Intro Section */}
      <section className="container" style={{ padding: '4rem 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span style={{ color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>Nuestra Empresa</span>
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', marginTop: '0.5rem', lineHeight: '1.1' }}>Especialistas en Sistemas de <span style={{ color: 'var(--primary)' }}>Riego Tecnificado</span></h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Somos una empresa Peruana con más de 20 años de experiencia, dedicada a la instalación de sistemas de riego tecnificado a nivel residencial, multifamiliar, parques, campos deportivos, centros comerciales y agrícolas.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
              Ofrecemos sistemas de riego por Aspersión, Microaspersión, Goteo y Nebulización, utilizando productos de alta calidad para superar las expectativas de nuestros clientes.
            </p>
          </motion.div>
          
          <motion.div 
            className="glass" 
            style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', overflow: 'hidden' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {coverUrl ? (
              <img src={coverUrl} alt="Jardines con riego" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ color: 'var(--text-muted)' }}>[Imagen de los jardines con riego]</span>
            )}
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number"><Counter end={20} suffix="+" /></div>
            <div className="stat-label">Años de Experiencia</div>
          </div>
          <div className="stat-card">
            <div className="stat-number"><Counter end={500} suffix="+" /></div>
            <div className="stat-label">Proyectos Ejecutados</div>
          </div>
          <div className="stat-card">
            <div className="stat-number"><Counter end={100} suffix="%" /></div>
            <div className="stat-label">Calidad Garantizada</div>
          </div>
          <div className="stat-card">
            <div className="stat-number"><Counter end={30} suffix="+" /></div>
            <div className="stat-label">Tipos de Productos</div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ background: 'var(--bg-dark)', padding: '4rem 1rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>Propuesta de Valor</span>
            <h2 className="section-title" style={{ marginTop: '0.5rem' }}>¿Por Qué Elegirnos?</h2>
          </div>
          <div className="features-grid">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx} 
                className="feature-card glass"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container" style={{ padding: '5rem 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>Nuestra Trayectoria</span>
          <h2 className="section-title" style={{ marginTop: '0.5rem' }}>Historia de la Empresa</h2>
        </div>
        
        <div className="timeline">
          {timelineData.map((item, index) => (
            <motion.div 
              key={index} 
              className={`timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="timeline-content">
                <span className="timeline-year">{item.year}</span>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Clients Loop Carousel */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-dark)' }}>
        <div className="container" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>Confían en nosotros</span>
          <h2 className="section-title" style={{ marginTop: '0.5rem' }}>Nuestros Clientes</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem' }}>Haz click o desliza para ver más</p>
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
                    height: '450px', 
                    width: '100%', 
                    margin: 0,
                    borderRadius: '24px',
                    border: isActive ? '2px solid rgba(0, 210, 255, 0.8)' : '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: isActive 
                      ? '0 0 50px rgba(0, 210, 255, 0.4), inset 0 0 30px rgba(0, 210, 255, 0.2)' 
                      : '0 15px 35px rgba(0,0,0,0.5)',
                    background: 'var(--bg-card)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)'
                  }}>
                    {client.logo_url && (
                      <>
                        <img 
                          src={client.logo_url} 
                          alt="" 
                          style={{ 
                            position: 'absolute', 
                            top: 0, left: 0, width: '100%', height: '100%', 
                            objectFit: 'fill',
                            opacity: isActive ? 0.45 : 0.2,
                            transition: 'opacity 0.6s ease',
                            zIndex: 1 
                          }} 
                        />
                        <div style={{
                          position: 'absolute',
                          top: 0, left: 0, width: '100%', height: '100%',
                          background: isActive 
                            ? 'radial-gradient(circle, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0.9) 100%)' 
                            : 'rgba(15, 23, 42, 0.85)',
                          transition: 'background 0.6s ease',
                          zIndex: 2
                        }} />
                      </>
                    )}
                    
                    <h3 style={{ 
                      position: 'relative', 
                      zIndex: 3, 
                      color: isActive ? '#fff' : '#94a3b8', 
                      fontFamily: 'Oswald, sans-serif', 
                      fontSize: isActive ? '2.8rem' : '1.8rem', 
                      fontWeight: 600,
                      textAlign: 'center', 
                      padding: '1.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      transition: 'all 1s ease',
                      textShadow: isActive 
                        ? '0 0 25px rgba(0, 210, 255, 0.8), 0 4px 15px rgba(0,0,0,1)' 
                        : '0 4px 10px rgba(0,0,0,0.8)',
                      lineHeight: 1.2
                    }}>
                      {client.nombre}
                    </h3>
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

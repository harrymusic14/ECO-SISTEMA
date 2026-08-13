
import { Settings, Wrench, Droplet, Cog, MessageSquare, FileSearch, ShieldCheck, Truck, Factory, Headset, Package, Phone, Waves, Droplets, Sprout, CloudDrizzle, Gauge, Zap, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import type { Language } from '../../contexts/language';
import { buildExtended, useLoopCarousel } from '../../hooks/useLoopCarousel';

type Solution = { title: string; features: string[]; icon: React.ReactNode; image: string };

// Cada solución puede tener su propia foto — basta con colocar el archivo
// correspondiente en public/assets/fotos/servicios/soluciones/ (mismo nombre
// que acá). Si el archivo todavía no existe, la tarjeta muestra el ícono
// como respaldo (onError oculta la <img> rota) sin que se vea nada feo.
const SOLUTIONS: Record<Language, Solution[]> = {
  es: [
    { title: 'Riego por Aspersión', features: ['Cobertura amplia y uniforme', 'Ideal para jardines, parques y campos deportivos'], icon: <Waves size={56} />, image: '/assets/fotos/servicios/soluciones/aspersion.jpg' },
    { title: 'Riego por Goteo', features: ['Entrega el agua directo a la raíz', 'Ahorra agua en cultivos y jardines'], icon: <Droplets size={56} />, image: '/assets/fotos/servicios/soluciones/goteo.jpg' },
    { title: 'Riego por Microaspersión', features: ['Caudal controlado y preciso', 'Ideal para plantas ornamentales'], icon: <Sprout size={56} />, image: '/assets/fotos/servicios/soluciones/microaspersion.jpg' },
    { title: 'Riego por Nebulización', features: ['Genera una fina neblina refrescante', 'Ideal para invernaderos y viveros'], icon: <CloudDrizzle size={56} />, image: '/assets/fotos/servicios/soluciones/nebulizacion.jpg' },
    { title: 'Sistema de Presión Constante', features: ['Presión de agua siempre estable', 'Sin importar la demanda'], icon: <Gauge size={56} />, image: '/assets/fotos/servicios/soluciones/presion-constante.webp' },
    { title: 'Sistema Hidroneumático', features: ['Almacena y distribuye agua a presión', 'Eficiente en edificios y viviendas'], icon: <Zap size={56} />, image: '/assets/fotos/servicios/soluciones/hidroneumatico.jpg' },
  ],
  en: [
    { title: 'Sprinkler Irrigation', features: ['Wide, uniform coverage', 'Ideal for gardens, parks, and sports fields'], icon: <Waves size={56} />, image: '/assets/fotos/servicios/soluciones/aspersion.jpg' },
    { title: 'Drip Irrigation', features: ['Delivers water straight to the root', 'Saves water in crops and gardens'], icon: <Droplets size={56} />, image: '/assets/fotos/servicios/soluciones/goteo.jpg' },
    { title: 'Micro-Sprinkler Irrigation', features: ['Precise, controlled flow', 'Ideal for ornamental plants'], icon: <Sprout size={56} />, image: '/assets/fotos/servicios/soluciones/microaspersion.jpg' },
    { title: 'Fog Irrigation', features: ['Creates a fine, cooling mist', 'Ideal for greenhouses and nurseries'], icon: <CloudDrizzle size={56} />, image: '/assets/fotos/servicios/soluciones/nebulizacion.jpg' },
    { title: 'Constant Pressure System', features: ['Water pressure always stable', 'Regardless of demand'], icon: <Gauge size={56} />, image: '/assets/fotos/servicios/soluciones/presion-constante.webp' },
    { title: 'Hydropneumatic System', features: ['Stores and distributes pressurized water', 'Efficient in buildings and homes'], icon: <Zap size={56} />, image: '/assets/fotos/servicios/soluciones/hidroneumatico.jpg' },
  ],
};

const SOLUTIONS_BUFFER = 6;

const Services = () => {
  const { language, t } = useLanguage();
  const solutions = SOLUTIONS[language];
  const extendedSolutions = buildExtended(solutions, SOLUTIONS_BUFFER);
  const {
    viewportRef: solutionsViewportRef,
    index: solutionIndex,
    trackStyle: solutionsTrackStyle,
    goToSlide: goToSolutionSlide,
    viewportHandlers: solutionsViewportHandlers,
  } = useLoopCarousel({
    itemCount: solutions.length,
    buffer: SOLUTIONS_BUFFER,
    storageKey: 'solutions-carousel-index',
  });
  const solutionRealIndex = (((solutionIndex - SOLUTIONS_BUFFER) % solutions.length) + solutions.length) % solutions.length;

  return (
    <>
      {/* Custom Hero Cover (Portada) para Servicios */}
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
          src="/assets/fotos/servicios/pexels-mehmet-demir-663414275-29067120.jpg"
          alt=""
          fetchPriority="high"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: 1
          }}
        />
        
        {/* Dark Gradient Overlay */}
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
            <div style={{ marginBottom: '1.5rem', fontSize: '1rem', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '2px' }}>
              SOLUCIONES INDUSTRIALES
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
              fontWeight: '900', 
              lineHeight: '1.1', 
              marginBottom: '1.5rem',
              color: 'var(--text-light)',
              fontFamily: 'Oswald, sans-serif',
              textTransform: 'uppercase'
            }}>
              Acero Inoxidable<br/>A Medida
            </h1>
            
            <p style={{ 
              fontSize: '1.1rem', 
              lineHeight: '1.7', 
              color: 'var(--text-light)',
              opacity: '0.9',
              marginBottom: '2.5rem',
              maxWidth: '650px'
            }}>
              Fabricamos componentes industriales, conexiones especiales y sistemas hidráulicos para minería, industria, construcción y proyectos de alta exigencia.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="https://wa.me/51970790457" target="_blank" rel="noreferrer" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--primary)', 
                color: '#000000',
                padding: '1rem 2rem',
                borderRadius: '6px',
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
                SOLICITAR COTIZACIÓN
              </a>
              
              <a href="tel:+51970790457" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'transparent',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: 'var(--text-light)',
                padding: '1rem 2rem',
                borderRadius: '6px',
                fontWeight: 'bold',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              }}
              >
                <Phone size={20} />
                (51) 970 790 457
              </a>
            </div>
          </div>
        </div>

        {/* Feature Bar (Transparent/Glassmorphism) at bottom */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '100%',
          padding: '0 1rem',
          zIndex: 4
        }}>
          <div className="container">
            <div className="glass" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1.5rem',
              borderRadius: '12px 12px 0 0',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderBottom: 'none',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              overflowX: 'auto',
              gap: '2rem'
            }}>
              {[
                { icon: <Truck size={30} />, text: 'ENVÍOS A\nTODO EL PERÚ' },
                { icon: <Factory size={30} />, text: 'ATENCIÓN A\nINDUSTRIA Y MINERÍA' },
                { icon: <Headset size={30} />, text: 'ASESORÍA TÉCNICA\nESPECIALIZADA' },
                { icon: <ShieldCheck size={30} />, text: 'CALIDAD Y\nGARANTÍA' },
                { icon: <Package size={30} />, text: 'STOCK\nPERMANENTE' },
                { icon: <Cog size={30} />, text: 'FABRICACIÓN A\nMEDIDA' },
              ].map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  minWidth: '150px',
                  gap: '0.8rem'
                }}>
                  <div style={{ color: 'var(--primary)' }}>{item.icon}</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-light)', lineHeight: '1.3', whiteSpace: 'pre-line' }}>{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: '4rem', paddingTop: '4rem' }}>
        <h2 className="section-title" style={{ marginTop: 0 }}>{t('servicesGridTitle1')} <span>{t('servicesGridTitle2')}</span></h2>
        <p style={{ fontSize: '1.2rem', textAlign: 'center', marginBottom: '3rem', color: 'var(--text-muted)' }}>
          {t('servicesIntro')}
        </p>

        <div className="services-grid">

          <div className="glass" style={{ display: 'flex', flexDirection: 'column', padding: '2.5rem', borderTop: '4px solid var(--primary)', borderRadius: '8px' }}>
            <Cog size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontFamily: 'Oswald', color: 'var(--text-light)' }}>{t('serviceAsesoriaTitle')}</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              {t('serviceAsesoriaDesc')}
            </p>
          </div>

          <div className="glass" style={{ display: 'flex', flexDirection: 'column', padding: '2.5rem', borderTop: '4px solid var(--primary)', borderRadius: '8px' }}>
            <Wrench size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontFamily: 'Oswald', color: 'var(--text-light)' }}>{t('serviceInstalacionTitle')}</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              {t('serviceInstalacionDescServices')}
              <br /><br />
              {t('serviceInstalacionDescServices2')}
              <br />
              {t('serviceInstalacionDescServices3')}
            </p>
          </div>

          <div className="glass" style={{ display: 'flex', flexDirection: 'column', padding: '2.5rem', borderTop: '4px solid var(--primary)', borderRadius: '8px' }}>
            <Droplet size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontFamily: 'Oswald', color: 'var(--text-light)' }}>{t('serviceDisenoTitle')}</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              {t('serviceDisenoDescServices')}
            </p>
          </div>

          <div className="glass" style={{ display: 'flex', flexDirection: 'column', padding: '2.5rem', borderTop: '4px solid var(--primary)', borderRadius: '8px' }}>
            <Settings size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontFamily: 'Oswald', color: 'var(--text-light)' }}>{t('serviceMantenimientoTitle')}</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              {t('serviceMantenimientoDescServices')}
            </p>
          </div>

        </div>
      </div>

      {/* Soluciones que ofrecemos */}
      <section style={{ padding: '1rem 0 5rem', background: 'var(--bg-dark)' }}>
        <div className="container">
          <h2 className="section-title" style={{ marginTop: 0 }}>{t('servicesSolutionsTitle1')} <span>{t('servicesSolutionsTitle2')}</span></h2>

          <div ref={solutionsViewportRef} className="carousel-viewport" {...solutionsViewportHandlers}>
            <div className="carousel-track solutions-track" style={solutionsTrackStyle}>
              {extendedSolutions.map((solution, i) => {
                const isActive = i === solutionIndex;
                return (
                  <div
                    key={i}
                    className={`carousel-slide solution-slide ${isActive ? 'active' : ''}`}
                    onClick={() => goToSolutionSlide(i)}
                  >
                    <div className="solution-card-big glass">
                      <div className="solution-card-big-visual">
                        <div className="solution-card-big-icon">
                          {solution.icon}
                        </div>
                        <img
                          src={solution.image}
                          alt={solution.title}
                          className="solution-card-big-photo"
                          loading="lazy"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                        />
                      </div>
                      <div className="solution-card-big-info">
                        <h3>{solution.title}</h3>
                        <div className="solution-card-big-checklist">
                          {solution.features.map((feature) => (
                            <div key={feature} className="solution-card-big-check-item">
                              <CheckCircle2 size={20} />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="video-carousel-dots">
            {solutions.map((s, i) => (
              <button
                key={s.title}
                type="button"
                className={`video-carousel-dot ${i === solutionRealIndex ? 'active' : ''}`}
                onClick={() => goToSolutionSlide(SOLUTIONS_BUFFER + i)}
                aria-label={s.title}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ¿CÓMO TRABAJAMOS? Section */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-dark)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '4rem', fontFamily: 'Oswald', color: 'var(--text-light)', textTransform: 'uppercase' }}>
            ¿Cómo Trabajamos?
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
            gap: '2rem'
          }}>
            {/* Paso 1 */}
            <div className="glass" style={{ padding: '2rem', borderRadius: '12px', position: 'relative', overflow: 'hidden', borderTop: '4px solid var(--primary)' }}>
              <div style={{ 
                position: 'absolute', top: '-10px', right: '-10px', 
                fontSize: '7rem', fontWeight: '900', color: 'var(--primary)', opacity: '0.08', 
                lineHeight: '1', zIndex: 0 
              }}>
                1
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ 
                  width: '60px', height: '60px', borderRadius: '12px', 
                  background: 'rgba(0, 210, 255, 0.1)', border: '1px solid rgba(0, 210, 255, 0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem'
                }}>
                  <MessageSquare size={30} color="var(--primary)" />
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Paso 01</div>
                <h3 style={{ fontWeight: '700', color: 'var(--text-light)', fontSize: '1.3rem', lineHeight: '1.3' }}>Recibimos tu requerimiento</h3>
              </div>
            </div>
            
            {/* Paso 2 */}
            <div className="glass" style={{ padding: '2rem', borderRadius: '12px', position: 'relative', overflow: 'hidden', borderTop: '4px solid var(--primary)' }}>
              <div style={{ 
                position: 'absolute', top: '-10px', right: '-10px', 
                fontSize: '7rem', fontWeight: '900', color: 'var(--primary)', opacity: '0.08', 
                lineHeight: '1', zIndex: 0 
              }}>
                2
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ 
                  width: '60px', height: '60px', borderRadius: '12px', 
                  background: 'rgba(0, 210, 255, 0.1)', border: '1px solid rgba(0, 210, 255, 0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem'
                }}>
                  <FileSearch size={30} color="var(--primary)" />
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Paso 02</div>
                <h3 style={{ fontWeight: '700', color: 'var(--text-light)', fontSize: '1.3rem', lineHeight: '1.3' }}>Evaluamos planos o muestra</h3>
              </div>
            </div>

            {/* Paso 3 */}
            <div className="glass" style={{ padding: '2rem', borderRadius: '12px', position: 'relative', overflow: 'hidden', borderTop: '4px solid var(--primary)' }}>
              <div style={{ 
                position: 'absolute', top: '-10px', right: '-10px', 
                fontSize: '7rem', fontWeight: '900', color: 'var(--primary)', opacity: '0.08', 
                lineHeight: '1', zIndex: 0 
              }}>
                3
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ 
                  width: '60px', height: '60px', borderRadius: '12px', 
                  background: 'rgba(0, 210, 255, 0.1)', border: '1px solid rgba(0, 210, 255, 0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem'
                }}>
                  <Cog size={30} color="var(--primary)" />
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Paso 03</div>
                <h3 style={{ fontWeight: '700', color: 'var(--text-light)', fontSize: '1.3rem', lineHeight: '1.3' }}>Fabricamos a medida</h3>
              </div>
            </div>

            {/* Paso 4 */}
            <div className="glass" style={{ padding: '2rem', borderRadius: '12px', position: 'relative', overflow: 'hidden', borderTop: '4px solid var(--primary)' }}>
              <div style={{ 
                position: 'absolute', top: '-10px', right: '-10px', 
                fontSize: '7rem', fontWeight: '900', color: 'var(--primary)', opacity: '0.08', 
                lineHeight: '1', zIndex: 0 
              }}>
                4
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ 
                  width: '60px', height: '60px', borderRadius: '12px', 
                  background: 'rgba(0, 210, 255, 0.1)', border: '1px solid rgba(0, 210, 255, 0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem'
                }}>
                  <ShieldCheck size={30} color="var(--primary)" />
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Paso 04</div>
                <h3 style={{ fontWeight: '700', color: 'var(--text-light)', fontSize: '1.3rem', lineHeight: '1.3' }}>Control de calidad</h3>
              </div>
            </div>

            {/* Paso 5 */}
            <div className="glass" style={{ padding: '2rem', borderRadius: '12px', position: 'relative', overflow: 'hidden', borderTop: '4px solid var(--primary)' }}>
              <div style={{ 
                position: 'absolute', top: '-10px', right: '-10px', 
                fontSize: '7rem', fontWeight: '900', color: 'var(--primary)', opacity: '0.08', 
                lineHeight: '1', zIndex: 0 
              }}>
                5
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ 
                  width: '60px', height: '60px', borderRadius: '12px', 
                  background: 'rgba(0, 210, 255, 0.1)', border: '1px solid rgba(0, 210, 255, 0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem'
                }}>
                  <Truck size={30} color="var(--primary)" />
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Paso 05</div>
                <h3 style={{ fontWeight: '700', color: 'var(--text-light)', fontSize: '1.3rem', lineHeight: '1.3' }}>Entrega a nivel nacional</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;

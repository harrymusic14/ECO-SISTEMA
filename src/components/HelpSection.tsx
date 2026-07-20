import { buildExtended, useLoopCarousel } from '../hooks/useLoopCarousel';

const SLIDES = [
  {
    photo: '/productos/servicio-asesoria.webp',
    title: 'Asesoría',
    description: 'Brindamos asesoría para el diseño e implementación de sistemas de riego, para todo tipo de proyectos. Así mismo brindamos el soporte y asesoría técnica para la elección de sistemas de presión constante e hidroneumática para residencias, edificios, casas de campo, etc.',
  },
  {
    photo: '/productos/servicio-instalacion.webp',
    title: 'Instalación',
    description: 'Realizamos instalaciones de sistemas de riego en proyectos residenciales, edificios multifamiliares, campos deportivos, parques, casas de playa, condominios y campos agrícolas. Instalación de sistemas de Presión Constante e Hidroneumáticos, bombas para riego, tanque elevado, piscinas y pozos.',
  },
  {
    photo: '/productos/servicio-diseno.webp',
    title: 'Diseño',
    description: 'Diseñamos sistemas de riego de acuerdo a espacios y planos paisajísticos, para todo tipo de proyectos.',
  },
  {
    photo: '/productos/servicio-mantenimiento.webp',
    title: 'Mantenimiento',
    description: 'Reparación y mantenimiento de electrobombas.',
  },
];

const BUFFER = 6;
const EXTENDED = buildExtended(SLIDES, BUFFER);

const HelpSection = () => {
  const { viewportRef, index, trackStyle, movedRef, goToSlide, viewportHandlers } = useLoopCarousel({
    itemCount: SLIDES.length,
    buffer: BUFFER,
    storageKey: 'help-carousel-index',
  });

  return (
    <section className="help-section">
      <div className="container">
        <h2 className="dashed-title">
          <span className="dashed-title-line" />
          Siempre estamos ahí para ayudar
          <span className="dashed-title-line" />
        </h2>
      </div>

      <div ref={viewportRef} className="carousel-viewport" {...viewportHandlers}>
        <div className="carousel-track" style={trackStyle}>
          {EXTENDED.map((slide, i) => {
            const isActive = i === index;
            return (
              <div
                key={i}
                className={`carousel-slide ${isActive ? 'active' : ''}`}
                onClick={() => goToSlide(i)}
              >
                <div className="help-card">
                  <div className="help-card-info">
                    <h3>{slide.title}</h3>
                    <p>{slide.description}</p>
                    <a
                      href="/servicios"
                      className="btn btn-primary"
                      onClick={(e) => { if (!isActive || movedRef.current) e.preventDefault(); }}
                    >
                      Leer más
                    </a>
                  </div>
                  <div className="help-card-visual">
                    <img src={slide.photo} alt={slide.title} className="help-card-photo" loading="lazy" draggable={false} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HelpSection;

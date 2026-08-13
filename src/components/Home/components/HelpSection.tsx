import { Link } from 'react-router';
import { buildExtended, useLoopCarousel } from '../../../hooks/useLoopCarousel';
import { useLanguage } from '../../../hooks/useLanguage';
import type { Language } from '../../../contexts/language';

const SLIDES: Record<Language, { photo: string; title: string; description: string }[]> = {
  es: [
    {
      photo: '/assets/fotos/productos/servicio-asesoria.webp',
      title: 'Asesoría',
      description: 'Brindamos asesoría para el diseño e implementación de sistemas de riego, para todo tipo de proyectos. Así mismo brindamos el soporte y asesoría técnica para la elección de sistemas de presión constante e hidroneumática para residencias, edificios, casas de campo, etc.',
    },
    {
      photo: '/assets/fotos/productos/servicio-instalacion.webp',
      title: 'Instalación',
      description: 'Realizamos instalaciones de sistemas de riego en proyectos residenciales, edificios multifamiliares, campos deportivos, parques, casas de playa, condominios y campos agrícolas. Instalación de sistemas de Presión Constante e Hidroneumáticos, bombas para riego, tanque elevado, piscinas y pozos.',
    },
    {
      photo: '/assets/fotos/productos/servicio-diseno.webp',
      title: 'Diseño',
      description: 'Diseñamos sistemas de riego de acuerdo a espacios y planos paisajísticos, para todo tipo de proyectos.',
    },
    {
      photo: '/assets/fotos/productos/servicio-mantenimiento.webp',
      title: 'Mantenimiento',
      description: 'Reparación y mantenimiento de electrobombas.',
    },
  ],
  en: [
    {
      photo: '/assets/fotos/productos/servicio-asesoria.webp',
      title: 'Advisory',
      description: 'We provide advisory services for the design and implementation of irrigation systems, for all types of projects. We also provide technical support and advice for choosing constant pressure and hydropneumatic systems for residences, buildings, country houses, etc.',
    },
    {
      photo: '/assets/fotos/productos/servicio-instalacion.webp',
      title: 'Installation',
      description: 'We install irrigation systems in residential projects, multi-family buildings, sports fields, parks, beach houses, condominiums, and agricultural fields. Installation of Constant Pressure and Hydropneumatic systems, pumps for irrigation, elevated tanks, pools, and wells.',
    },
    {
      photo: '/assets/fotos/productos/servicio-diseno.webp',
      title: 'Design',
      description: 'We design irrigation systems according to spaces and landscape plans, for all types of projects.',
    },
    {
      photo: '/assets/fotos/productos/servicio-mantenimiento.webp',
      title: 'Maintenance',
      description: 'Repair and maintenance of electric pumps.',
    },
  ],
};

const BUFFER = 6;

const HelpSection = () => {
  const { language, t } = useLanguage();
  const slides = SLIDES[language];
  const extended = buildExtended(slides, BUFFER);
  const { viewportRef, index, trackStyle, movedRef, goToSlide, viewportHandlers } = useLoopCarousel({
    itemCount: slides.length,
    buffer: BUFFER,
    storageKey: 'help-carousel-index',
  });

  return (
    <section className="help-section">
      <div className="container">
        <h2 className="dashed-title">
          <span className="dashed-title-line" />
          {t('helpSectionTitle')}
          <span className="dashed-title-line" />
        </h2>
      </div>

      <div ref={viewportRef} className="carousel-viewport" {...viewportHandlers}>
        <div className="carousel-track" style={trackStyle}>
          {extended.map((slide, i) => {
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
                    <Link
                      to="/servicios"
                      className="btn btn-primary"
                      onClick={(e) => { if (!isActive || movedRef.current) e.preventDefault(); }}
                    >
                      {t('leerMas')}
                    </Link>
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

import { ShieldCheck } from 'lucide-react';
import { buildExtended, useLoopCarousel } from '../hooks/useLoopCarousel';

const CERTIFICATES = [
  { brand: 'DIG' },
  { brand: 'Hunter' },
  { brand: 'RAIN PRO' },
  { brand: 'WASSERMANN' },
  { brand: 'TUBOPLAST' },
];

const BUFFER = 6;
const EXTENDED = buildExtended(CERTIFICATES, BUFFER);

const CertificatesSection = () => {
  const { viewportRef, index, trackStyle, movedRef, goToSlide, viewportHandlers } = useLoopCarousel({
    itemCount: CERTIFICATES.length,
    buffer: BUFFER,
    storageKey: 'certificates-carousel-index',
  });

  return (
    <section className="help-section">
      <div className="container">
        <h2 className="dashed-title">
          <span className="dashed-title-line" />
          Certificado de Calidad
          <span className="dashed-title-line" />
        </h2>
      </div>

      <div ref={viewportRef} className="carousel-viewport" {...viewportHandlers}>
        <div className="carousel-track" style={trackStyle}>
          {EXTENDED.map((cert, i) => {
            const isActive = i === index;
            return (
              <div
                key={i}
                className={`carousel-slide ${isActive ? 'active' : ''}`}
                onClick={() => { if (!movedRef.current) goToSlide(i); }}
              >
                <div className="cert-card">
                  <ShieldCheck size={72} color="var(--primary-dark)" strokeWidth={1.5} />
                  <h3>{cert.brand}</h3>
                  <span className="cert-card-label">Certificado de Calidad</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container">
        <p className="cert-caption">
          Aquí encontrarás los certificados de calidad de las marcas con las que trabajamos:
          el respaldo que garantiza los estándares que ofrecemos en cada proyecto.
        </p>
      </div>
    </section>
  );
};

export default CertificatesSection;

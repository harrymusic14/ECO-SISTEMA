import { useLanguage } from '../hooks/useLanguage';
import type { Language } from '../contexts/language';

// Textos de ejemplo — edítalos aquí para poner las ofertas reales.
const OFFERS: Record<Language, string[]> = {
  es: [
    '🌱 Cotiza tu sistema de riego sin costo',
    '🚚 Envíos a todo el Perú',
    '🔧 Instalación y mantenimiento especializado',
    '⚡ Más de 25 años de experiencia',
  ],
  en: [
    '🌱 Get a free irrigation system quote',
    '🚚 Shipping all over Peru',
    '🔧 Specialized installation and maintenance',
    '⚡ Over 25 years of experience',
  ],
};

const OfferBar = () => {
  const { language } = useLanguage();
  const offers = OFFERS[language];

  // Se duplica el contenido para que la animación pueda hacer loop continuo
  // sin salto visible (cuando la primera copia sale, la segunda ya está entrando).
  const content = (
    <span className="offer-bar-track-content">
      {offers.map((offer, i) => (
        <span key={i} className="offer-bar-item">{offer}</span>
      ))}
    </span>
  );

  return (
    <div className="offer-bar" aria-hidden="true">
      <div className="offer-bar-track">
        {content}
        {content}
      </div>
    </div>
  );
};

export default OfferBar;

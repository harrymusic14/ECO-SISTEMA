import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { useLanguage } from '../../../hooks/useLanguage';
import type { Language } from '../../../contexts/language';

type PumpType = {
  tab: string;
  title: string;
  description: string;
  photo?: string;
};

const PUMP_TYPES: Record<Language, PumpType[]> = {
  es: [
    {
      tab: 'Centrífuga',
      title: 'Electrobomba Centrífuga',
      description: 'Ideal para elevar agua a media y alta presión en instalaciones residenciales, comerciales e industriales.',
      photo: '/assets/fotos/productos/electrobomba-centrifuga.webp',
    },
    {
      tab: 'Sumergible de Drenaje',
      title: 'Electrobomba Sumergible de Drenaje',
      description: 'Diseñada para evacuar agua de cisternas, sótanos y zonas propensas a inundación.',
      photo: '/assets/fotos/productos/electrobomba-drenaje.webp',
    },
    {
      tab: 'Para Piscina',
      title: 'Electrobomba para Piscina',
      description: 'Recircula y filtra el agua de piscinas de forma eficiente, silenciosa y continua.',
      photo: '/assets/fotos/productos/electrobomba-piscina.webp',
    },
    {
      tab: 'Sumergible Tipo Lapicero',
      title: 'Electrobomba Sumergible Tipo Lapicero',
      description: 'Pensada para la extracción de agua en pozos profundos y perforaciones de diámetro reducido.',
      photo: '/assets/fotos/productos/electrobomba-lapicero.webp',
    },
  ],
  en: [
    {
      tab: 'Centrifugal',
      title: 'Centrifugal Electric Pump',
      description: 'Ideal for raising water at medium and high pressure in residential, commercial, and industrial installations.',
      photo: '/assets/fotos/productos/electrobomba-centrifuga.webp',
    },
    {
      tab: 'Submersible Drainage',
      title: 'Submersible Drainage Electric Pump',
      description: 'Designed to drain water from cisterns, basements, and flood-prone areas.',
      photo: '/assets/fotos/productos/electrobomba-drenaje.webp',
    },
    {
      tab: 'Pool',
      title: 'Pool Electric Pump',
      description: 'Recirculates and filters pool water efficiently, quietly, and continuously.',
      photo: '/assets/fotos/productos/electrobomba-piscina.webp',
    },
    {
      tab: 'Submersible Pencil-Type',
      title: 'Pencil-Type Submersible Electric Pump',
      description: 'Designed for water extraction in deep wells and small-diameter boreholes.',
      photo: '/assets/fotos/productos/electrobomba-lapicero.webp',
    },
  ],
};

const PumpIcon = () => (
  <svg viewBox="0 0 220 220" width="100%" height="100%">
    <rect x="55" y="70" width="110" height="80" rx="8" fill="#0f172a" stroke="var(--primary)" strokeWidth="3" />
    <circle cx="110" cy="110" r="28" fill="none" stroke="var(--primary)" strokeWidth="3" />
    <circle cx="110" cy="110" r="7" fill="var(--primary)" />
    <line x1="165" y1="95" x2="195" y2="95" stroke="var(--primary)" strokeWidth="6" strokeLinecap="round" />
    <line x1="55" y1="125" x2="25" y2="125" stroke="var(--primary)" strokeWidth="6" strokeLinecap="round" />
    <line x1="80" y1="150" x2="80" y2="180" stroke="var(--primary)" strokeWidth="6" strokeLinecap="round" />
    <line x1="140" y1="150" x2="140" y2="180" stroke="var(--primary)" strokeWidth="6" strokeLinecap="round" />
  </svg>
);

const PUMP_GRID: Record<Language, { name: string; photo?: string }[]> = {
  es: [
    { name: 'Centrífuga Roscada', photo: '/assets/fotos/productos/electrobomba-roscada.webp' },
    { name: 'Centrífuga Multietapas Horizontal', photo: '/assets/fotos/productos/electrobomba-centrifuga.webp' },
    { name: 'Centrífuga Multietapas Vertical', photo: '/assets/fotos/productos/electrobomba-multietapas-vertical.webp' },
    { name: 'Sumergible de Drenaje', photo: '/assets/fotos/productos/electrobomba-drenaje.webp' },
    { name: 'Para Piscina', photo: '/assets/fotos/productos/electrobomba-piscina.webp' },
    { name: 'Sumergible Tipo Lapicero', photo: '/assets/fotos/productos/electrobomba-lapicero.webp' },
  ],
  en: [
    { name: 'Threaded Centrifugal', photo: '/assets/fotos/productos/electrobomba-roscada.webp' },
    { name: 'Horizontal Multistage Centrifugal', photo: '/assets/fotos/productos/electrobomba-centrifuga.webp' },
    { name: 'Vertical Multistage Centrifugal', photo: '/assets/fotos/productos/electrobomba-multietapas-vertical.webp' },
    { name: 'Submersible Drainage', photo: '/assets/fotos/productos/electrobomba-drenaje.webp' },
    { name: 'Pool', photo: '/assets/fotos/productos/electrobomba-piscina.webp' },
    { name: 'Submersible Pencil-Type', photo: '/assets/fotos/productos/electrobomba-lapicero.webp' },
  ],
};

const PumpsShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { language, t } = useLanguage();
  const pumpTypes = PUMP_TYPES[language];
  const pumpGrid = PUMP_GRID[language];
  const active = pumpTypes[activeIndex];

  return (
    <section className="container pumps-showcase">
      <h2 className="section-title" style={{ marginTop: 0 }}>{t('pumpsTitle1')} <span>{t('pumpsTitle2')}</span></h2>

      <Reveal className="pumps-banner">
        <div className="pumps-banner-info">
          <span className="featured-product-badge">{t('pumpsBadge')}</span>
          <h3>{active.title}</h3>
          <p>{active.description}</p>
          <Link to="/productos" className="btn btn-primary">{t('verMas')}</Link>
        </div>
        <div className="pumps-banner-visual">
          {active.photo ? (
            <img src={active.photo} alt={active.title} className="pumps-banner-photo" loading="lazy" />
          ) : (
            <PumpIcon />
          )}
        </div>
      </Reveal>

      <div className="pumps-tabs">
        {pumpTypes.map((pump, index) => (
          <button
            key={pump.tab}
            className={`pumps-tab ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            {pump.tab}
          </button>
        ))}
      </div>

      <Reveal className="pumps-grid">
        {pumpGrid.map((pump) => (
          <div key={pump.name} className="pumps-grid-item">
            <div className="pumps-grid-item-visual">
              {pump.photo ? (
                <img src={pump.photo} alt={pump.name} className="pumps-grid-item-photo" loading="lazy" />
              ) : (
                <PumpIcon />
              )}
            </div>
            <h4>{pump.name}</h4>
          </div>
        ))}
      </Reveal>
    </section>
  );
};

export default PumpsShowcase;

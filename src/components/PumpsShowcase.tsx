import { useState } from 'react';
import Reveal from './Reveal';

type PumpType = {
  tab: string;
  title: string;
  description: string;
  photo?: string;
};

const PUMP_TYPES: PumpType[] = [
  {
    tab: 'Centrífuga',
    title: 'Electrobomba Centrífuga',
    description: 'Ideal para elevar agua a media y alta presión en instalaciones residenciales, comerciales e industriales.',
    photo: '/productos/electrobomba-centrifuga.webp',
  },
  {
    tab: 'Sumergible de Drenaje',
    title: 'Electrobomba Sumergible de Drenaje',
    description: 'Diseñada para evacuar agua de cisternas, sótanos y zonas propensas a inundación.',
    photo: '/productos/electrobomba-drenaje.webp',
  },
  {
    tab: 'Para Piscina',
    title: 'Electrobomba para Piscina',
    description: 'Recircula y filtra el agua de piscinas de forma eficiente, silenciosa y continua.',
    photo: '/productos/electrobomba-piscina.webp',
  },
  {
    tab: 'Sumergible Tipo Lapicero',
    title: 'Electrobomba Sumergible Tipo Lapicero',
    description: 'Pensada para la extracción de agua en pozos profundos y perforaciones de diámetro reducido.',
    photo: '/productos/electrobomba-lapicero.webp',
  },
];

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

const PUMP_GRID: { name: string; photo?: string }[] = [
  { name: 'Centrífuga Roscada', photo: '/productos/electrobomba-roscada.webp' },
  { name: 'Centrífuga Multietapas Horizontal', photo: '/productos/electrobomba-centrifuga.webp' },
  { name: 'Centrífuga Multietapas Vertical', photo: '/productos/electrobomba-multietapas-vertical.webp' },
  { name: 'Sumergible de Drenaje', photo: '/productos/electrobomba-drenaje.webp' },
  { name: 'Para Piscina', photo: '/productos/electrobomba-piscina.webp' },
  { name: 'Sumergible Tipo Lapicero', photo: '/productos/electrobomba-lapicero.webp' },
];

const PumpsShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = PUMP_TYPES[activeIndex];

  return (
    <section className="container pumps-showcase">
      <h2 className="section-title" style={{ marginTop: 0 }}>Tipos de <span>Electrobombas</span></h2>

      <Reveal className="pumps-banner">
        <div className="pumps-banner-info">
          <span className="featured-product-badge">Electrobombas</span>
          <h3>{active.title}</h3>
          <p>{active.description}</p>
          <a href="/productos" className="btn btn-primary">Ver más</a>
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
        {PUMP_TYPES.map((pump, index) => (
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
        {PUMP_GRID.map((pump) => (
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

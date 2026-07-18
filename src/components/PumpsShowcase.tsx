import { useState } from 'react';

type PumpType = {
  tab: string;
  title: string;
  description: string;
};

const PUMP_TYPES: PumpType[] = [
  {
    tab: 'Centrífuga',
    title: 'Electrobomba Centrífuga',
    description: 'Ideal para elevar agua a media y alta presión en instalaciones residenciales, comerciales e industriales.',
  },
  {
    tab: 'Sumergible de Drenaje',
    title: 'Electrobomba Sumergible de Drenaje',
    description: 'Diseñada para evacuar agua de cisternas, sótanos y zonas propensas a inundación.',
  },
  {
    tab: 'Para Piscina',
    title: 'Electrobomba para Piscina',
    description: 'Recircula y filtra el agua de piscinas de forma eficiente, silenciosa y continua.',
  },
  {
    tab: 'Sumergible Tipo Lapicero',
    title: 'Electrobomba Sumergible Tipo Lapicero',
    description: 'Pensada para la extracción de agua en pozos profundos y perforaciones de diámetro reducido.',
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

const PUMP_GRID: { name: string }[] = [
  { name: 'Centrífuga Roscada' },
  { name: 'Centrífuga Multietapas Horizontal' },
  { name: 'Centrífuga Multietapas Vertical' },
  { name: 'Sumergible de Drenaje' },
  { name: 'Para Piscina' },
  { name: 'Sumergible Tipo Lapicero' },
];

const PumpsShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = PUMP_TYPES[activeIndex];

  return (
    <section className="container pumps-showcase">
      <h2 className="section-title" style={{ marginTop: 0 }}>Tipos de <span>Electrobombas</span></h2>

      <div className="pumps-banner">
        <div className="pumps-banner-info">
          <span className="featured-product-badge">Electrobombas</span>
          <h3>{active.title}</h3>
          <p>{active.description}</p>
          <a href="/productos" className="btn btn-primary">Ver más</a>
        </div>
        <div className="pumps-banner-visual">
          <PumpIcon />
        </div>
      </div>

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

      <div className="pumps-grid">
        {PUMP_GRID.map((pump) => (
          <div key={pump.name} className="pumps-grid-item">
            <div className="pumps-grid-item-visual">
              <PumpIcon />
            </div>
            <h4>{pump.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PumpsShowcase;

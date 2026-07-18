type FeaturedProduct = {
  badge: string;
  title: string;
  features: string[];
  icon: 'rotor' | 'difusor';
  reverse?: boolean;
};

const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    badge: 'Hunter',
    title: 'Rotor de Riego',
    features: [
      'Riego uniforme de largo alcance para áreas extensas',
      'Boquillas intercambiables para ajustar el caudal',
      'Diseño resistente para uso profesional continuo',
    ],
    icon: 'rotor',
  },
  {
    badge: 'Hunter',
    title: 'Difusor de Riego',
    features: [
      'Cobertura precisa para áreas pequeñas y medianas',
      'Válvula anti-drenaje que evita el goteo por bajo desnivel',
      'Instalación y mantenimiento sencillos',
    ],
    icon: 'difusor',
    reverse: true,
  },
];

const RotorIcon = () => (
  <svg viewBox="0 0 200 200" width="100%" height="100%">
    <circle cx="100" cy="100" r="70" fill="#0f172a" stroke="var(--primary)" strokeWidth="3" />
    <circle cx="100" cy="100" r="14" fill="var(--primary)" />
    <g stroke="var(--primary)" strokeWidth="4" strokeLinecap="round">
      <line x1="100" y1="100" x2="100" y2="34" />
      <line x1="100" y1="100" x2="152" y2="132" />
    </g>
    <g stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" opacity="0.6">
      <path d="M100 30 Q108 10 118 4" fill="none" />
      <path d="M156 128 Q176 132 186 144" fill="none" />
    </g>
  </svg>
);

const DifusorIcon = () => (
  <svg viewBox="0 0 200 200" width="100%" height="100%">
    <circle cx="100" cy="100" r="70" fill="#0f172a" stroke="var(--primary)" strokeWidth="3" />
    <circle cx="100" cy="100" r="14" fill="var(--primary)" />
    <g stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" opacity="0.75">
      <line x1="100" y1="100" x2="100" y2="40" />
      <line x1="100" y1="100" x2="147" y2="65" />
      <line x1="100" y1="100" x2="160" y2="100" />
      <line x1="100" y1="100" x2="147" y2="135" />
      <line x1="100" y1="100" x2="100" y2="160" />
      <line x1="100" y1="100" x2="53" y2="135" />
      <line x1="100" y1="100" x2="40" y2="100" />
      <line x1="100" y1="100" x2="53" y2="65" />
    </g>
  </svg>
);

const FeaturedProducts = () => {
  return (
    <section className="container featured-products">
      <h2 className="section-title" style={{ marginTop: 0 }}>Productos <span>Destacados</span></h2>
      <div className="featured-products-list">
        {FEATURED_PRODUCTS.map((product) => (
          <div
            key={product.title}
            className="featured-product"
            style={{ flexDirection: product.reverse ? 'row-reverse' : 'row' }}
          >
            <div className="featured-product-info">
              <div className="featured-product-heading">
                <h3>{product.title}</h3>
                <span className="featured-product-badge">{product.badge}</span>
              </div>
              <ul className="featured-product-features">
                {product.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a href="/productos" className="btn btn-primary">Ver más</a>
            </div>
            <div className="featured-product-visual">
              <div className="featured-product-spin">
                {product.icon === 'rotor' ? <RotorIcon /> : <DifusorIcon />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;

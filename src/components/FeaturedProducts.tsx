import Reveal from './Reveal';
import Rotor3D from './Rotor3D';
import Difusor3D from './Difusor3D';

type FeaturedProduct = {
  badge: string;
  title: string;
  features: string[];
  variant: 'rotor' | 'difusor';
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
    variant: 'rotor',
  },
  {
    badge: 'Hunter',
    title: 'Difusor de Riego',
    features: [
      'Cobertura precisa para áreas pequeñas y medianas',
      'Válvula anti-drenaje que evita el goteo por bajo desnivel',
      'Instalación y mantenimiento sencillos',
    ],
    variant: 'difusor',
    reverse: true,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="container featured-products">
      <h2 className="section-title" style={{ marginTop: 0 }}>Productos <span>Destacados</span></h2>
      <div className="featured-products-list">
        {FEATURED_PRODUCTS.map((product) => (
          <Reveal
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
              <div className="featured-product-3d">
                {product.variant === 'rotor' ? <Rotor3D /> : <Difusor3D />}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;

import React, { Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../../../hooks/useLanguage';
import type { Language } from '../../../contexts/language';
import { MODELS_3D, preload3DModel } from '../../../lib/models3d';
import { useReveal } from '../../../hooks/useReveal';

const Rotor3D = React.lazy(() => import('./Rotor3D'));
const Difusor3D = React.lazy(() => import('./Difusor3D'));
type FeaturedProduct = {
  badge: string;
  title: string;
  features: string[];
  variant: 'rotor' | 'difusor';
};

// Solo estos dos productos (Rotor y Difusor) — sin carrusel con loop ni
// duplicados, se muestran ambos a la vez en una grilla de tarjetas.
const FEATURED_PRODUCTS: Record<Language, FeaturedProduct[]> = {
  es: [
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
      badge: 'Hunter - Rain Bird',
      title: 'Difusor de Riego',
      features: [
        'Cobertura precisa para áreas pequeñas y medianas',
        'Válvula anti-drenaje que evita el goteo por bajo desnivel',
        'Instalación y mantenimiento sencillos',
      ],
      variant: 'difusor',
    },
  ],
  en: [
    {
      badge: 'Hunter',
      title: 'Irrigation Rotor',
      features: [
        'Uniform long-range coverage for large areas',
        'Interchangeable nozzles to adjust flow rate',
        'Rugged design for continuous professional use',
      ],
      variant: 'rotor',
    },
    {
      badge: 'Hunter - Rain Bird',
      title: 'Irrigation Spray Head',
      features: [
        'Precise coverage for small and medium areas',
        'Anti-drain check valve prevents low-elevation drainage',
        'Simple installation and maintenance',
      ],
      variant: 'difusor',
    },
  ],
};

const FeaturedProducts = () => {
  const { language, t } = useLanguage();
  const products = FEATURED_PRODUCTS[language];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Arranca la descarga de los .glb (y del chunk de three.js que los carga)
  // cuando la sección está por entrar en pantalla (600px de anticipación),
  // no apenas se monta Inicio: ese chunk pesa ~250KB y cargarlo de una en el
  // primer render castiga la carga inicial sin necesidad, ya que el usuario
  // todavía ni ve esta sección.
  const { ref: preloadRef, visible: nearViewport } = useReveal<HTMLElement>({
    rootMargin: '600px 0px 600px 0px',
    threshold: 0,
  });

  useEffect(() => {
    if (!nearViewport) return;
    preload3DModel('rotor');
    preload3DModel('difusor');
  }, [nearViewport]);

  return (
    <section ref={preloadRef} className="featured-products">
      <h2 className="section-title container" style={{ marginTop: 0 }}>{t('featuredProductsTitle1')} <span>{t('featuredProductsTitle2')}</span></h2>

      <div className="featured-products-grid container">
        {products.map((product, i) => {
          const isActive = i === activeIndex;
          const poster = MODELS_3D[product.variant].poster;
          return (
            <div
              key={product.title}
              className={`featured-product-card product-card ${isActive ? 'active' : ''}`}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex((cur) => (cur === i ? null : cur))}
              onFocus={() => setActiveIndex(i)}
              onBlur={() => setActiveIndex((cur) => (cur === i ? null : cur))}
              onClick={() => setActiveIndex(i)}
            >
              <div className="featured-product-card-media">
                {isActive ? (
                  <div className="featured-product-3d">
                    <Suspense fallback={poster ? <img src={poster} alt={product.title} className="featured-product-card-poster" /> : null}>
                      {product.variant === 'rotor' ? <Rotor3D /> : <Difusor3D />}
                    </Suspense>
                  </div>
                ) : (
                  poster && <img src={poster} alt={product.title} className="featured-product-card-poster" loading="lazy" />
                )}
              </div>
              <div className="featured-product-card-info product-info">
                <span className="product-category">{product.badge}</span>
                <h3 className="product-name">{product.title}</h3>
                <ul className="featured-product-card-features">
                  {product.features.slice(0, 2).map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <Link to="/productos" className="btn btn-outline">
                  {t('verMas')}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedProducts;


import { useLoaderData } from 'react-router';
import PageHeader from '../PageHeader';
import { supabase } from '../../supabaseClient';
import { useLanguage } from '../../hooks/useLanguage';

interface Proyecto {
  id: number;
  titulo: string;
  tipo: string | null;
  descripcion: string | null;
  imagen_url: string | null;
}

// Respaldo local por si la fila en Supabase todavía no tiene imagen_url
// (evita depender de una migración a la base de datos en producción).
const PROJECT_PHOTOS: Record<string, string> = {
  'Saga Falabella - Lurin': '/assets/fotos/proyectos/1200x630-Logo_Fala.webp',
  'Mega Plaza Huaral': '/assets/fotos/proyectos/Megaplaza_logo.webp',
  'Torre Panama': '/assets/fotos/proyectos/torre-panama.webp',
  'Mall del Sur': '/assets/fotos/proyectos/mall-del-sur.webp',
  'Plaza Norte': '/assets/fotos/proyectos/plaza-norte.webp',
  'Depas y Club Huachipa': '/assets/fotos/proyectos/depas-huachipa.webp',
  'Vive Puerto Viejo - Kentia': '/assets/fotos/proyectos/KENTIA.webp',
  'Haras Los Eucaliptos - Canete': '/assets/fotos/proyectos/HARAS-EUCALIPTOS.webp',
  'Country San Antonio - Canete': '/assets/fotos/proyectos/COUNTRY-SAN-ANTONIO-CANETE.webp',
};

// Se ejecuta en el servidor (SSR) y también en el cliente al navegar acá
// directamente — los proyectos ya llegan armados en el HTML inicial.
export async function loader() {
  const { data, error } = await supabase
    .from('proyectos')
    .select('*')
    .order('id', { ascending: true });

  if (error) console.error('Error fetching proyectos:', error);
  return { proyectos: (data ?? []) as Proyecto[] };
}

const Projects = () => {
  const { t } = useLanguage();
  const { proyectos } = useLoaderData<typeof loader>();

  return (
    <>
      <PageHeader title={t('projectsHeaderTitle')} subtitle={t('projectsHeaderSubtitle')} />
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <p style={{ fontSize: '1.2rem', textAlign: 'center', marginBottom: '4rem', color: 'var(--text-muted)' }}>
          {t('projectsIntro')}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {proyectos.map((project) => {
            const photo = project.imagen_url || PROJECT_PHOTOS[project.titulo];
            return (
            <div key={project.id} className="glass" style={{ border: '4px solid var(--bg-card)', overflow: 'hidden', position: 'relative' }}>
              <div style={{ height: '200px', backgroundColor: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {photo ? (
                  <img
                    src={photo}
                    alt={project.titulo}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase' }}>{t('projectPhotoPlaceholder')}</span>
                )}
              </div>
              <div style={{ padding: '1.5rem', borderTop: '1px solid var(--bg-card)' }}>
                <span style={{ color: 'var(--primary)', fontFamily: 'Oswald', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>
                  {project.tipo}
                </span>
                <h3 style={{ fontSize: '1.5rem', fontFamily: 'Oswald', textTransform: 'uppercase', color: 'var(--text-light)', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                  {project.titulo}
                </h3>
                <p style={{ color: 'var(--text-muted)' }}>{project.descripcion}</p>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Projects;

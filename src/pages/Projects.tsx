import React from 'react';
import PageHeader from '../components/PageHeader';

const Projects = () => {
  const projectsList = [
    { title: 'Saga Falabella – Lurín', type: 'Sistema de Riego por Goteo y Aspersión', desc: 'Centro de Distribución' },
    { title: 'Mega Plaza Huaral', type: 'Sistema de Riego por Goteo', desc: 'Centro Comercial' },
    { title: 'Torre Panamá', type: 'Sistema de Riego por Goteo', desc: 'Pisos: 1, 8 y azotea (31)' },
    { title: 'Mall del Sur', type: 'Sistema de Riego por Aspersión', desc: 'Centro Comercial' },
    { title: 'Plaza Norte', type: 'Sistema de Riego por Aspersión', desc: 'Centro Comercial' },
    { title: 'Depas y Club Huachipa', type: 'Sistema de Riego por Aspersión', desc: 'Condominio Residencial' },
    { title: 'Vive Puerto Viejo – Kentia', type: 'Sistema de Riego por Aspersión', desc: 'Condominio de Playa' },
    { title: 'Haras Los Eucaliptos – Cañete', type: 'Sistema de Riego Por Aspersión y Goteo', desc: 'Condominio' },
    { title: 'Country San Antonio – Cañete', type: 'Sistema de Riego Por Aspersión y Goteo', desc: 'Casa de Campo' },
  ];

  return (
    <>
      <PageHeader title="Nuestros Proyectos" subtitle="Obras Ejecutadas con Éxito" />
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <p style={{ fontSize: '1.2rem', textAlign: 'center', marginBottom: '4rem', color: 'var(--text-muted)' }}>
          Eco Sistemas ha ejecutado diferentes proyectos en riego por aspersión y goteo a nivel nacional.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {projectsList.map((project, idx) => (
            <div key={idx} className="glass" style={{ border: '4px solid #1e293b', overflow: 'hidden', position: 'relative' }}>
              <div style={{ height: '200px', backgroundColor: '#2a3b52', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Marcador visual para imágenes de proyectos */}
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase' }}>[Foto del Proyecto]</span>
              </div>
              <div style={{ padding: '1.5rem', borderTop: '1px solid #1e293b' }}>
                <span style={{ color: 'var(--primary)', fontFamily: 'Oswald', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>
                  {project.type}
                </span>
                <h3 style={{ fontSize: '1.5rem', fontFamily: 'Oswald', textTransform: 'uppercase', color: '#fff', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                  {project.title}
                </h3>
                <p style={{ color: 'var(--text-muted)' }}>{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects;

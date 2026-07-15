import React from 'react';
import PageHeader from '../components/PageHeader';

const About = () => {
  return (
    <>
      <PageHeader title="¿Quiénes Somos?" subtitle="ECO SISTEMAS URH SAC" />
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Nuestra Historia</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
              Somos una empresa Peruana, fundada el 2001, que nos dedicamos a la instalación de sistemas de riego tecnificado a nivel residencial, edificios multifamiliares, parques, campos deportivos, centros comerciales y agrícolas.
            </p>
            <br />
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
              Ofrecemos productos de alta calidad para satisfacer las necesidades de nuestros clientes.
            </p>
            <br />
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
              Ofrecemos sistemas de riego por Aspersión, Microaspersión, Goteo y Nebulización.
            </p>
          </div>
          <div className="glass" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid #1e293b' }}>
            <span style={{ color: 'var(--text-muted)' }}>[Imagen de los jardines con riego]</span>
          </div>
        </div>

        <div style={{ marginTop: '5rem', borderTop: '1px solid #1e293b', paddingTop: '4rem' }}>
          <h2 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '3rem' }}>Nuestros Clientes</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', alignItems: 'center' }}>
            {/* Estos pueden ser reemplazados luego por las imágenes de los logos reales */}
            <div style={{ padding: '1rem', background: '#fff', color: '#000', fontWeight: 'bold' }}>ACR Ingenieros & Arquitectos</div>
            <div style={{ padding: '1rem', background: '#fff', color: '#000', fontWeight: 'bold' }}>Arteco Inmobiliaria</div>
            <div style={{ padding: '1rem', background: '#e31837', color: '#fff', fontWeight: 'bold' }}>Desarrolladora</div>
            <div style={{ padding: '1rem', background: '#2c402d', color: '#d0c3a2', fontWeight: 'bold' }}>Faber-Castell</div>
            <div style={{ padding: '1rem', background: '#fff', color: '#4caf50', fontWeight: 'bold' }}>Garden Studio</div>
            <div style={{ padding: '1rem', background: '#fff', color: '#000', fontWeight: 'bold' }}>LMQ Lizette Miro Quesada</div>
            <div style={{ padding: '1rem', background: '#fff', color: '#000', fontWeight: 'bold' }}>Marcia Lenz Paisajismo</div>
            <div style={{ padding: '1rem', background: '#fff', color: '#000', fontWeight: 'bold' }}>Mall del Sur</div>
            <div style={{ padding: '1rem', background: '#5d101d', color: '#fff', fontWeight: 'bold' }}>Markham College</div>
            <div style={{ padding: '1rem', background: '#fff', color: '#000', fontWeight: 'bold' }}>Playa del Sol</div>
            <div style={{ padding: '1rem', background: '#fff', color: '#000', fontWeight: 'bold' }}>Plaza Norte</div>
            <div style={{ padding: '1rem', background: '#fff', color: '#000', fontWeight: 'bold' }}>Vive PLM</div>
            <div style={{ padding: '1rem', background: '#fff', color: '#000', fontWeight: 'bold' }}>Martin Presentaciones</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

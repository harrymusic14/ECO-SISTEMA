
import PageHeader from '../components/PageHeader';
import { Settings, Wrench, Droplet, Cog } from 'lucide-react';

const Services = () => {
  return (
    <>
      <PageHeader title="Nuestros Servicios" subtitle="Soluciones Integrales para tus Proyectos" />
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <p style={{ fontSize: '1.2rem', textAlign: 'center', marginBottom: '3rem', color: 'var(--text-muted)' }}>
          Brindamos diferentes servicios especializados para garantizar el éxito de tus sistemas de riego y bombeo.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          <div className="glass" style={{ padding: '2.5rem', borderTop: '4px solid var(--primary)', borderRadius: '8px' }}>
            <Cog size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontFamily: 'Oswald', color: '#fff' }}>Asesoría</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Brindamos asesoría para el diseño e implementación de sistemas de riego, para todo tipo de proyectos.
              Así mismo brindamos el soporte y asesoría técnica para la elección de sistemas de presión constante e hidroneumática para residencias, edificios, casas de campo, etc.
            </p>
          </div>

          <div className="glass" style={{ padding: '2.5rem', borderTop: '4px solid var(--primary)', borderRadius: '8px' }}>
            <Wrench size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontFamily: 'Oswald', color: '#fff' }}>Instalación</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Realizamos instalaciones de sistemas de riego en proyectos residenciales, edificios multifamiliares, campos deportivos, parques, casas de playa, condominios, campos agrícolas.
              <br /><br />
              Instalación de sistemas para agua: Sistema de Presión Constante, Sistema Hidroneumático.
              <br />
              Instalación de bombas para riego, tanque elevado, piscinas, pozos, pozos tubulares.
            </p>
          </div>

          <div className="glass" style={{ padding: '2.5rem', borderTop: '4px solid var(--primary)', borderRadius: '8px' }}>
            <Droplet size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontFamily: 'Oswald', color: '#fff' }}>Diseño</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Diseñamos sistemas de riego de acuerdo a espacios y planos paisajísticos, para todo tipo de proyectos.
            </p>
          </div>

          <div className="glass" style={{ padding: '2.5rem', borderTop: '4px solid var(--primary)', borderRadius: '8px' }}>
            <Settings size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontFamily: 'Oswald', color: '#fff' }}>Mantenimiento</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Reparación y mantenimiento de electrobombas.
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default Services;

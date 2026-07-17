
import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import { supabase } from '../supabaseClient';

interface Proyecto {
  id: number;
  titulo: string;
  tipo: string | null;
  descripcion: string | null;
  imagen_url: string | null;
}

const Projects = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProyectos = async () => {
      const { data, error } = await supabase
        .from('proyectos')
        .select('*')
        .order('id', { ascending: true });

      if (!error) setProyectos(data || []);
      setLoading(false);
    };

    fetchProyectos();
  }, []);

  return (
    <>
      <PageHeader title="Nuestros Proyectos" subtitle="Obras Ejecutadas con Éxito" />
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <p style={{ fontSize: '1.2rem', textAlign: 'center', marginBottom: '4rem', color: 'var(--text-muted)' }}>
          Eco Sistemas ha ejecutado diferentes proyectos en riego por aspersión y goteo a nivel nacional.
        </p>

        {loading ? (
          <p style={{ textAlign: 'center', fontSize: '1.2rem', padding: '4rem 0' }}>Cargando proyectos...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {proyectos.map((project) => (
              <div key={project.id} className="glass" style={{ border: '4px solid #1e293b', overflow: 'hidden', position: 'relative' }}>
                <div style={{ height: '200px', backgroundColor: '#2a3b52', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {project.imagen_url ? (
                    <img
                      src={project.imagen_url}
                      alt={project.titulo}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase' }}>[Foto del Proyecto]</span>
                  )}
                </div>
                <div style={{ padding: '1.5rem', borderTop: '1px solid #1e293b' }}>
                  <span style={{ color: 'var(--primary)', fontFamily: 'Oswald', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>
                    {project.tipo}
                  </span>
                  <h3 style={{ fontSize: '1.5rem', fontFamily: 'Oswald', textTransform: 'uppercase', color: '#fff', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                    {project.titulo}
                  </h3>
                  <p style={{ color: 'var(--text-muted)' }}>{project.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Projects;

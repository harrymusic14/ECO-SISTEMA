

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <video 
          className="hero-video-bg" 
          autoPlay 
          loop 
          muted 
          playsInline
          poster="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000"
        >
          {/* <source src="/tu-video-de-fondo.mp4" type="video/mp4" /> */}
        </video>
        <div className="hero-overlay"></div>
        
        <div className="container">
          <div className="hero-content">
            <h1>Máquinas de <span>Potencia</span> para el Futuro</h1>
            <p>Soluciones industriales, agrícolas y domésticas con la más alta tecnología y durabilidad. Equipando tu ecosistema.</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-primary">Catálogo</button>
              <button className="btn btn-outline">Contáctanos</button>
            </div>
          </div>
        </div>
      </section>

      {/* Marcas Section */}
      <section className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2 className="section-title" style={{ marginTop: '0' }}>Nuestras <span>Marcas</span></h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem', alignItems: 'center', marginTop: '2rem' }}>
          <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '8px' }}>
            <h3 style={{ color: '#000', fontFamily: 'Oswald', fontSize: '2rem' }}>DIG</h3>
            <span style={{ color: '#666' }}>water matters</span>
          </div>
          <div style={{ padding: '1.5rem', background: '#005a8b', borderRadius: '8px' }}>
            <h3 style={{ color: '#fff', fontFamily: 'Oswald', fontSize: '2rem' }}>Hunter</h3>
          </div>
          <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '8px' }}>
            <h3 style={{ color: '#000', fontFamily: 'Oswald', fontSize: '2rem' }}>RAIN<span style={{ color: 'var(--primary-dark)' }}>PRO</span></h3>
          </div>
          <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '8px', border: '2px solid #333' }}>
            <h3 style={{ color: '#000', fontFamily: 'Oswald', fontSize: '2rem' }}>WASSERMANN</h3>
          </div>
          <div style={{ padding: '1.5rem', background: '#0a3d91', borderRadius: '8px' }}>
            <h3 style={{ color: '#ffe600', fontFamily: 'Oswald', fontSize: '2rem' }}>TUBOPLAST</h3>
          </div>
        </div>
      </section>

      <section className="container" style={{ marginBottom: '4rem' }}>
        <div className="glass" style={{ padding: '3rem', borderLeft: '4px solid var(--primary)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>¿Buscas soluciones en sistemas de riego?</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
            Somos una empresa peruana con más de 20 años de experiencia ofreciendo productos de alta calidad y servicios de asesoría, instalación y diseño para todo tipo de proyectos.
          </p>
          <a href="/nosotros" className="btn btn-primary">Conócenos más</a>
        </div>
      </section>
    </>
  );
};

export default Home;

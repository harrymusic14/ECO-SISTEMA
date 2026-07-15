import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';


const Layout = () => {
  const [navbarSolid, setNavbarSolid] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Si no estamos en la página de inicio, el navbar siempre debe ser sólido
    if (location.pathname !== '/') {
      setNavbarSolid(true);
      return;
    }

    const handleScroll = () => {
      setNavbarSolid(window.scrollY > 50);
    };
    
    // Check initial state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <div className="app-container">
      <nav className={`navbar ${navbarSolid ? 'glass' : ''}`} style={{ backgroundColor: navbarSolid ? 'var(--glass-bg)' : 'transparent' }}>
        <div className="container">
          <Link to="/" className="logo">
            <img src="/logo.png" alt="Eco Sistemas Logo" style={{ width: '40px', height: '40px', marginRight: '0.2rem' }} />
            <span style={{ color: '#fff' }}>ECO</span>
            <span style={{ color: 'var(--primary)' }}>SISTEMAS</span>
          </Link>
          <ul className="nav-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/proyectos">Proyectos</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
          <Link to="/productos" className="btn btn-primary">Catálogo</Link>
        </div>
      </nav>

      <main style={{ paddingTop: location.pathname !== '/' ? '80px' : '0' }}>
        <Outlet />
      </main>

      <footer style={{ backgroundColor: '#0f172a', borderTop: '2px solid #1e293b', padding: '4rem 0 2rem' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
          <div>
            <div className="logo" style={{ marginBottom: '1rem' }}>
              <img src="/logo.png" alt="Eco Sistemas Logo" style={{ width: '40px', height: '40px', marginRight: '0.2rem' }} />
              <span style={{ color: '#fff' }}>ECO</span>
              <span style={{ color: 'var(--primary)' }}>SISTEMAS</span>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>Soluciones industriales, agrícolas y domésticas. Equipando tu ecosistema con sistemas de riego y bombas de alta calidad.</p>
          </div>
          <div>
            <h3 style={{ marginBottom: '1.5rem', color: '#fff', fontSize: '1.2rem' }}>Enlaces Rápidos</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><Link to="/nosotros" style={{ color: 'var(--text-muted)' }}>¿Quiénes Somos?</Link></li>
              <li><Link to="/servicios" style={{ color: 'var(--text-muted)' }}>Nuestros Servicios</Link></li>
              <li><Link to="/proyectos" style={{ color: 'var(--text-muted)' }}>Proyectos Ejecutados</Link></li>
              <li><Link to="/productos" style={{ color: 'var(--text-muted)' }}>Catálogo de Productos</Link></li>
            </ul>
          </div>
          <div>
            <h3 style={{ marginBottom: '1.5rem', color: '#fff', fontSize: '1.2rem' }}>Contacto</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
              <li>📍 Mz A LT 9 A.V NUEVA GALES CIENEGUILLA</li>
              <li>📞 +51 998270102 / +51 985832096</li>
              <li>✉️ ecosistemas_urh_sac@hotmail.com</li>
              <li>🏢 RUC: 20502059751</li>
            </ul>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} ECO SISTEMAS URH SAC. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Layout;

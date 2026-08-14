import { Suspense, useEffect, useState } from 'react';
import { Outlet, Link, NavLink, useLocation, ScrollRestoration } from 'react-router';
import { Menu, X, Languages, Sun, Moon } from 'lucide-react';
import LogoPreloader from '../components/LogoPreloader';
import BackgroundGlow from '../components/BackgroundGlow';
import OfferBar from '../components/OfferBar';
import WhatsAppButton from '../components/WhatsAppButton';
import FloatingSocialButtons from '../components/FloatingSocialButtons';
import SocialLinks from '../components/SocialLinks';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';

// Coincide con el momento en que el splash del logo empieza a desvanecerse
// (DISPLAY_MS en LogoPreloader.tsx), para que el navbar se revele justo ahí.
const NAVBAR_REVEAL_DELAY_MS = 1900;

const Layout = () => {
  const [navbarSolid, setNavbarSolid] = useState(false);
  // Arranca siempre en false (igual que el servidor) — comprobar
  // prefers-reduced-motion recién en el useEffect de abajo evita el
  // mismatch de hidratación (en el servidor no existe matchMedia).
  const [navbarReady, setNavbarReady] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setNavbarReady(true);
  }, []);

  useEffect(() => {
    if (navbarReady) return;
    const timer = setTimeout(() => setNavbarReady(true), NAVBAR_REVEAL_DELAY_MS);
    return () => clearTimeout(timer);
  }, [navbarReady]);

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

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="app-container">
      <LogoPreloader />
      <BackgroundGlow />
      <OfferBar />
      <nav
        className={`navbar ${navbarReady ? 'navbar-in' : ''} ${navbarSolid ? 'glass' : 'navbar-transparent'}`}
        style={{ backgroundColor: navbarSolid ? 'var(--glass-bg)' : 'transparent' }}
      >
        <div className="container">
          <Link to="/" className="logo">
            <img src="/assets/fotos/logo.webp" alt="Eco Sistemas Logo" style={{ width: '40px', height: '40px', marginRight: '0.2rem' }} />
            <span style={{ color: navbarSolid ? 'var(--text-light)' : '#fff' }}>ECO</span>
            <span style={{ color: 'var(--primary)' }}>SISTEMAS</span>
          </Link>
          
          <div className="navbar-actions navbar-actions-mobile">
            <button
              className="icon-toggle-btn"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              className="icon-toggle-btn lang-toggle-btn"
              onClick={toggleLanguage}
              aria-label="Cambiar idioma"
              title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <Languages size={20} />
              <span>{language.toUpperCase()}</span>
            </button>
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          <div className={`nav-wrapper ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <ul className="nav-links">
              <li><NavLink to="/" end>{t('navHome')}</NavLink></li>
              <li><NavLink to="/nosotros">{t('navAbout')}</NavLink></li>
              <li><NavLink to="/servicios">{t('navServices')}</NavLink></li>
              <li><NavLink to="/proyectos">{t('navProjects')}</NavLink></li>
              <li><NavLink to="/productos">{t('navProducts')}</NavLink></li>
              <li><NavLink to="/contacto">{t('navContact')}</NavLink></li>
            </ul>
            <div className="navbar-actions navbar-actions-desktop">
              <button
                className="icon-toggle-btn"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                className="icon-toggle-btn lang-toggle-btn"
                onClick={toggleLanguage}
                aria-label="Cambiar idioma"
                title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
              >
                <Languages size={20} />
                <span>{language.toUpperCase()}</span>
              </button>
            </div>
            <Link to="/catalogo" className="btn btn-primary nav-catalog-btn">{t('navCatalog')}</Link>
          </div>
        </div>
      </nav>

      <main style={{ paddingTop: location.pathname !== '/' ? 'calc(80px + var(--offer-bar-height))' : '0' }}>
        {/* El fallback casi nunca se ve: el LogoPreloader de arriba ya cubre
            la pantalla durante la carga inicial de la página. */}
        <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
          <Outlet />
        </Suspense>
        <ScrollRestoration />
      </main>

      <FloatingSocialButtons />
      <WhatsAppButton />

      <footer style={{ backgroundColor: 'var(--bg-dark)', borderTop: '2px solid var(--border-color)', padding: '4rem 0 2rem' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
          <div>
            <div className="logo" style={{ marginBottom: '1rem' }}>
              <img src="/assets/fotos/logo.webp" alt="Eco Sistemas Logo" style={{ width: '40px', height: '40px', marginRight: '0.2rem' }} />
              <span style={{ color: 'var(--text-light)' }}>ECO</span>
              <span style={{ color: 'var(--primary)' }}>SISTEMAS</span>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>{t('footerTagline')}</p>
          </div>
          <div>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-light)', fontSize: '1.2rem' }}>{t('footerQuickLinks')}</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><Link to="/nosotros" style={{ color: 'var(--text-muted)' }}>{t('footerAbout')}</Link></li>
              <li><Link to="/servicios" style={{ color: 'var(--text-muted)' }}>{t('footerServices')}</Link></li>
              <li><Link to="/proyectos" style={{ color: 'var(--text-muted)' }}>{t('footerProjects')}</Link></li>
              <li><Link to="/productos" style={{ color: 'var(--text-muted)' }}>{t('footerProducts')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-light)', fontSize: '1.2rem' }}>{t('footerContactTitle')}</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
              <li>📍 Mz A LT 9 A.V NUEVA GALES CIENEGUILLA</li>
              <li>📞 +51 998270102 / +51 985832096</li>
              <li>✉️ ecosistemas_urh_sac@hotmail.com</li>
              <li>🏢 RUC: 20502059751</li>
            </ul>
            <h3 style={{ margin: '1.5rem 0 1rem', color: 'var(--text-light)', fontSize: '1.2rem' }}>{t('footerFollowUs')}</h3>
            <SocialLinks />
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} ECO SISTEMAS URH SAC. {t('footerRights')}
        </div>
      </footer>
    </div>
  );
};

export default Layout;

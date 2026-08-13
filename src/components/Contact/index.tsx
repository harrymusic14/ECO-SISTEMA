
import PageHeader from '../PageHeader';
import { useLanguage } from '../../hooks/useLanguage';
import FaqSection from './components/FaqSection';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader title={t('contactHeaderTitle')} subtitle={t('contactHeaderSubtitle')} />
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>

          {/* Preguntas Frecuentes (FAQ) */}
          <div>
            <FaqSection />
          </div>

          {/* Formulario de contacto */}
          <div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{t('contactFormIntro')}</p>
            <h3 style={{ fontSize: '2.5rem', fontFamily: 'Oswald', textTransform: 'uppercase', marginBottom: '1.5rem', color: 'var(--text-light)' }}>{t('contactFormTitle')}</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>{t('contactFormNombre')}</label>
                <input type="text" style={{ width: '100%', padding: '1rem', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', color: 'var(--text-light)', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>{t('contactFormEmpresa')}</label>
                <input type="text" style={{ width: '100%', padding: '1rem', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', color: 'var(--text-light)', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>{t('contactFormEmail')}</label>
                <input type="email" style={{ width: '100%', padding: '1rem', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', color: 'var(--text-light)', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>{t('contactFormCelular')}</label>
                <input type="tel" style={{ width: '100%', padding: '1rem', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', color: 'var(--text-light)', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>{t('contactFormMensaje')}</label>
                <textarea rows={6} style={{ width: '100%', padding: '1rem', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', color: 'var(--text-light)', outline: 'none', resize: 'vertical' }}></textarea>
              </div>
              <button type="button" style={{ 
                marginTop: '1rem', 
                alignSelf: 'flex-start',
                background: 'var(--bg-elevated)',
                color: 'var(--text-light)',
                padding: '1rem 3.5rem',
                border: 'none',
                fontWeight: 'bold',
                fontSize: '0.95rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                borderRadius: '2px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--text-light)';
                e.currentTarget.style.color = 'var(--bg-dark)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'var(--bg-elevated)';
                e.currentTarget.style.color = 'var(--text-light)';
              }}
              >
                {t('contactFormEnviar')}
              </button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
};

export default Contact;

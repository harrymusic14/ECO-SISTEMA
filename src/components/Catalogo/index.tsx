import { Download } from 'lucide-react';
import PageHeader from '../PageHeader';
import { useLanguage } from '../../hooks/useLanguage';

// Catálogo en PDF por marca — poner el archivo en public/documentos/catalogos/
// con el mismo nombre que "pdf" acá abajo. Si todavía no existe, el enlace
// simplemente da un 404 al hacer clic hasta que se agregue (no rompe nada).
const BRANDS: { name: string; pdf: string; background: string; color: string }[] = [
  { name: 'DIG', pdf: 'dig.pdf', background: 'var(--bg-card)', color: 'var(--text-light)' },
  { name: 'Hunter', pdf: 'hunter.pdf', background: '#005a8b', color: '#fff' },
  { name: 'RainPro', pdf: 'rainpro.pdf', background: 'var(--bg-card)', color: 'var(--text-light)' },
  { name: 'Wassermann', pdf: 'wassermann.pdf', background: 'var(--bg-card)', color: 'var(--text-light)' },
  { name: 'Tuboplast', pdf: 'tuboplast.pdf', background: '#0a3d91', color: '#ffe600' },
];

const Catalogo = () => {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader title={t('catalogoHeaderTitle')} subtitle={t('catalogoHeaderSubtitle')} />
      <div className="container" style={{ paddingBottom: '4rem', textAlign: 'center' }}>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '3rem' }}>
          {t('catalogoInstrucciones')}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
          {BRANDS.map((brand) => (
            <a
              key={brand.name}
              href={`/documentos/catalogos/${brand.pdf}`}
              download
              className="marca-catalogo-card"
              style={{ background: brand.background }}
            >
              <h3 style={{ color: brand.color, fontFamily: 'Oswald', fontSize: '2rem', marginBottom: '1rem' }}>
                {brand.name === 'RainPro' ? (
                  <>RAIN<span style={{ color: 'var(--primary-dark)' }}>PRO</span></>
                ) : brand.name.toUpperCase()}
              </h3>
              <span className="marca-catalogo-download" style={{ color: brand.color }}>
                <Download size={16} />
                {t('catalogoDescargarPdf')}
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Catalogo;

import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, imageUrl }) => {
  return (
    <div style={{
      position: 'relative',
      background: imageUrl ? 'var(--bg-dark)' : 'linear-gradient(to right, var(--bg-dark), var(--bg-card))',
      padding: '4rem 0',
      borderBottom: '4px solid var(--primary)',
      marginBottom: '3rem',
      overflow: 'hidden'
    }}>
      {imageUrl && (
        <>
          <img
            src={imageUrl}
            alt=""
            fetchPriority="high"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
          />
          <div className="hero-cover-overlay" style={{ position: 'absolute', inset: 0, zIndex: 2 }} />
        </>
      )}
      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <h1 style={{ fontSize: '3.5rem', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          {title}
        </h1>
        {subtitle && <p style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>{subtitle}</p>}
      </div>
    </div>
  );
};

export default PageHeader;

import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <div style={{
      background: 'linear-gradient(to right, #0f172a, #1e293b)',
      padding: '4rem 0',
      borderBottom: '4px solid var(--primary)',
      marginBottom: '3rem'
    }}>
      <div className="container">
        <h1 style={{ fontSize: '3.5rem', color: '#fff', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          {title}
        </h1>
        {subtitle && <p style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>{subtitle}</p>}
      </div>
    </div>
  );
};

export default PageHeader;

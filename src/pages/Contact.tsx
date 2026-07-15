import React from 'react';
import PageHeader from '../components/PageHeader';
import { MapPin, Phone, Mail, FileText } from 'lucide-react';

const Contact = () => {
  return (
    <>
      <PageHeader title="Contacto" subtitle="Estamos listos para equipar tu ecosistema" />
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
          
          {/* Información de contacto */}
          <div>
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'Oswald', textTransform: 'uppercase', marginBottom: '2rem', color: 'var(--primary)' }}>Comunícate con nosotros</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>
              Ya sea para un proyecto residencial, un edificio multifamiliar o una instalación agrícola grande, en ECO SISTEMAS URH SAC tenemos la solución ideal.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ background: 'var(--primary)', padding: '1rem', borderRadius: '50%', color: '#000' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Oswald', fontSize: '1.2rem', color: '#fff', textTransform: 'uppercase' }}>Dirección</h4>
                  <p style={{ color: 'var(--text-muted)' }}>Mz A LT 9 A.V NUEVA GALES, Cieneguilla</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ background: 'var(--primary)', padding: '1rem', borderRadius: '50%', color: '#000' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Oswald', fontSize: '1.2rem', color: '#fff', textTransform: 'uppercase' }}>Teléfonos</h4>
                  <p style={{ color: 'var(--text-muted)' }}>+51 998270102 / +51 985832096</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ background: 'var(--primary)', padding: '1rem', borderRadius: '50%', color: '#000' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Oswald', fontSize: '1.2rem', color: '#fff', textTransform: 'uppercase' }}>E-mail</h4>
                  <p style={{ color: 'var(--text-muted)' }}>ecosistemas_urh_sac@hotmail.com</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ background: 'var(--primary)', padding: '1rem', borderRadius: '50%', color: '#000' }}>
                  <FileText size={24} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Oswald', fontSize: '1.2rem', color: '#fff', textTransform: 'uppercase' }}>RUC</h4>
                  <p style={{ color: 'var(--text-muted)' }}>20502059751</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="glass" style={{ padding: '3rem', border: '4px solid #1e293b' }}>
            <h3 style={{ fontSize: '2rem', fontFamily: 'Oswald', textTransform: 'uppercase', marginBottom: '2rem', color: '#fff' }}>Envíanos un mensaje</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Nombre Completo</label>
                <input type="text" style={{ width: '100%', padding: '1rem', background: '#0f172a', border: '2px solid #334155', color: '#fff', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Correo Electrónico</label>
                <input type="email" style={{ width: '100%', padding: '1rem', background: '#0f172a', border: '2px solid #334155', color: '#fff', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Asunto / Proyecto</label>
                <input type="text" style={{ width: '100%', padding: '1rem', background: '#0f172a', border: '2px solid #334155', color: '#fff', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Mensaje</label>
                <textarea rows={4} style={{ width: '100%', padding: '1rem', background: '#0f172a', border: '2px solid #334155', color: '#fff', outline: 'none', resize: 'vertical' }}></textarea>
              </div>
              <button type="button" className="btn btn-primary" style={{ marginTop: '1rem' }}>Enviar Mensaje</button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
};

export default Contact;

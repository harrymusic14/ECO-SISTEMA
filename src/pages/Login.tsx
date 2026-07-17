import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import PageHeader from '../components/PageHeader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <>
      <PageHeader title="Acceso Administrativo" subtitle="Panel de control exclusivo" />
      <div className="container" style={{ padding: '4rem 1rem', display: 'flex', justifyContent: 'center' }}>
        <div className="glass" style={{ padding: '3rem', width: '100%', maxWidth: '400px', borderRadius: '12px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontFamily: 'Oswald', color: 'var(--primary)' }}>Iniciar Sesión</h2>
          
          {error && (
            <div style={{ background: 'rgba(255,0,0,0.1)', border: '1px solid red', padding: '1rem', color: 'red', marginBottom: '1.5rem', borderRadius: '4px' }}>
              Credenciales incorrectas o hubo un error.
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Correo Electrónico</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '1rem', background: '#0f172a', border: '2px solid #334155', color: '#fff', outline: 'none', borderRadius: '4px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Contraseña</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '1rem', background: '#0f172a', border: '2px solid #334155', color: '#fff', outline: 'none', borderRadius: '4px' }}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '1rem' }}>
              {loading ? 'Ingresando...' : 'Entrar al Panel'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
